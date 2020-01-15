import React, { Component } from 'react';
import { Checkbox, Button } from 'semantic-ui-react'
import { CSVLink, CSVDownload } from 'react-csv';


class ExportModal extends Component {
    constructor() {
        super();
        this.state = {
            headers: []
        }
    }
    componentDidMount() {
        let { headers } = this.props;
        this.setState({ headers });
    }
    getDataExpoxt = headers => {
        return this.props.data.map(item => (
            headers.filter(item => item.checkExport)
                .reduce((obj, props) => {
                    const key = props.prop;
                    obj[key] = item[key];
                    return obj;
                }, {})
        ))
    };
    render() {
        const { headers } = this.state;
        return (
            <div className="modal fade" id="exportModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Export</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                style={{ outline: 'none' }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Chọn các trường muốn Export</p>
                            <div className='container-fluid'>
                                <div className='row'>
                                    {
                                        headers.map((item, index) => (
                                            <Checkbox
                                                className='col-md-6 col-sm-6 col-lg-6'
                                                key={Math.random() + '' + index}
                                                defaultChecked={item.checkExport ? item.checkExport : false}
                                                label={item.name}
                                                value={item.prop}
                                                onChange={event => {
                                                    item.checkExport =
                                                        item.checkExport ? !item.checkExport : true;
                                                    this.setState({ headers });
                                                }}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <Button type="button" className="btn btn-secondary" data-dismiss="modal">Close</Button>
                            <CSVLink data={this.getDataExpoxt(headers)} filename={this.props.nameExport}>
                                <Button type="button"
                                    className="btn btn-primary">Export</Button>
                            </CSVLink>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default ExportModal;