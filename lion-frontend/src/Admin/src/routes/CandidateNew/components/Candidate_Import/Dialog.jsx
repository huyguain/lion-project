import React, { Component } from 'react';
import './Dialog.css';
import { connect } from 'react-redux';
import { clearData } from './action.js'

const DialogCandidate = props => {
    const handleOnclick = e => {
        e.preventDefault();
        props.history.push(`/admin/candidate`);
        props.clearData();
    }
    return (
        <div className="body-d" >
            <form className="b-d-form">
                <div className="message-d">
                    Result : {props.message.result}<br />
                    {(!props.message.CanidateImportError) ? '' : `CanidateImportError: ${props.message.CanidateImportError}<br />`}
                    {(!props.message.EnglishCreateError) ? '' : `EnglishCreateError: ${props.message.EnglishCreateError}<br />`}
                    {(!props.message.CandidateUpdateError) ? '' : `EnglishCreateError: ${props.message.CandidateUpdateError}<br />`}
                </div>
                <button
                    className="button-d"
                    onClick={e => handleOnclick(e)}
                >Ok</button>
            </form>
        </div>
    )
}

export default connect(null, { clearData })(DialogCandidate);