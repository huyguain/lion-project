
import React, { Component } from 'react';
import axios from 'axios';
import {
    Loader
} from 'semantic-ui-react';
import TableView from '../../../common/TableView';
import config from '../../../../../config';

class ViewDatail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            load: false
        }
        this.onCancle = this.onCancle.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }
    onCancle() {
        const { history } = this.props;
        history.push("/admin/panel");
    }
    onEdit() {
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/admin/panel/edit-panel/${id}`)
    }
    
    componentDidMount() {
        const { id } = this.props.match.params;
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/panel/${id}`, {headers: { userToken }})
            .then(res => {
                const { data } = res.data;
                const dataPanel = [
                    {
                        title: "Title",
                        value: data.title
                    },
                    {
                        title: "Description",
                        value: data.description
        
                    },
                    {
                        title: "Status",
                        value: data.status ? "active" : "not active"
                    },
                    {
                        title: "Image",
                        value: <img className="image-panel" src={`${config.imageUrl}/${data.urlImage}`} alt="image panel"/>,
                    },
                    {
                        title: "Level",
                        value: data.level === 1 ? "Easy" : (data.level === 2 ? "Medium" : "Hard")
                    }
                ]
                this.setState({ data: dataPanel, load: true });
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        const { load, data } = this.state;
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
                <div className="col-md-8">
                    <div className="cover-title-0">View Panel</div>
                    <div className="cover-line-blue"></div>
                    <TableView 
                        data = {data}
                        actions = {
                            {
                                edit: this.onEdit,
                                cancle: this.onCancle
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}

export default ViewDatail;