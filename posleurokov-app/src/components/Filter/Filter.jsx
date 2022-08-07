import React, { useState, useEffect } from 'react';
import { stringify } from 'qs';
import styles from './Filter.module.scss';
import { Select, Button } from 'components';
import search from 'assets/icons/search.svg';

function Filter() {
  const [userData, setUserData] = useState([]);
  const [userSearchData, setUserSearchData] = useState([]);

  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [cost, setCost] = useState([]);
  const [address, setAddress] = useState('');
  const [categories, setCategories] = useState([]);
  const [other, setOther] = useState([]);

  useEffect(() => {
    const data = [
      {
        gender: 'ж',
        age: '10',
        cost: '200',
        address: 'qwertyu',
        categories: 'Единоборства',
        other: 'Работает сент-май',
      },
      {
        gender: 'м',
        age: '12',
        cost: '20',
        address: 'fvbn',
        categories: 'Единоборства',
        other: 'Работает сент-май',
      },
      {
        gender: 'м',
        age: '9',
        cost: '55',
        address: 'vcx',
        categories: 'Музыка и звук',
        other: 'Работает сент-май',
      },
      {
        gender: 'ж',
        age: '11',
        cost: '125',
        address: 'fdsa',
        categories: 'Единоборства',
        other: 'Работает летом',
      },
      {
        gender: 'ж',
        age: '14',
        cost: '120',
        address: 'lbnm',
        categories: 'Единоборства',
        other: 'Работает сент-май',
      },
      {
        gender: 'м',
        age: '12',
        cost: '100',
        address: 'oiuy',
        categories: 'Единоборства',
        other: 'Работает сент-май',
      },
    ];

    setUserData(data);
    setUserSearchData(data);
  }, []);

  const handleSearch = () => {
    console.log(
      'params',
      stringify({
        gender,
        age,
        cost,
        address,
        categories,
        other,
      })
    );
  };

  return (
    <section className={styles['filter-wrapper']}>
      <section className={styles.filter}>
        <Select
          placeholder="Пол"
          value={gender}
          options={[
            { text: 'м', value: 'м' },
            { text: 'ж', value: 'ж' },
          ]}
          checkbox
          prepend={<img src="\images\Gender.png" height="25px" alt="Пол" />}
          onChange={(value) => setGender(value)}
        />

        <Select
          placeholder="Возраст"
          value={age}
          options={[
            { text: '1 год', value: '1' },
            { text: '2 года', value: '2' },
            { text: '3 года', value: '3' },
            { text: '4 года', value: '4' },
            { text: '5 лет', value: '5' },
            { text: '6 лет', value: '6' },
            { text: '7 лет', value: '7' },
            { text: '8 лет', value: '8' },
            { text: '9 лет', value: '9' },
            { text: '10 лет', value: '10' },
            { text: '11 лет', value: '11' },
            { text: '12 лет', value: '12' },
            { text: '13 лет', value: '13' },
            { text: '14 лет', value: '14' },
            { text: '15 лет', value: '15' },
            { text: '16 лет', value: '16' },
            { text: '17 лет', value: '17' },
            { text: '18 лет', value: '18' },
            { text: 'Старше 18', value: 'Старше 18' },
          ]}
          checkbox
          prepend={<img src="\images\Age.png" height="25px" alt="Возраст" />}
          onChange={(value) => setAge(value)}
        />

        <Select
          placeholder="Стоимость"
          value={cost}
          options={[
            { text: '0 руб', value: '0' },
            { text: '30 руб', value: '30' },
            { text: '50 руб', value: '50' },
            { text: '80 руб', value: '80' },
            { text: '100 руб', value: '100' },
            { text: '200 руб', value: '200' },
          ]}
          checkbox
          prepend={<img src="\images\Cost.png" height="25px" alt="Стоимость" />}
          onChange={(value) => setCost(value)}
        />

        {/* <div className="">
          <input
            type="text"
            placeholder="Адрес"
            onChange={(e) => setAddress(e.target.value)}
          />
          <img src="\images\Address.png" height="25px" alt="Адрес"></img>
        </div> */}

        <Select
          placeholder="Категории"
          value={categories}
          options={[
            { text: 'Искуство и дизайн', value: 'Искуство и дизайн' },
            { text: 'Педагогика', value: 'Педагогика' },
            { text: 'ДПИ и ремёсла', value: 'ДПИ и ремёсла' },
            { text: 'Музыка и звук', value: 'Музыка и звук' },
            {
              text: 'Технические виды спорта',
              value: 'Технические виды спорта',
            },
            {
              text: 'Техническое конструирование',
              value: 'Техническое конструирование',
            },
            { text: 'Пение', value: 'Пение' },
            { text: 'Единоборства', value: 'Единоборства' },
            { text: 'Словесность', value: 'Словесность' },
            { text: 'Хореография', value: 'Хореография(танцы)' },
            {
              text: 'Командно-игровой спорт',
              value: 'Командно-игровой спорт',
            },
            { text: 'Иностранные языки', value: 'Иностранные языки' },
            { text: 'Зрелищное искусство', value: 'Зрелищное искусство' },
            {
              text: 'Индивидуально-игровой спорт',
              value: 'Индивидуально-игровой спорт',
            },
            { text: 'Развитие интеллекта', value: 'Развитие интеллекта' },
            { text: 'Мода и стиль', value: 'Мода и стиль' },
            { text: 'Водные виды спорта', value: 'Водные виды спорта' },
            { text: 'ИТ', value: 'ИТ' },
            {
              text: 'Познавательные развлечения',
              value: 'Познавательные развлечения',
            },
            {
              text: 'Лёгкая атлетика и гимнастика',
              value: 'Лёгкая атлетика и гимнастика',
            },
            { text: 'Туризм', value: 'Туризм' },
            { text: 'Силовой спорт', value: 'Силовой спорт' },
            { text: 'Естественные науки', value: 'Естественные науки' },
            { text: 'Физкультура', value: 'Физкультура' },
            {
              text: 'Праздники и дни рождения',
              value: 'Праздники и дни рождения',
            },
            { text: 'Репетиторы', value: 'Репетиторы' },
          ]}
          checkbox
          prepend={
            <img src="\images\Categories.png" height="25px" alt="Категории" />
          }
          onChange={(value) => setCategories(value)}
        />

        <Select
          placeholder="Другое"
          value={other}
          options={[
            { text: 'Работает сент-май', value: 'Работает сент-май' },
            { text: 'Работает летом', value: 'Работает летом' },
            { text: 'Есть свободные места', value: 'Есть свободные места' },
          ]}
          checkbox
          prepend={
            <img src="\images\Other.png" height="25px" alt="Стоимость" />
          }
          onChange={(value) => setOther(value)}
        />
      </section>
      <section className={styles['btn-section']}>
        <Button
          width="239px"
          margin="0 auto"
          background="linear-gradient(90deg, #FBA405 -5.91%, #FDC21E 115.61%)"
          onClick={handleSearch}
        >
          <img
            style={{ marginRight: '8px' }}
            src={search}
            height="20px"
            alt="Подобрать"
          />
          Подобрать
        </Button>
      </section>
    </section>
  );
}
export { Filter };
