import React from "react";
import Table from "react-bootstrap/Table"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from '../Filter/Filter.css';
import Select from "components/shared/Select/Select";



function Filter() {
    const [userData, setUserData] = React.useState([]);
    const [userSearchData, setUserSearchData] = React.useState([]);

    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [categories, setCategories] = React.useState('');
    const [other, setOther] = React.useState('');

    React.useEffect(() => {
        const data = [
            { gender: "ж", age: "10", cost: "200", address: "qwertyu", categories: "Единоборства", other: "Работает сент-май" },
            { gender: "м", age: "12", cost: "20", address: "fvbn", categories: "Единоборства", other: "Работает сент-май" },
            { gender: "м", age: "9", cost: "55", address: "vcx", categories: "Музыка и звук", other: "Работает сент-май" },
            { gender: "ж", age: "11", cost: "125", address: "fdsa", categories: "Единоборства", other: "Работает летом" },
            { gender: "ж", age: "14", cost: "120", address: "lbnm", categories: "Единоборства", other: "Работает сент-май" },
            { gender: "м", age: "12", cost: "100", address: "oiuy", categories: "Единоборства", other: "Работает сент-май" },
        ];

        setUserData(data);
        setUserSearchData(data);

    }, [])

    const handleSearch = () => {
        debugger
        const newDate =
            userData
                .filter(a => a.age == (age == '' ? a.age : age))
                .filter(g => g.gender == (gender == '' ? g.gender : gender))
                .filter(c => c.cost == (cost == '' ? c.cost : cost))
                .filter(w => w.address == (address == '' ? w.address : address))
                .filter(e => e.categories == (categories == '' ? e.categories : categories))
                .filter(o => o.other == (other == '' ? o.other : other))
        setUserSearchData(newDate);
    }

    return <div>
        <tbody>
            <div class="wrap">

                <div class="preview-box">
                    <Select
                        onChange={(e) => setGender(e.target.value)}
                        options={[
                            { text: 'Пол', value: '' },
                            { text: 'м', value: 'м' },
                            { text: 'ж', value: 'ж' },
                        ]}
                    />
                    <img src="\images\Gender.png" height="25 px" alt="Пол"></img>
                </div>

                <div class="preview-box">
                    <Select
                        onChange={(e) => setAge(e.target.value)}
                        options={[
                            { text: 'Возраст', value: '' },
                            { text: '1', value: '1' },
                            { text: '2', value: '2' },
                            { text: '3', value: '3' },
                            { text: '4', value: '4' },
                            { text: '5', value: '5' },
                            { text: '6', value: '6' },
                            { text: '7', value: '7' },
                            { text: '8', value: '8' },
                            { text: '9', value: '9' },
                            { text: '10', value: '10' },
                            { text: '11', value: '11' },
                            { text: '12', value: '12' },
                            { text: '13', value: '13' },
                            { text: '14', value: '14' },
                            { text: '15', value: '15' },
                            { text: '16', value: '16' },
                            { text: '17', value: '17' },
                            { text: '18', value: '18' },
                            { text: '19', value: 'Старше 18' }
                        ]}
                    />
                    <img src="\images\Age.png" height="25 px" alt="Возраст"></img>
                </div>

                <div class="preview-box">
                    <Select onChange={(e) => setCost(e.target.value)}
                        options={[
                            { text: 'Стоимость', value: '' },
                            { text: '0', value: '0' },
                            { text: '30', value: '30' },
                            { text: '50', value: '50' },
                            { text: '80', value: '80' },
                            { text: '100', value: '100' },
                            { text: '200', value: '200' },
                        ]}
                    />
                    <img src="\images\Cost.png" height="25 px" alt="Стоимость"></img>
                </div>

                <div class="preview-box">
                    <input type="text" placeholder="Адрес" onChange={(e) => setAddress(e.target.value)} />
                    <img src="\images\Address.png" height="25 px" alt="Адрес"></img>
                </div>

                <div class="preview-box">
                    <Select
                        onChange={(e) => setCategories(e.target.value)}
                        options={[
                            { text: 'Категории', value: '' },
                            { text: 'Искуство и дизайн', value: 'Искуство и дизайн' },
                            { text: 'Педагогика', value: 'Педагогика' },
                            { text: 'ДПИ и ремёсла', value: 'ДПИ и ремёсла' },
                            { text: 'Музыка и звук', value: 'Музыка и звук' },
                            { text: 'Технические виды спорта', value: 'Технические виды спорта' },
                            { text: 'Техническое конструирование', value: 'Техническое конструирование' },
                            { text: 'Пение', value: 'Пение' },
                            { text: 'Единоборства', value: 'Единоборства' },
                            { text: 'Словесность', value: 'Словесность' },
                            { text: 'Хореография', value: 'Хореография(танцы)' },
                            { text: 'Командно-игровой спорт', value: 'Командно-игровой спорт' },
                            { text: 'Иностранные языки', value: 'Иностранные языки' },
                            { text: 'Зрелищное искусство', value: 'Зрелищное искусство' },
                            { text: 'Индивидуально-игровой спорт', value: 'Индивидуально-игровой спорт' },
                            { text: 'Развитие интеллекта', value: 'Развитие интеллекта' },
                            { text: 'Мода и стиль', value: 'Мода и стиль' },
                            { text: 'Водные виды спорта', value: 'Водные виды спорта' },
                            { text: 'ИТ', value: 'ИТ' },
                            { text: 'Познавательные развлечения', value: 'Познавательные развлечения' },
                            { text: 'Лёгкая атлетика и гимнастика', value: 'Лёгкая атлетика и гимнастика' },
                            { text: 'Туризм', value: 'Туризм' },
                            { text: 'Силовой спорт', value: 'Силовой спорт' },
                            { text: 'Естественные науки', value: 'Естественные науки' },
                            { text: 'Физкультура', value: 'Физкультура' },
                            { text: 'Праздники и дни рождения', value: 'Праздники и дни рождения' },
                            { text: 'Репетиторы', value: 'Репетиторы' }
                        ]}
                    />
                    <img src="\images\Categories.png" height="25 px" alt="Категории"></img>
                </div>

                <div class="preview-box">
                    <Select onChange={(e) => setOther(e.target.value)}
                        options={[
                            { text: 'Другое', value: '' },
                            { text: 'Работает сент-май', value: 'Работает сент-май' },
                            { text: 'Работает летом', value: 'Работает летом' },
                            { text: 'Есть свободные места', value: 'Есть свободные места' },
                        ]}
                    />
                    <img src="\images\Other.png" height="25 px" alt="Стоимость"></img>
                </div>

            </div >
            <p align="center">
                <button type="button" class="btn btn-warning" onClick={() => handleSearch()}><img src="\images\Select.png" height="20 px" alt="Подобрать"></img>  Подобрать</button>
            </p>
            <Table responsive stripped size='sm'>
                <thead>
                    <tr>
                        <th>gender</th>
                        <th>age</th>
                        <th>cost</th>
                        <th>address</th>
                        <th>categories</th>
                        <th>other</th>

                    </tr>
                </thead>

                {
                    userSearchData && userSearchData.length > 0 ?
                        userSearchData.map(item =>
                            <tr>
                                <td>{item.gender}</td>
                                <td>{item.age}</td>
                                <td>{item.cost}</td>
                                <td>{item.address}</td>
                                <td>{item.categories}</td>
                                <td>{item.other}</td>
                            </tr>
                        )
                        : 'Таких данных нет'
                }

            </Table >
        </tbody >
    </div >
}
export default Filter;