import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { instance } from '../../api/axios'
import { updatePost } from '../../redux/post-reducer'
import './editPage.scss'
import ReactPlayer from 'react-player'
import { removePost } from '../../redux/post-reducer';

import SimpleMDE from "react-simplemde-editor";

const EditPostContainer = (props) => {
    return (
        <>
            <EditPostPage updatePost={props.updatePost} removePost={props.removePost} />
        </>
    )
}


const EditPostPage = (props) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [oldFile, setOldFile] = useState('')
    const [link, setLink] = useState('')
    const [newFile, setNewFile] = useState('')
    const [expansion, setExpansion] = useState('')

    const inputFileRef = useRef(null)




    const params = useParams();

    const id = params.id

    const navigate = useNavigate()

    const fetchPost = useCallback(async () => {
        const { data } = await instance.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setOldFile(data.fileUrl)
        setExpansion(data.fileUrl.split('.').pop())
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', params.id)
            updatedPost.append('file', newFile)
            updatedPost.append('expansion', expansion)
            props.updatePost(updatedPost, params.id)
            setTimeout(function () {
                navigate('/adminpanel')
            }, 500)
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = () => {
        try {
            props.removePost(id)
            navigate('/adminpanel')
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileUpload = (event) => {
        if (event.target.files[0] !== undefined) {
            setNewFile(event.target.files[0]);
            setExpansion(event.target.files[0].name.split('.').pop())
            setLink(URL.createObjectURL(event.target.files[0]))
            setOldFile('')
        }
    };


    const onChange = useCallback((text) => {
        setText(text);
    }, []);

    const options = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
            maxHeight: '400px',
            placeholder: 'Введите текст',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            }
        }
    }, []);

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    return (
        <div className='edit'>
            <div className='container'>
                <form className='edit__form' onSubmit={e => e.preventDefault()}>
                    <label className='edit__label'>
                        <button onClick={() => inputFileRef.current.click()} className='edit__btn edit__btn--input'>Добавить превью</button>
                        <input hidden ref={inputFileRef} type='file' multiple className='edit__input edit__input--file' onChange={handleFileUpload} />
                    </label>
                    {oldFile &&
                        <div>
                            {(expansion === 'jpg' || expansion === 'png') ? (
                                <div className='post__image'>
                                    <img className='post__img' src={`https://nodejs-server-production.up.railway.app/${oldFile}`} alt='Img' />
                                </div>
                            ) :
                                <ReactPlayer url={`https://nodejs-server-production.up.railway.app/${oldFile}`} width="100%" height="100%" controls={true} />
                            }
                        </div>
                    }
                    {newFile && (expansion === 'jpg' || expansion === 'png') ? (
                        <div className='post__image'>
                            <img className='post__img' src={link} alt='Img' />
                        </div>
                    ) :
                        <ReactPlayer url={link} width="100%" height="100%" style={{ marginTop: '10px', marginBottom: '10px' }} controls={true} />
                    }
                    <label className='edit__title'>
                        Заголовок поста:
                        <div className='edit__input--text'>
                            <input type='text' placeholder='Заголовок' value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                    </label>
                    <label className='edit__title'>
                        Текст поста:
                        <div className='edit__input--text'>
                            <SimpleMDE value={text} onChange={onChange} className='post__editor' options={options} />
                        </div>
                    </label>
                    <div className='edit__button'>
                        <button onClick={submitHandler} className='edit__btn edit__btn--add'>Обновить</button>
                        <button type='button' onClick={deletePost} className='edit__btn edit__btn--cancel'>Удалить</button>
                    </div>
                </form >
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => {
//   return {

//   }
// }

export default connect(null, { updatePost, removePost })(EditPostContainer)