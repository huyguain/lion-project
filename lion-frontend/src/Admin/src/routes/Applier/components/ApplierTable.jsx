import React from "react";
import axios from 'axios'
import config from '../../../../../config';
import { CSVLink } from 'react-csv';
import { Button } from 'semantic-ui-react'
import FormatTable from '../../../common/Table'
const style = {
    margin: 20,
};
class ApplierTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    //Call api take data
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        axios.get(`${config.host}/list-applier`, { headers: { userToken } }).
            then(
            data => {
                console.log('state', data.data.data)
                this.setState({ data: data.data.data })
            }
            ).catch(
            err => console.log(err)
            )
    }
    delete(id, index) {
        const userToken = localStorage.getItem("userToken");
        console.log(userToken)
        axios.post(`${config.host}/delete-applier/${id}`, {}, { headers: { userToken } }).
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
        let newData = this.state.data.map(element => ({
            id: element._id,
            category: element.category.title,
            cpa: element.cpa,
            location: element.location ? element.location.zone :
                (element.jobApply ? element.jobApply.location.zone : ''),
            cv: element.cv,
            email: element.email,
            fullName: element.fullName,
            graduationYear: element.graduationYear,
            jobApply: element.jobApply,
            major: element.major,
            phoneNumber: element.phoneNumber,
            typeJob: element.typeJob ? 'fulltime' : 'part time',
            wordExperience: element.wordExperience,
            titleJobApply: element.jobApply ? element.jobApply.title : ''
        }))
        return (
            <div>
                <FormatTable
                    data={newData}
                    headers={[{ name: '...', prop: 'index' },
                    { name: 'Họ tên', prop: 'fullName', search: true },
                    { name: "Email", prop: "email", search: true },
                    { name: "Địa điểm làm việc", prop: "location", search: true },
                    { name: "Năm tốt nghiệp", prop: "graduationYear", search: true },
                    { name: "CPA", prop: "cpa", search: true },
                    { name: "Phone number", prop: "phoneNumber", search: true },
                    { name: "Chương trình đào tạo", prop: "category", search: true },
                    { name: "Hình thức", prop: "typeJob", search: true },
                    { name: "Job apply", prop: "titleJobApply", search: true }
                    ]}
                    actions={[
                        {
                            icon: 'fa fa-trash',
                            tooltip: 'Delete',
                            action: item => {
                                console.log('item', item)
                                this.delete(item.id, item.index)
                            }
                        }
                    ]}
                    actionFooter=
                    {{
                        importTo: _ => { },
                        nameExport: 'Applier.csv',
                        filedExport: [
                            { name: 'ID', prop: 'id', },
                            { name: 'Category', prop: 'category' },
                            { name: 'Cpa', prop: 'cpa' },
                            { name: 'Location', prop: 'location' },
                            { name: 'Email', prop: 'email' },
                            { name: 'Full Name', prop: 'fullName' },
                            { name: 'Graduation Year', prop: 'graduationYear' },
                            { name: 'Job Apply', prop: 'jobApply' },
                            { name: 'Major', prop: 'major' },
                            { name: 'Phone Number', prop: 'phoneNumber' },
                            { name: 'Type Job', prop: 'typeJob' },
                            { name: 'Word Experience', prop: 'wordExperience' },
                            { name: 'Title Job Apply', prop: 'titleJobApply' }
                        ]
                    }}
                />
            </div>
        );
    }
}
export default ApplierTable;


