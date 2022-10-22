import React from 'react'
import './footer.scss'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <h2 className='footer__title'>Контакты для связи:</h2>
                <ul className='footer__list'>
                    <li className='footer__item'>
                        <a href="mailto: informadm01@mail.ru" className="footer__link">informadm01@mail.ru</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer