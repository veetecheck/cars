import React from 'react';

function UniForm({ id, data, handleNewData, handleClick }) {

    const handleChange = (e) => {
        let temp = { ...data }
        const { name, value } = e.target;
        switch (name) {
            case 'brand':
                temp.brand = value;
                break;
            case 'model':
                temp.model = value;
                break;
            case 'reg':
                temp.reg = value;
                break;
            case 'km':
                temp.km = parseInt(value) || 0;
                break;
            case 'year':
                temp.year = parseInt(value) || 0;
                break;
            default:
                break;
        }
        handleNewData(temp, id);
    };

    return (
        <div id={id}>
            <div>
                <label htmlFor='brand'>Značka</label>
                <input type='text' name='brand' value={data.brand} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='brand'>Model</label>
                <input type='text' name='model' value={data.model} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='brand'>Registrační zn.</label>
                <input type='text' name='reg' value={data.reg} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='brand'>Najeto km</label>
                <input type='number' name='km' value={data.km} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='brand'>Rok výroby</label>
                <input type='number' name='year' value={data.year} onChange={handleChange} />
            </div>
            <div>
                <button onClick={() => handleClick(id)}>Odešli data</button>
            </div>
        </div>
    );
}

export default UniForm;
