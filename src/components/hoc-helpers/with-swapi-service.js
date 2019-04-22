import React from "react";
import { SwapiServiceConsumer } from "../swapi-service-context";

// const withSwapiService = Wrapped => {
//   return props => {
//     // Используем Консумер, чтолбы полу3чить значения из контекста и передать
//     // эти значения SwapiService в компонент <Wrapped />
//     return (
//       <SwapiServiceConsumer>
//         {// Оборачивает нужный компонент в SwapiServiceConsumer,
//         // получает SwapiService и устанавливает его на компоненте
//         swapiService => {
//           return <Wrapped {...props} swapiService={swapiService} />;
//         }}
//       </SwapiServiceConsumer>
//     );
//   };
// };
const withSwapiService = (Wrapped, mapMethodsToProps) => {
  //  Наш компонент:
  //1- достаёт сервис из контекста и передаёт его в обёрнутый Wrapp-компонент
  //2- В наш компонент высшего порядка мы передаём функцию
  //mapMethodsToProps. И теперь вместо того, чтобы передавать весь сервис
  //в компоненты, мы выбираем какие именно части сервиса мы хотим передать
  //и под какими именами. Независимо от источника компонента
  // мы можем адаптировать withSwapiService, чтобы он получил свойства именно
  // под тем именем, под которым он хочет это свойство получить
  return props => {
    // Используем Консумер, чтолбы полу3чить значения из контекста и передать
    // эти значения SwapiService в компонент <Wrapped />
    return (
      <SwapiServiceConsumer>
        {// Оборачивает нужный компонент в SwapiServiceConsumer,
        // получает SwapiService и устанавливает его на компоненте
        swapiService => {
          const serviceProps = mapMethodsToProps(swapiService);
          // Передаём свойства из функции mapMethodsToProps

          return <Wrapped {...props} {...serviceProps} />;
        }}
      </SwapiServiceConsumer>
    );
  };
};

export default withSwapiService;
