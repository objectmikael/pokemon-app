import express from "express"
import {pokemonAPI, generatePokemon, pokemonListHomepage, addToFavorites, createNewPokemon, searchPokemon, 
        favoritePokemon, addNewPokemon, showPokemonDetails, updatePokemon, updateHomepage, deletePokemon} from "../controllers/pokemonFunctions.js"

const router = express.Router()


//mount routes
router.get("/pokemonAPI", pokemonAPI)

router.get("/generatePokemon", generatePokemon)

router.post("/searchPokemon", searchPokemon)

router.get("/pokemonListHomepage", pokemonListHomepage)

router.get("/createNewPokemon", createNewPokemon)

router.get("/favoritePokemon", favoritePokemon)

router.post("/addToFavorites/:name", addToFavorites)

router.post("/newPokemon", addNewPokemon)

router.get("/pokemon/:pokemonId", showPokemonDetails)

router.get("/updatePokemon/:pokemonId", updatePokemon)

router.post("/updateHomepage/:pokemonId", updateHomepage)

router.delete("/deletePokemon/:pokemonId", deletePokemon)


export {router}