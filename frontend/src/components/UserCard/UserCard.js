import React, { Component } from 'react';

import classes from './UserCard.module.css';
import UserOptions from './UserOptions/UserOptions';
import defaultPic from '../../assets/images/Chrysanthemum.jpg';

class UserCard extends Component {
    state = {
        showUserOptions: false,
        userIsAuth: false,
        notAuthOptions: {
            Login: {
                link: '/login',
                exact: true
            },
            Register: {
                link: '/register',
                exact: true
            }
        }
    }

    toggleUserOptionsHandler = () => {
        this.setState(prevState => {
            return { showUserOptions: !prevState.showUserOptions };
        });
    }

    render() {
        let userOps = this.state.notAuthOptions;
        if (this.state.userIsAuth) {

        }
        
        
        return (
            <div className={classes.UserCard}>
                <div className={classes.Image}>
                    <img  
                        style={{
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            borderRadius: '100%'
                        }}
                        src={defaultPic} alt="profile"/>
                </div>
                <UserOptions
                    clicked={this.props.closeSD}
                    toggleUserOps={this.toggleUserOptionsHandler}
                    items={userOps}
                    show={this.state.showUserOptions} />
            </div>
            );
        }
    
    };
    
export default UserCard;