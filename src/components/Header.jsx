import React from 'react'
import { Link } from 'react-router-dom'
import './header.scss'

const Header = () => {
    return (
        <div className='header'>
            <div className='container'>
                <Link to={'/'} className='header__logo'>
                    <h1 className='header__title'>
                        <span className='header__desc'>информационно-аналитический портал</span>
                        <div>
                            <span className='header__modification'>интер</span>-информ
                        </div>
                    </h1>
                </Link>
            </div>
        </div>
    )
}

export default Header