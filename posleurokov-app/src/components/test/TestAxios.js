import { useEffect, useState } from 'react';
import { axiosAPI } from "../../plugins/axios";

function TestAxios() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    useEffect(() => {
        async function fetchData() {
            let userData = await axiosAPI.getUser();
            userData = userData.results[0];
            setName(`${userData.name.first} ${userData.name.last}`);
            setEmail(userData.email);
        }
        fetchData();
    }, [setName, setEmail]);
    return (
        <div>
            <p>{name}</p>
            <p>{email}</p>
        </div>
    );
}

export default TestAxios;
