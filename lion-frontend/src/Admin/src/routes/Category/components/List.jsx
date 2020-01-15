import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Table from './../../../common/Table';
import config from '../../../../../config'
import { showNav } from '../../../../../actions'

class List extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.props.showNav('NAV_POST');
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/list-category`, { headers: { userToken } })
            .then(res => {
                if (res.status === 200) {
                    const data = res.data.data.map((item, index) => ({
                        stt: index + 1,
                        _id: item._id,
                        title: item.title,
                        urlImage: item.urlImage,
                        description: item.position,
                    }))
                    this.setState({ data })
                }
            }).catch(err => {
                console.log(err)
            })
    }
    onEditItem = item => {
        const { history } = this.props;
        history.push(`/admin/category/edit-category/${item._id}`);
    }
    render() {
        const { data, displayDialog, closeDialog, dataDiaLog } = this.state;
        return (
            <div className='listTestimonial'>
                <Table
                    data={data}
                    headers={[{ name: '...', prop: 'stt', search: false, },
                    { name: "Title", prop: "title", search: true },]}
                    actions={[
                        {
                            icon: 'fa fa-pencil',
                            action: this.onEditItem,
                            tooltip: 'Edit'
                        }
                    ]}
                />
            </div>
        )
    }
}

export default connect(null, { showNav })(List);