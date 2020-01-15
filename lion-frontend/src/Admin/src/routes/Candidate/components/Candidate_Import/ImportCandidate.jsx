import React from 'react';
import { Button, Loader } from 'semantic-ui-react';
import Upload from 'react-icons/lib/md/file-upload';
import PropTypes from 'prop-types';
import './ImportCandidate.css';
import { handleUploadCandidate, validateUploadCandidate, clearCandidate } from '../../../../../../actions';
import axios from 'axios';
import config from '../../../../../../config';
import { validateFileExcel } from '../../../../../../utility/index';
import * as XLSX from 'xlsx';
import { connect } from 'react-redux';
import Dialog from './Dialog.jsx';
import CandidateUploadTable from './CandidateUploadTable.jsx';

const UploadCandidate = props => {
	const sendData = file => {
		if (validateFileExcel(file.files[0]) === 0) {
			const reader = new FileReader();
			reader.onload = (evt) => {
				const wb = XLSX.read(evt.target.result, { type: 'binary' });
				const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
				props.handleUploadCandidate(data);
			};
			reader.readAsBinaryString(file.files[0]);
		} else {
			props.validateUploadCandidate(validateFileExcel(file.files[0]));
		}

	}

	const handleOnClickImportToDB = () => {
		let { data } = props
		console.log('data-import', data)
		let arrCandidate = data.filter(v => v.state !== 'Error')
		const userToken = localStorage.getItem('userToken');
		axios.post(`${config.host}/importCandidateByExcel`, { arrCandidate }, { headers: { userToken } })
			.then(res => {
				if (res.status === 200) {
					console.log('res.data', res.data)
					props.clearCandidate(res.data)
				} else {
					props.validateUploadCandidate(res.data.message)
				}

			}).catch(err => {
				console.log(`err`, err)
			})
	}

	return (
		<div className='u-c-form'>
			<div style={{ display: props.showDialog ? `block` : `none` }}>
				<Dialog
					message={props.showDialog ? props.messageSuccess : ''}
					history={props.history}
				/>
			</div>
			<ul>
				<div className='input-file'>
					<input
						type="file"
						ref={input => this.fileUpload = input}
					/>
				</div>
				<Button
					className="button-i-file"
					label="Upload"
					icon={<Upload />}
					onClick={e => sendData(this.fileUpload)}
				/>
			</ul>
			<ul className="i-error">{props.message}</ul>
			<div style={{ display: props.data.length ? `block` : `none` }} >
				<div className="u-c-preview">
					<h1>Preview candidate upload</h1>
					<button
						onClick={handleOnClickImportToDB}
					>Import candidate to database</button>
					<div style={{ width: `100%` }}>
						<CandidateUploadTable
							data={props.data}
						/>
					</div>
				</div>
			</div>


		</div>
	)
}

const mapStateToProps = state => {
	return {
		data: state.ImportCandidate.get("data"),
		message: state.ImportCandidate.get("message"),
		showDialog: state.ImportCandidate.get("show"),
		messageSuccess: state.ImportCandidate.get("messageSuccess")
	}
}

const mapDispatchToProps = {
	handleUploadCandidate,
	validateUploadCandidate,
	clearCandidate
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadCandidate);


