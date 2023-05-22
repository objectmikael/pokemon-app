import mongoose from "mongoose";

const PokemonModel = mongoose.Schema({
    name: String,
    ability: String,
    level: Number,
    image: String,
    isFavorite: String
})

const Pokemon = mongoose.model("Pokemon", PokemonModel)

export {Pokemon}