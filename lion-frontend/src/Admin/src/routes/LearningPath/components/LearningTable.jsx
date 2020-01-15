import React from "react";
import axios from 'axios'
import config from '../../../../../config';
import { CSVLink } from 'react-csv';
import { Button } from 'semantic-ui-react'
import FormatTable from '../../../common/Table'
const style = {
    margin: 20,
};
class LearningTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    //Call api take data
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        axios.get(`${config.host}/list-learning-path`, { headers: { userToken } }).
            then(
            data => {
                this.setState({ data: data.data.data })
            }
            ).catch(
            err => console.log(err)
            )
    }
    delete(id, index) {
        const userToken = localStorage.getItem("userToken");
        axios.post(`${config.host}/delete-learning-path/${id}`, {}, { headers: { userToken } }).
            then(
            data => {
                this.state.data.splice(index - 1, 1)
                this.setState({ data: this.state.data }) 
            }
            ).catch(
            err => console.log(err)
            )
    }
    render() {
        let i = 0;
        let newData = this.state.data.map(element => {
            i++
            return {
                index: i,
                id: element._id,
                language: element.language,
                learningPath: element.learningPath,
                courses: element.courseIds.map(e => {
                    return e.courseName
                }).join(' - ')
            }
        })
        return (
            <div>
                <FormatTable
                    data={newData}
                    headers={[{ name: '...', prop: 'index' },
                    { name: 'Language', prop: 'language', search: true, },
                    { name: "Learning Path", prop: "learningPath", search: true },
                    { name: "Courses (Required courses)", prop: "courses", search: true },
                    ]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/learning-path/add');
                    }}
                    actions={[
                        {
                            icon: "fa fa-pencil",
                            action: item => this.props.history.push(`/admin/learning-path/edit/${item.id}`),
                            tooltip: 'edit'
                        },
                        {
                            icon: 'fa fa-trash',
                            tooltip: 'Delete',
                            action: item => {
                                console.log('item', item)
                                this.delete(item.id, item.index)
                            }
                        }
                    ]}
                    actionFooter={
                        {
                            importTo: _ => { },
                            nameExport: "LearningPath.csv",
                            filedExport:
                            [{ name: 'Id', prop: 'id' },
                            { name: 'Language', prop: 'Language' },
                            { name: 'Learning Path', prop: 'learningPath' }]
                        }
                    }
                />
            </div>
        );
    }
}
export default LearningTable;


