require("babel-register")({
  presets: ["es2015", "react"],
});
require("dotenv").config();

const router = require("./router").default;
const Sitemap = require("react-router-sitemap").default;
const axiosAPI = require("./plugins/axios");

async function generateSitemap() {
  try {
    const categories = await axiosAPI.axiosAPI.getCategories("all");
    let cityParamMain = ["/Online", "/Гомель"];
    let cityParamCatalogue = ["/all", "/Online", "/Гомель"];

    let categoryParamAll = [];
    for (let i = 0; i < categories.length; i++) {
      categoryParamAll.push(
        String(categories[i].baseCategory.name).replace(/\s/g, "%20")
      );
      for (let j = 0; j < categories[i].concreteCategories.length; j++) {
        categoryParamAll.push(
          String(categories[i].concreteCategories[j].name).replace(/\s/g, "%20")
        );
      }
    }

    const categoriesOnline = await axiosAPI.axiosAPI.getCategories("online");
    let categoryParamOnline = [];
    for (let i = 0; i < categoriesOnline.length; i++) {
      categoryParamOnline.push(
        String(categoriesOnline[i].baseCategory.name).replace(/\s/g, "%20")
      );
      for (let j = 0; j < categoriesOnline[i].concreteCategories.length; j++) {
        categoryParamOnline.push(
          String(categoriesOnline[i].concreteCategories[j].name).replace(
            /\s/g,
            "%20"
          )
        );
      }
    }

    const categoriesGomel = await axiosAPI.axiosAPI.getCategories(
      encodeURI("Гомель")
    );
    let categoryParamGomel = [];
    for (let i = 0; i < categoriesGomel.length; i++) {
      categoryParamGomel.push(
        String(categoriesGomel[i].baseCategory.name).replace(/\s/g, "%20")
      );
      for (let j = 0; j < categoriesGomel[i].concreteCategories.length; j++) {
        categoryParamGomel.push(
          String(categoriesGomel[i].concreteCategories[j].name).replace(
            /\s/g,
            "%20"
          )
        );
      }
    }

    const courses = await axiosAPI.axiosAPI.getCourses(
      "/result/?city=all&category=all&name=&page=1&tab=any&sex=any&addr=&isInSummer=&inNotSummer=&hasReception="
    );

    let ids = [];
    let orgIds = []
    for (let i = 0; i < courses.result.length; i++) {
      ids.push(courses.result[i].lesson.id);
      orgIds.push(courses.result[i].lesson.organization)
    }

    for (let i = 2; i <= courses.counts.countOfPages; i++) {
      const lessons = await axiosAPI.axiosAPI.getCourses(
        "/result/?city=all&category=all&name=&page=" +
          i +
          "&tab=any&sex=any&addr=&isInSummer=&inNotSummer=&hasReception="
      );
      for (let j = 0; j < lessons.result.length; j++) {
        ids.push(lessons.result[j].lesson.id);
        orgIds.push(courses.result[j].lesson.organization)
      }
    }

    let uniqueIds = [...new Set(orgIds)]

    const paramsConfig = {
      "/:cityParam": [{ cityParam: cityParamMain }],
      "/catalogue/:cityParam": [{ cityParam: cityParamCatalogue }],
      "/catalogue/all/:categoryParam": [{ categoryParam: categoryParamAll }],
      "/catalogue/Online/:categoryParam": [
        { categoryParam: categoryParamOnline },
      ],
      "/catalogue/Гомель/:categoryParam": [
        { categoryParam: categoryParamGomel },
      ],
      "/lesson/:id": [{ id: ids }],
      "/organization/:id": [{id: uniqueIds}],
    };

    return new Sitemap(router)
      .applyParams(paramsConfig)
      .build("https://vsekruzhki.by")
      .save("./public/sitemap.xml");
  } catch (e) {
    console.log(e);
  }
}

generateSitemap();
