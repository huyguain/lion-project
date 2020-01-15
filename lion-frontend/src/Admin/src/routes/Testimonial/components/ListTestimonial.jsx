import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Table from './../../../common/Table';
import config from '../../../../../config'
import { showNav } from '../../../../../actions'
import Modal from './DialogAction';

const listGender = [
    { value: 'Male' },
    { value: 'Female' }
]

class ListTestimonial extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.props.showNav('NAV_POST');
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/list-testimonial`, { headers: { userToken } })
            .then(res => {
                if (res.status === 200) {
                    const data = res.data.data.map((item, index) => ({
                        stt: index + 1,
                        _id: item._id,
                        fullName: item.fullName,
                        gender: listGender[item.gender].value,
                        urlImage: item.urlImage,
                        position: item.position,
                        content: item.content
                    }))
                    this.setState({ data })
                }
            }).catch(err => {
                console.log(err)
            })
    }
    onAddItem = () => {
        const { history } = this.props;
        history.push("/admin/testimonial/create-testimonial");
    }
    onEditItem = item => {
        const { history } = this.props;
        history.push(`/admin/testimonial/edit-testimonial/${item._id}`);
    }
    onDeleteItem = item => {
        const dataDiaLog = {
            title: 'Xác Nhận Xóa Testimonial',
            content: 'Bạn Có Chắc Chắn Muốn Xóa ?',
            onsubmit: this.handleRemove,
            item: item
        }
        this.setState({ displayDialog: true, dataDiaLog })
    }
    handleRemove = item => {
        const userToken = localStorage.getItem('userToken');
        axios.delete(`${config.host}/delete-testimonial/${item._id}`, { headers: { userToken } })
            .then(res => {
                if (res.status === 200) {
                    const { data } = this.state;
                    this.setState(state => ({
                        data: data.filter(row => row._id !== item._id),
                        displayDialog: false, dataDiaLog: undefined
                    }));
                }
            })
            .catch(err => {
                console.log(err);
            })
    };
    closeDialog = () => {
        this.setState({ displayDialog: false });
    }
    render() {
        const { data, displayDialog, closeDialog, dataDiaLog } = this.state;
        return (
            <div className='listTestimonial'>
                {
                    dataDiaLog ?
                        <Modal displayDialog={displayDialog} closeDialog={this.closeDialog}
                            dataDiaLog={dataDiaLog} />
                        : null
                }
                <Table
                    data={data}
                    headers={[{ name: '...', prop: 'stt', search: false, },
                    { name: "Name", prop: "fullName", search: true },
                    { name: "Gender", prop: "gender", search: true },
                    { name: "Position", prop: "position", search: true },
                    { name: 'Content', prop: 'content', search: false },]}
                    onAddItem={this.onAddItem}
                    actions={[
                        {
                            icon: 'fa fa-pencil',
                            action: this.onEditItem,
                            tooltip: 'Edit'
                        },
                        {
                            icon: 'fa fa-trash',
                            action: this.onDeleteItem,
                            tooltip: 'Delete'
                        }
                    ]}
                />
            </div>
        )
    }
}

export default connect(null, { showNav })(ListTestimonial);