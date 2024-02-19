import React from "react";

function UniForm({ data, handleNewData, handleUpdate, id }) {
  const handleChange = (e) => {
    let temp = { ...data };
    const { name, value } = e.target;
    switch (name) {
      case "brand": {
        temp.brand = value;
        break;
      }
      case "model": {
        temp.model = value;
        break;
      }
      case "reg": {
        temp.reg = value;
        break;
      }
      case "km": {
        temp.km = parseInt(value) || 0;
        break;
      }
      case "year": {
        temp.year = parseInt(value) || 0;
        break;
      }
      default:
        break;
    }
    handleNewData(temp, id);
  };
  return (
    <div id={id}>
      <div>
        <input
          type="text"
          name="brand"
          value={data.brand}
          onChange={handleChange}
        />
        <label htmlFor="brand">Značka</label>
      </div>
      <div>
        <input
          type="text"
          name="model"
          value={data.model}
          onChange={handleChange}
        />
        <label htmlFor="model">Model</label>
      </div>
      <div>
        <input
          type="text"
          name="reg"
          value={data.reg}
          onChange={handleChange}
        />
        <label htmlFor="reg">Reg. značka</label>
      </div>
      <div>
        <input
          type="number"
          name="km"
          value={data.km}
          onChange={handleChange}
        />
        <label htmlFor="km">Najeto</label>
      </div>
      <div>
        <input
          type="number"
          name="year"
          value={data.year}
          onChange={handleChange}
        />
        <label htmlFor="year">Rok výroby</label>
      </div>
      <div>
        <button onClick={() => handleUpdate(id)}>Odešli</button>
      </div>
    </div>
  );
}

export default UniForm;
