import React from "react";
import axios from 'axios'
// Import React Table
import { CSVLink } from 'react-csv';
import config from '../../../../../../config'
import { Dropdown } from 'semantic-ui-react';
import { Loader, Button } from 'semantic-ui-react'
import { showNav } from '../../../../../../actions';
import moment from 'moment';

import FormatTable from '../../../../common/Table';

class FresherTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFresher: [],
            dataExport: [],
            id: '',
            fullName: '',
            load: false,
            display: 'none',
            id: '',
        };
    }

    componentDidMount() {
        this.setState({ load: !this.state.load })
        axios.get(`${config.host}/getAllFresher`, { headers: { userToken: localStorage.getItem('userToken') } }).
            then(res => {
                let dataFresher = res.data.dataFresher.map((v, i) => {
                    return {
                        stt: `${i + 1}`,
                        id: v._id,
                        firstName: v.firstName,
                        lastName: v.lastName,
                        fullName: `${v.firstName} ${v.lastName}`,
                        userName: v.userName,
                        language: v.language,
                        program: v.program,
                        note: v.note,
                        university: v.university,
                        startDate: moment(v.startDate).format("MM/DD/YYYY"),
                        mobile: `+(84) ${v.mobile}`,

                    }
                })
                this.setState({
                    dataFresher: dataFresher.reverse(),
                    load: !this.state.load
                })
            }).catch(err => {
                console.log(err)
                this.setState({ load: !this.state.load })
                alert('Server Error!')
            })
    }
    editUser(id) {
        this.props.history.push(`/admin/admin/edit-admin/${id}`)
    }
    delete(id) {
        this.setState({ load: !this.state.load })
        const userToken = localStorage.getItem('userToken')
        axios.delete(`${config.host}/deleteFresherById/${id}`, { headers: { userToken } })
            .then(res =>
                this.setState({
                    dataFresher: this.state.dataFresher.filter(e => e.id !== id),
                    load: !this.state.load,
                    display: 'none'
                })
            ).catch(err => {
                this.setState({ load: !this.state.load })
                alert('Delete Error!')
            })
    }
    handleCloseModalFile = () => {
        this.setState({ display: 'none' })
    }

    handleOpenModalFile = (id, fullName) => {
        this.setState({ display: 'block', id, fullName })
    }
    render() {
        let { dataFresher } = this.state;
        let newData = [];
        let arrAdmin = ['stt', 'id', 'firstName', 'lastName', 'fullName', 'userName', 'mobile', 'note', 'startDate', 'university', 'language', 'program'];
        const dataDrop = arrAdmin.map(v => {
            return {
                key: Math.random(), value: v, text: v
            }
        })
        let thisTest = this
        newData.push(this.state.dataExport)
        dataFresher.map(v => {
            let _data = [];
            for (const i of this.state.dataExport) {
                _data.push(v[`${i}`])
            }
            newData.push(_data)
        })
        if (this.state.load) return (
            <Loader active inline='centered' />
        )
        return (
            <div>
                <FormatTable
                    data={dataFresher}
                    headers={[{ name: '...', prop: 'stt', search: false, },
                    { name: "Full Name", prop: "fullName", search: true },
                    { name: "User name", prop: "userName", search: true },
                    { name: "University", prop: "university", search: true },
                    { name: "Language", prop: "language", search: true },
                    { name: "Program", prop: "program", search: true },
                    { name: "Mobile", prop: "mobile", search: false },
                    { name: "Start Date", prop: "startDate", search: true },
                    { name: "Note", prop: "note", search: false }]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/fresher/create-fresher');
                    }}
                    actions={[
                        {
                            icon: 'fa fa-pencil',
                            action: item => this.props.history.push(`/admin/fresher/edit-fresher/${item.id}`)
                        },
                        {
                            icon: 'fa fa-trash',
                            action: item => this.delete(item.id)
                        }
                    ]}
                    actionFooter={[
                        {
                            content: <Button className="cover-btn-import">Import</Button>
                        },
                        {
                            content: <Button className="cover-btn-import" type="button" data-toggle="collapse" data-target="#multiCollapseExample2"
                                aria-expanded="false" aria-controls="multiCollapseExample2"
                                onClick={_ => this.setState({ dataExport: [] })}
                            >Export</Button>
                        },
                        {
                            content: <Button className="cover-btn-import">Report</Button>
                        }
                    ]}
                />
                <div class="row">
                    <div class="col-md-4 offset-md-8">
                        <div class="collapse multi-collapse" id="multiCollapseExample2">
                            <div class="card card-body">
                                <Dropdown fluid multiple search selection
                                    options={dataDrop}
                                    onChange={(e, data) => this.setState({
                                        dataExport: data.value,
                                    })}
                                    value={this.state.dataExport}
                                    placeholder='Choose export'
                                />
                                <CSVLink data={newData} filename="Admin.csv"
                                >
                                    <Button className="cover-btn-import" type="button" data-toggle="collapse" data-target="#multiCollapseExample2"
                                        aria-expanded="false" aria-controls="multiCollapseExample2"
                                    >Export</Button>
                                </CSVLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FresherTable;
