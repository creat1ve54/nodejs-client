import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { instance } from '../api/axios'
import Header from './Header'
import ReactPlayer from 'react-player'
import moment from 'moment'
import 'moment/locale/ru'
import './postItem.scss'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const PostItem = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [file, setFile] = useState('')
    const [data, setData] = useState('')
    const [expansion, setExpansion] = useState('')


    let day = moment(data).format('LL')
    let time = moment(data).format('LT');

    const params = useParams();

    const fetchPost = useCallback(async () => {
        const { data } = await instance.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setFile(data.fileUrl)
        setData(data.createdAt)
        setExpansion(data.fileUrl.split('.').pop())
    }, [params.id])


    useEffect(() => {
        fetchPost()
    }, [fetchPost])



    return (
        <div className='publication'>
            <Header />
            <div className='container publication__container'>
                {file &&
                    <div className='publication__file'>
                        {expansion === 'jpg' || expansion === 'png' ? (
                            <div className='postItem__image'>
                                <img className='postItem__img' src={`http://62.113.100.165:5002/${file}`} alt='Img' />
                            </div>
                        ) :
                            <ReactPlayer url={`http://62.113.100.165:5002/${file}`} width="100%" height="100%" controls={true} />
                        }
                    </div>
                }
                <div className='publication__title'>
                    {title}
                </div>
                <ReactMarkdown className='publication__edit' children={text} remarkPlugins={[remarkGfm]} />
                <div className='publication__info info'>
                    <div className='info__data'>
                        {day}
                    </div>
                    <div className='info__time'>
                        {time}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem