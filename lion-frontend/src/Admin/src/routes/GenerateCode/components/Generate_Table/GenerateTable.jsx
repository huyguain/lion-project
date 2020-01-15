import React from "react";
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { showNav } from '../../../../../../actions';
import config from '../../../../../../config'
import ModalGen from './ModalGen'
import { CSVLink } from 'react-csv';
import { Button, Loader, Dropdown } from 'semantic-ui-react'
import FormatTable from '../.../../../../../common/Table'

const style = {
    margin: 20,
};
class GenerateTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            search: '',
            inforUser: {},
            smShow: false,
            load: false,
            dataTemplate: [],
            dataExport: [],
            display: 'none',
            dataModal: [],
            dataSearch: [],
        };
        this.changeDeadline = this.changeDeadline.bind(this);
    }
    //Call api take data
    componentDidMount() {
        this.setState({ load: !this.state.load })
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/getAllEntryCode`, { headers: { userToken } }).
            then(res => {
                this.setState({ load: !this.state.load })
                let i = 0;
                res.data.dataEntryCode ? res.data.dataEntryCode.forEach(e => {
                    if (e.point >= 0) {
                        if (Date.parse(e.endTime) <= Date.parse(new Date())) {
                            e.state = e.result
                        } else {
                            e.state = 'USING';
                        }
                    } else {
                        e.state = (Date.parse(e.deadline) > Date.parse(new Date())) ? 'USABLE' : 'EXPRIED'
                    }
                    let createCode = (new Date(e.createCode))
                    let deadline = (new Date(e.deadline))
                    e.createCode = moment(createCode).format("MM/DD/YYYY")
                    e.deadline = moment(deadline).format("MM/DD/YYYY")
                    e.index = i
                    i++
                }) : []
                this.setState({
                    data: res.data.dataEntryCode.reverse()
                })
            }).catch(err => {
                console.log(err)
                this.setState({ load: !this.state.load })
                alert('Server Error !')
            })
    }
    regenerate(item) {
        if (item.point > 0 || item.state == 'USING' || item.language == 'English') {
            alert('Can not regennerate!')
            return 0
        }
        const dataEntryCode = {
            _id: item.id,
            language: item.language,
            deadline: item.deadline,
            numberEasy: item.dataTemplate.easy,
            numberMedium: item.dataTemplate.medium,
            numberHard: item.dataTemplate.hard,
        }
        this.setState({ load: !this.state.load })
        let userToken = localStorage.getItem('userToken')
        axios.patch(`${config.host}/regenerate`, { dataEntryCode }, { headers: { userToken } }).
            then(res => {
                this.setState({
                    load: !this.state.load,
                    data: this.state.data.map(e => {
                        if (e._id === dataEntryCode._id) {
                            e.code = res.data.code;
                            e.state = (Date.parse(e.deadline) > Date.parse(new Date())) ?
                                "USABLE" : "EXPRIED";
                        }
                        return e
                    }),
                    display: 'none',
                    dataSearch: this.state.dataSearch.map(e => {
                        if (e.id === dataEntryCode._id) {
                            e.code = res.data.code;
                            e.state = (Date.parse(e.deadline) > Date.parse(new Date())) ?
                                "USABLE" : "EXPRIED";
                        }
                        return e
                    }),
                })
            }).catch(err => {
                console.log(err);
                this.setState({ load: !this.state.load });
                alert('Server Error !')
            })
    }
    changeDeadline(element, newDeadline) {
        if (Date.parse(newDeadline) < Date.parse(new Date())) {
            alert("Please choose again!");
        } else {
            let dataUpdate = this.state.data.filter(e => e._id === element.id)[0];
            dataUpdate.deadline = newDeadline;
            element.deadline = moment(newDeadline).format("MM/DD/YYYY");
            this.setState({
                data: this.state.data.map(e => {
                    if (e._id === element.id) {
                        return dataUpdate
                    }
                    return e
                })
            })
        }
    }
    delete(dataModal) {
        this.setState({ load: !this.state.load })
        let idEntryCode = dataModal[0];
        let idCandidate = dataModal[1]
        const userToken = localStorage.getItem('userToken')
        axios.delete(`${config.host}/deleteEntryCode/${idEntryCode}/${idCandidate}`, { headers: { userToken } })
            .then(res =>
                this.setState({
                    display: 'none',
                    load: !this.state.load,
                    data: this.state.data.filter(e => e._id !== idEntryCode),
                })
            ).catch(err => {
                console.log(err)
                this.setState({ load: !this.state.load })
                alert('Server Error !')
            })
    }
    handelCloseModalGen = () => {
        this.setState({ display: 'none' })
    }
    handelOpenModalGen = (id, idCandidate, state, code) => {
        if (state === 'USING') {
            alert('Can not delete!')
            return 0
        }
        this.setState({ display: 'block', dataModal: [id, idCandidate, code] })
    }
    convertData(data) {
        console.log('data', data)
        return data.map(value => ({
            id: value._id,
            name: value.candidateId ? `${value.candidateId.firstName} ${value.candidateId.lastName}` : "",
            email: value.candidateId ? value.candidateId.email : '',
            idCandidate: value.candidateId ? value.candidateId._id : '',
            testDate: (value.startTime) ? moment(value.startTime).format("MM/DD/YYYY") : '',
            language: (value.englishExamId ? 'English' : (value.templateId ? value.templateId.language : '')),
            testName: (value.templateId ? value.templateId.testName : ''),
            code: value.code,
            point: value.point === undefined ? '' : `${value.point}/${value.englishExamId
                ? value.englishExamId.questions.filter(item => !item.essay).length : value.questionIds.length}`,
            startDate: value.createCode,
            deadline: value.deadline,
            state: value.state,
            dataTemplate: value.templateId
        }))
    }
    render() {
        const { data } = this.state;
        if (this.state.load) return (
            <Loader active inline='centered' />
        )
        console.log('update');
        return (
            <div>
                <ModalGen
                    display={this.state.display}
                    closeModal={this.handelCloseModalGen}
                    dataModal={this.state.dataModal}
                    action={this.state.action}
                    submitRegenerate={this.regenerate.bind(this)}
                    submitDelete={this.delete.bind(this)}
                />
                <FormatTable
                    data={this.convertData(data)}
                    headers={[{ name: 'Name', prop: 'name', search: true, },
                    { name: "Email", prop: "email", search: true },
                    { name: "Language", prop: "language", search: true },
                    { name: "Code", prop: "code", search: true },
                    {
                        name: "Deadline", prop: "deadline", search: false,
                        edit: this.changeDeadline, type: "date"
                    },
                    {
                        name: "Test Date", prop: "testDate",
                        search: true, type: "date"
                    },
                    {
                        name: 'Point', prop: 'point',
                        search: false
                    },
                    { name: "State", prop: "state", search: false },
                    ]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/generate/generate-code');
                    }}
                    actions={[
                        {
                            icon: "fa fa-refresh",
                            action: item => this.regenerate(item),
                            tooltip: 'Regennarate'
                        },
                        {
                            icon: 'fa fa-trash',
                            tooltip: 'Delete',
                            action: item => this.handelOpenModalGen(item.id, item.idCandidate, item.state, item.code)
                        }
                    ]}
                    actionFooter={{
                        importTo: _ => { },
                        nameExport: 'GenerateCodes.csv',
                        filedExport: [
                            { name: 'ID', prop: 'id' },
                            { name: 'Full Name', prop: 'name' },
                            { name: 'Email', prop: 'email' },
                            { name: 'ID Candidate', prop: 'idCandidate' },
                            { name: 'Test Date', prop: 'testDate' },
                            { name: 'Language', prop: 'language' },
                            { name: 'Test Name', prop: 'testName' },
                            { name: 'Code', prop: 'code' },
                            { name: 'Point', prop: 'point' },
                            { name: 'Start date', prop: 'startdate' },
                            { name: 'Dead line', prop: 'deadline' },
                            { name: 'State', prop: 'state' },
                        ]
                    }}
                />
            </div>
        );
    }
}
export default connect(null, { showNav })(GenerateTable);


