import React, { Component } from 'react';
import './PrintAnswer.css';

class PrintAnswer extends Component {
	render() {
		return (
			<div className="answer">{
				
				Object.keys(this.props.options).map((key, index) => {	
						if( this.props.multi && this.props.options[key]){
							return (
								<div className="answer-list">
									<input
										type="checkbox"
										checked={this.props.answer[key]}
										className="answer-checkbox"
										onChange={() => this.props.handleMultiOnlyAnswer(this.props.idQuestion, key, this.props.multi)}
									/>
									<label 
										className="answer-text"
										onClick={() => this.props.handleMultiOnlyAnswer(this.props.idQuestion, key, this.props.multi)}
									>{this.props.formatText(this.props.options[key])}</label>
								</div>
							)
						} else if(this.props.options[key]) {
							return (
								<div className="answer-list">
									<input
										type="radio"
										checked={this.props.answer[key]}
										className="answer-checkbox"
										onChange={() => this.props.handleMultiOnlyAnswer(this.props.idQuestion, key, this.props.multi)}
									/>
									<label 
										className="answer-text"
										onClick={() => this.props.handleMultiOnlyAnswer(this.props.idQuestion, key, this.props.multi)}
									>{this.props.formatText(this.props.options[key])}</label>
								</div>
							)
						}
				})
			}
			</div>
		)
	};
};
export default PrintAnswer;
