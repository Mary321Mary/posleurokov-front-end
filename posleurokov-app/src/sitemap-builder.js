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
    let categoryParam = [];

    for (let i = 0; i < categories.length; i++) {
      categoryParam.push(String(categories[i].baseCategory.name).replace(" ", "%20"));
      for (let j = 0; j < categories[i].concreteCategories.length; j++) {
        categoryParam.push(String(categories[i].concreteCategories[j].name).replace(" ", "%20"));
      }
    }

    const courses = await axiosAPI.axiosAPI.getCourses(
      "/result/?city=all&category=all&name=&page=1&tab=any&sex=any&addr=&isInSummer=&inNotSummer=&hasReception="
    );

    let ids = [];
    for (let i = 0; i < courses.result.length; i++) {
      ids.push(courses.result[i].lesson.id);
    }

    for (let i = 2; i <= courses.counts.countOfPages; i++) {
      const lessons = await axiosAPI.axiosAPI.getCourses(
        "/result/?city=all&category=all&name=&page=" +
        i +
        "&tab=any&sex=any&addr=&isInSummer=&inNotSummer=&hasReception="
      );
      for (let j = 0; j < lessons.result.length; j++) {
        ids.push(lessons.result[j].lesson.id);
      }
    }

    const paramsConfig = {
      "/:cityParam": [{ cityParam: cityParamMain }],
      "/catalogue/:cityParam": [{ cityParam: cityParamCatalogue }],
      "/catalogue/:cityParam/:categoryParam": [
        { cityParam: cityParamCatalogue, categoryParam: categoryParam },
      ],
      "/lesson/:id": [{ id: ids }],
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
