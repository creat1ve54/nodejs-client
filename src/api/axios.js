import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://62.113.100.165:5002/api',
})

export const postAPI = {
    create(params) {
        return instance.post('/posts', params)
    },
    getAll() {
        return instance.get('/posts')
    },
    remove(id) {
        return instance.delete(`/posts/${id}`, id)
    },
    put(updatedPost, id) {
        return instance.put(`/posts/${id}`, updatedPost)
    },
    getPost(id) {
        return instance.get(`/post/${id}`, id)
    }
}