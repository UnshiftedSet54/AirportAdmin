import React, { Component } from 'react';

import classes from './Slider.module.css';
import Changer from './Changer/Changer';


class Slider extends Component {
  periodicallyChange = null;
  rootImg = 'http://localhost:8080/';
  rootClient = 'http://localhost:3000/';
  state = {
    message: '',
    sliderStates: [
      {
        link: this.rootClient + 'Promotions',
        image: this.rootImg + 'Airport/Assets/Images/IMG-20190531-WA0000.jpg',
        isCurrent: true,
        id: 0
      },
      {
        link: this.rootClient + 'Promotions',
        image: this.rootImg + 'Airport/Assets/Images/descarga.jpg',
        isCurrent: false,
        id: 1
      },
      {
        link: this.rootClient + 'Explore',
        image: this.rootImg + 'Airport/Assets/Images/pensum.png',
        isCurrent: false,
        id: 2
      },
      {
        link: this.rootClient + 'Desierto',
        image: this.rootImg + 'Airport/Assets/Images/Desert.jpg',
        isCurrent: false,
        id: 3
      }
    ]
  }

  componentWillUnmount() {
    clearInterval(this.periodicallyChange);
  }

  componentDidMount() {
    this.periodicallyChange = setInterval(() => {
      this.nextClickedHandler();
    }, 6000);
  }

  changeSliderHandler = (event, id) => {
    const stateIndex = this.state.sliderStates.findIndex(s => {
      return s.id === id;
    })
    const state = {
      ...this.state.sliderStates[stateIndex]
    }
    state.isCurrent = true;
    const sliderStates = [...this.state.sliderStates];
    sliderStates.forEach(s => {
      s.isCurrent = false;
    })
    sliderStates[stateIndex] = state;
    this.setState({ sliderStates: sliderStates })
  }

  nextClickedHandler = () => {
    let stateIndex = this.state.sliderStates.findIndex(s => {
      return s.isCurrent;
    });
    const sliderStates = [...this.state.sliderStates];
    sliderStates.forEach(s => {
      s.isCurrent = false;
    });

    if (stateIndex + 1 >= sliderStates.length)
      stateIndex = 0;
    else
      stateIndex += 1;
    let state = {
      ...this.state.sliderStates[stateIndex]
    };
    state.isCurrent = true;
    sliderStates[stateIndex] = state;
    this.setState({ sliderStates: sliderStates });
  }

  prevClickedHandler = () => {
    let stateIndex = this.state.sliderStates.findIndex(s => {
      return s.isCurrent;
    });
    const sliderStates = [...this.state.sliderStates];
    sliderStates.forEach(s => {
      s.isCurrent = false;
    });
    if (stateIndex - 1 < 0)
      stateIndex = sliderStates.length - 1;
    else
      stateIndex -= 1;
    let state = {
      ...this.state.sliderStates[stateIndex]
    };
    state.isCurrent = true;

    sliderStates[stateIndex] = state;
    this.setState({ sliderStates: sliderStates });
  }

  render() {
    let current = this.state.sliderStates.findIndex(s => {
      return s.isCurrent;
    })
    let changers = this.state.sliderStates.map(state => (<Changer
      key={state.id}
      isSelected={state.isCurrent}
      clicked={(event) => this.changeSliderHandler(event, state.id)} />
    ));
    return (
      <div className={classes.Slider}>
        <a href={this.state.sliderStates[current].link}><img className={classes.Image} src={this.state.sliderStates[current].image} alt="promotion" /></a>
        <div className={classes.Selector}>
          {changers}
        </div>
        <div className={classes.PrevBtn} onClick={this.prevClickedHandler}> {'<'} </div>
        <div className={classes.nextBtn} onClick={this.nextClickedHandler}> {'>'} </div>
      </div>
    );
  }


};

export default Slider;