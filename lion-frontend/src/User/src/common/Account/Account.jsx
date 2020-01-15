import React, { Component } from 'react';
import './Account.css';
class Account extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="container-fluid testCode-body-header">
                <div className="col-md-9"></div>
                <div className="col-md-3">
                    <div className='testCode-account' >
                        <div className='testCode-name'>{this.props.inforUser.name}</div>
                        <div className='testCode-mobile'>(+84) {this.props.inforUser.mobile}</div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Account;