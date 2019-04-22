import React from "react";

import ItemDetails, { Record } from "../item-details/item-details";
//import SwapiService from "../../services/swapi-service";

// Попробуем вызвать сервис. Т.к мы обернули app в провайдер, то здесь
// будет доступно value
//import { SwapiServiceConsumer } from "../swapi-service-context";

import { withSwapiService } from "../hoc-helpers";

// const PlanetDetails = ({ itemId }) => {
//   return (
//     <SwapiServiceConsumer>
//       {//(swapiService) => { // swapiService ~~ value в SwapiServiceProvider в app
//       ({ getPlanet, getPlanetImage }) => {
//         // Так мы используем SwapiService из context-а
//         return (
//           <ItemDetails
//             itemId={itemId}
//             getData={getPlanet}
//             getImageUrl={getPlanetImage}
//           >
//             <Record field="population" label="Population: " />
//             <Record field="rotationPeriod" label="Rotation Period: " />
//             <Record field="diameter" label="Diameter: " />
//           </ItemDetails>
//         );
//       }}
//     </SwapiServiceConsumer>
//   );
// };
const PlanetDetails = props => {
  return (
    <ItemDetails {...props}>
      <Record field="population" label="Population: " />
      <Record field="rotationPeriod" label="Rotation Period: " />
      <Record field="diameter" label="Diameter: " />
    </ItemDetails>
  );
};

const mapMethodsToProps = swapiService => {
  // Функция, которая присваивает правильное свойство этому компоненту
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage
  };
};
export default withSwapiService(PlanetDetails, mapMethodsToProps);
