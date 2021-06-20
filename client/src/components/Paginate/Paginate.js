import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { changePage, getPokemons } from '../../actions';
import { ARROW_ICON } from '../../utils/constants'
import './Paginate.css'

export function Paginate({ pokemonsViews, changePage, actualPage, loading, getPokemons }) {
    const [maxPage, setMaxPage] = useState(0);

    const handleClick = (e) => {
        changePage(e.target.value);
    };

    useEffect(() => {
        setMaxPage(pokemonsViews.length - 1)
    }, [pokemonsViews])

    const previousPage = () => {
        if (actualPage > 0) {
            changePage(parseInt(actualPage) - 1)
        }
    }

    const nextPage = () => {
        if (actualPage < maxPage) {
            changePage(parseInt(actualPage) + 1)
        }
    }

    return (
        <div className='second-bar'>
            <div className='reload'>
                <button
                onClick={() => getPokemons()}
                >RELOAD POKEMONS</button>
            </div>
            <div className='Pagination-container'>
                <button
                    className='Pag pag-left'
                    onClick={() => previousPage()}
                ><img className='arrow-left' src={ARROW_ICON} /></button>
                {
                    loading.pokemons ? (<div className='loading-pagination'>Paging...</div>) :
                        pokemonsViews.map((pokemon, index) => (
                            <button
                                key={index}
                                className={parseInt(actualPage) === index ? 'Pag actual' : 'Pag'}
                                value={index}
                                onClick={(e) => handleClick(e)}
                            >{index + 1}
                            </button>
                        ))
                }
                <button
                    className='Pag pag-right'
                    onClick={() => nextPage()}
                ><img className='arrow' src={ARROW_ICON} /></button>
            </div>
            <div className='filters'>RELOAssssssssD</div>
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        actualPage: state.actualPage,
        pokemonsViews: state.pokemonsViews,
        loading: state.loading,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: () => dispatch(getPokemons()),
        changePage: (num) => dispatch(changePage(num))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Paginate);
