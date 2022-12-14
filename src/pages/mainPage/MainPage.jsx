import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import './main.scss'
import { getAllPosts } from '../../redux/post-reducer'
import MainPostsItemLeft from '../../components/MainPostsItemLeft'
import MainPostsItemRight from '../../components/MainPostsItemRight'
import Page from '../../components/Page'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../components/Footer'


const MainPageContainer = (props) => {
    return (
        <MainPage getAllPosts={props.getAllPosts} posts={props.posts} popularPosts={props.popularPosts} />
    )
}

const MainPage = (props) => {
    const { posts, popularPosts, getAllPosts } = props

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalUserCount, setTotalUserCount] = useState(0);



    const lastIndex = page * limit
    const firstIndex = lastIndex - limit

    const pageCount = Math.ceil(totalUserCount / limit)
    const currentPage = posts.slice(firstIndex, lastIndex)


    const paginate = pageNumber => setPage(pageNumber)


    useEffect(() => {
        getAllPosts()
        setTotalUserCount(posts.length)
    }, [getAllPosts, posts.length])



    return (
        <div className='main'>
            <Header />
            <div className="main__container container">
                <div className="main__left">
                    <h2 className='main__caption'>Популярные посты</h2>
                    {
                        popularPosts?.map((post, idx) => <MainPostsItemLeft key={idx} post={post} />)
                    }
                </div>
                <div className="main__right">
                    {
                        currentPage?.map((post, idx) =>
                            <div className='main__link' key={idx}>
                                <MainPostsItemRight post={post} />
                            </div >

                        )
                    }
                    {pageCount !== 1 &&
                        <Page pageCount={pageCount} paginate={paginate} page={page} />
                    }
                </div>

            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.postPage.posts,
        popularPosts: state.postPage.popularPosts,
    }
}

export default connect(mapStateToProps, { getAllPosts })(MainPageContainer)