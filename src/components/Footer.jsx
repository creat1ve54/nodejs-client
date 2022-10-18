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
                    <li className='footer__item'>
                        <a href="mailto: sergei.luzinov@mail.ru" className="footer__link">sergei.luzinov@mail.ru</a>
                    </li>
                    <li className='footer__item'>
                        <a href="tel: +79183480675" className="footer__link">+7(918)348-06-75</a>
                    </li>
                    <li className='footer__item'>
                        <a href="tel: +79628650219" className="footer__link">+7(962)865-02-19</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer