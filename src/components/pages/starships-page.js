// import React, { Component } from "react";
// import { StarshipDetails, StarshipList } from "../sw-components";
// import Row from "../row";
// export default class StarshipsPage extends Component {
//   state = {
//     selectedItem: null
//   };
//   onItemSelected = selectedItem => {
//     this.setState({ selectedItem });
//   };

//   render() {
//     const { selectedItem } = this.state;

//     return (
//       <Row
//         left={<StarshipList onItemSelected={this.onItemSelected} />}
//         right={<StarshipDetails itemId={selectedItem} />}
//       />
//     );
//   }
// }
//       Не нужно, т.к теперь id корабля будет закодирован в ПУТИ

import React from "react";
import { StarshipList } from "../sw-components";
import { withRouter } from "react-router-dom";
// Компонент высшего порядка для обёртки, чтобы передать объекты React.Router

const StarshipsPage = ({ history }) => {
  return (
    <StarshipList
      onItemSelected={itemId => {
        //const newPath = `/starships/${itemId}`;
        const newPath = itemId;

        history.push(newPath);
        // history- работает с историей браузера
        // history.push - добавляет новый объект в историю браузера. Переводит браузер на новую стр.
      }}
    />
  );
};
export default withRouter(StarshipsPage);
