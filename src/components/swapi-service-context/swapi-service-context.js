import React from "react";

const {
  Provider: SwapiServiceProvider,
  Consumer: SwapiServiceConsumer
} = React.createContext(); // Может принимать значение.
//Если наш consumer не найдёт никакого значения, то он будет использовать данное
export { SwapiServiceProvider, SwapiServiceConsumer };
