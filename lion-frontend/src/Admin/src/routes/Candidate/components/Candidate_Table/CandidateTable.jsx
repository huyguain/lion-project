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
            load: false,
            display: 'none',
            id: '',
            fullName: '',
            dataSearch: [],
            dataExport: []
        };
        this.updateDataNote = this.updateDataNote.bind(this);
        this.onViewTest = this.onViewTest.bind(this);
    }
    componentDidMount() {
        this.props.showNav('NAV_USER');
        this.setState({ load: !this.state.load })
        axios.get(`${config.host}/getAllCandidate`,
            { headers: { userToken: localStorage.getItem('userToken') } }).
            then(res => {
                this.setState({
                    load: !this.state.load,
                    dataSearch: res.data.dataCandidate.reverse()
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
                    dataSearch: this.state.dataSearch.filter(e => e._id !== id),
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
    onViewTest(code) {
        const { history } = this.props;
        history.push(`/admin/candidate/detail-test/${code}`)
    }
    updateDataNote(element, newData) {
        let dataUpdate = this.state.dataSearch.filter(e => e._id === element.id)[0];
        const oldData = dataUpdate.note;
        dataUpdate.note = newData;
        const userToken = localStorage.getItem("userToken");
        axios.patch(`${config.host}/editCandidate/${dataUpdate._id}`, { dataUpdate },
            { headers: { userToken } })
            .then(res => {
                return newData;
            })
            .catch(err => {
                alert('Error!');
                return oldData;
            })
    }
    convertData(data) {
        return data.map(item => ({
            id: item._id,
            fullname: `${item.firstName} ${item.lastName}`,
            email: item.email,
            mobile: item.mobile,
            university: item.university,
            note: item.note,
        }))
    }
    render() {
        const { initialPage, dataSearch } = this.state;
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
                    dataCandidate={this.state.dataSearch}
                    onViewTest={this.onViewTest}
                />

                <FormatTable
                    data={this.convertData(dataSearch)}
                    headers={[
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
                    actions={[
                        {
                            icon: 'fa fa-pencil',
                            action: item => this.editUser(item.id)
                        },
                        {
                            icon: 'fa fa-trash',
                            action: item => this.handleOpenModalFile(item.id, item.fullname)
                        }
                    ]}
                    actionFooter=
                    {{
                        importTo: _ => this.props.history.push(`/admin/candidate/import-candidate`),
                        nameExport: 'Candidates.csv',
                        filedExport: [
                            { name: 'ID', prop: 'id' },
                            { name: 'Full Name', prop: 'fullname' },
                            { name: 'Email', prop: 'email' },
                            { name: 'Mobile', prop: 'mobile' },
                            { name: 'University', prop: 'university' },
                            { name: 'Note', prop: 'note' }
                        ]
                    }}
                />
            </div>
        );
    }
}
export default connect(null, { showNav })(CandidateTable);
