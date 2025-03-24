import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectTODb from "./initDB/index.js"
import userRouter from "./routes/userRoute.js"
import tweetRouter from "./routes/tweetRoute.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
const app = express();
const port = process.env.PORT
// import path from "path"
connectTODb();

// const _dirname=path.resolve();
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:5173",  
      credentials: true, 
      methods: "GET,POST,PUT,DELETE,PATCH",
      allowedHeaders: "Content-Type,Authorization",
    })
  );

  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);
app.use("/", tweetRouter);

// app.use(express.static(path.join(_dirname,"/client/dist")))
// app.get('*',(req,res) => {
//   res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
// })
app.listen(port, (req, res) => {
    console.log(`server is listening at port ${port}`);
});