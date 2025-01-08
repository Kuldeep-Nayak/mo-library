import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const Connection = async () => {
    try{
        mongoose.connect(process.env.URL)
        console.log("mongodb connected")
    } catch(err){
        console.log("Error: " +err)
    }
    
}

