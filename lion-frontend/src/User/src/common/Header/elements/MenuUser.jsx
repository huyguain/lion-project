import React, { Component } from 'react';
import defaultAvatar from '../assets/defaultavatar.png';
import { Popover, Avatar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { PopoverAnimationVertical } from 'material-ui/Popover';
import config from '../../../../../config'
import jwt from 'jsonwebtoken';
class MenuUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userName: '',
            role: '',
            userId: ''
        };
    }
    componentDidMount() {
        const { user } = this.props;
        let userToken = localStorage.getItem('userToken');
        jwt.verify(userToken, config.secret, (err, decoded) => {
            const { userId, role } = decoded;
            this.setState({
                userName: user.userName,
                userId,
                role
            })

        })
    }
    handleTouchTap = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleOnClick(role, userId) {
        const { history } = this.props;
        (role === 4) ? history.push('/list-myCourse') : history.push('/admin/generate');
    }
    changPass(role, userId) {
        if (role === 1) {
            alert(`Can Not Change PassWord`)
        } else {
            this.props.history.push('/sign-in')
        }
    }
    render() {
        const { userName, userId, role } = this.state;
        return (
            <MuiThemeProvider>
                <div className='avatarFrame'>
                    <Avatar src={defaultAvatar}
                        onClick={this.handleTouchTap}
                    />
                    <Popover className='userMenu'
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        onRequestClose={this.handleRequestClose}
                        animation={PopoverAnimationVertical}
                    >
                        <div className='userInfor'>
                            <div className='avatarFrame2'>
                                <Avatar src={defaultAvatar} title='avatar' />
                            </div>
                            <div className='userInforText'>
                                <div className='username'>{userName}</div>
                            </div>
                        </div>
                        <ul className='listmenu'>
                            <li className='menuItem'>
                                <div className='menuItemTitle' onClick={_ => this.handleOnClick(role, userId)}>{(role === 4) ? 'My Course' : 'Admin'}</div>
                            </li>
                            <li className='menuItem'>
                                <div className='menuItemTitle'
                                    onClick={_ => this.changPass(role, userId)}>Change Password</div>
                            </li>
                            <li className='menuItem'>
                                <div className='menuItemTitle'>SETTING</div>
                            </li>
                            <li className='menuItem'>
                                <div className='menuItemTitle' onClick={this.props.logout} >Logout</div>
                            </li>
                        </ul>
                    </Popover>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default MenuUser;