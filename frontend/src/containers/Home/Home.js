import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Home.module.css';
import Slider from '../../components/Slider/Slider';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import prom1 from '../../assets/images/Desert.jpg';
import prom2 from '../../assets/images/Jellyfish.jpg';
import prom3 from '../../assets/images/Lighthouse.jpg';
import prom4 from '../../assets/images/Penguins.jpg';

class Home extends Component {
    render() {
        const div = document.createElement('div');

        return (
            <Auxiliary>
                <Slider />
                <div className={classes.Proms}>
                    <NavLink to='/promotions/1'>
                        <img src={prom1} alt="prom1" />
                    </NavLink>
                    <NavLink to='/promotions/2'>
                        <img src={prom2} alt="prom2" />
                    </NavLink>
                    <NavLink to='/promotions/3'>
                        <img src={prom3} alt="prom3" />
                    </NavLink>
                    <NavLink to='/promotions/4'>
                        <img src={prom4} alt="prom4" />
                    </NavLink>
                </div>
            </Auxiliary>
        );
    }
}

export default Home;