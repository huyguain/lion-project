import React, { Component } from 'react'
import './TestFinish.css'
import { Link } from 'react-router-dom';
import Account from '../../../common/Account'
import axios from 'axios';
import config from '../../../../../config';
import { Loader } from 'semantic-ui-react';

class TestFinish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            account: {},
            load: false,
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        this.setState({ load: !this.state.load })
        axios.get(`${config.host}/finish-test`, { headers: { token } })
            .then(res => {
                this.setState({
                    data: res.data.data,
                    account: res.data.account,
                    load: !this.state.load
                })
                localStorage.removeItem('token');
            }).catch(err => {
                this.setState({ load: !this.state.load })
                alert('Error!')
            })
    }
    render() {
        let { result, point, totalQuestion, duration } = this.state.data
        let { name, mobile, language } = this.state.account;
        let inforUser = { name, mobile };
        if (this.state.load) return (
            <div>
                <Account inforUser={inforUser} />
                <div className='testFinish-body container-fluid'>
                    <Loader active inline='centered' />
                </div>
            </div>
        )
        return (
            <div>
                <Account inforUser={inforUser} />
                <div className='testFinish-body container-fluid'>
                    <div className='testFinish-show'>
                        <div className='testFinish-show-span'>
                            <span >{`${language}`}</span>
                        </div>
                        <div className="testFinish-show-title">
                            <div className="table-row">
                                <div className="table-result-field">Test Time</div>
                                <div className="table-result-value">: {duration} Minutes</div>
                            </div>

                            <div className="table-row">
                                <div className="table-result-field">Correct Answers</div>
                                <div className="table-result-value">: {point}/{totalQuestion}</div>
                            </div>
                            
                            <div className='testFinish-button'>
                                <button onClick={_ => this.props.history.push('/')}>FINISH</button>
                            </div>
                        </div>
                        <img className="star-top" src={require("../assets/start-top.png")} alt="Congratulations" />
                        <img className="star-bottom" src={require("../assets/start-bottom.png")} alt="Congratulations" />
                        <Link to='/' id="home"></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default TestFinish;