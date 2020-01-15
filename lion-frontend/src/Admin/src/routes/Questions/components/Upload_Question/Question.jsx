import React, { Component } from 'react';
import axios from 'axios'
import Upload from 'react-icons/lib/md/file-upload'
import { Button, Loader } from 'semantic-ui-react';
import { showNav } from '../../../../../../actions';
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux';
import config from '../../../../../../config'

class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filedb: '',
            data: '',
            fileError: '',
            message: '',
            load: false
        }

    }
    // state = {
    //     filedb: '',
    //     data: '',
    //     fileError: '',
    //     message: '',
    //     load: false,
    //     imagePreview: { preview: '' },
    //     imagePreview2: { preview: '' }
    // }
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
            axios.post(`${config.host}/uploadFile`, formData, {
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
                        this.props.history.push("/admin/question")
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
    componentDidMount() {
        this.props.showNav('NAV_QUESTION');
    }
    render() {
        let { imagePreview1, imagePreview2, showImages } = this.state;
        if (this.state.load)
            return (
                <div className="cover-loader">
                    <Loader active inline='centered' />
                </div>
            )
        return (
            <div className="row justify-content-center cover-layout-editor">
                <div col-md-8 >
                    <Button containerElement='label'>
                        <input type="file" required name="anh_tuan"
                            onChange={(e) => this._handleImageChange(e)}
                            onError={this.state.filedb} />
                    </Button>
                    <Button label="Import" className="uploadFile-admin"
                        onClick={_ => this.sendData()}
                        icon={<Upload />}
                    /><br />
                    <span style={{ color: "red" }}>{this.state.fileError}</span><br />
                    <span style={{ color: "red" }}>{this.state.message}</span><br />
                </div>
            </div>
        )
    }
}
export default connect(null, { showNav })(Question);

