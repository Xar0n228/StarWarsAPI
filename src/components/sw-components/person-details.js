import React from "react";

import ItemDetails, { Record } from "../item-details/item-details";
//import SwapiService from "../../services/swapi-service";

// Попробуем вызвать сервис. Т.к мы обернули app в провайдер, то здесь
// будет доступно value
//import { SwapiServiceConsumer } from "../swapi-service-context";

import { withSwapiService } from "../hoc-helpers";

// const PersonDetails = ({ itemId }) => {
//   return (
//     <ItemDetails
//       itemId={itemId}
//       getData={getPerson}
//       getImageUrl={getPersonImage}
//     >
//       <Record field="gender" label="Gender: " />
//       <Record field="eyeColor" label="Eye Color: " />
//     </ItemDetails>
//   );
// };
// const PersonDetails = ({ itemId }) => {
//   return (
//     // SwapiServiceConsumer принимает в качестве тела - функцию
//     <SwapiServiceConsumer>
//       {//(swapiService) => { // swapiService ~~ value в SwapiServiceProvider в app
//       ({ getPerson, getPersonImage }) => {
//         // Так мы используем SwapiService из context-а
//         return (
//           <ItemDetails
//             itemId={itemId}
//             getData={getPerson}
//             getImageUrl={getPersonImage}
//           >
//             <Record field="gender" label="Gender: " />
//             <Record field="eyeColor" label="Eye Color: " />
//           </ItemDetails>
//         );
//       }}
//     </SwapiServiceConsumer>
//   );
// };
// const PersonDetails = ({ itemId, swapiService }) => {
//   const { getPerson, getPersonImage } = swapiService;
//   return (
//     <ItemDetails
//       itemId={itemId}
//       getData={getPerson}
//       getImageUrl={getPersonImage}
//     >
//       <Record field="gender" label="Gender: " />
//       <Record field="eyeColor" label="Eye Color: " />
//     </ItemDetails>
//   );
// };

//const PersonDetails = ({ itemId, getData, getImageUrl }) => {
const PersonDetails = props => {
  return (
    // <ItemDetails
    //   itemId={itemId}
    //   getData={getData}
    //   getImageUrl={getImageUrl}
    // >
    <ItemDetails {...props}>
      <Record field="gender" label="Gender: " />
      <Record field="eyeColor" label="Eye Color: " />
    </ItemDetails>
  );
};

// Правило, как именно нужно передавать swapiService в этот компонент
// Возьмём определённые методы из swapiService и присвоим их
// определённым свойствам в компоненте
const mapMethodsToProps = swapiService => {
  return {
    // объект, который будет использоваться как mapping для свойств
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage
  }; // функция берёт swapiService и назначает его МЕТОДЫ СВОЙСТВАМ компонента
};
export default withSwapiService(PersonDetails, mapMethodsToProps);
// Оборачиваем const в функцию перед экспортом
