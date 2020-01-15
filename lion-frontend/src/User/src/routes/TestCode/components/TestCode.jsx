import React, { Component } from 'react'
import './TestCode.css';
import config from '../../../../../config'
import axios from 'axios';
import { Loader } from 'semantic-ui-react';

class TestCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            load: false
        }
    }
    componentDidMouth() {
        localStorage.removeItem("timeStart");
        localStorage.removeItem("listAnswer");
        localStorage.removeItem("timeRest");
    }
    checkCode() {
        let obj = {
            code: this.testCode.value,
            timeNow: new Date()
        }
        if (obj.code === '') {
            this.setState({ message: 'Require code' })
        } else {
            this.setState({ load: !this.state.load })
            axios.post(`${config.host}/checkCode`, obj)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token);
                        this.setState({ load: !this.state.load })
                        this.props.history.push('/test/test-start')
                    } else {
                        this.setState({ message: res.data.message, load: !this.state.load })
                        this.testCode.value = ''
                    }
                }).catch(err => {
                    this.setState({ load: !this.state.load })
                    alert('Server Error!')
                })
        }
    }
    render() {
        if (this.state.load) return (
            <div className='testCode-body-code'>
                <Loader active inline='centered' />
            </div>
        )
        return (
            <div className='testCode-body-code'>
                <div className='testCode-content'>
                    <div className='testCode-text'><span>YOUR TEST CODE</span></div>
                    <div className="testCode-input" >
                        <input
                            onKeyPress={e => {
                                if (e.key === 'Enter')
                                    this.checkCode()
                            }}
                            className='testCode-input-detail'
                            type="text" placeholder='Enter Test Code' ref={(input) => { this.testCode = input; }}
                            required />
                        <button className='testCode-button'
                            onKeyPress={e => {
                                if (e.key === 'Enter')
                                    this.checkCode()
                            }}
                            onClick={_ => this.checkCode()}>Go</button>
                    </div>
                    <div className='testCode-messages'><span style={{ color: "red" }}>{this.state.message}</span><br /></div>
                </div>
            </div>
        )
    }
}
export default TestCode;