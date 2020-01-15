import React from 'react';
import './LanguageAndCountDown.css';
import PropTypes from 'prop-types'
import Clock from '../Clock/Clock.jsx';

const LanguageAndCountDown = props => {
	return (
		<div className="form-content" >
			<div className="form-content-text1">
				<div className="text">{props.data.language}</div>
				<Clock history={props.history} />
			</div>
			<div className="form-content-text2">{props.data.lengthQuestion} Question</div>
		</div>
	)

}

export default LanguageAndCountDown;