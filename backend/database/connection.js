const mongoose =require('mongoose')
const dotenv=require('dotenv')
if (process.env.NODE_ENV !== "PRODUCTION") {
	require("dotenv").config({ path: "./configuration/config.env" });
  }


mongoose.connect(process.env.MONGODB_URL, 
	{
	 useNewUrlParser: true,
	 useUnifiedTopology: true,
	})
.then(()=>{
	console.log('Database connected successfully');
	})
.catch((e)=>{
	console.log("Something went wrong due to this error", e);
	})

