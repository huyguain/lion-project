import React, { Component } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import axios from 'axios'
import PropTypes from 'prop-types';
import config from '../../../../config'
import 'react-select/dist/react-select.css';

const listGraduationYear = []
for (let i = -10; i < 11; i++) {
    const year = new Date().getFullYear() + i
    listGraduationYear.push({ value: year, label: year })
}
const listWorkingForm = [
    { value: true, label: 'Full Time' },
    { value: false, label: 'Part Time' }
]
const initialState1 = {
    fullName: '',
    email: '',
    jobApply: '',
    location: '',
    graduationYear: '',
    cpa: '',
    phoneNumber: '',
    category: '',
    major: '',
    university: '',
    typeJob: '',
    wordExperience: '',

    formErrors: {},
    filedb: '',
    data: ''
};
const initialState2 = {
    fullName: '',
    email: '',
    graduationYear: '',
    cpa: '',
    phoneNumber: '',
    major: '',
    university: '',
    typeJob: '',
    wordExperience: '',
    formErrors: {},
    filedb: '',
    data: ''
};
class FresherJobForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            jobApply: '',
            location: '',
            graduationYear: '',
            cpa: '',
            phoneNumber: '',
            category: '',
            major: '',
            university: '',
            typeJob: '',
            wordExperience: '',

            listLocation: [],
            listJob: [],
            listCategory: [],
            listUniversity: [],
            formErrors: {},
            filedb: '',
            data: ''
        }
    }
    componentDidMount() {
        if (this.props.idJob) {
            this.setState({
                jobApply: this.props.idJob,
                location: this.props.location._id,
                category: this.props.category._id
            })
            const { category, location } = this.props
            axios.get(`${config.host}/list-jobs/${category.title}/${location._id}`)
                .then(
                data => {
                    let listJob = data.data.data.map(e => {
                        return { value: e._id, label: e.title }
                    })
                    this.setState({ listJob })
                }
                ).catch(
                err => console.log(err)
                )
        }
        axios.get(`${config.host}/list-location`)
            .then(
            data => {
                let listLocation = data.data.data.map(e => {
                    return { value: e._id, label: e.zone }
                })
                this.setState({ listLocation })
            }
            ).catch(
            err => console.log(err)
            )
        axios.get(`${config.host}/list-category`)
            .then(
            data => {
                let listCategory = data.data.data.map(e => {
                    return { value: e._id, label: e.title }
                })
                this.setState({ listCategory })
            }
            ).catch(
            err => console.log(err)
            )
        axios.get(`${config.host}/list-university`)
            .then(data => {
                let listUniversity = data.data.data.map(e => {
                    return { value: e._id, label: e.name }
                })
                this.setState({ listUniversity })
            }
            ).catch(
            err => console.log(err)
            )

    }
    validateAndSend(e) {
        const { fullName, email, jobApply, location, graduationYear,
            cpa, phoneNumber, university, category, major, typeJob, wordExperience, filedb } = this.state;
        let formErrors = {}, checkTypeFile, checkSizeFile;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let flag = false
        formErrors.fullName = (fullName == '') ? true : false
        formErrors.phoneNumber1 = (phoneNumber == '') ? 'Not be empty!' : ''
        formErrors.phoneNumber2 = (!/^0\d{9,10}$/.test(phoneNumber)) ? 'Nhập sai SĐT' : ''
        formErrors.email1 = (email == '') ? 'Not be empty!' : ''
        formErrors.email2 = (!re.test(email)) ? 'Email sai định dạng' : ''
        formErrors.jobApply = (jobApply == '') ? true : false
        formErrors.location = (location == '') ? true : false
        formErrors.university = (university == '') ? true : false
        formErrors.graduationYear = (graduationYear == '') ? true : false
        formErrors.cpa = (cpa === '' || cpa <= 0 || !Number.isFinite(Number(cpa))) ? true : false
        formErrors.category = (category == '') ? true : false
        formErrors.major = (major == '') ? true : false
        formErrors.typeJob = (typeJob == '') ? true : false
        formErrors.wordExperience = (wordExperience == '') ? true : false
        if (filedb.name) {
            let listType = ["doc", "docx", "pdf", "jpeg", "png"]
            let fileType = filedb.name.split('.')[1]
            checkTypeFile = listType.indexOf(fileType) !== -1
            checkSizeFile = (filedb.size < 3145728) ? true : false
            formErrors.file1 = checkTypeFile ? '' : 'Incorrect formating'
            formErrors.file2 = checkSizeFile ? '' : 'File too large'
        }
        this.setState({
            formErrors
        })
        if (!Object.values(formErrors).every(e => !e)) return 0
        const formData = new FormData();
        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('jobApply', jobApply.value || jobApply)
        formData.append('location', location.value || location);
        formData.append('university', university.value);
        formData.append("graduationYear", graduationYear.value);
        formData.append('cpa', cpa)
        formData.append('phoneNumber', phoneNumber)
        formData.append('category', category.value || category)
        formData.append('major', major);
        formData.append("typeJob", typeJob.value);
        formData.append('wordExperience', wordExperience);
        formData.append('filedb', filedb);
        formData.append("data", filedb.name);
        axios.post(`${config.host}/create-applier`, formData, {
            headers: {
                'Content-Type': `multipart/form-data`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                } else {
                    console.log('err')
                }
                if (!this.props.idJob) this.setState(initialState1)
                else this.setState(initialState2)
                this.props.hiddenModal
                alert('Successful!')
            }).catch(err => {
                alert('Error!')
                if (!this.props.idJob) this.setState(initialState1)
                else this.setState(initialState2)
            })
    }
    validateResult(field) {
        return (
            <span style={{ color: "red" }}>
                {field ? 'Input invalid!' : ''}
            </span>
        )
    }
    changeLocation = async (location) => {
        let { category } = this.state
        await this.setState({ location })
        this.setState({ jobApply: '' })
        if (category) {
            axios.get(`${config.host}/list-jobs/${category.label}/${location.value}`).
                then(
                data => {
                    let listJob = data.data.data.map(e => {
                        return { value: e._id, label: e.title }
                    })
                    this.setState({ listJob })
                }
                ).catch(
                err => console.log(err)
                )
        }
    }
    changeCategory = async (category) => {
        let { location } = this.state
        await this.setState({ category })
        this.setState({ jobApply: '' })
        if (location) {
            axios.get(`${config.host}/list-jobs/${category.label}/${location.value}`).
                then(
                data => {
                    let listJob = data.data.data.map(e => {
                        return { value: e._id, label: e.title }
                    })
                    this.setState({ listJob })
                }
                ).catch(
                err => console.log(err)
                )
        }
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
    handleCancel() {
        if (!this.props.idJob) this.setState(initialState1)
        else this.setState(initialState2)
        this.props.hiddenModal()
    }
    render() {
        const { hiddenModal, locationProp, categoryProp, idJob, titleJob } = this.props
        const { fullName, email, jobApply, location, graduationYear, listCategory,
            cpa, phoneNumber, category, major, typeJob, wordExperience, listLocation, listJob,
            university, listUniversity, formErrors } = this.state
        const styleErr = {
            border: "solid 1px #ff0000",
            backgroundColor: "#fff3f3"
        }
        return (
            <div className={'bodyFormPage'} id="form-apply-job">
                <div className={'bodyFormTitle'}>
                    <p>
                    <b>Nộp đơn đăng ký trong 1 bước tại bản đăng ký online dưới đây.<br/>
                    Những bạn ứng tuyển vào vị trí đang tuyển sẽ được liên hệ 
                    lại ngay sau khi bên Tuyển dụng nhận được CV.<br/>
                    Những bạn ứng tuyển vào vị trí chưa có trong mục tuyển dụng 
                    sẽ được đưa CV vào mục chờ đến khi tuyển dụng có vị trí các bạn đã đăng ký.</b>
                        {/*<b className={'bodyFormBoidTitle'}>
                            {` tuyendung@fsoft.com.vn `}*/}
                        {/*</b>*/}
                        {/*{`hoặc LH Ms Mai`}*/}
                        {/*<b className={'bodyFormBoidTitle'}>*/}
                            {/*{` 0901.234.568`}*/}
                        {/*</b>*/}
                    </p>
                    <div style={{
                        height: 1, width: '50%',
                        backgroundColor: '#000000', opacity: '0.4'
                    }} />
                </div>
                <div className={classNames('row', 'rowElement')} >
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="name" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Họ tên bạn:</b>
                            </label>
                            <div className={'FieldObligatory'}>
                                <input
                                    style={formErrors.fullName ? styleErr : {}}
                                    placeholder={formErrors.fullName ? 'No be empty!' : 'Please enter...'}
                                    name="name"
                                    type='text'
                                    value={fullName}
                                    onChange={e => this.setState({ fullName: e.target.value })}
                                    className={'InputElementForm'}
                                    maxLength={30}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        {this.validateResult(formErrors.phoneNumber)}
                        <div className={'ElementFormInput'}>
                            <label htmlFor="phone" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Số điện thoại:</b>
                            </label>
                            <div className={'FieldObligatory'}>
                                <input
                                    style={(formErrors.phoneNumber1 || formErrors.phoneNumber2) ? styleErr : {}}
                                    placeholder={formErrors.phoneNumber1 ? formErrors.phoneNumber1 : 'Please enter...'}
                                    name="name"
                                    type='text'
                                    value={phoneNumber}
                                    onChange={e => this.setState({ phoneNumber: e.target.value })}
                                    className={'InputElementForm'}
                                    maxLength={30}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames('row', 'rowElement')} >
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        {this.validateResult(formErrors.email)}
                        <div className={'ElementFormInput'}>
                            <label htmlFor="email" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Email:</b>
                            </label>
                            <div className={'FieldObligatory'}>
                                <input
                                    style={(formErrors.email1 || formErrors.email2) ? styleErr : {}}
                                    placeholder={formErrors.email1 ? formErrors.email1 : 'Please enter...'}
                                    name="name"
                                    type='text'
                                    value={email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                    className={'InputElementForm'}
                                    maxLength={30}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="program" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Chương trình đào tạo:</b>
                            </label>
                            <Select
                                disabled={this.props.idJob ? true : false}
                                style={formErrors.category ? styleErr : {}}
                                placeholder={formErrors.category ? 'No be empty!' : 'Select...'}
                                name="program"
                                value={category}
                                options={listCategory}
                                onChange={category => this.changeCategory(category)}
                                className={'SelectElementForm'}
                            />
                        </div>
                    </div>
                </div>
                <div className={classNames('row', 'rowElement')} >
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="major" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Tên khoa:</b>
                            </label>
                            <div className={'FieldObligatory'}>
                                <input
                                    style={formErrors.major ? styleErr : {}}
                                    placeholder={formErrors.major ? 'No be empty!' : 'Please enter...'}
                                    name="major"
                                    value={major}
                                    type='text'
                                    onChange={e => this.setState({ major: e.target.value })}
                                    className={'InputElementForm'}
                                    maxLength={30}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="placework" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Địa điểm làm việc</b>
                            </label>
                            <Select
                                disabled={this.props.idJob ? true : false}
                                style={formErrors.location ? styleErr : {}}
                                placeholder={formErrors.location ? 'No be empty!' : 'Select...'}
                                name="placework"
                                value={location}
                                options={listLocation}
                                onChange={location => this.changeLocation(location)}
                                className={'SelectElementForm'}
                            />
                        </div>
                    </div>
                </div>
                <div className={classNames('row', 'rowElement')} >
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="major" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Tên trường:</b>
                            </label>
                            <Select
                                style={formErrors.university ? styleErr : {}}
                                placeholder={formErrors.university ? 'No be empty!' : 'Select...'}
                                name="university"
                                value={university}
                                options={listUniversity}
                                onChange={university => this.setState({ university })}
                                className={'SelectElementForm'}
                            />
                        </div>
                    </div>
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="program" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Các vị trí đang tuyển:</b>
                            </label>
                            <Select
                                disabled={location ? false : true}
                                disabled={this.props.idJob ? true : false}
                                style={formErrors.jobApply ? styleErr : {}}
                                placeholder={formErrors.jobApply ? 'No be empty!' : 'Please enter...'}
                                name="program"
                                value={jobApply}
                                options={listJob}
                                onChange={jobApply => this.setState({ jobApply })}
                                className={'SelectElementForm'}
                            />
                        </div>
                    </div>
                </div>
                <div className={classNames('row', 'rowElement')} >
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="graduationyear" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Năm tốt nghiệp</b>
                            </label>
                            <Select
                                style={formErrors.graduationYear ? styleErr : {}}
                                placeholder={formErrors.graduationYear ? 'No be empty!' : 'Please enter...'}
                                name="graduationyear"
                                value={graduationYear}
                                options={listGraduationYear}
                                onChange={graduationYear => this.setState({ graduationYear })}
                                className={'SelectElementForm'}
                            />
                        </div>
                    </div>
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="workingform" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Hình Thức</b>
                            </label>
                            <Select
                                style={formErrors.typeJob ? styleErr : {}}
                                placeholder={formErrors.typeJob ? 'No be empty!' : 'Please enter...'}
                                name="workingform"
                                value={typeJob}
                                options={listWorkingForm}
                                onChange={typeJob => this.setState({ typeJob })}
                                className={'SelectElementForm'}
                            />
                        </div>
                    </div>
                </div>
                <div className={classNames('row', 'rowElement')} >
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="score" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Điểm trung bình các kỳ (hệ 4)</b>
                            </label>
                            <div className={'FieldObligatory'}>
                                <input
                                    style={formErrors.cpa ? styleErr : {}}
                                    placeholder={formErrors.cpa ? 'No be empty!' : 'Please enter...'}
                                    name="name"
                                    type='text'
                                    value={cpa}
                                    onChange={e => this.setState({ cpa: e.target.value })}
                                    className={'InputElementForm'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="infor" className={'TitleElementFormInput'}>
                                <span className={'SupportTitleElementForm'}>*</span>
                                <b>Kinh nghiệm làm việc</b>
                            </label>
                            <div className={'FieldObligatory'}>
                                <textarea
                                    style={formErrors.wordExperience ? styleErr : {}}
                                    placeholder={formErrors.wordExperience ? 'No be empty!' : 'Please enter...'}
                                    name="wordExperience"
                                    value={wordExperience}
                                    rows="4" cols="50"
                                    onChange={e => this.setState({ wordExperience: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames('row', 'rowElement')} >
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <p className={'TitleElementFormInput'} style={{ width: '100%' }}>
                            (
                                <span style={{ color: 'red' }}>*</span>
                            ) là những field bắt buộc
                            </p>
                    </div>
                    <div className={classNames('col-md-6', 'ElementForm')}>
                        <div className={'ElementFormInput'}>
                            <label htmlFor="infor" className={'TitleElementFormInput'}>
                                <b>Your CV: </b>
                            </label>
                            <input type="file" required name="anh_tuan"
                                onChange={(e) => this._handleImageChange(e)}
                            />
                        </div>
                        <span style={{ color: "red" }}>
                            {formErrors.file1 ? formErrors.file1 : ''}
                            {formErrors.file2 ? formErrors.file2 : ''}
                        </span>
                    </div>
                </div>
                <div className={classNames('row', 'rowElement')} >
                    <div className={classNames('col-md-6')} />
                    <div className={classNames('col-md-6', 'ElementForm')}
                        style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                        <button type='submit' className={'sendButtonElement'}
                            onClick={_ => this.validateAndSend()}
                        >
                            Gửi
                        </button>
                        <button className={'cancelButtonElement'} onClick={_ => this.handleCancel()}>Hủy</button>
                    </div>
                </div>
            </div>
        )
    }
}
FresherJobForm.propTypes = {
    hiddenModal: PropTypes.func,
    category: PropTypes.object,
    idJob: PropTypes.string,
    titleJob: PropTypes.string
};
FresherJobForm.defaultProps = {
    category: '',
    hiddenModal: () => 0
}
export default FresherJobForm