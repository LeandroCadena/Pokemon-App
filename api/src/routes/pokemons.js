const { Router } = require('express');
const { Pokemon } = require('../db');
const { SEARCH_BY_ID, SEARCH_BY_NAME } = require('../utils/constants');
const { getAllPokemons, getPokemonDetail } = require('../controllers/Pokemons');
const { getPokemonTypes } = require('../controllers/Types');
const axios = require('axios')
const router = Router();

router.get('/', async (req, res) => {
	const { name } = req.query;

	let pokemons = await getAllPokemons();

	if (name) {
		const pokemonDetail = await getPokemonDetail(SEARCH_BY_NAME, name);
		pokemonDetail.length
			? res.status(200).send(pokemonDetail)
			: res.status(404).send('Pokemon not found');
	} else {
		return res.status(200).send(pokemons);
	}
});

router.get('/name/:name', async (req, res) => {
	const { name } = req.params;

	try {
		const Pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
		res.status(200).send(Pokemon.data)
	} catch (error) {
		res.status(404).send('Pokemon not found');
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	if (id) {
		const pokemonDetail = await getPokemonDetail(SEARCH_BY_ID, id);
		pokemonDetail
			? res.status(200).send(pokemonDetail)
			: res.status(404).send('Pokemon not found');
	}
});

router.post('/', async (req, res) => {
	const {
		name,
		hp,
		attack,
		defense,
		speed,
		height,
		weight,
		type,
		image,
	} = req.body;

	if (!name || !type) res.status(400).send('Name and Types are required')

	const newPokemon = await Pokemon.create({
		name,
		hp,
		attack,
		defense,
		speed,
		height,
		weight,
		image,
	});

	const allTypes = await getPokemonTypes(type);

	newPokemon.setTypes(allTypes);

	return res.status(200).send(newPokemon);
});



module.exports = router;