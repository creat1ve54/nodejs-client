import { postAPI } from "../api/axios"

const CREATE_POST = 'CREATE_POST'
const GET_POST = 'GET_POST'
const REMOVE_POST = 'REMOVE_POST'
const SAVE_POST = 'SAVE_POST'
const SET_LOADING = 'SET_LOADING'


const initialState = {
    posts: [],
    popularPosts: [],
    loading: false,
    // status: null,
}


const postReducer = (state = initialState, action) => {
    switch (action.type) {

        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.posts],
            }
        case GET_POST:
            return {
                ...state,
                posts: action.posts,
                popularPosts: action.popularPosts,
            }
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.posts.id),
            }
        case SAVE_POST:
            return {
                ...state,
                posts: [...state.posts, action.posts],
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
                // status: action.status,
            }
        default:
            return state
    }
}

export const setCreatePost = (params) => {
    return {
        type: CREATE_POST,
        posts: {
            title: params.title,
            text: params.text,
            file: params.file,
        }
    }
}
export const setSavePost = (data) => {
    return {
        type: SAVE_POST,
        posts: data,
    }
}

export const setLoading = (loading, status) => {
    return {
        type: SET_LOADING,
        loading: loading,
        // status: status,
    }
}
export const setGetPosts = (data) => {
    return {
        type: GET_POST,
        posts: data.posts,
        popularPosts: data.popularPosts,
    }
}

export const setRemovePost = (data) => {
    return {
        type: REMOVE_POST,
        posts: data.posts,
    }
}




export const createPost = (params) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let { data } = await postAPI.create(params)
        let status = data.message
        dispatch(setCreatePost(data))
        dispatch(setLoading(false, status))
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = () => async (dispatch) => {
    try {
        let { data } = await postAPI.getAll()
        dispatch(setGetPosts(data))
    } catch (error) {
        console.log(error)
    }
}

export const getPost = () => async (dispatch) => {
    try {
        let { data } = await postAPI.getPost()
        dispatch(setGetPosts(data))
    } catch (error) {
        console.log(error)
    }
}

export const removePost = (id) => async (dispatch) => {
    try {
        let { data } = await postAPI.remove(id)
        dispatch(setGetPosts(data))
    } catch (error) {
        console.log(error)
    }
}
export const updatePost = (updatedPost, id) => async (dispatch) => {
    try {
        let { data } = await postAPI.put(updatedPost, id)
        dispatch(setSavePost(data))
    } catch (error) {
        console.log(error)
    }
}


export default postReducer;