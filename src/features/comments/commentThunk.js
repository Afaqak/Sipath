import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/index"

export const createComment=createAsyncThunk("comments/createComment",async ({videoId,comment,onSuccess},)=>{
    const token=JSON.parse(localStorage.getItem('token'))
    console.log(comment,"com")
    try{
        const response=await axios.post(`/assets/video/${videoId}/comments`,{comment},{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }   
        })

        if(onSuccess && typeof onSuccess==="function"){
            onSuccess()
        }
        
        console.log(response.data,"data")
        
        return response.data
    }catch(error){
        throw new Error
    }
})

export const fetchPrimaryComments=createAsyncThunk("comments/fetchPrimaryComments",async ({videoId,data,limit=30},{dispatch})=>{
    const token=JSON.parse(localStorage.getItem('token'))
    try{
        const response=await axios.get(`/assets/video/${videoId}/comments?limit=${limit}&order=asc`,{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }   
        })
        return response.data?.comments
    }catch(error){
        throw new Error
    }
})


export const fetchCommentReplies=createAsyncThunk("comments/fetchCommentReplies",async ({videoId,commentId,onSuccess,limit=10},)=>{
    const token=JSON.parse(localStorage.getItem('token'))
    try{
        const response=await axios.get(`/assets/video/${videoId}/comments/${commentId}?limit=3`,{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }   
        })
        if(onSuccess && typeof onSuccess==='function'){
            onSuccess()
            console.log("here")
        }
        
        return {commentId,replies:response.data?.comments}
    }catch(error){
        throw new Error
    }
})


export const createReplyToComment=createAsyncThunk("comments/createReplyToComments",async ({videoId,commentId,comments,limit=10},)=>{
    console.log(comments,"Data")
    console.log("hit")
    const token=JSON.parse(localStorage.getItem('token'))
    try{
        const response=await axios.post(`assets/video/${videoId}/comments/${commentId}`,{comment:comments},{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }   
        })
        console.log(response.data)
        return response.data.comment
    }catch(error){
        throw new Error
    }
})