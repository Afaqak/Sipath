import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/index"

export const createComment=createAsyncThunk("comments/createComment",async ({videoId,comment},)=>{
    const token=JSON.parse(localStorage.getItem('token'))
    try{
        const response=await axios.post(`/assets/video/${videoId}/comments`,{comment},{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }   
        })
        return response.data
    }catch(error){
        throw new Error
    }
})

export const fetchPrimaryComments=createAsyncThunk("comments/fetchPrimaryComments",async ({videoId,data,limit=10},)=>{
    const token=JSON.parse(localStorage.getItem('token'))
    try{
        const response=await axios.get(`/assets/video/${videoId}/comments?limit=${limit}`,{
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


export const fetchCommentReplies=createAsyncThunk("comments/fetchCommentReplies",async ({videoId,commentId,data,limit=10},)=>{
    const token=JSON.parse(localStorage.getItem('token'))
    try{
        const response=await axios.get(`/assets/video/${videoId}/comments/${commentId}?limit=3`,data,{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }   
        })

        return response.data
    }catch(error){
        throw new Error
    }
})


export const createReplyToComment=createAsyncThunk("comments/fetchCommentReplies",async ({videoId,commentId,data,limit=10},)=>{
    const token=JSON.parse(localStorage.getItem('token'))
    try{
        const response=await axios.post(`assets/video/${videoId}/comments/${commentId}`,data,{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }   
        })

        return response.data
    }catch(error){
        throw new Error
    }
})