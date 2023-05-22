//import module
import express from "express" 
import {fileURLToPath} from "url"
import path from "path" 
import {router as pokemonRouter} from "./routes/pokemonRoutes.js"
import methodOverride from "method-override"
import connectToDatabase from "./config/database.js"

//create express app
const app = express()
connectToDatabase()

//configure the app (app.set)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

//mount middleware (app.use)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, 'public')))

//define root path for the app
app.use("/", pokemonRouter)

//tell the app to listen on port 3005
app.listen(3005, function(){
    console.log("Pokemon App listening on 3005")
})