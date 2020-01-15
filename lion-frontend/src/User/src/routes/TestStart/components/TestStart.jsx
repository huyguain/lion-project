import React, { Component } from 'react';
import './TestStart.css';
import Account from '../../../common/Account/index'
import axios from 'axios';
import { connect } from 'react-redux';
import { resetAnswer } from '../../../../../actions';
import config from '../../../../../config'
import { Loader } from 'semantic-ui-react';

class TestStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            load: ''
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({ load: !this.state.load })
        axios.get(`${config.host}/showData`, { headers: { token } })
            .then(res => {
                if(res.status === 200) {
                    //this.props.resetAnswer();
                    this.setState({ data: res.data, load: !this.state.load })
                }
                
            }).catch(err => {
                (err) ? (alert(err)) : alert('Error!')
            })
    }
    startTest() {
        let token = localStorage.getItem('token')
        this.setState({ load: !this.state.load })
        if (!token) {
            this.props.history.push('/test')
            this.setState({ load: !this.state.load })
            return;
        }
        axios.post(`${config.host}/startTest`, { time: new Date() }, { headers: { token } })
            .then((response) => {
                if (response.status === 200) {
                    const endTime = response.data;
                    if (!endTime) {
                        this.props.history.push('/test');
                        this.setState({ load: !this.state.load })
                    } else {
                        //localStorage.removeItem('listAnswer');
                        this.setState({ load: !this.state.load })
                        this.props.history.push('/test/test-detail')
                    }
                }
            })
            .catch((error) => {
                console.log(`err`, error)
                console.log(2)
                //this.props.history.push('/test');
                this.setState({ load: !this.state.load })
                return null;
            });
    }
    render() {
        const { language, question, duration, passScore, name, mobile } = this.state.data;
        let inforUser = { name, mobile }
        if (this.state.load) return (
            <div>
                < Account inforUser={inforUser} />
                <div className='container-fluid testStart-body'>
                    <Loader active inline='centered' />
                </div>
            </div>
        )
        return (
            <div>
                <Account inforUser={inforUser} />
                <div>
                    <div className="container-fluid testStart-body" >
                        <div className="testStart-show">
                            <div className='test-text'>
                                <span>{language}</span>
                            </div>
                            <div className='testStart-show-title'>
                                <div className='testStart-Text1'>
                                    <span className='text-left'>Questions</span>
                                    <span className='text-right'>: {question}</span>
                                </div>
                                <div className='testStart-Text2'>
                                    <span className='text-left'>Duration</span>
                                    <span className='text-right'>: {duration} Minutes</span>
                                </div>
                                <div className='testStart-Text3'>
                                    <span className='text-left'>Pass Score</span>
                                    <span className='text-right'>: {passScore} %</span>
                                </div>
                                <div className="testStart-button">
                                    <button onClick={() => this.startTest()}
                                        onKeyPress={e => {
                                            if (e.key === 'Enter')
                                                this.startTest()
                                        }}
                                    >START >></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { resetAnswer })(TestStart);