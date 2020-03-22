import axios from 'axios'
import * as constants from './constants'
import {  fromJS } from 'immutable'

const changeHomeData = (result) =>({
    type: constants.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList
})


const addHomeList = (list,nextPage) =>({
    type: constants.ADD_ARTICLE_LIST,
    list: fromJS(list),
    nextPage
})


export const toggleTopShow = (show) =>({
    type: constants.TOGGLE_SCROLL_TOP,
    show
})

export const getHomeInfo = () =>{
    return (dispath) =>{
        axios.get('api/home.json').then((res) => {            
            const result = res.data.data 
            const action  =  changeHomeData(result)
            dispath(action)
        })
    }
}

export const getMoreList = (page)=> {
    return (dispath)=>{
        axios.get('api/homeList.json?page='+page).then((res) => {  
            
            const result = res.data.data             
            
            dispath(   addHomeList(result, page+1)  )
        })
    }
}

