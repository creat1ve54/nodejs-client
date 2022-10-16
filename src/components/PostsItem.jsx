import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiFillEye } from "react-icons/ai";
import './postsItem.scss'
import ReactPlayer from 'react-player'
import moment from 'moment'
import 'moment/locale/ru'
import './postItem.scss'

const PostsItem = ({ post }) => {

    const [expansion, setExpansion] = useState('')

    useEffect(() => {
        setExpansion(post?.fileUrl?.split('.').pop())
    }, [post.fileUrl])
    let data = moment(post.createdAt).format('LL')
    let time = moment(post.createdAt).format('LT');

    if (!post) {
        return (
            <div className='postsItem__text--null'>
                Постов не существует.
            </div>
        )
    }

    return (
        <Link to={`/edit/${post.id}`}>
            <div className='postsItem'>
                {
                    post.fileUrl && <div className={
                        post.fileUrl ? 'postsItem__image--visible' : 'postsItem__image--invisible'
                    }>

                        {expansion === 'jpg' || expansion === 'png' ? (
                            <div className='postsItem__image'>
                                <img className='postsItem__img' src={`https://nodejs-server-production.up.railway.app/app/static/${post.fileUrl}`} alt='Img' />
                            </div>
                        ) :
                            <ReactPlayer url={`https://nodejs-server-production.up.railway.app/app/static/${post.fileUrl}`} width="100%" height="100%" controls={true} />
                        }
                    </div>
                }

                <div className='postsItem__info info'>
                    <div className='info__data'>{data}</div>
                    <div className='info__time'>{time}</div>
                </div>
                <div className='postsItem__title'>{post.title}</div>
                <p className='postsItem__text'>{post.text}</p>
                <div className='postsItem__btn'>
                    <button className='postsItem__btn--like'><AiFillEye /><span>{post.views}</span></button>
                </div>
            </div >
        </Link>
    )
}

export default PostsItem