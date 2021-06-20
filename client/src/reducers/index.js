import { GET_POKEMONS, CHANGE_PAGE, SET_POKEMONS_TYPES, CREATE_NEW_POKEMON, SEARCH_POKEMON, SET_LOADING, ERROR } from '../actions'
import setViews from '../controllers/Views';

const initialState = {
    pokemonsViews: [],
    pokemonsTypes: [],
    loading: {
        types: true,
        pokemons: true,
        error: false,
    },
    actualPage: false,
    pokemonDetail: {}
}

const reducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemonsViews: setViews(payload),
                loading: {
                    ...state.loading,
                    pokemons: false
                },
                actualPage: 0,
                error: false
            };
        case CHANGE_PAGE:
            return {
                ...state,
                actualPage: payload
            }
        case SET_POKEMONS_TYPES:
            return {
                ...state,
                pokemonsTypes: payload,
                loading: {
                    ...state.loading,
                    types: false
                }
            }
        case CREATE_NEW_POKEMON:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    pokemons: true
                }
            }
        case SEARCH_POKEMON:
            return {
                ...state,
                pokemonsViews: setViews(payload),
                loading: {
                    ...state.loading,
                    pokemons: false
                },
            }
        case SET_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    pokemons: true
                },
            }
        default:
            return state
    }
}

export default reducer;