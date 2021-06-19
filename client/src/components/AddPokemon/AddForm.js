import React from 'react'

export default function AddForm({
    handleSubmit,
    handleChange,
    handleTypes,
    forms,
    pokemonsTypes,
    Types,
    Errors,
    Alert,
    image,
}) {
    return (
        <form onSubmit={e => { handleSubmit(e) }}>
            <div>
                <div>
                    <h1>Create a new Pokemon</h1>
                </div>
                {Alert.errors ? (
                    <div>
                        <ul>
                            {Object.values(Errors).map((el) => (
                                <li key={el}>
                                    {el}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
                <div>
                    <div>
                        <img src={image} alt='image' />
                    </div>
                </div>
                {forms &&
                    forms.map((el, i) => (
                        <div key={i} className='div_f'>
                            <div key={i} className='div_label'>
                                <label key={i} className='label'>
                                    {el.label}:
                                </label>
                            </div>
                            <input
                                className='input'
                                key={el.name}
                                name={el.name}
                                type='text'
                                autoComplete='off'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    ))}
                <div>
                    <select onChange={(e) => handleTypes(e)}>
                        {pokemonsTypes &&
                            pokemonsTypes.map((type, i) => (
                                <option key={i} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                    </select>
                    <div>
                        {Types &&
                            Types.map((el, i) => (
                                <div key={i}>
                                    <label>{el}</label>
                                </div>
                            ))}
                    </div>
                </div>
                <div>
                    <button className='btn_submit' type='submit'>
                        Create a Pokemon
                    </button>
                </div>
                {Alert.create ? (
                    <div>
                        <h3>
                            The Pokemon was created successfully
                        </h3>
                    </div>
                ) : null}
            </div>
        </form>
    )
}
