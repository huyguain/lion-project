import React from "react";
import axios from 'axios'
import { CSVLink } from 'react-csv';
import config from '../../../../../../config'
import { Loader, Button, Dropdown } from 'semantic-ui-react'
import { showNav } from '../../../../../../actions';
import { connect } from 'react-redux';
import FormatTable from '../../../../common/Table';
import moment from 'moment'

class ClassTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClass: [],
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
        axios.get(`${config.host}/getAllClass`, { headers: { userToken: localStorage.getItem('userToken') } }).
            then(res => {
                let dataClass = res.data.dataClass.map((v, i) => {
                    return {
                        stt: ++i,
                        id: v._id,
                        className: v.className,
                        numberFresher: v.fresherIds.length,
                        learningPath: v.learningPathCustomiseIds.map(e => {
                            return e.learningPath
                        }).join(' - '),
                        startDate: moment(v.startDate).format("MM/DD/YYYY"),
                        endDate: moment(v.endDate).format("MM/DD/YYYY HH:mm")
                    }
                })
                this.setState({
                    dataClass: dataClass.reverse(),
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
        axios.delete(`${config.host}/deleteClass/${id}`, { headers: { userToken } })
            .then(res => {
                console.log('anhtuan', res.data),
                    this.setState({
                        dataClass: this.state.dataClass.filter(e => e.id !== id),
                        load: !this.state.load,
                        display: 'none'
                    })
            }).catch(err => {
                console.log(err)
                this.setState({ load: !this.state.load })
                alert('Delete Error!')
            })
    }
    render() {
        let { dataClass } = this.state;
        let newData = [];
        let arrAdmin = ['stt', 'id', 'className', 'numberFresher', 'learningPath', 'startDate', 'endDate'];
        const dataDrop = arrAdmin.map(v => {
            return {
                key: Math.random(), value: v, text: v
            }
        })
        let thisTest = this
        newData.push(this.state.dataExport)
        dataClass.map(v => {
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
                    data={dataClass}
                    headers={[
                        { name: '...', prop: 'stt', search: false, },
                        { name: "Class Name", prop: "className", search: true },
                        { name: "Number Fresher", prop: "numberFresher", search: true },
                        { name: "Learning Path", prop: "learningPath", search: true },
                        { name: "Start Date", prop: "startDate", search: true },
                        { name: "Start End", prop: "endDate", search: true }
                    ]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/class/create-class');
                    }}
                    actions={[
                        {
                            icon: 'fa fa-pencil',
                            action: item => this.props.history.push(`/admin/class/edit-class/${item.id}`)
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
                                <CSVLink data={newData} filename="Class.csv"
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
export default ClassTable;
