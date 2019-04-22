import React, { Component } from "react";
import { PersonDetails, PersonList } from "../sw-components";
import Row from "../row";

// export default class PeoplePage extends Component {
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
//         left={<PersonList onItemSelected={this.onItemSelected} />}
//         right={<PersonDetails itemId={selectedItem} />}
//       />
//     );
//   }
// }

import { withRouter } from "react-router-dom";
// Компонент высшего порядка для обёртки, чтобы передать объекты React.Router
// Сделали объектом функции и теперь нужно дать доступ к react.history и match

const PeoplePage = ({ history, match }) => {
  // Нужно достать id из match
  const { id } = match.params;

  return (
    <Row
      left={<PersonList onItemSelected={id => history.push(id)} />}
      right={<PersonDetails itemId={id} />}
    />
  );
};
export default withRouter(PeoplePage);
// так у PeoplePage будет доступ к объектам обёртки типо history
