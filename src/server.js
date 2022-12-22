import http from 'http'
import app from './app'
import mongoose from 'mongoose'
require("dotenv").config();

mongoose.connect(`mongodb://localhost:${process.env.LOCALHOST_PORT}/${process.env.DB_NAME}`);
mongoose.connection
  .once("open", () => {
    console.log("DB connected");
  })
  .on("error", (error)=> {
    console.log("error is:", error);
  });


const PORT = 3000
const server = http.createServer(app)
server.listen(process.env.PORT || PORT, ()=>{
    console.log(`server listening port of ${PORT}`);
})