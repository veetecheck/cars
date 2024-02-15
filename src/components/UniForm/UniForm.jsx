import React, { useState, useEffect } from 'react';

function UniForm({ id, data, handleNewData }) {
    const [car, setCar] = useState(data);
    useEffect(() => {
        setCar(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updatedCar = { ...car };

        switch (name) {
            case 'brand':
                updatedCar.brand = value;
                break;
            case 'model':
                updatedCar.model = value;
                break;
            case 'reg':
                updatedCar.reg = value;
                break;
            case 'km':
                updatedCar.km = parseInt(value) || 0;
                break;
            case 'year':
                updatedCar.year = parseInt(value) || 0;
                break;
            default:
                break;
        }

        setCar(updatedCar);
    };


    const handleClick = () => {
        const updatedCar = {
            ...car,
            brand: car.brand.trim() ? car.brand : "empty",
            model: car.model.trim() ? car.model : "empty",
            reg: car.reg.trim() ? car.reg : "empty",
            km: car.km.toString().trim() ? parseInt(car.km) : 0,
            year: car.year.toString().trim() ? parseInt(car.year) : 0,
        };

        const isConfirmed = window.confirm("Opravdu chcete odeslat data?\n" +
            `Značka: ${updatedCar.brand}\n` +
            `Model: ${updatedCar.model}\n` +
            `Registrační značka: ${updatedCar.reg}\n` +
            `Kilometry: ${updatedCar.km}\n` +
            `Rok výroby: ${updatedCar.year}`);

        if (isConfirmed) {
            handleNewData(updatedCar, id);
            alert("Data byla úspěšně odeslána.");
        } else {
            alert("Odeslání dat bylo zrušeno.");
        }
    };


    return (
        <div id={id}>
            <div>
                <label htmlFor='brand'>Značka</label>
                <input type='text' name='brand' value={car.brand} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='brand'>Model</label>
                <input type='text' name='model' value={car.model} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='brand'>Registrační zn.</label>
                <input type='text' name='reg' value={car.reg} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='brand'>Najeto km</label>
                <input type='number' name='km' value={car.km} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='brand'>Rok výroby</label>
                <input type='number' name='year' value={car.year} onChange={handleChange} />
            </div>
            <div>
                <button onClick={handleClick}>Odešli data</button>
            </div>
        </div>
    );
}

export default UniForm;
