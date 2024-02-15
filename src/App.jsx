import './App.css';
import rawData from "./rawData.json"
import { useEffect, useState } from 'react';
import CarTable from "./components/CarTable/CarTable";
import FilterForm from './components/FilterForm/FilterForm';
import UniForm from './components/UniForm/UniForm';

function App() {
  const [cars, setCars] = useState(rawData.cars);
  const [carsToShow, setCarsToShow] = useState(rawData.cars);
  const [newCar, setNewCar] = useState({
    id: cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: ""
  });
  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: ""
  });
  const handleFilterData = (filteredCars) => {
    setCarsToShow(filteredCars);
  }

  const handleNewData = (data, source) => {
    switch (source) {
      case "add-car-form": {
        setNewCar(data);
        break;
      }
      case "change-car-form": {
        setCarToChange(data);
        break;
      }
      default: break;
    }
  }

  const handleDelete = (idToDel) => {
    const temp = cars.filter(car => car.id !== idToDel)
    setCars(temp);
    setCarsToShow(temp);
  }

  const handleChange = (idToChange) => {
    const temp = cars.filter(car => car.id === idToChange)
    setCarToChange(...temp);
  }

  const fillEmptyInfos = (car) => {
    const filledCar = {
      ...car,
      brand: car.brand.trim() ? car.brand : "empty",
      model: car.model.trim() ? car.model : "empty",
      reg: car.reg.trim() ? car.reg : "empty",
      km: car.km.toString().trim() ? parseInt(car.km) : 0,
      year: car.year.toString().trim() ? parseInt(car.year) : 0,
    };
    return filledCar;
  }

  const confirm = (car) => {
    return (
      window.confirm("Opravdu chcete odeslat data?\n" +
        `Značka: ${car.brand}\n` +
        `Model: ${car.model}\n` +
        `Registrační značka: ${car.reg}\n` +
        `Kilometry: ${car.km}\n` +
        `Rok výroby: ${car.year}`)
    );
  }

  const handleClick = (source) => {
    let temp;
    switch (source) {
      case "add-car-form": {
        temp = fillEmptyInfos(newCar);
        if (confirm(temp)) {
          const carsToUpdate = [...cars];
          carsToUpdate.push(temp);
          setCars(carsToUpdate);
          setCarsToShow(carsToUpdate);
          setNewCar({
            id: temp.id + 1,
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: ""
          });
          alert("Data byla úspěšně odeslána.");
        } else {
          alert("Odeslání dat bylo zrušeno.");
        }
        break;
      }
      case "change-car-form": {
        temp = fillEmptyInfos(carToChange);
        if (confirm(temp)) {
          const index = cars.findIndex(car => car.id === temp.id);
          const carsToUpdate = [...cars];
          carsToUpdate[index] = temp;
          setCars(carsToUpdate);
          setCarsToShow(carsToUpdate);
          setCarToChange({
            id: 0,
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: ""
          });
          alert("Data byla úspěšně odeslána.");
        } else {
          alert("Odeslání dat bylo zrušeno.");
        }
        break;
      }
      default: break;
    }
  }

useEffect(() => { console.log(cars) }, [cars])
  return (
    <div className="container">
      <FilterForm data={cars} handleFilterData={handleFilterData} />
      <UniForm id="add-car-form" data={newCar} handleNewData={handleNewData} handleClick={handleClick} />
      <CarTable data={carsToShow} handleDelete={handleDelete} handleChange={handleChange} />
      <UniForm id="change-car-form" data={carToChange} handleNewData={handleNewData} handleClick={handleClick} />
    </div>
  );
}

export default App;
