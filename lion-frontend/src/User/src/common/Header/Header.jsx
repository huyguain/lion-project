import React, { Component } from 'react';
import java from './assets/java.jpg';
import python from './assets/Python.jpg';
import net from './assets/Net.jpg';
import jquery from './assets/jquery.jpg';
import azure from './assets/azure.jpg';
import html from './assets/html.jpg';
import js from './assets/js.jpg';
import css from './assets/css.jpg';
import './Header.css'
import { Link } from 'react-router-dom';
import DropdownMenu from './elements/DropdownMenu';
import MenuUser from './elements/MenuUser';
import { checkUser } from '../../../../utility';
import axios from 'axios';
import config from '../../../../config'
import SearchCourse from './elements/SearchCourse';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userName: '',
            navExpanded: false,
            display: 'none'
        }
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        const userName = checkUser();
        if (userName) {
            this.setState({ userName });
        }
        axios.get(`${config.host}/list-learning-path`).
            then(
            data => {
                this.setState({ data: data.data.data })
            }
            ).catch(
            err => console.log(err)
            )
    }
    logout() {
        const { history } = this.props;
        localStorage.clear();
        history.push('/');
        this.setState({ userName: '' })
    }
    handleOnclickSignIn() {
        const { history } = this.props;
        history.push('/sign-in');
    }
    setNavExpanded(expanded) {
        this.setState({ navExpanded: expanded });
    }

    closeNav() {
        this.setState({ navExpanded: false });
    }
    openNav() {
        const { navExpanded: expanded } = this.state;
        this.setState({ navExpanded: !expanded });
    }

    closeDialog = () => {
        this.setState({ display: 'none' })
    }

    render() {
        const { userName } = this.state;
        const { history } = this.props;
        const guestLinks = (
            <div className="header-title-signin" onClick={() => this.handleOnclickSignIn()}>Sign in</div>
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
                    <div className='col-xs-7 col-md-7 col-sm-7 col-lg-7' style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <DropdownMenu
                            history={history}
                            listMenus={this.state.data}
                        />
                        <SearchCourse
                            history={history}
                        />
                    </div>
                    <ul className='choose_page col-xs-3 col-sm-3 col-md-3 col-lg-3' >
                        <li className='sigin'>
                            <div className='detail'>
                                {this.state.userName ? <MenuUser history={history} logout={this.logout} user={this.state} /> : guestLinks}
                            </div>
                            <div className='add_detail'></div>
                        </li>
                        <li className='entrytest' onClick={_ => this.props.history.push('/test')}>
                            <div className='header-title'>Entry Test</div>
                        </li>
                    </ul>
                </div>
            </div >
        )
    }
}

export default (Header);