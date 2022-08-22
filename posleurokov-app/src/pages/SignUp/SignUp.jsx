import { Heading, Input, Button, Sheet } from "components";
import Helmet from "react-helmet";

import styles from "./SignUp.module.scss";
import { useState } from "react";
import { axiosAPI } from "plugins/axios";

const SignUp = () => {
  const [user, setUser] = useState(() => {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      password2: "",
    };
  });

  const [error, setError] = useState(() => {
    return {
      name: "",
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
    if (user.password === user.password2) {
      const response = await axiosAPI.getSignUp(user);
      console.log(response);
      if (response.status === 400) {
        setError(response.data);
      } else {
        localStorage.setItem("token", response.token);
        window.location.assign("/");
      }
    } else {
      setError({ password2: "Повторите пароль правильно" });
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
                name="name"
                value={user.name}
                onChange={changeInputRegister}
                errorMessage={error.name}
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
              <Button onClick={submitChackin}>Регистрация</Button>
            </form>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export { SignUp };
