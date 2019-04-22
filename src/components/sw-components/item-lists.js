import React from "react";
import ItemList from "../item-list";
import { withData, withSwapiService } from "../hoc-helpers";

//import SwapiService from "../../services/swapi-service";
//const swapiService = new SwapiService();
//const { getAllPeople, getAllStarships, getAllPlanets } = swapiService;

const withChildFunction = (Wrapped, fn) => {
  // функция берёт компонент и в качестве children устанавливает ему функцию
  // 1 - компонент, который она будет оборачивать
  // 2 - функция, которую мы будем передавать в props.children
  return props => {
    return <Wrapped {...props}>{fn}</Wrapped>;
    // В качестве свойств передаём все те-же функции, которые получил наш компонент
    // но в дополнении передадим второй аргумент
  };
};
// const ListWithChildren = withChildFunction(
//   ItemList, ({name}) => <span>{name}</span>
//   // 1 - компонент, который она будет оборачивать
//   // 2 - функция, которую мы будем передавать в props.children
//   // функця - рендер в ItemList

// );

const renderName = ({ name }) => <span>{name}</span>;
// функция рендера
const renderModelAndName = ({ model, name }) => (
  <span>
    {name} ({model})
  </span>
);

// const PersonList = withData(
//   withChildFunction(ItemList, renderName),
//   // 1 - компонент, который она будет оборачивать
//   // 2 - функция, которую мы будем передавать в props.children
//   // функця - рендер в ItemList
//   getAllPeople
// );
// Список, в который данные приходят из сервиса по People
const mapPersonMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPeople
  };
};
const mapPlanetMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPlanets
  };
};
const mapStarshipMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllStarships
  };
};

const PersonList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPersonMethodsToProps
);
const PlanetList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPlanetMethodsToProps
);
const StarshipList = withSwapiService(
  withData(withChildFunction(ItemList, renderModelAndName)),
  mapStarshipMethodsToProps
);

export { PersonList, PlanetList, StarshipList };
