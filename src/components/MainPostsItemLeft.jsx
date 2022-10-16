import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import moment from 'moment'
import 'moment/locale/ru'
import './mainPostsItemLeft.scss'

const MainPostsItemLeft = ({ post }) => {
    const [expansion, setExpansion] = useState('')

    useEffect(() => {
        setExpansion(post?.fileUrl?.split('.').pop())
    }, [post.fileUrl])
    let data = moment(post.createdAt).format('LL')
    let time = moment(post.createdAt).format('LT');


    if (!post) {
        return (
            <div className='MainPostsItemLeft__text MainPostsItemLeft__text--null'>
                Постов не существует.
            </div>
        )
    }
    return (
        <div className='MainPostsItemLeft'>
            <Link to={`/post/${post.id}`} className='MainPostsItemLeft__link'>
                { post.fileUrl && <div className={post.fileUrl ? 'MainPostsItemLeft__image--visible' : 'MainPostsItemLeft__image--invisible'
                }>
                    {expansion === 'jpg' || expansion === 'png' ? (
                        <div className='MainPostsItemLeft__image'>
                            <img className='MainPostsItemLeft__img' src={`http://localhost:5000/${post.fileUrl}`} alt='Img' />
                        </div>
                    ) :
                        <ReactPlayer url={`http://localhost:5000/${post.fileUrl}`} width="100%" height="100%" controls={true} />
                    }
                </div>
                }
                <div className='MainPostsItemLeft__container'>
                    <div className='MainPostsItemLeft__info info'>
                        <div className='info__data'>{data}</div>
                        <div className='info__time'>{time}</div>
                    </div>
                    <div className='MainPostsItemLeft__title'>{post.title}</div>
                </div>
            </Link>
        </div >
    )
}

export default MainPostsItemLeft
