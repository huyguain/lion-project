import React from "react";
import axios from 'axios'
import { CSVLink } from 'react-csv';
import ModalTemplate from './ModalTemplate'
import { Loader, Button } from 'semantic-ui-react';
import config from '../../../../../../config'
import { showNav } from '../../../../../../actions';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import FormatTable from '../../../../common/Table'

class TemplateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTemplate: [],
            dataExport: [],
            load: false,
            display: 'none',
            id: '',
            testName: ''
        };
    }

    componentDidMount() {
        this.props.showNav('NAV_TEMPLATE');
        const userToken = localStorage.getItem('userToken')
        this.setState({ load: !this.state.load })
        axios.get(`${config.host}/getAllTemplate`, { headers: { userToken } }).
            then(res => {
                this.setState({
                    dataTemplate: res.data.dataTemplate.reverse(),
                    load: !this.state.load
                })
            }).catch(err => {
                console.log(err)
                this.setState({ load: !this.state.load })
                alert('Error!')
            })
    }
    delete(id) {
        const userToken = localStorage.getItem('userToken');
        this.setState({ load: !this.state.load })
        axios.delete(`${config.host}/deleteTemplate/${id}`, { headers: { userToken } })
            .then(res => {
                this.setState({
                    dataTemplate: this.state.dataTemplate.filter(v => v._id !== id),
                    load: !this.state.load,
                    display: 'none'
                })
            }).catch(err => {
                console.log(err);
                this.setState({ load: !this.state.load })
                alert('Server Error !')
            })
    }
    handleCloseModalFile = () => {
        this.setState({ display: 'none' })
    }

    handleOpenModalFile = (id, testName) => {
        this.setState({ display: 'block', id, testName })
    }
    backPage() {
        if (this.state.currentPage === 0) return 0;
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    }
    render() {
        let dataTemplate;

        if (!this.state.showSearch) {
            dataTemplate = this.state.dataTemplate;
        } else {
            dataTemplate = this.state.searchResult;
        }
        let dataTem = dataTemplate.map((v, i) => {
            return {
                stt: ++i,
                id: v._id,
                language: v.language,
                entry: `${v.defaultEntryTest ? 'YES' : 'NO'}`,
                testname: v.testName,
                easy: v.easy,
                medium: v.medium,
                hard: v.hard,
                passscore: v.passScore,
                duration: v.duration
            }
        })
        if (this.state.load) return (
            <Loader active inline='centered' />
        )
        return (
            <div>
                <ModalTemplate
                    display={this.state.display}
                    closeModal={this.handleCloseModalFile}
                    id={this.state.id}
                    testName={this.state.testName}
                    submitDelete={this.delete.bind(this)}
                />
                <FormatTable
                    data={dataTem}
                    headers={[{ name: '...', prop: 'stt', search: false, },
                    { name: "Language", prop: "language", search: true },
                    { name: 'EntryTest', prop: 'entry', search: true },
                    { name: "Test Name", prop: "testname", search: true },
                    { name: 'Easy', prop: 'easy', search: false },
                    { name: 'Medium', prop: 'medium', search: false },
                    { name: 'Hard', prop: 'hard', search: false },
                    { name: 'Passscore', prop: 'passscore', search: false },
                    { name: 'Duration', prop: 'duration', search: false },]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/template/create-template')
                    }}
                    actions={[
                        {
                            icon: 'fa fa-trash',
                            action: item => this.handleOpenModalFile(item.id, item.testname)
                        }
                    ]}
                    actionFooter={
                        {
                            importTo: _ => { },
                            nameExport: "Tempaltes.csv",
                            filedExport:
                            [{ name: 'Id', prop: 'id' },
                            { name: 'Language', prop: 'language' },
                            { name: 'Entry', prop: 'entry' },
                            { name: 'Test Name', prop: 'testname' },
                            { name: 'Easy', prop: 'easy' },
                            { name: 'Medium', prop: 'medium' },
                            { name: 'Hard', prop: 'hard' },
                            { name: 'Passscore', prop: 'passscore' },
                            { name: 'Duration', prop: 'duration' }]
                        }
                    }
                />
            </div>
        );
    }
}
export default connect(null, { showNav })(TemplateTable);
