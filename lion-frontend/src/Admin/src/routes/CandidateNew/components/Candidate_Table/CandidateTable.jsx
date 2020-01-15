import React from "react";
import axios from 'axios'
import { CSVLink } from 'react-csv';
import { Loader, Button } from 'semantic-ui-react';
import { showNav } from '../../../../../../actions';
import config from '../../../../../../config'
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import CanidateModal from './CanidateModal'
import FormatTable from '../../../../common/Table'
import CandidateTest from './CandidateTest'

class CandidateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCandidate: [],
            load: false,
            display: 'none',
            id: '',
            fullName: '',
            dataSearch: [],
            dataExport: []
        };
        this.updateDataNote = this.updateDataNote.bind(this);
        this.onViewTest = this.onViewTest.bind(this);
        this.updateItemSearch = this.updateItemSearch.bind(this);
    }
    componentDidMount() {
        this.props.showNav('NAV_USER');
        this.setState({ load: !this.state.load })
        axios.get(`${config.host}/getAllCandidate`,
            { headers: { userToken: localStorage.getItem('userToken') } }).
            then(res => {
                console.log('data', res.data.dataCandidate)
                this.setState({
                    dataCandidate: res.data.dataCandidate.reverse(),
                    load: !this.state.load,
                    dataSearch: res.data.dataCandidate.map((v, i) => {
                        return {
                            stt: i + 1,
                            id: v._id,
                            fullname: `${v.firstName} ${v.lastName}`,
                            email: v.email,
                            university: v.university,
                            mobile: `(+84) ${v.mobile}`,
                            entryCodeIds: v.entryCodeIds,
                            note: v.note,
                            state: v.state
                        }
                    })
                })
            }).catch(err => {
                this.setState({ load: !this.state.load })
                alert('Error!')
            })
    }
    editUser(id) {
        this.props.history.push(`/admin/candidate/edit-candidate/${id}`)
    }
    delete(id) {
        this.setState({ load: !this.state.load })
        const userToken = localStorage.getItem('userToken')
        axios.delete(`${config.host}/deleteCandidate/${id}`, { headers: { userToken } })
            .then(res =>
                this.setState({
                    dataCandidate: this.state.dataCandidate.filter(e => e._id !== id),
                    dataSearch: this.state.dataSearch.filter(e => e.id !== id),
                    load: !this.state.load,
                    display: 'none'
                })
            ).catch(err => {
                console.log(err)
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
    onViewTest(code) {
        const { history } = this.props;
        history.push(`/admin/candidate/detail-test/${code}`)
    }
    updateDataNote(element, newData) {
        let dataUpdate = this.state.dataCandidate.filter(e => e._id === element.id)[0];
        dataUpdate.note = newData;
        element.note = newData;
        const userToken = localStorage.getItem("userToken");
        axios.patch(`${config.host}/editCandidate/${dataUpdate._id}`, { dataUpdate }, { headers: { userToken } })
            .then(res => {
                this.setState({
                    dataCandidate: this.state.dataCandidate.map(e => {
                        if (e._id === dataUpdate._id) {
                            return dataUpdate
                        }
                        return e
                    }),
                    dataSearch: this.state.dataSearch.map(e => {
                        if (e.id === element.id) {
                            return element
                        }
                        return e
                    }),
                })
            })
            .catch(err => {
                alert('Error!')
            })
    }
    updateItemSearch(itemSearch) {
        let { dataCandidate } = this.state;
        let pageOfItems = dataCandidate.map((v, i) => {
            return {
                stt: i + 1,
                id: v._id,
                fullname: `${v.firstName} ${v.lastName}`,
                email: v.email,
                university: v.university,
                mobile: `(+84) ${v.mobile}`,
                entryCodeIds: v.entryCodeIds,
                note: v.note
            }
        })
        Object.keys(itemSearch).map(item =>
            pageOfItems = pageOfItems.filter(i =>
                RegExp(itemSearch[item].trim().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1").toLowerCase())
                    .test(new String(i[item]).toLowerCase()))
        )
        this.setState({ dataSearch: pageOfItems, initialPage: 1 })
    }
    render() {
        const { initialPage, dataSearch } = this.state;
        let newData = [];
        let arrCandidate = ['stt', 'id', 'fullname', 'mobile', 'email', 'university', 'note'];
        const dataDrop = arrCandidate.map(v => {
            return {
                key: Math.random(), value: v, text: v
            }
        })
        newData.push(this.state.dataExport)
        dataSearch.map(v => {
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
                <CanidateModal
                    display={this.state.display}
                    closeModal={this.handleCloseModalFile}
                    dataModal={this.state.dataModal}
                    id={this.state.id}
                    fullName={this.state.fullName}
                    submitDelete={this.delete.bind(this)}
                />
                <CandidateTest
                    id={this.state.id}
                    display={this.state.display}
                    dataCandidate={this.state.dataCandidate}
                    onViewTest={this.onViewTest}
                />

                <FormatTable
                    data={dataSearch}
                    headers={[{ name: '...', prop: 'stt', search: false, },
                    { name: "Full Name", prop: "fullname", search: true },
                    { name: "Email", prop: "email", search: true },
                    { name: "Mobile", prop: "mobile", search: true },
                    { name: "University", prop: "university", search: true },
                    { name: "Note", prop: "note", search: false, edit: this.updateDataNote }]}
                    ondbClickRow={item => this.setState({ id: item.id })}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/candidate/create-candidate');
                    }}
                    datatarget={this.state.display !== 'none' ? 'none' : '.bd-example-modal-lg'}
                    datatoggle={this.state.display !== 'none' ? 'none' : 'modal'}
                    updateItemSearch={this.updateItemSearch}
                    actions={[
                        {
                            icon: 'fa fa-pencil',
                            action: item => this.editUser(item.id)
                        },
                        {
                            icon: 'fa fa-trash',
                            action: item => this.handleOpenModalFile(item.id, item.fullname)
                        }
                        ,
                        {
                            icon: 'fa fa-user-circle',
                            action: item => this.props.history.push(`/admin/student/create-student/${item.id}`)
                        }
                    ]}
                    actionFooter={[
                        {
                            content: <Button
                                key={Math.random()}
                                className="cover-btn-import"
                                onClick={_ => this.props.history.push('/admin/candidate/import-candidate')}
                            >Import</Button>
                        },
                        {
                            content: <Button className="cover-btn-import" type="button" data-toggle="collapse" data-target="#multiCollapseExample2"
                                aria-expanded="false" aria-controls="multiCollapseExample2"
                                onClick={_ => this.setState({ dataExport: [] })}
                            >Export</Button>
                        },
                        {
                            content: <Button key={Math.random()} className="cover-btn-import">Report</Button>
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
                                <CSVLink data={newData} filename="Candidate.csv">
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
export default connect(null, { showNav })(CandidateTable);


