   
import { createContext, useContext, useEffect, useState } from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import api from '../api'
import AuthContext from '../auth'
import Chat from '../Components/Chat'

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    CHANGE_ITEM_NAME: "CHANGE_ITEM_NAME",
    VIEW_HOME_LIST: "VIEW_HOME_LIST",
    VIEW_ALL_LIST: "VIEW_ALL_LIST",
    VIEW_USER_LIST: "VIEW_USER_LIST",
    VIEW_COMMUNITY_LIST: "VIEW_COMMUNITY_LIST",
    SORT_BY_NEWEST: "SORT_BY_NEWEST",
    SORT_BY_OLDEST: "SORT_BY_OLDEST",
    SORT_BY_LIKE: "SORT_BY_LIKE",
    SORT_BY_DISLIKE: "SORT_BY_DISLIKE",
    SORT_BY_VIEW: "SORT_BY_VIEW"
}


function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        idNamePairs: [],
        listMarkedForDeletion: null,
        viewhomelist: false,
        viewuserlist: false,
        viewalllist: false,
        viewcommunitylist: false,
        sortbynewest: false,
        sortbyoldest: false,
        sortbylike: false,
        sortbydislike: false,
        sortbyview: false
    });
    const history = useNavigate();
    const [searchKeyWord, setSearchKeyword] = useState("");
    const [searchOption, setSearchOption] = useState("user");
    const [chatContainer, setChatContainer] = useState(null);
    const [showChatFunct, setShowChatFunct] = useState(null);
    const location = useLocation();
    
    const [searchResult, setSearchResult] = useState([]);

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    listMarkedForDeletion: null,
                    viewhomelist: store.viewhomelist,
                    viewuserlist: store.viewuserlist,
                    viewalllist: store.viewalllist,
                    viewcommunitylist: store.viewcommunitylist,
                    sortbynewest: store.sortbynewest,
                    sortbyoldest: store.sortbyoldest,
                    sortbylike: store.sortbylike,
                    sortbydislike: store.sortbydislike,
                    sortbyview: store.sortbyview
                });
            }
            default:
                return store;
        }
    }
    store.loadIdNamePairs = async function () {
        const response = await api.getAllUserUnpublishedComics();
        if (response.data.success) {
            let Array = response.data.idNamePairs;
            const response2 = await api.getAllUserPublishedComics();
            if(response2.data.success){
                let Array2 = response2.data.idNamePairs;
                let pairsArray = Array.concat(Array2);
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE PULISHED COMIC PAIR");
            }
        }
        else {
            console.log("API FAILED TO GET THE UNPUBLISHED COMIC PAIR");
        }
    }
    store.setSearchKey = function (key) {

        setSearchKeyword(key);
    }

    useEffect( ()=>{
        if(searchOption === "user" && searchKeyWord.length >0 ){//search user
            async function searchUser(){
                const response = await api.searchUserName(searchKeyWord);
                if(response.data.success){
                    setSearchResult(response.data.user); 
                }
            }
            searchUser();
        }
        else if (searchKeyWord.length >0){//search comic/story
            if(location.pathname.includes("comic")){//search comic
                async function searchComic(){
                    const response = await api.searchPublishedComicByInput(searchKeyWord);
                    if(response.data.success){
                        console.log(response.data.comic);
                        setSearchResult(response.data.comic); 
                    }
                }
                searchComic();
            }
            else{//search story
                async function searchStory(){
                    const response = await api.searchPublishedStoryByInput(searchKeyWord);
                    if(response.data.success){
                        setSearchResult(response.data.story); 
                    }
                }
                searchStory();
            }
        }
    },[searchKeyWord])

    store.refChatContainer = (container) =>{
        setChatContainer(container);
    }

    async function createChat(){
        if( auth.user !== null && chatContainer !== null ){
            
            Chat( auth.user , auth.user ,chatContainer);
        }
    }

    useEffect(  ()=>{
        createChat();
        
     },[auth.user,chatContainer]);



    store.bindShowChatFunct = (showChatFunct)=>{
        setShowChatFunct( () => showChatFunct);
    }

    store.resetSearchResult = function(){
        setSearchResult([]);
    }

    store.setSearchOption = function(option) {
        setSearchOption(option);
    }


    //store.searchkey = searchKeyWord;
    //store.setSearchOption = searchOption;

    return (
        <GlobalStoreContext.Provider value={{
            store,searchResult:searchResult,option:searchOption,
            chatContainer: chatContainer,
        showChatFunct: showChatFunct,
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
























// store.loadIdNamePairs = async function () {
//     const response = await api.getTop5ListPairs();
//     if (response.data.success) {
//         let allpairsArray = response.data.idNamePairs;
//         let pairsArray = allpairsArray.filter(filterByownerEmail);
//         storeReducer({
//             type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
//             payload: pairsArray
//         });
//     }
//     else {
//         console.log("API FAILED TO GET THE LIST PAIRS");
//     }
// }