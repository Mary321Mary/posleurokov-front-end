import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './ViberBlock.module.scss';
import { Sheet } from 'components';
import logo from '../../assets/img/ViberBlockName.png';
import { axiosAPI } from 'plugins/axios';

const ViberBlock = ({ heigth, width, ...rest }) => {
	const [links, setLinks] = useState([])
	const [link, setLink] = useState('')

	const city = useSelector((state) => state.city);

	const changeLink = () => {
		if (links.length > 0) {
			if (city === "online" || city === "all") {
				return links.find(element => element.name === "Гомель").value
			}
			else {
				try {
					return links.find(element => element.name === city).value
				}
				catch {
					return links.find(element => element.name === "Гомель").value
				}
			}
		}
		else {
			return ''
		}
	}

	useEffect(() => {
		let getLinks = async () => {
			let result = await axiosAPI.getViberLinks()
			result.map((elem) => {
				setLinks(prevState => [...prevState, { 'name': elem.city, 'value': elem.link }])
			})
		}

		getLinks()
	}, [])

	useEffect(() => {
		setLink(changeLink())
	}, [city, links])

	return (
		<Sheet
			top='20px'
			position='relative'
			width={width}
			height={heigth}
			padding='25px 20px'
			overflow='hidden'
		>
			<img src={logo} className={styles.logo} />
			<div className={styles.info}>Все родители, тренеры и руководители кружков общаются здесь.</div>
			<a href={link} target={'_blank'}>
				<button className={styles.subscribe}>Группа в Viber</button>
			</a>
		</Sheet>
	);
};

export { ViberBlock };