import React, { Component } from "react";

import ErrorButton from "../error-button/error-button";
import SwapiService from "../../services/swapi-service";

import "./item-details.css";

// Компонент Record для app <ItemDetails>
const Record = ({ item, field, label }) => {
  // Нам нужно: объект, поле, название поля
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
    // item[field] - item из React.cloneElement
  );
};
export {
  // Именной экспорт
  Record
};

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    // Эта функция жизненного цикла вызывается после того, как мы получили новое свойство
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      // Если эта функция не равна ПРЕДидущей версии, то обновляем
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      // Здесь мы проверяем, изменился ли itemId
      this.updateItem();
    }
    // 86 урок: Мы должены обновлятся не только тогда, когда обновился
    // itemId, но и тогда, когда функция getData стала другой
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props; // getData-функция
    // чтобы компонент сам вызывал функцию тогда, когда ему понадобятся данные
    if (!itemId) {
      return;
    }

    //this.swapiService.getPerson(itemId).then(item => {
    //this.setState({ item });
    //});
    getData(itemId).then(item => {
      this.setState({ item, image: getImageUrl(item) });
      // Таким образом ункция получает сам item и по этому элементу возвращает кратинку
    });
  }

  render() {
    const { item, image } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }

    //const { id, name, gender, birthYear, eyeColor } = item;
    const { name } = item;
    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt="item" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li> */}

            {/*____ {this.props.children}  ____

             Будет 2 children: gender, eyeColor 
            Это всё, что передаётся в теле:

            <ItemDetails> 
              <Record /> 
            </ItemDetails>

            в app  */}

            {React.Children.map(this.props.children, child => {
              // API для работы с children
              // map(THIS.PROPS.CHILDREN, фУНКЦИЯ_ДЛЯ_КАЖДОГО_CHILD(child))
              // вызывает ФУНКЦИЮ для каждого CHILD
              // не важно, какой тип htis.props.children
              //return child;

              //return <li>{idx}</li>; // независимо от того, что передаём
              // Компонент сам решает, как именно использовать children
              // Child элементы можно заменять, оборачивать в другие компоненты или скрывать

              //child.item = item нельзя, т.к React-элементы нельзя изменят после создания
              return React.cloneElement(child, { item });
              // так можно добавить новое свойство item в элемент child
            })}
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
