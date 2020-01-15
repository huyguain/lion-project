import React, { Component } from 'react';
import defaultavatar from './assets/defaultavatar.png';
import MenuUser from './MenuUser';

class LoginAdminMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    handleTouchTap(event) {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };
    handleRequestClose() {
        this.setState({
            open: false,
        });
    };
    render() {
        const { user, history } = this.props;
        const { open, anchorEl } = this.state;
        return (
            <div className={"offset-md-7 offset-sm-7 col-md-3 col-lg-3 LoginMenuAdmin"}>
                <div className={"siginAdmin"}>
                    <div className={"avatarAcountAdmin"}>
                        <img height='100%' src={defaultavatar} alt="error Avatar" />
                    </div>
                    <div className={"siginAcountAdmin"}>
                        {user.userName ? user.userName : 'default name'}
                    </div>
                    <span className={"classes.siginDivision"} />
                </div>
                <div className={"opitionAdmin"}>
                    <i className={"fa fa-ellipsis-v iconOpition"}
                        aria-hidden="true"
                        onClick={this.handleTouchTap}
                    ></i>
                    <MenuUser user={user} history={history} open={open} anchorEl={anchorEl}
                        handleRequestClose={this.handleRequestClose} />
                </div>
            </div >
        )
    }
}

export default LoginAdminMenu;