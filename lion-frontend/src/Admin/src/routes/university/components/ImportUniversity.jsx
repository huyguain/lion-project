import React, { Component } from 'react';
import axios from 'axios'
import Upload from 'react-icons/lib/md/file-upload';
import { Button, Loader } from 'semantic-ui-react';
import config from '../../../../../config'

class ImportUniversity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filedb: '',
            data: '',
            fileError: '',
            message: '',
            load: false,
            showImages: false
        }

    }
    validate = () => {
        let filedb = this.state.filedb
        let fileValidate = ['.xlsx', '.csv']
        let isError = false;
        const errors = {
            fileError: ''
        }
        if (filedb === '') {
            errors.fileError = 'Require files';
            isError = true
        } else if (fileValidate.indexOf(filedb.name.substring(filedb.name.lastIndexOf('.'))) < 0) {
            errors.fileError = 'Please choose  corect file!!'
            isError = true
        }
        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            })
        }
        return isError;
    }
    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(e)
        reader.onloadend = () => {
            this.setState({
                filedb: file,
                data: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
    sendData() {
        this.setState({
            fileError: ''
        })
        this.setState({ load: !this.state.load })
        const err = this.validate();
        if (!err) {
            const formData = new FormData();
            formData.append('filedb', this.state.filedb);
            formData.append("data", this.state.filedb.name);
            const userToken = localStorage.getItem('userToken')
            console.log('filedb', this.state.filedb)
            axios.post(`${config.host}/import-university`, formData, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    userToken
                }
            })
                .then(res => {
                    console.log('res', res.message)
                    if (res.status === 200) {
                        this.setState({
                            load: !this.state.load
                        })
                        this.props.history.push("/admin/university")
                    } else {
                        this.setState({
                            load: !this.state.load,
                            message: res.data.message
                        })
                    }
                }).catch(err => {
                    this.setState({ load: !this.state.load })
                    console.log('error', err)
                    alert('Error!')
                })
        }
    }
    render() {
        let { imagePreview1, imagePreview2 } = this.state;
        if (this.state.load)
            return (
                <div className="cover-loader">
                    <Loader active inline='centered' />
                </div>
            )
        return (
            <div className="row justify-content-center cover-layout-editor">
                <div col-md-8 >
                    <input type="file" id="fileEnglish" style={{ width: "55%" }}
                        onChange={(e) => this._handleImageChange(e)}
                        onError={this.state.filedb} />
                    <Button label="Import" className="uploadFile-admin"
                        onClick={_ => this.sendData()}
                        icon={<Upload />}
                    />
                    <span style={{ color: "red" }}>{this.state.fileError}</span><br />
                    <span style={{ color: "red" }}>{this.state.message}</span><br />
                </div>
            </div>
        )
    }
}
export default ImportUniversity;

