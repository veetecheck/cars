import "./App.css";
import rawData from "./rawData.json";
import { useEffect, useState } from "react";
import CarTable from "./components/CarTable/CarTable";
import UniForm from "./components/UniForm/UniForm";
import FilterForm from "./components/FilterForm/FilterForm";

function App() {
  const [cars, setCars] = useState(rawData.cars);
  const [newCar, setNewCar] = useState({
    id: cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });
  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });
  const [carsToShow, setCarsToShow] = useState(rawData.cars);

  const handleNewData = (updatedCar, source) => {
    switch (source) {
      case "add-car-form": {
        setNewCar(updatedCar);
        break;
      }
      case "change-car-form": {
        setCarToChange(updatedCar);
        break;
      }
      default:
        break;
    }
  };

  const fillEmptyInfos = (car) => {
    const filledCar = {
      ...car,
      brand: car.brand.trim() ? car.brand : "empty",
      model: car.model.trim() ? car.model : "empty",
      reg: car.reg.trim() ? car.reg : "empty",
      km: parseInt(car.km) || 0,
      year: parseInt(car.year) || 0,
    };
    return filledCar;
  };

  const confirmCar = (car) => {
    return window.confirm(
      "Opravdu chcete odeslat data?\n" +
        `Značka: ${car.brand}\n` +
        `Model: ${car.model}\n` +
        `Reg.značka: ${car.reg}\n` +
        `Kilometry: ${car.km}\n` +
        `Rok výroby: ${car.year}\n`
    );
  };

  const handleUpdate = (source) => {
    let temp;
    switch (source) {
      case "add-car-form": {
        temp = fillEmptyInfos(newCar);
        if (confirmCar(temp)) {
          const carsToUpdate = [...cars];
          carsToUpdate.push(temp);
          setCars(carsToUpdate);
          setCarsToShow(carsToUpdate);
          setNewCar({
            id: newCar.id + 1,
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          });
          alert("Data byla úspěšně odeslána");
        } else {
          alert("Odeslání dat bylo zrušeno");
        }
        break;
      }
      case "change-car-form": {
        temp = fillEmptyInfos(carToChange);
        if (confirmCar(temp)) {
          const index = cars.findIndex((car) => car.id === temp.id);
          if (index !== -1) {
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
              year: "",
            });
            alert("Aktualizace dat úspěšná");
          } else {
            alert("Auto s daným id nebylo nalezeno");
            setCarToChange({
              id: 0,
              brand: "",
              model: "",
              reg: "",
              km: "",
              year: "",
            });
          }
        } else {
          alert("Aktualizace neproběhla");
        }
        break;
      }
      default:
        break;
    }
  };

  const handleDelete = (idToDel) => {
    const temp = cars.filter((car) => car.id !== idToDel);
    setCars(temp);
    setCarsToShow(temp);
  };

  const handleChange = (idToChange) => {
    const temp = cars.filter((car) => car.id === idToChange);
    setCarToChange(...temp);
  };
  // useEffect(() => {
  //   console.log(carToChange);
  // }, [carToChange]);

  // useEffect(() => {
  //   console.log(cars);
  // }, [cars]);

  const handleFilterData = (filteredCars) => {
    setCarsToShow(filteredCars);
  };

  return (
    <div className="container">
      <FilterForm data={cars} handleFilterData={handleFilterData} />
      <CarTable
        data={carsToShow}
        handleDelete={handleDelete}
        handleChange={handleChange}
      />
      <p>Přidání nového auta</p>
      <UniForm
        id="add-car-form"
        data={newCar}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
      <p>Úpravy existujícího auta</p>
      <UniForm
        id="change-car-form"
        data={carToChange}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
