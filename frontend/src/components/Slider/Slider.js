import React, { Component } from 'react';

import classes from './Slider.module.css';
import Changer from './Changer/Changer';


class Slider extends Component {
  periodicallyChange = null;
  state = {
    message: '',
    sliderStates: [
      {
        link: '/Promotions',
        image: '/Airport/Assets/Images/autumn-beautiful-color-2734512.jpg',
        isCurrent: true,
        id: 0,
        title: 'Promotions'
      },
      {
        link: '/Promotions',
        image: '/Airport/Assets/Images/4k-wallpaper-bay-beach-1456297.jpg',
        isCurrent: false,
        id: 1,
        title: 'Promotions'
      },
      {
        link: '/Explore',
        image: '/Airport/Assets/Images/adventure-antique-blank-269923.jpg',
        isCurrent: false,
        id: 2,
        title: 'Explore'
      },
      {
        link: '/Flights',
        image: '/Airport/Assets/Images/a380-aircraft-airline-358220.jpg', //aerial-aerial-view-aeroplane-59519.jpg
        isCurrent: false,
        id: 3,
        title: 'Flights'
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
        <a className={classes.Anchor} href={this.state.sliderStates[current].link}>
          <div className={classes.Title}>
            <h1>{this.state.sliderStates[current].title}</h1>
          </div>
          <img className={classes.Image} src={this.state.sliderStates[current].image} alt="" />
        </a>
        <div className={classes.PrevBtn} onClick={this.prevClickedHandler}> {'<'} </div>
        <div className={classes.Selector}>
          {changers}
        </div>
        <div className={classes.nextBtn} onClick={this.nextClickedHandler}> {'>'} </div>
      </div>
    );
  }


};

export default Slider;