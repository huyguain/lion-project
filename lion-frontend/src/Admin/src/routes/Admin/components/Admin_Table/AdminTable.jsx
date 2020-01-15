import React from "react";
import axios from 'axios'
// Import React Table
import { CSVLink } from 'react-csv';
import config from '../../../../../../config'
import ModalAdmin from './AdminModal';
import { Dropdown } from 'semantic-ui-react';
import { Loader, Button } from 'semantic-ui-react'
import { showNav } from '../../../../../../actions';
import { connect } from 'react-redux';

import FormatTable from '../../../../common/Table';

class AdminTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAdmin: [],
            dataExport: [],
            id: '',
            fullName: '',
            load: false,
            display: 'none',
            id: '',
        };
    }

    componentDidMount() {
        this.props.showNav('NAV_ADMIN');
        this.setState({ load: !this.state.load })
        axios.get(`${config.host}/getAllAdmin`, { headers: { userToken: localStorage.getItem('userToken') } }).
            then(res => {
                let dataAdmin = res.data.dataAdmin.filter(v => v.role !== 1)
                dataAdmin.forEach(e => {
                    e.Role = (e.role === 3) ? 'Hr' : 'Design'
                })
                this.setState({
                    dataAdmin: dataAdmin.reverse(),
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
        axios.delete(`${config.host}/deleteAdmin/${id}`, { headers: { userToken } })
            .then(res =>
                this.setState({
                    dataAdmin: this.state.dataAdmin.filter(e => e._id !== id),
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
        let { dataAdmin } = this.state;
        let newData = [];
        let arrAdmin = ['stt', 'id', 'firstname', 'lastname', 'fullname', 'username', 'mobile', 'role'];
        const dataDrop = arrAdmin.map(v => {
            return {
                key: Math.random(), value: v, text: v
            }
        })
        let thisTest = this
        let _dataAdmin = dataAdmin.map((v, i) => {
            return {
                id: v._id,
                firstname: v.firstName,
                lastname: v.lastName,
                fullname: `${v.firstName} ${v.lastName}`,
                username: v.userName,
                password: v.passWord,
                mobile: `+(84) ${v.mobile}`,
                role: v.Role
            }
        })
        newData.push(this.state.dataExport)
        _dataAdmin.map(v => {
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
                <ModalAdmin
                    display={this.state.display}
                    closeModal={this.handleCloseModalFile}
                    id={this.state.id}
                    fullName={this.state.fullName}
                    submitDelete={this.delete.bind(this)}
                />
                <FormatTable
                    data={_dataAdmin}
                    headers={[
                        { name: "Full Name", prop: "fullname", search: true },
                        { name: "User name", prop: "username", search: true },
                        { name: "Mobile", prop: "mobile", search: true },
                        { name: "Role", prop: "role", search: true }]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/admin/create-admin');
                    }}
                    actions={[
                        {
                            icon: 'fa fa-pencil',
                            action: item => this.props.history.push(`/admin/admin/edit-admin/${item.id}`)
                        },
                        {
                            icon: 'fa fa-trash',
                            action: item => this.handleOpenModalFile(item.id, item.fullname)
                        }
                    ]}
                    actionFooter={
                        {
                            importTo: _ => this.props.history.push(`/admin/admin`),
                            nameExport: 'Admin.csv',
                            filedExport: [
                                { name: 'ID', prop: 'id' },
                                { name: "Full Name", prop: "fullname", search: true },
                                { name: "User name", prop: "username", search: true },
                                { name: "Mobile", prop: "mobile", search: true },
                                { name: "Role", prop: "role", search: true }]
                        }
                    }
                />
            </div>
        );
    }
}
export default connect(null, { showNav })(AdminTable);
