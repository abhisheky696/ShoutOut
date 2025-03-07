import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
let atlas_url=process.env.ATLAS_URL;
const connectTODb = async (req,res) => {
    try {
        await mongoose.connect(atlas_url);
        console.log('connected to database successfully');
    } catch(err) {
        console.log('some error occured while connecting to db');
    } 
}
export default connectTODb;