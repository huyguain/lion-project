import React, { Component } from 'react';
import axios from 'axios';
import {
    Loader
} from 'semantic-ui-react';
import TableView from '../../../common/TableView';
import config from '../../../../../config';
import Modal from './ModalLecture';

export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            load: false,
            displayDialog: false
        }
        this.onCancle = this.onCancle.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onViewLectures = this.onViewLectures.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    onCancle() {
        const { history } = this.props;
        history.push("/admin/course");
    }
    onEdit() {
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/admin/course/edit-course/${id}`)
    }
    onViewLectures(section) {
        console.log(section)
        const dataDiaLog = {
            title: 'View lectures',
            section: section
        }
        this.setState({ ...this.state, displayDialog: true, dataDiaLog })
    }
    closeDialog() {
        this.setState({ displayDialog: false });
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/getCourse/${id}`, { headers: { userToken } })
            .then(res => {
                const { data } = res.data;
                const dataCourse = [
                    {
                        title: "language",
                        value: data.language
                    },
                    {
                        title: "Description",
                        value: data.courseName

                    },
                    {
                        title: "Title",
                        value: data.title
                    },
                    {
                        title: "Image",
                        value: <img className="image-panel" src={`${config.imageUrl}/${data.urlIcon}`} alt="image panel" />,
                    },
                    {
                        title: "Level",
                        value: <img className="image-panel" src={`${config.imageUrl}/${data.urlImage}`} alt="image panel" />,
                    },
                    {
                        title: "sections",
                        value: data.sections
                    }
                ]
                this.setState({ data: dataCourse, load: true });
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        const { load, data, displayDialog, dataDiaLog } = this.state;
        if (!load) {
            return (
                <div className="cover-loader">
                    <Loader active inline='centered'>
                        Loading...
                    </Loader>
                </div>
            )
        }
        return (
            <div className="row justify-content-center cover-layout-editor">
                {
                    dataDiaLog ?
                    <Modal displayDialog={displayDialog} closeDialog={this.closeDialog}
                        dataDiaLog={dataDiaLog} />
                    : null
                }
                <div className="col-md-10">
                    <div className="cover-title-0">View Panel</div>
                    <div className="cover-line-blue"></div>
                    <TableView
                        data={data}
                        actions={
                            {
                                edit: this.onEdit,
                                cancle: this.onCancle,
                                viewLectures: this.onViewLectures
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}