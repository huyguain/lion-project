import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginAdminMenu from './LoginAdminMenu';
import { checkUser } from '../../../../utility';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
        this.handleOnclick = this.handleOnclick.bind(this);
    }
    handleOnclick() {
        const { history } = this.props;
        history.push('/sign-in');
    }
    componentDidMount() {
        const userName = checkUser();
        if (userName) {
            this.setState({ userName });
        }
    }
    render() {
        const { userName } = this.state;
        const { history } = this.props;
        const guestLinks = (
            <div className="header-title-signin" onClick={() => this.handleOnclick()}>Sign in</div>
        )
        return (
            <div className='largenav' >
                <div className='container-fluid wrap'>
                    <div className='logo col-xs-2 col-md-2 col-sm-2 col-lg-2 '>
                        <Link to='/' style={{ textDecoration: 'none' }}><div style={{
                            width: '100%',
                            fontFamily: 'Myriad Pro Regular',
                            textAlign: 'center',
                            fontSize: '16px',
                            color: '#111111',
                        }}>Fresher Academy</div></Link>
                    </div>
                    <LoginAdminMenu history={history} user={this.state} />
                </div>

            </div>
        )
    }
}


export default (Header);