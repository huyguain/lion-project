import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../../config'
import { connect } from 'react-redux'
import { showNav } from '../../../../../actions';
import {
    Loader
} from 'semantic-ui-react'
import Table from '../../../common/Table';
import Modal from './modal';
class ListPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPanel: [],
            load: false,
            messageLoader: "Loading...",
            displayDialog: false,
        }
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.onViewItem = this.onViewItem.bind(this);
    }
    handleRemove(item) {
        const userToken = localStorage.getItem('userToken');
        axios.delete(`${config.host}/delete/${item._id}`, { headers: { userToken } })
            .then(res => {
                const { data } = res;
                if (data.success) {
                    this.setState(state => ({
                        listPanel: this.state.listPanel.filter(panel => panel._id !== item._id),
                        displayDialog: false, 
                        dataDiaLog: undefined
                      }));
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    onDeleteItem(item) {
            const dataDiaLog = {
                title: 'Comfirm delete!',
                content: 'Are you sure delete?',
                onsubmit: this.handleRemove,
                item: item
              }
              this.setState({ ...this.state,displayDialog: true, dataDiaLog })
    }
    onEditItem(item) {
        const { history } = this.props;
        history.push(`/admin/panel/edit-panel/${item._id}`);
    }
    closeDialog() {
        this.setState({ displayDialog: false });
    }
    onViewItem(item) {
        console.log('view', item);
        const { history } = this.props;
        history.push(`/admin/panel/view/${item._id}`);
    }
    componentDidMount() {
        this.props.showNav('NAV_PANEL');
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/list-panel`, { headers: { userToken } })
            .then(res => {
                const { data } = res.data;
                if (res.data.success) {
                    const newData = data.map((panel, i) => {
                        return {
                            stt: i + 1,
                            _id: panel._id,
                            title: panel.title,
                            description: panel.description,
                            status: panel.status ? 'Active':'Not Active',
                            image: <img className="image-panel" src={`${config.imageUrl}/${panel.urlImage}`} alt=""/>,
                        }
                    })
                    this.setState({ listPanel: newData, load: true });
                }
            })
            .catch(err => {
                console.log(err)
        })
    }
    render() {
        const { listPanel, messageLoader, displayDialog, dataDiaLog } = this.state;
        if(!this.state.load) {
            return (
                <div className="cover-loader">
                    <Loader active inline='centered'>  
                        { messageLoader }
                    </Loader>
                </div>
            )
        }
        return (
            <div>
                 {
                    dataDiaLog ?
                        <Modal displayDialog={displayDialog} closeDialog={this.closeDialog}
                        dataDiaLog={dataDiaLog} />
                        : null
                }
                <Table
                    data={listPanel}
                    headers={[
                        { name: '...', prop: 'stt', search: false, },
                        { name: "Title", prop: "title", search: true },
                        { name: "Description", prop: "description", search: true },
                        { name: 'Status', prop: 'status', search: false },
                        { name: 'Image', prop: 'image', search: false },
                    ]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/panel/create-panel')
                    }}
                    actions={[
                        {
                        icon: "fa fa-eye",
                        action: this.onViewItem
                        },
                        {
                        icon: 'fa fa-pencil',
                        action: this.onEditItem
                        },
                        {
                        icon: 'fa fa-trash',
                        action: this.onDeleteItem
                        }
                    ]}
                />
            </div>
        )
    }
}
export default connect(null, { showNav })(ListPanel);