import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import moment from 'moment'
import 'moment/locale/ru'
import './mainPostsItemRight.scss'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



const MainPostsItemRight = ({ post }) => {
    const [expansion, setExpansion] = useState('')

    useEffect(() => {
        setExpansion(post?.fileUrl?.split('.').pop())

    }, [post?.fileUrl])

    let data = moment(post.createdAt).format('LL')
    let time = moment(post.createdAt).format('LT');

    if (!post) {
        return (
            <div className='MainPostsItemRight__text MainPostsItemRight__text--null'>
                Постов не существует.
            </div>
        )
    }
    return (
        <div className='MainPostsItemRight'>
            <div className='MainPostsItemRight__link'>
                {
                    post.fileUrl && <div className={post.fileUrl ? 'MainPostsItemRight__image--visible' : 'MainPostsItemRight__image--invisible'
                    }>
                        {expansion === 'jpg' || expansion === 'png' ? (
                            <div className='MainPostsItemRight__image'>
                                <img className='MainPostsItemRight__img' src={`https://nodejs-server-production.up.railway.app/${post?.fileUrl}`} alt='Img' />
                            </div>
                        ) :
                            <ReactPlayer url={`https://nodejs-server-production.up.railway.app/${post?.fileUrl}`} width="100%" height="300px" controls={true} />
                        }
                    </div>
                }
                <div className='MainPostsItemRight__container'>
                    <div className='MainPostsItemRight__info info'>
                        <div className='info__data'>{data}</div>
                        <div className='info__time'>{time}</div>
                    </div>
                    <div className='MainPostsItemRight__title'>{post.title}</div>
                    {/* <p className='MainPostsItemRight__text'>{post.text}</p> */}
                    <ReactMarkdown className='publication__edit' children={post.text} remarkPlugins={[remarkGfm]} />
                </div>
            </div>
        </div >
    )
}

export default MainPostsItemRight
