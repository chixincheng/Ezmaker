/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:3000/',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const getAllUserUnpublishedComics = (id) => api.get(`/getAllUserUnpublishedComics/${id}`)
export const getAllUserPublishedComics = (id) => api.get(`/getAllUserPublishedComics/${id}`)
export const getCommunityComics = () => api.get(`/communityComics`)
export const createComic = ( formData, payload) => api.post(`/createComic`, formData, {params: payload } );
export const createPublishedComic = (payload) => api.post(`/createPublishedComic`,null,{params: payload});
export const editComic = ( formData, payload) => api.put(`/editComic`, formData, {params: payload } );
export const getComic = ( id, payload ) => api.put(`/getComic/${id}`,null, {params: payload } );
export const getPublishedComicByID = (id) => api.get(`getPublishedComicByID/${id}`)
export const editComicCoverPage = ( formData, payload) => api.put(`/editComicCoverPage`, formData, {params: payload } );
export const deleteComic = (id) => api.delete(`/deleteComic/${id}`); 
export const deletePublishedComic = (id) => api.delete(`/deletePublishedComic/${id}`);

export const getAllUserUnpublishedStories = (id) => api.get(`/getAllUserUnpublishedStories/${id}`)
export const getAllUserPublishedStories = (id) => api.get(`/getAllUserPublishedStories/${id}`)
export const getCommunityStories = () => api.get(`/communityStories`)
export const createStory = ( formData, payload) => api.post(`/createStory`, formData, {params: payload } );
export const createPublishedStory = (payload) => api.post(`/createPublishedStory`,null,{params: payload});
export const editStory = ( formData, payload) => api.put(`/editStory`, formData, {params: payload } );
export const editStoryCoverPage = ( formData, payload) => api.put(`/editStoryCoverPage`, formData, {params: payload } );

// , null, {params: payload } 
export const getStory = ( id, payload) => api.put(`/getStory/${id}`, null, {params: payload});

export const getPublishedStoryByID = (id) => api.get(`getPublishedStoryByID/${id}`)
// export const editStoryCoverPage = ( formData, payload) => api.put(`/editStoryCoverPage`, formData, {params: payload } );
export const deleteStory = (id) => api.delete(`/deleteStory/${id}`); 
export const deletePublishedStory = (id) => api.delete(`/deletePublishedStory/${id}`);

export const searchUserName = (searchInput) => api.get(`/searchUserName/${searchInput}`)

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register`,null, {params: payload} )
export const loginUser = (payload) => api.post(`/login/`, null, {params: payload})
export const logoutUser = () => api.get(`/logout/`)
export const getUserById = (id) => api.get(`/user/${id}`)
export const updateUserById = (id, payload, formData ) =>{
    if( formData === null ){
        return api.put(`/user/${id}`, null , {params: payload})
    }
    else{
        return api.put(`/user/${id}`, formData, {params: payload, withCredentials: true, credentials: 'include', headers: {  "Content-type": "multipart/form-data" }});
    }
} 
export const resetPassword = ( payload) => api.put(`/resetPassword`, null, {params: payload})
const apis = {
    getAllUserUnpublishedComics,
    getAllUserPublishedComics,
    searchUserName,
    resetPassword,
    createComic,
    editComic,
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    getUserById,
    updateUserById,
    editComicCoverPage,
    editStoryCoverPage,
    getComic,
    deleteComic,
    createPublishedComic,
    getPublishedComicByID,
    getCommunityComics,
    deletePublishedComic,
    getAllUserUnpublishedStories, 
    getAllUserPublishedStories,
    getCommunityStories,
    createStory,
    createPublishedStory,
    editStory,
    getStory,
    getPublishedStoryByID,
    deleteStory,
    deletePublishedStory
}

export default apis