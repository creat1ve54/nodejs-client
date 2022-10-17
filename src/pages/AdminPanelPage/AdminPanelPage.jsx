import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import "easymde/dist/easymde.min.css";
import './admin.scss'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { createPost, getAllPosts } from '../../redux/post-reducer'
import PostsItem from '../../components/PostsItem'


import SimpleMDE from "react-simplemde-editor";
import Page from '../../components/Page';



const AdminPanelPageContainer = (props) => {
  return (
    <>
      <AdminPanelPage createPost={props.createPost} getAllPosts={props.getAllPosts} posts={props.posts} popularPosts={props.popularPosts} />
    </>
  )
}


const AdminPanelPage = (props) => {
  const { getAllPosts, posts } = props
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [file, setFile] = useState('')
  const [link, setLink] = useState('')
  const [expansion, setExpansion] = useState('')
  const inputFileRef = useRef(null)



  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUserCount, setTotalUserCount] = useState(0);



  const lastIndex = page * limit
  const firstIndex = lastIndex - limit

  const pageCount = Math.ceil(totalUserCount / limit)
  const currentPage = posts?.slice(firstIndex, lastIndex)


  const paginate = pageNumber => setPage(pageNumber)

  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('file', file)
      data.append('expansion', expansion)
      props.createPost(data)
      // setTimeout(function () {
      //   window.location.reload();
      // }, 1000)
    } catch (error) {
      console.log(error)
    }
  }


  const clearFormHandler = () => {
    setText('')
    setTitle('')
    setFile('')
  }




  const handleFileUpload = (event) => {
    if (event.target.files[0] !== undefined) {
      setFile(event.target.files[0]);
      setLink(URL.createObjectURL(event.target.files[0]))
      setExpansion(event.target.files[0].name.split('.').pop())
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
    getAllPosts()
    setTotalUserCount(posts?.length)
  }, [getAllPosts, posts?.length])


  return (
    <div className='admin'>
      <h1 className='admin__title'>Панель добавления постов</h1>
      <div className='container admin__container'>
        <div className='admin__left'>
          <h2 className='admin__caption'>Добавить пост</h2>
          <form className='admin__post post' onSubmit={e => e.preventDefault()}>
            <label className='post__label'>
              <button onClick={() => inputFileRef.current.click()} className='post__btn post__btn--input'>Добавить превью</button>
              <input hidden ref={inputFileRef} type='file' multiple className='post__input post__input--file' onChange={handleFileUpload} />
            </label>
            {expansion === 'jpg' || expansion === 'png' ? (
              <div className='post__image'>
                <img className='post__img' src={link} alt='Img' />
              </div>
            ) :
              <ReactPlayer url={link} width="100%" height="100%" controls={true} />
            }
            <label className='post__title'>
              Заголовок поста:
              <div className='post__input post__input--text'>
                <input type='text' placeholder='Заголовок' value={title} onChange={e => setTitle(e.target.value)} />
              </div>
            </label>
            <label className='post__title'>
              Текст поста:
              <div className='post__input post__input--text'>
                <SimpleMDE value={text} onChange={onChange} className='post__editor' options={options} />
                {/* <textarea placeholder='Текст поста' onChange={e => setText(e.target.value)} value={text}></textarea> */}
              </div>
            </label>
            <div className='post__button'>
              <button onClick={submitHandler} className='post__btn post__btn--add'>Добавить</button>
              <button onClick={clearFormHandler} className='post__btn post__btn--cancel'>Отменить</button>
            </div>
          </form >
        </div>
        <div className='admin__right'>
          <h2 className='admin__caption'>Список постов</h2>
          <div className='admin__posts'>
            {
              currentPage?.map((post, idx) => <PostsItem key={idx} post={post} />)
            }
            {pageCount !== 1 &&
              <Page pageCount={pageCount} paginate={paginate} page={page} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    posts: state.postPage.posts,
    editorState: state.postPage.editorState,
    popularPosts: state.postPage.popularPosts,
  }
}


export default connect(mapStateToProps, { createPost, getAllPosts })(AdminPanelPageContainer)