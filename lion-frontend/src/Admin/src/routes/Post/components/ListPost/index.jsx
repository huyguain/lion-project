import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import Table from '../../../../common/Table';
import Modal from '../DialogAction';
import { showNav } from '../../../../../../actions';
import config from '../../../../../../config';
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      displayDialog: false,
    };
    this.onViewItem = this.onViewItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
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
    this.props.showNav('NAV_POST');
    localStorage.removeItem('currentPost');
    const userToken = localStorage.getItem('userToken');
    axios.get(`${config.host}/list-post`, { headers: { userToken } })
      .then(res => {
        if (res.status === 200) {
          const data = res.data.data;
          this.setState({ data });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  handleRemove(item) {
    const userToken = localStorage.getItem('userToken');
    axios.delete(`${config.host}/delete-post/${item._id}`, { headers: { userToken } })
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
  onAddItem() {
    const { history } = this.props;
    history.push("/admin/post/create-post");
  }
  onViewItem(item) {
    console.log('view', item);
    const { history } = this.props;
    history.push(`/admin/post/view/${item._id}`);

  }
  onDeleteItem(item) {
    const dataDiaLog = {
      title: 'Xác Nhận Xóa Post',
      content: 'Bạn Có Chắc Chắn Muốn Xóa ?',
      onsubmit: this.handleRemove,
      item: item
    }
    this.setState({ displayDialog: true, dataDiaLog })
  }
  onEditItem(item) {
    const { history } = this.props;
    history.push(`/admin/post/edit-post/${item._id}`);
  }
  closeDialog() {
    this.setState({ displayDialog: false });
  }
  convertData(data) {
    return data.map((item, i) => ({
      stt: i + 1,
      _id: item._id,
      title: item.title,
      status: item.status ? 'Active' : 'Not Active',
      image: item.urlImage,
      category: item.category,
      content: item.content,
      description: item.description,
      url: item.category === 'Page' ? `/introduce-listing/${item.link_url}` :
        `/news-listing/${this.getCategory(item.category)}/${item.link_url}`,
      create_at: (item.create_at) ? moment(item.create_at).format("MM/DD/YYYY") : '',
      update_at: (item.update_at) ? moment(item.update_at).format("MM/DD/YYYY") : '',
    }))
  }
  render() {
    const { data, displayDialog, dataDiaLog } = this.state;
    return (
      <div className="listPost">
        {
          dataDiaLog ?
            <Modal displayDialog={displayDialog} closeDialog={this.closeDialog}
              dataDiaLog={dataDiaLog} />
            : null
        }
        <Table
          data={this.convertData(data)}
          headers={[{ name: '...', prop: 'stt', search: false, },
          { name: "Title", prop: "title", search: true },
          { name: "Category", prop: "category", search: true },
          { name: 'Url', prop: 'url', search: true },
          { name: "Create date", prop: "create_at", search: false },
          { name: "Update date", prop: "update_at", search: false },
          { name: 'Status', prop: 'status', search: false },]}
          onAddItem={this.onAddItem}
          actions={[
            {
              icon: "fa fa-eye",
              action: this.onViewItem,
              tooltip: 'View'
            },
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
    );
  }
}

export default connect(null, { showNav })(App);