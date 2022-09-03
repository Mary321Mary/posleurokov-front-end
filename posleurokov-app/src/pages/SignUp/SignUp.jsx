import { Heading, Input, Button, Sheet } from "components";
import Helmet from "react-helmet";

import styles from "./SignUp.module.scss";
import { useState } from "react";
import { axiosAPI } from "plugins/axios";

const SignUp = () => {
  const [user, setUser] = useState(() => {
    return {
      firstname: "",
      surname: "",
      fio: "",
      email: "",
      password: "",
      password2: "",
    };
  });

  const [error, setError] = useState(() => {
    return {
      firstname: "",
      surname: "",
      email: "",
      password: "",
      password2: "",
    };
  });

  const changeInputRegister = (event) => {
    event.persist();
    setUser((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitChackin = async (event) => {
    event.preventDefault();
    setError((prev) => {
      return {
        ...prev,
        password2: "",
      };
    });
    if (user.firstname === "") {
      setError((prev) => {
        return {
          ...prev,
          firstname: "Пустое имя",
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          firstname: "",
        };
      });
    }
    if (user.surname === "") {
      setError((prev) => {
        return {
          ...prev,
          surname: "Пустая фамилия",
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          surname: "",
        };
      });
    }
    if (user.email === "") {
      setError((prev) => {
        return {
          ...prev,
          email: "Пустой email",
        };
      });
    }
    else if (!(user.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
      setError((prev) => {
        return {
          ...prev,
          email: "Неправильный email",
        };
      });
    }
    else {
      setError((prev) => {
        return {
          ...prev,
          email: "",
        };
      });
    }
    if (user.password === "") {
      setError((prev) => {
        return {
          ...prev,
          password: "Пустой пароль",
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          password: "",
        };
      });
    }
    if (
      error.firstname === "" &&
      error.surname === "" &&
      error.email === "" &&
      user.password !== "" &&
      user.password === user.password2
    ) {
      user.fio += user.firstname + " " + user.surname;
      const response = await axiosAPI.getSignUp(user);
      if (response.status === 400) {
        setUser((prev) => {
          return {
            ...prev,
            fio: "",
          };
        });
        if (response.data === "ExistUser") {
          setError((prev) => {
            return {
              ...prev,
              email: [
                "Ваш e-mail уже существует в базе.",
                <br key="1" />,
                <br key="2" />,
                "Вы можете:",
                <br key="3" />,
                " •  указать другой e-mail",
                <br key="4" />,
                "или",
                <br key="5" />,
                "• связаться с администратором для получения пароля.",
                <br key="6" />,
                "+375 29 113 67 97",
              ],
            };
          });
        } else {
          setError('Неправи');
        }
      } else {
        localStorage.setItem("token", response.token);
        localStorage.setItem("name", null);
        window.location.assign("/");
      }
    } else {
      setError((prev) => {
        return {
          ...prev,
          password2: "Повторите пароль правильно",
        };
      });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles["section-list"]}>
        <div className={styles["section-categories"]}>
          <Sheet padding="25px">
            <Helmet title="Регистрация" />
            <Heading tag="h1" center>
              Регистрируйтесь
            </Heading>
            <form className={styles.form}>
              <Input
                label="Имя"
                name="firstname"
                value={user.firstname}
                onChange={changeInputRegister}
                errorMessage={error.firstname}
              />
              <Input
                label="Фамилия"
                name="surname"
                value={user.surname}
                onChange={changeInputRegister}
                errorMessage={error.surname}
              />
              <Input
                type="email"
                label="Email"
                name="email"
                value={user.email}
                onChange={changeInputRegister}
                errorMessage={error.email}
              />
              <Input
                type="password"
                label="Пароль"
                name="password"
                value={user.password}
                onChange={changeInputRegister}
                errorMessage={error.password}
              />
              <Input
                type="password"
                label="Повторите пароль"
                name="password2"
                value={user.password2}
                onChange={changeInputRegister}
                errorMessage={error.password2}
              />
              <Button onClick={submitChackin} marginTop="5px">
                Регистрация
              </Button>
            </form>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export { SignUp };
