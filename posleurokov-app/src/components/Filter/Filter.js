import React from "react";
import Table from "react-bootstrap/Table"
import "bootstrap/dist/css/bootstrap.min.css"

function Filter() {
    const [userData, setUserData] = React.useState([]);
    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [categories, setCategories] = React.useState('');
    const [other, setOther] = React.useState('');



    React.useEffect(() => {
        const data = [
            { age: "10", gender: "ж", cost: "200", address: "qwertyu", categories: "1", other: "asdfg" },
            { age: "12", gender: "м", cost: "20", address: "fvbn", categories: "2", other: "dv" },
            { age: "9", gender: "м", cost: "55", address: "vcx", categories: "3", other: "ae" },
            { age: "11", gender: "ж", cost: "125", address: "fdsa", categories: "1", other: "asdfg" },
            { age: "14", gender: "ж", cost: "120", address: "lbnm", categories: "3", other: "sewd" },
            { age: "12", gender: "м", cost: "100", address: "oiuy", categories: "2", other: "asdfg" },
        ];

        setUserData(data);

    }, [])

    const handleSearch = () => {
        debugger
        const newDate =
            userData
                .filter(x => x.age == (age == '' ? x.age : age))
                .filter(y => y.gender == (gender == '' ? y.gender : gender))
                .filter(y => y.cost == (cost == '' ? y.cost : cost))
                .filter(y => y.address == (address == '' ? y.address : address))
                .filter(y => y.categories == (categories == '' ? y.categories : categories))
                .filter(y => y.other == (other == '' ? y.other : other))

        setUserData(newDate);
    }

    return <div>
        <Table>
            <tr>
                <td>
                    <input class="form-control" type="text" placeholder="Возраст" onChange={(e) => setAge(e.target.value)} />
                </td>
                <td>
                    <select class="form-control" onChange={(e) => setGender(e.target.value)}>
                        <option value=''>Пол</option>
                        <option value='м'>м</option>
                        <option value='ж'>ж</option>

                    </select>
                </td>
                <td>
                    <input class="form-control" type="text" placeholder="Стоимость" onChange={(e) => setCost(e.target.value)} />
                </td>
                <td>
                    <input class="form-control" type="text" placeholder="Адрес" onChange={(e) => setAddress(e.target.value)} />
                </td>
                <td>
                    <select class="form-control" onChange={(e) => setCategories(e.target.value)}>
                        <option value=''>Категории</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>
                </td>
                <td>
                    <input class="form-control" type="text" placeholder="Другое" onChange={(e) => setOther(e.target.value)} />
                </td>
            </tr>

        </Table>
        <p align="center">
            <button type="button" class="btn btn-warning" onClick={() => handleSearch()}>Подобрать</button>
        </p>
        <Table responsive stripped size='sm'>
            <thead>
                <tr>
                    <th>age</th>
                    <th>gender</th>
                    <th>cost</th>
                    <th>address</th>
                    <th>categories</th>
                    <th>other</th>

                </tr>
            </thead>
            <tbody>
                {
                    userData && userData.length > 0 ?
                        userData.map(item =>
                            <tr>
                                <td>{item.age}</td>
                                <td>{item.gender}</td>
                                <td>{item.cost}</td>
                                <td>{item.address}</td>
                                <td>{item.categories}</td>
                                <td>{item.other}</td>
                            </tr>

                        )
                        : 'Таких данных нет'
                }
            </tbody>
        </Table>
    </div>
}
export default Filter;