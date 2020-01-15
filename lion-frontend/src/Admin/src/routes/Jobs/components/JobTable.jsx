import React from "react";
import axios from 'axios'
import config from '../../../../../config';
import { CSVLink } from 'react-csv';
import { Button } from 'semantic-ui-react'
import FormatTable from '../../../common/Table';
import moment from 'moment';

const style = {
    margin: 20,
};
class JobTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    //Call api take data
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        axios.get(`${config.host}/list-jobs`, { headers: { userToken } }).
            then(
            data => {
                console.log('state', data.data.data)
                this.setState({ data: data.data.data.reverse() })
            }
            ).catch(
            err => console.log(err)
            )
    }
    delete(id, index) {
        const userToken = localStorage.getItem("userToken");
        axios.post(`${config.host}/delete-job/${id}`, {}, { headers: { userToken } }).
            then(
            data => {
                this.state.data.splice(index - 1, 1)
                this.setState({ data: this.state.data })
            }
            ).catch(
            err => console.log(err)
            )
    }
    convertData(data) {
        let result = []
        data.forEach(element => {
            result.push(element.content)
        })
        return result.join(', ')
    }
    render() {
        let i = 0;
        let newData = this.state.data.map(element => {
            return {
                id: element._id,
                title: element.title,
                salary: element.salary,
                location: element.location ? element.location.zone : '',
                deadlineSubmit: moment(element.deadlineSubmit).format("MM/DD/YYYY"),
                joinDate: moment(element.joinDate).format("MM/DD/YYYY"),
                content: element.content,
                offer: this.convertData(element.offer),
                hashTag: element.hashTag.join(', '),
                category: element.category ? element.category.title : ''
            }
        })
        console.log('newData', newData)
        return (
            <div>
                <FormatTable
                    data={newData}
                    headers={[
                        { name: 'Title', prop: 'title', search: true },
                        { name: "category", prop: "category", search: true },
                        { name: "Location", prop: "location", search: true },
                        { name: "Hạn nộp", prop: "deadlineSubmit", search: true },
                        { name: "startDate", prop: "joinDate", search: true },
                        { name: "Offer", prop: "offer", search: true },
                        { name: "Hash tag", prop: "hashTag", search: true },
                    ]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/jobs/add');
                    }}
                    actions={[
                        {
                            icon: "fa fa-pencil",
                            action: item => this.props.history.push(`/admin/jobs/edit/${item.id}`),
                            tooltip: 'edit'
                        },
                        {
                            icon: 'fa fa-trash',
                            tooltip: 'Delete',
                            action: item => {
                                this.delete(item.id, item.index)
                            }
                        }
                    ]}
                    actionFooter=
                    {{
                        importTo: _ => { },
                        nameExport: 'Jobs.csv',
                        filedExport: [
                            { name: 'ID', props: 'id' },
                            { name: 'Title', prop: 'title' },
                            { name: "Category", prop: "category" },
                            { name: 'Salary', prop: 'salary' },
                            { name: "Location", prop: "location" },
                            { name: "Hạn nộp", prop: "deadlineSubmit" },
                            { name: "startDate", prop: "joinDate" },
                            { name: "Offer", prop: "offer" },
                            { name: "Hash tag", prop: "hashTag" },
                            { name: 'Content', prop: 'content' }
                        ]
                    }}
                />
            </div>
        );
    }
}
export default JobTable;


