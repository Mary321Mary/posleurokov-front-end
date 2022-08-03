import React from "react";
import Table from "react-bootstrap/Table"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from './Filter.css';


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
                    <select onChange={(e) => setGender(e.target.value)}>
                        <option value=''>Пол</option>
                        <option value='м'>м</option>
                        <option value='ж'>ж</option>
                    </select>
                    <img src="\images\3.png" height="25 px" alt="Стоимость"></img>
                </div>


                <div class="preview-box">
                    <select onChange={(e) => setAge(e.target.value)}>
                        <option value=''>Возраст</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                        <option value='13'>13</option>
                        <option value='14'>14</option>
                        <option value='15'>15</option>
                        <option value='16'>16</option>
                        <option value='17'>17</option>
                        <option value='18'>18</option>
                        <option value='19'>Старше 18</option>
                    </select>
                    <img src="\images\4.png" height="25 px" alt="Стоимость"></img>
                </div>



                <div class="preview-box">
                    <select onChange={(e) => setCost(e.target.value)}>
                        <option value=''>Стоимость</option>
                        <option value='0'>0</option>
                        <option value='30'>30</option>
                        <option value='50'>50</option>
                        <option value='80'>80</option>
                        <option value='100'>100</option>
                        <option value='200'>200</option>
                    </select>
                    <img src="\images\5.png" height="25 px" alt="Стоимость"></img>
                </div>



                <div class="preview-box">
                    <input type="text" placeholder="Адрес" onChange={(e) => setAddress(e.target.value)} />
                    <img src="\images\6.png" height="25 px" alt="Стоимость"></img>
                </div>


                <div class="preview-box">
                    <select class="p" onChange={(e) => setCategories(e.target.value)}>
                        <option value=''>Категории</option>
                        <option value='Искуство и дизайн'>Искуство и дизайн</option>
                        <option value='Педагогика'>Педагогика</option>
                        <option value='ДПИ и ремёсла'>ДПИ и ремёсла</option>
                        <option value='Музыка и звук'>Музыка и звук</option>
                        <option value='Технические виды спорта'>Технические виды спорта</option>
                        <option value='Техническое конструирование'>Техническое конструирование</option>
                        <option value='Пение'>Пение</option>
                        <option value='Единоборства'>Единоборства</option>
                        <option value='Словесность'>Словесность</option>
                        <option value='Хореография'>Хореография(танцы)</option>
                        <option value='Командно-игровой спорт'>Командно-игровой спорт</option>
                        <option value='Иностранные языки'>Иностранные языки</option>
                        <option value='Зрелищное искусство'>Зрелищное искусство</option>
                        <option value='Индивидуально-игровой спорт'>Индивидуально-игровой спорт</option>
                        <option value='Развитие интеллекта'>Развитие интеллекта</option>
                        <option value='Мода и стиль'>Мода и стиль</option>
                        <option value='Водные виды спорта'>Водные виды спорта</option>
                        <option value='ИТ'>ИТ</option>
                        <option value='Познавательные развлечения'>Познавательные развлечения</option>
                        <option value='Лёгкая атлетика и гимнастика'>Лёгкая атлетика и гимнастика</option>
                        <option value='Туризм'>Туризм</option>
                        <option value='Силовой спорт'>Силовой спорт</option>
                        <option value='Естественные науки'>Естественные науки</option>
                        <option value='Физкультура'>Физкультура</option>
                        <option value='Праздники и дни рождения'>Праздники и дни рождения</option>
                        <option value='Репетиторы'>Репетиторы</option>
                    </select>
                    <img src="\images\7.png" height="25 px" alt="Стоимость"></img>
                </div>


                <div class="preview-box">
                    <select onChange={(e) => setOther(e.target.value)}>
                        <option value=''>Другое</option>
                        <option value='Работает сент-май'>Работает сент-май</option>
                        <option value='Работает летом'>Работает летом</option>
                        <option value='Есть свободные места'>Есть свободные места</option>
                    </select>
                    <img src="\images\8.png" height="25 px" alt="Стоимость"></img>
                </div>

            </div >
            <p align="center">
                <button type="button" class="btn btn-warning" onClick={() => handleSearch()}><img src="\images\1.png" height="20 px" alt="Подобрать"></img>  Подобрать</button>
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
        </tbody>
    </div >
}
export default Filter;