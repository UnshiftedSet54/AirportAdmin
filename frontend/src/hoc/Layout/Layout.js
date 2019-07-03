import React, { Component } from 'react';

import classes from './Layout.module.css';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        toolbarItems: {
            Home: {
                link: '/home',
                exact: true
            },
            Flights: {
                link: '/flights',
                exact: false
            },
            Explore: {
                link: '/explore',
                exact: true
            },
            About: {
                link: '/about',
                exact: true
            },
            Promotions: {
                link: '/promotions',
                exact: false
            }
        },
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    openSideDrawerHandler = () => {
        this.setState(prevState => (
            { showSideDrawer: !prevState.showSideDrawer}
        ));
    }

    render() {

        return (
            <Auxiliary>
                <Toolbar
                    items={this.state.toolbarItems} 
                    openSideDrawer={this.openSideDrawerHandler} />
                <SideDrawer
                    items={this.state.toolbarItems} 
                    open={this.state.showSideDrawer} 
                    close={this.closeSideDrawerHandler}  />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;