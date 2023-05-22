import { response } from "express"
import {Pokemon} from "../models/PokemonData.js"
import axios from "axios"

function pokemonAPI(request, response){
    axios.get("https://pokeapi.co/api/v2/pokemon")
    .then(infoFromAPI => infoFromAPI.data)
    .then(apiData => response.send(apiData))
}

function generatePokemon(request, response){
    let rndIdx = Math.floor(Math.random()*1000)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${rndIdx}`)
    .then(infoFromAPI => infoFromAPI.data)
    .then(async apiData => {
        let name = apiData.name
        let ability = apiData.abilities[0].ability.name
        let level = apiData.base_experience
        let sprites = apiData.sprites.other
        let officialArtwork = sprites['official-artwork']
        let image = officialArtwork.front_default
        let isFavorite = false
        await Pokemon.create({name: name, ability: ability, level: level, image:image, isFavorite: isFavorite})
        response.redirect("/pokemonListHomepage")
    })
}

function addToFavorites(request, response){
    let pokemonName = request.params.name
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(infoFromAPI => infoFromAPI.data)
    .then(async apiData => {
        let name = apiData.name
        let ability = apiData.abilities[0].ability.name
        let level = apiData.base_experience
        let sprites = apiData.sprites.other
        let officialArtwork = sprites['official-artwork']
        let image = officialArtwork.front_default
        let isFavorite = "on"
        await Pokemon.create({name: name, ability: ability, level: level, image:image, isFavorite: isFavorite})
        response.redirect("/pokemonListHomepage")
    })
}

function pokemonListHomepage (request, response){
    axios.get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1000")
    .then(infoFromAPI => infoFromAPI.data)
    .then(async apiData => {
    const pokemonListArray = await Pokemon.find({})
    response.render("pokemonListHomepage.ejs", {pokemonListArray: pokemonListArray, apiData:apiData})
    })
}


function searchPokemon (request, response){
    let pokemonName = request.body.pokemonQuery
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(infoFromAPI => infoFromAPI.data)
    .then(apiData => {      
        response.render("pokemonSearchDetails.ejs", {apiData:apiData})
    })
}

function createNewPokemon (request, response){
    axios.get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1000")
    .then(infoFromAPI => infoFromAPI.data)
    .then(apiData => response.render("createNewPokemon.ejs", {apiData:apiData}))
    
}

async function addNewPokemon (request, response){
    let pokemonName = request.body.newPokemon
    let pokemonAbility = request.body.ability
    let pokemonLevel = request.body.level
    let pokemonImage = request.body.image
    let isFavorite = request.body.isFavorite
    await Pokemon.create({name: pokemonName, ability: pokemonAbility, level: pokemonLevel, image: pokemonImage, isFavorite: isFavorite})
    response.redirect("/pokemonListHomepage")
}

async function favoritePokemon (request, response){
    let favoritePokemon = await Pokemon.find({isFavorite: "on"})
    response.render("favoritePokemonList.ejs", {favoritePokemon: favoritePokemon})
}

async function showPokemonDetails(request, response){
    let pokemonId = request.params.pokemonId
    let pokemonDetails = await Pokemon.findById(pokemonId)
    response.render("pokemonDetails.ejs", {pokemonDetails: pokemonDetails})
}

async function updatePokemon (request, response){
    let pokemonId = request.params.pokemonId
    let pokemon = await Pokemon.findById(pokemonId)
    response.render("updatePokemon.ejs", {pokemon:pokemon})
}
async function updateHomepage (request, response){
    let pokemonId = request.params.pokemonId
    let userInput = request.body
    await Pokemon.findByIdAndUpdate(pokemonId, {name: userInput.pokemon, ability: userInput.ability, level: userInput.level, isFavorite: userInput.isFavorite} )
    response.redirect("/pokemonListHomepage")
}


async function deletePokemon (request, response){
    let pokemonId = request.params.pokemonId
    await Pokemon.findOneAndDelete({_id: pokemonId})
    response.redirect("/pokemonListHomepage")

}

export {    pokemonAPI, generatePokemon, pokemonListHomepage, addToFavorites, searchPokemon, createNewPokemon, 
            favoritePokemon, addNewPokemon, showPokemonDetails, updatePokemon, updateHomepage, deletePokemon
        }