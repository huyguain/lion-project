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
        axios.get(`${config.host}/list-location`, { headers: { userToken } }).
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
        axios.post(`${config.host}/delete-location/${id}`, {}, { headers: { userToken } }).
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
                address: element.address,
                zone: element.zone
            }
        })
        console.log('newData', newData)
        return (
            <div>
                <FormatTable
                    data={newData}
                    headers={[{ name: '...', prop: 'index' },
                    { name: "City", prop: "zone", search: true },
                    ]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/location/add');
                    }}
                    actions={[
                        {
                            icon: "fa fa-pencil",
                            action: item => this.props.history.push(`/admin/location/edit/${item.id}`),
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
							importTo: _ => {},
							nameExport: "Location.csv",
							filedExport:
							[{ name: 'Id', prop: 'id' },
							{ name: 'Address', prop: 'address' },
							{ name: 'Zone', prop: 'zone' }]
						}
					}
                />
            </div>
        );
    }
}
export default LocationTable;


