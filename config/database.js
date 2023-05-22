//import modules and run npm i mongoose
import mongoose from "mongoose"



export default function connectToDatabase(){
//connect to the MongoDB Database
mongoose.connect('mongodb://127.0.0.1:27017/pokemonApp')

//code needed for a callback function 
const db = mongoose.connection
db.on("connected", function(){
    console.log("Connected to MongoDB Successfully!")
})

}