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
    id: cars.lenght > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1,
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
        const temp = [...cars];
        temp.push(data);
        setCars(temp);
        setCarsToShow(temp);
        setNewCar({
          id: cars.lenght > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1,
          brand: "",
          model: "",
          reg: "",
          km: "",
          year: ""
        });
        break;
      }
      case "change-car-form": {
        const index = cars.findIndex(car => car.id === data.id);
        const updatedCars = [...cars];
        updatedCars[index] = data; 
        setCars(updatedCars);
        setCarsToShow(updatedCars);
        setCarToChange({
          id: 0,
          brand: "",
          model: "",
          reg: "",
          km: "",
          year: ""
        });
        break;
      }
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

  useEffect(() => { console.log(cars) }, [cars])

  return (
    <div className="container">
      <FilterForm data={cars} handleFilterData={handleFilterData} />
      <UniForm id="add-car-form" data={newCar} handleNewData={handleNewData} />
      <CarTable data={carsToShow} handleDelete={handleDelete} handleChange={handleChange} />
      <UniForm id="change-car-form" data={carToChange} handleNewData={handleNewData} />
    </div>
  );
}

export default App;
