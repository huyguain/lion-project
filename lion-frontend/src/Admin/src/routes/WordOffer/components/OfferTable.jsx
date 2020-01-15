import React from "react";
import axios from 'axios'
import config from '../../../../../config';
import { CSVLink } from 'react-csv';
import { Button } from 'semantic-ui-react'
import FormatTable from '../../../common/Table'
const style = {
    margin: 20,
};
class LocationTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    //Call api take data
    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        axios.get(`${config.host}/list-offer`, { headers: { userToken } }).
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
        axios.post(`${config.host}/delete-offer/${id}`, {}, { headers: { userToken } }).
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
                icon: <i className={`fa ${element.icon}`}> {element.icon}</i>,
                content: element.content
            }
        })
        console.log('newData', newData)
        return (
            <div>
                <FormatTable
                    data={newData}
                    headers={[{ name: '...', prop: 'index' },
                    { name: 'Icon', prop: 'icon' },
                    { name: "Content", prop: "content", search: true },
                    ]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/offer/add');
                    }}
                    actions={[
                        {
                            icon: "fa fa-pencil",
                            action: item => this.props.history.push(`/admin/offer/edit/${item.id}`),
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
                            nameExport: "Offers.csv",
                            filedExport:
                            [{ name: 'Id', prop: 'id' },
                            { name: 'Icon', prop: 'icon' },
                            { name: 'Content', prop: 'content' }]
                        }
                    }
                />
            </div>
        );
    }
}
export default LocationTable;


