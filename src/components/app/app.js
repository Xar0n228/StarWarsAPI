import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
// import PeoplePage from "../people-page";
import ErrorBoundry from "../error-boundry";
import Row from "../row/row";
import SwapiService from "../../services/swapi-service";
import ItemList from "../item-list/item-list";
import DummySwapiService from "../../services/dummi-swapi-service";
import "./app.css";
import ItemDetails, { Record } from "../item-details/item-details"; // именной импорт

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from "../sw-components";

import { SwapiServiceProvider } from "../swapi-service-context";
// Берём провайдер и оборачиваем всё наше приложение в Provider

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from "../pages";

//React.Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export default class App extends Component {
  //swapiService = new SwapiService();
  // Здесь определяем сервис источника данных
  // Чтобы можно было изменить это значение, нужно изменять его через state

  state = {
    showRandomPlanet: true,
    swapiService: new DummySwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  onServiceChange = () => {
    // т.к это ивент-листнер, то делаем функцией-стрелкой
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      // а = х instanceof х1 ? х2 : х1; Если х = х1, то а = х2, иначе х = х1
      console.log("true");
      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    const { isLoggedIn } = this.state;

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    //const planet = this.state.showRandomPlanet ?
    //        <RandomPlanet updateInterval={2000} /> : null;
    // Хоть у нас и стоит значение по-умолчанию, но его можно переопределить тут

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage
      //getAllPeople,
      //getAllPlanets
    } = this.state.swapiService; //= this.swapiService;
    const personDetails = (
      // Сюда можно передать объект вс конфигурацией
      // полей для отображения в item-details

      // <ItemDetails
      //   itemId={12}
      //   getData={gettPerson}
      //   getImageUrl={getPersonImage}
      //   fields={   // Но это не в духе React
      //     [
      //       { field: 'gender', label:'Gender'}, // Поле: , отображение:
      //       { field: 'eyeColor', label:'Eye Color'}
      //     ]
      //   }
      // />
      <ItemDetails itemId={15} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender: " />
        <Record field="eyeColor" label="Eye Color: " />
      </ItemDetails>
      // Используем компонент Record, чтобы показать, что именно отображается внутри
    );
    // чтобы отобразить персонажа, функция getPerson
    const starshipDetails = (
      <ItemDetails
        itemId={15}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model: " />
        <Record field="length" label="Length: " />
        <Record field="costInCredits" label="Cost: " />
      </ItemDetails>
      // <ItemDetails
      //   itemId={12}
      //   getData={getStarship}
      //   getImageUrl={getStarshipImage}
      // />
    );

    return (
      <ErrorBoundry>
        <SwapiServiceProvider
          //value={this.swapiService}
          // Теперь везде будет доступ к value

          value={this.state.swapiService}
        >
          <Router>
            <div className="stardb-app">
              <Header
                onServiceChange={this.onServiceChange}
                // передаём ФУНКЦИЮ в качестве листнера
              />

              {/* <Row left={<PersonList />} right={<PersonDetails itemId={11} />} /> */}
              {/* <PersonDetails /> */}
              {/* <Row left={<PlanetList />} right={<PlanetDetails itemId={16} />} />
              <Row
                left={<StarshipList />}
                right={<StarshipDetails itemId={21} />}
              /> */}

              {/* <PersonList getData={getAllPeople} onItemSelected={() => {}}>
                {({ name }) => <span>{name}</span>}
              </PersonList>
              <PlanetList getData={getAllPlanets} onItemSelected={() => {}}>
                {({ name }) => <span>{name}</span>}
              </PlanetList>
              <StarshipList getData={getAllStarships} onItemSelected={() => {}}>
                {({ name }) => <span>{name}</span>}
              </StarshipList> */}

              {/* <PeoplePage />
              <PlanetsPage />
              <StarshipsPage /> */}

              {planet}
              <Switch>
                <Route
                  path="/"
                  render={() => <h2>Welcome to StarDb</h2>}
                  exact={true}
                />

                {/* 
                    path  - какой путь будет у этой страницы
                    component - какой компонент будет отображаться, если наш url будет соответствовать шаблончику 1 
                  */}
                <Route
                  path="/people/:id?"
                  component={PeoplePage}
                  // Что будет выполнятся и для блока people и для блока id
                />
                <Route path="/planets" component={PlanetsPage} />
                <Route
                  path="/starships"
                  exact={true}
                  component={StarshipsPage}
                />
                <Route
                  path="/starships/:id"
                  render={({ match, location, history }) => {
                    const { id } = match.params; // деструктурируем из параметров, которые мы передали в пути
                    return <StarshipDetails itemId={id} />;
                  }}
                />
                <Route
                  path="/login"
                  render={() => {
                    return (
                      <LoginPage
                        isLoggedIn={isLoggedIn}
                        onLogin={this.onLogin}
                      />
                    );
                  }}
                />
                <Route
                  path="/secret"
                  render={() => {
                    return <SecretPage isLoggedIn={isLoggedIn} />;
                  }}
                />

                {/* ...... 2 стратегии на случай, если user перешёл на несуществующую страницу
            1:   <Redirect
                    to="/" // Если ни один из Route не сработал, то ...
                  /> 

            2:*/}
                <Route
                  render={() => <h2>Page not found</h2>}
                  // Этот Route вызывается в любом случае, если до него дойдёт очередь
                  // т.к у него отсутствует path
                />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
