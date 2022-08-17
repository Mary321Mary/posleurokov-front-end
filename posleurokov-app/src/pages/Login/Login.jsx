import { Heading, Input, Button, Sheet } from "components";
import Helmet from "react-helmet";

import styles from "./Login.module.scss";
import { useState } from "react";
import { axiosAPI } from "plugins/axios";

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
      setError(response.data);
    } else {
      window.location.assign("/");
    }
  };

  return (
    <Sheet padding="15px 0px" width="400px" marginLeft="35%">
      <Helmet title="Вход" />
      <Heading tag="h1" center>
        ВОЙТИ
      </Heading>
      <form className={styles.form}>
        <Input
          type="email"
          label="Email"
          name="email"
          value={user.email}
          onChange={changeInputRegister}
        />
        <Input
          type="password"
          label="Пароль"
          name="password"
          value={user.password}
          onChange={changeInputRegister}
          errorMessage={error}
        />
        <Button onClick={submitChackin}>Войти</Button>
      </form>
    </Sheet>
  );
};

export { Login };
