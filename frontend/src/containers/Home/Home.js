import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Home.module.css';
import Slider from '../../components/Slider/Slider';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Home extends Component {
    render() {
        const div = document.createElement('div');

        return (
            <Auxiliary>
                <Slider />
                <div className={classes.Proms}>
                    <NavLink to='/promotions/1'>
                        <div className={classes.PromsTextContainer}>
                            <p className={classes.PromsText}>Promotion #1</p>
                        </div>
                        <img src={'/Airport/Assets/Images/prom8.jpg'} alt="prom1" />
                    </NavLink>
                    <NavLink to='/promotions/2'>
                        <div className={classes.PromsTextContainer}>
                            <p className={classes.PromsText}>Promotion #2</p>
                        </div>
                        <img src={'/Airport/Assets/Images/prom7.jpg'} alt="prom2" />
                    </NavLink>
                    <NavLink to='/promotions/3'>
                        <div className={classes.PromsTextContainer}>
                            <p className={classes.PromsText}>Promotion #3</p>
                        </div>
                        <img src={'/Airport/Assets/Images/prom6.jpg'} alt="prom3" />
                    </NavLink>
                    <NavLink to='/promotions/4'>
                        <div className={classes.PromsTextContainer}>
                            <p className={classes.PromsText}>Promotion #4</p>
                        </div>
                        <img src={'/Airport/Assets/Images/prom5.jpg'} alt="prom4" />
                    </NavLink>
                </div>
            </Auxiliary>
        );
    }
}

export default Home;