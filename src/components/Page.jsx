import React from 'react'
import { NavLink } from 'react-router-dom'
import './page.scss'


const Page = ({ pageCount, paginate, page }) => {
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }


    return (
        <div className="page">
            {
                pages.map(number =>
                    <NavLink onClick={() => paginate(number)} className={page === number ? 'page__link page__link--active' : 'page__link'} key={number}>{number}</NavLink>
                )
            }
        </div>
    )
}


export default (Page)