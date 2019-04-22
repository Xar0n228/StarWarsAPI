import React, { Component } from "react";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

//................................       КОМПОНЕНТЫ ВЫСШЕГО ПОРЯДКА
// ФУНКЦИЯ МОЖЕТ ВОЗВРАЩАТЬ ДРУГУЮ ФУНКЦИЮ
// const f = a => {
//   return b => {
//     console.log("fi", a + b);
//   }
// };
// f(1)(2);

// ФУНКЦИЯ МОЖЕТ ВОЗВРАЩАТЬ КЛАСС
// const f = () => {
//   return ItemList;
// };

// ФУНКЦИЯ МОЖЕТ ВОЗВРАЩАТЬ ПУСТОЙ КЛАСС
//const withData = (View, getData) => {
const withData = View => {
  // ЧАСТЬ, КОТОРАЯ ОТВЕЧАЕТ ЗА ЛОГИКУ
  // NТак мы вынесли всю логику с сетью, весь state и всю
  // логику выбора компонента, который сейчас нужно отображать в компонент высшего порядка
  // В View мы можем передать совершенно любой объект, который захотим отобразить

  // Получает данные и отображает состояние в правильном виде
  return class extends Component {
    state = {
      data: null,
      // На загрузку
      loading: true,
      error: false
    };
    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        // Эта функция обновляется, если обновляется сервис
        this.update();
      }
    }
    componentDidMount() {
      //const { getData } = this.props;

      // getData().then(data => {
      //   this.setState({
      //     data
      //   });
      // });
      // this.props.getData().then(data => {
      //   // Так как мы с помощью swapiService можем всё передавать в нужное место
      //   this.setState({
      //     data
      //   });
      // });

      this.update();

      // Мы должны ОБНОВИТЬ эту функцию так, чтобы она реагировала на смену
      // функции getData
    }
    update() {
      this.setState({
        loading: true,
        error: false
      });
      this.props
        .getData()
        .then(data => {
          // Так как мы с помощью swapiService можем всё передавать в нужное место
          this.setState({
            data,
            loading: false
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false
          });
        });
    }

    // Этот класс получает все те-же свойства, которые
    // должен был получить класс ItemList
    // componentDidMount() {
    //   console.log(this.props);
    // }
    render() {
      //return <p>HHHH</p>;

      const { data, loading, error } = this.state;
      if (loading) {
        return <Spinner />;
      }
      if (error) {
        return <ErrorIndicator />;
      }

      //return <ItemList {...this.props} data={data}/>;
      // Передаём свойства обратно
      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
