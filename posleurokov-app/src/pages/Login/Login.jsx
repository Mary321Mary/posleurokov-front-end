import { Heading, Input, Button, Sheet } from "components";
import Helmet from "react-helmet";

import styles from "./Login.module.scss";
import { useState } from "react";
import { axiosAPI } from "plugins/axios";
import { Link } from "components";

const Login = () => {
  const [user, setUser] = useState(() => {
    return {
      email: "",
      password: "",
    };
  });

  const [error, setError] = useState("");

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
    const response = await axiosAPI.getLogin(user);
    if (response.status === 400) {
      if (response.data === "No such user") {
        setError("Нет такого пользователя");
      } else if (response.data === "No such password") {
        setError("Неверный пароль");
      } else {
        setError(response.data);
      }
    } else {
      localStorage.setItem("token", response.token);
      localStorage.setItem("name", response.name);
      window.location.assign("/");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles["section-list"]}>
        <div className={styles["section-categories"]}>
          <Sheet padding="25px">
            <Helmet title="Вход" />
            <Heading tag="h1" center>
              ВОЙТИ
            </Heading>
            <form className={styles.form}>
              <label>Email</label>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={changeInputRegister}
              />
              <label>Пароль</label>
              <Input
                type="password"
                name="password"
                value={user.password}
                onChange={changeInputRegister}
                errorMessage={error}
              />
              <Button onClick={submitChackin} marginTop="5px">
                Войти
              </Button>
            </form>
          </Sheet>
          <div className={styles.signup}>
            <div>Еще не регистрировались?</div>
            <Link path="/signup" color="black">
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login };
