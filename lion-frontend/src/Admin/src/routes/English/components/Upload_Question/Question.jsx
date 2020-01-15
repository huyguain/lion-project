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
            load: false,
            testCode: '',
            imagePreview1: { preview: '' },
            imagePreview2: { preview: '' },
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
            formData.append('testCode', this.state.testCode)
            formData.append('image1', this.state.imagePreview1)
            formData.append('image2', this.state.imagePreview2)
            formData.append('filedb', this.state.filedb);
            formData.append("data", this.state.filedb.name);
            const userToken = localStorage.getItem('userToken')
            axios.post(`${config.host}/uploadFileEnglish`, formData, {
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
                        this.props.history.push("/admin/english")
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
    onDropImage1(acceptedFiles, rejectedFiles) {
        const imagePreview1 = acceptedFiles[0];
        this.setState({ imagePreview1 });
    }
    onDropImage2(acceptedFiles, rejectedFiles) {
        const imagePreview2 = acceptedFiles[0];
        this.setState({ imagePreview2 });
    }
    shouldShowImages(e) {
        this.setState({
            showImages: e.target.checked,
            imagePreview1: { preview: '' },
            imagePreview2: { preview: '' }
        })
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
                    <div>
                        TestCode: <input type="text" onChange={e => this.setState({ testCode: e.target.value })}></input>
                        <Dropzone className="dropzone" onDrop={(a, b) => this.onDropImage1(a, b)} style={{
                            backgroundImage: `url(${imagePreview1.preview})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 100%',
                            zIndex: '1',
                            align: "center"
                        }}>
                        </Dropzone>
                        <br />
                        <Dropzone className="dropzone" onDrop={(a, b) => this.onDropImage2(a, b)} style={{
                            backgroundImage: `url(${imagePreview2.preview})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 100%',
                            zIndex: '1',
                            align: "center"
                        }} />
                    </div>
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
export default connect(null, { showNav })(Question);

