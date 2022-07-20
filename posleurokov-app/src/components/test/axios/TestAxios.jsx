import { useEffect, useState } from 'react';
import { axiosAPI } from 'plugins/axios';

const TestAxios = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const fetchData = async () => {
    let userData = await axiosAPI.getUser();
    userData = userData.results[0];
    setName(`${userData.name.first} ${userData.name.last}`);
    setEmail(userData.email);
  };

  useEffect(() => {
    fetchData();
  }, [setName, setEmail]);

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
};

export default TestAxios;
