import React from "react";
import { withSwapiService } from "../hoc-helpers";
import ItemDetails, { Record } from "../item-details/item-details";
//import SwapiService from "../../services/swapi-service";

// Попробуем вызвать сервис. Т.к мы обернули app в провайдер, то здесь
// будет доступно value
//mport { SwapiServiceConsumer } from "../swapi-service-context";

// const StarshipDetails = ({ itemId }) => {
//   return (
//     <SwapiServiceConsumer>
//       {//(swapiService) => { // swapiService ~~ value в SwapiServiceProvider в app
//       ({ getStarship, getStarshipImage }) => {
//         // Так мы используем SwapiService из context-а
//         return (
//           <ItemDetails
//             itemId={itemId}
//             getData={getStarship}
//             getImageUrl={getStarshipImage}
//           >
//             <Record field="model" label="Model: " />
//             <Record field="length" label="Length: " />
//             <Record field="costInCredits" label="Cost: " />
//           </ItemDetails>
//         );
//       }}
//     </SwapiServiceConsumer>
//   );
// };
const StarshipDetails = props => {
  return (
    <ItemDetails {...props}>
      <Record field="model" label="Model: " />
      <Record field="length" label="Length: " />
      <Record field="costInCredits" label="Cost: " />
    </ItemDetails>
  );
};
const mapMethodsToProps = swapiService => {
  return {
    // объект, который будет использоваться как mapping для свойств
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage
  }; // функция берёт swapiService и назначает его МЕТОДЫ СВОЙСТВАМ компонента
};
export default withSwapiService(StarshipDetails, mapMethodsToProps);
