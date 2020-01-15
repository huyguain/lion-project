import React, { Component } from 'react';
import axios from 'axios';
import {
    Loader
} from 'semantic-ui-react';
import TableView from '../../../../common/TableView';
import config from '../../../../../../config';
import ReactHtmlParser from 'react-html-parser';

class ViewPost extends Component {
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
        history.push("/admin/post");
    }
    onEdit() {
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/admin/post/edit-post/${id}`)
    }
    getCategory(category) {
        switch (category) {
            case 'Đời Sống': return 'doi-song';
            case 'Sự Kiện': return 'su-kien';
            case 'Tâm Sự': return 'tam-su';
            default: return 'category';
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/post/${id}`, { headers: { userToken } })
            .then(res => {
                const { data } = res.data;
                const dataPanel = [
                    {
                        title: "Title",
                        value: data.title
                    },
                    {
                        title: 'Title Url',
                        value: data.category === 'Page' ? `/introduce-listing/${data.link_url}` :
                            `/news-listing/${this.getCategory(data.category)}/${data.link_url}`,
                    },
                    {
                        title: "Description",
                        value: data.description
                    },
                    {
                        title: "Category",
                        value: data.category
                    },
                    {
                        title: "Highlights",
                        value: data.status ? "Active" : "Not Active"
                    },
                    {
                        title: "Image",
                        value: <img className="image-panel" src={`${config.imageUrl}/${data.urlImage}`} />,
                    },
                    {
                        title: 'Slider',
                        value: <div className='row'>
                            {
                                data.urlImageSlider.map(item => (
                                    <img key={item + Math.random()} className="col-sm-3 col-md-3 col-lg-3"
                                        height='100%' style={{ padding: 5 }}
                                        src={`${config.imageUrl}/${item}`} />
                                ))
                            }
                        </div>
                    },
                    {
                        title: "Content",
                        value: <div > {ReactHtmlParser(data.content)}</div>
                    },
                    {
                        title: 'Hash Tag',
                        value: data.hashTag.toString()
                    },
                    {
                        title: "Create at",
                        value: new Date(data.create_at).toDateString()
                    },
                    {
                        title: "Update at",
                        value: new Date(data.update_at).toDateString()
                    },
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
                        data={data}
                        actions={
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

export default ViewPost;