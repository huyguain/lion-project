import React, { Component } from 'react';
import defaultAvatar from './assets/defaultavatar.png';

import { Popover, Avatar } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { PopoverAnimationVertical } from 'material-ui/Popover';
class MenuUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.logout = this.logout.bind(this);
    }
    logout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    handleOnClick() {
        console.log('123')
        //history.push('/admin/generateCode')
    }
    render() {
        const { user, open, anchorEl } = this.props;
        return (
            <MuiThemeProvider>
                <div className='avatarFrame'>
                    <Popover className='userMenu'
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        onRequestClose={this.props.handleRequestClose}
                        animation={PopoverAnimationVertical}
                    >
                        <div className='userInfor'>
                            <div className='avatarFrame2'>
                                <Avatar src={defaultAvatar} title='avatar' />
                            </div>
                            <div className='userInforText'>
                                <div className='username'>{user.userName}</div>
                                <div className='useremail'>{user.userName + '@gmail.com'}</div>
                            </div>
                        </div>
                        <ul className='listmenu'>
                            <li className='menuItem'>
                                <div className='menuItemTitle' onClick={this.handleOnClick}>SETTING</div>
                            </li>
                            <li className='menuItem'>
                                <div className='menuItemTitle'>SETTING12345</div>
                            </li>
                            <li className='menuItem'>
                                <div className='menuItemTitle'>ChangePassword</div>
                            </li>
                            <li className='menuItem'>
                                <div className='menuItemTitle' onClick={this.logout}>Logout</div>
                            </li>
                        </ul>
                    </Popover>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default MenuUser;