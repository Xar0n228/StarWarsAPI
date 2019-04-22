import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";

import { withData } from "../hoc-helpers";

import "./item-list.css";

//export default class ItemList extends Component {
//class ItemList extends Component {
// class ItemList extends Component {
//   //             МЫ ПЕРЕНЕСЛИ ЭТУ ЛОГИКУ В БЕЗИМЯННЯЫЙ КЛАСС ВНИЗУ ФАЙЛА
//   // state = {
//   //   itemList: null
//   // };

//   // componentDidMount() {
//   //   const { getData } = this.props;

//   //   getData().then(itemList => {
//   //     this.setState({
//   //       itemList
//   //     });
//   //   });
//   // }

//   renderItems(arr) {
//     return arr.map(item => {
//       const { id } = item;
//       const label = this.props.children(item);

//       return (
//         <li
//           className="list-group-item"
//           key={id}
//           onClick={() => this.props.onItemSelected(id)}
//         >
//           {label}
//         </li>
//       );
//     });
//   }

//   render() {
//     //             МЫ ПЕРЕНЕСЛИ ЭТУ ЛОГИКУ В БЕЗИМЯННЯЫЙ КЛАСС ВНИЗУ ФАЙЛА
//     // const { itemList } = this.state;

//     // if (!itemList) {
//     //   return <Spinner />;
//     // }
//     //const items = this.renderItems(itemList); // Теперь так не получится, переносим по другому

//     const { data } = this.props; // Из компонента высшего порядка передаём сюда

//     return <ul className="item-list list-group">{data}</ul>;
//   }
// }
const ItemList = props => {
  // ЧАСТЬ, КОТОРАЯ ОТВЕЧАЕТ ЗА ОТОБРАЖЕНИЕ
  const { data, onItemSelected, children: renderLabel } = props;
  const items = data.map(item => {
    const { id } = item;
    const label = renderLabel(item);

    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}
      >
        {label}
      </li>
    );
  });
  return <ul className="item-list list-group">{items}</ul>;
};

ItemList.defaultProps = {
  //Значение по-умолчанию для свойств
  // Объект, ключи которого - названия свойств у нас в компоненте props
  onItemSelected: () => {} // Пустая функция
};

const { getAllPeople } = new SwapiService();
// //export default f();
// export default withData(ItemList, getAllPeople);
//export default ItemList;
export default withData(ItemList, getAllPeople);
