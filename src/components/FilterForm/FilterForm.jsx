import React, { useState, useEffect } from 'react'
import "./FilterForm.css"

function FilterForm({ data, handleFilterData }) {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [criteria, setCriteria] = useState('brand');

    const [selModels, setSelModels] = useState([]);
    const [selBrands, setSelBrands] = useState([]);
    const [selRegistration, setSelRegistration] = useState('');

    useEffect(() => {
        setModels(Array.from(new Set(data.map((item) => item.model))));
        setBrands(Array.from(new Set(data.map((item) => item.brand))));
    }, [data]);


    const handleFilter = () => {
        let filtered = data; 

        switch (criteria) {
            case "brand":
                filtered = data.filter(car => selBrands.includes(car.brand));
                break;
            case "model":
                filtered = data.filter(car => selModels.includes(car.model));
                break;
            case "reg":
                filtered = data.filter(car => car.reg.includes(selRegistration));
                break;
            default:
                break;
        }

        handleFilterData(filtered);
    };
    
    const handleChange = (e) => {
        setCriteria(e.target.value);
    }
    const handleSelection = (e) => {
        const { name, value, selectedOptions } = e.target;

        switch(name) {
            case 'brand':
                const brands = Array.from(selectedOptions).map((option) => option.value);
                setSelBrands(brands);
                break;
            case 'model':
                const models = Array.from(selectedOptions).map((option) => option.value);
                setSelModels(models);
                break;
            case 'reg':
                setSelRegistration(value.trim());
                break;
            default:
                break;
        }
    };
    return (
        <fieldset>
            <legend>Vyhledávání</legend>
            <div>
                <input type='radio' name='filter-criteria' id='brand-criteria' value='brand' onChange={handleChange} checked={criteria === 'brand'} />
                <label htmlFor='brand-criteria'>značka</label>
            </div>
            <div>
                <input type='radio' name='filter-criteria' id='model-criteria' value='model' onChange={handleChange} checked={criteria === 'model'} />
                <label htmlFor='model-criteria'>model</label>
            </div>
            <div>
                <input type='radio' name='filter-criteria' id='reg-criteria' value='reg' onChange={handleChange} checked={criteria === 'reg'} />
                <label htmlFor='reg-criteria'>reg. značka</label>
            </div>
            <div>
                <select disabled={criteria !== 'brand'} multiple id='brand' onChange={handleSelection} value={selBrands} name='brand'>
                    {brands.map((brand) => <option key={brand}>{brand}</option>)}
                </select>
            </div>
            <div>
                <select disabled={criteria !== 'model'} multiple id='model' onChange={handleSelection} value={selModels} name='model'>
                    {models.map((model) => <option key={model}>{model}</option>)}
                </select>
            </div>
            <div>
                <input type="text" disabled={criteria !== 'reg'} id='reg' onChange={handleSelection} value={selRegistration} name='reg'/>
            </div>
            <div>
                <button onClick={handleFilter}>Filtruj</button>
            </div>
        </fieldset>
    )
}

export default FilterForm
