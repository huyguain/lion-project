import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../../config';
import Table from '../../../common/Table';
import { Loader } from 'semantic-ui-react';
import Modal from './ModalDelete';
import FlashMessage from '../../../components/FlashMessagesList'
class ListCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCourse: [],
            load: false,
            displayDialog: false,
        }
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.onViewItem = this.onViewItem.bind(this);
    }
    onEditItem(item) {
        const { history } = this.props;
        history.push(`/admin/course/edit-course/${item._id}`)
    }
    handleRemove(item) {
        const userToken = localStorage.getItem('userToken');
        axios.delete(`${config.host}/delete-post/${item._id}`, { headers: { userToken } })
            .then(res => {
                const { data } = res;
                if (data.success) {
                    this.setState(state => ({
                        listCourse: this.state.listCourse.filter(course => course._id !== item._id),
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
        this.setState({ ...this.state, displayDialog: true, dataDiaLog })
    }
    onViewItem(item) {
        console.log('view', item);
        const { history } = this.props;
        history.push(`/admin/course/view/${item._id}`);
    }
    closeDialog() {
        this.setState({ displayDialog: false });
    }
    componentDidMount() {
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/list-course`, { headers: { userToken } })
            .then(res => {
                const { data } = res.data;
                if (res.data.success) {
                    const newData = data.map((course, i) => {
                        return {
                            stt: i + 1,
                            _id: course._id,
                            language: course.language,
                            course: course.courseName
                        }
                    })
                    this.setState({ listCourse: newData, load: true });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        const { listCourse, displayDialog, dataDiaLog } = this.state;
        console.log("this.propss1", this.props);
        if (!this.state.load) {
            return (
                <div className="cover-loader">
                    <Loader active inline='centered'>
                        Loading...
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
                <FlashMessage />
                <Table
                    data={listCourse}
                    headers={[
                        { name: '...', prop: 'stt', search: false, },
                        { name: "Language", prop: "language", search: true },
                        { name: "Course", prop: "course", search: true },
                    ]}
                    onAddItem={_ => {
                        const { history } = this.props;
                        history.push('/admin/course/create-course')
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

export default ListCourse;