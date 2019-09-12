import React, { Component } from 'react';

import classes from './UserCard.module.css';
import UserOptions from './UserOptions/UserOptions';

class UserCard extends Component {
    state = {
        showUserOptions: false,
        userIsAuth: false,
        userInfo: {},
        notAuthOptions: {
            Login: {
                link: '/Login',
                exact: true
            },
            Register: {
                link: '/Register',
                exact: true
            }
        }
    }

    componentDidUpdate() {
        if (this.state.userIsAuth !== this.props.userIsAuth)
            fetch('/Airport/EndPoint')
                .then(r => r.json())
                .then(data => {
                    let info = {
                        options: data.options,
                        username: data.username,
                        userPicture: data.userPicture
                    };
                    this.setState({ userInfo: info, userIsAuth: this.props.userIsAuth });
                });
    }

    shouldComponentUpdate(nextProps, prevState) {
        return this.state.showUserOptions !== prevState.showUserOptions
            || this.state.userInfo.username !== prevState.userInfo.username
            || this.state.userInfo.userPicture !== prevState.userInfo.userPicture
            || this.state.userIsAuth !== prevState.userIsAuth
            || this.props.userIsAuth !== this.state.userIsAuth;
    }

    toggleUserOptionsHandler = () => {
        this.setState(prevState => {
            return { showUserOptions: !prevState.showUserOptions };
        });
    }

    render() {
        let userOps = this.state.notAuthOptions;
        let welcomeText = null;
        let img = '/Airport/Assets/DEFAULT/user.jpg';
        if (this.state.userIsAuth) {
            img = this.state.userInfo.userPicture;
            userOps = this.state.userInfo.options;
            welcomeText = <h3>{this.state.userInfo.username}</h3>;
        }
        return (
            <div className={classes.UserCardContainer} >
                {welcomeText}
                <div className={classes.UserCard}>
                    <div className={classes.Image}>
                        <img className={classes.ProfileImage} src={img} alt="profile" />
                    </div>
                    <UserOptions
                        clicked={this.props.closeSD}
                        toggleUserOps={this.toggleUserOptionsHandler}
                        items={userOps}
                        show={this.state.showUserOptions} />
                </div>
            </div>
        );
    }

};

export default UserCard;