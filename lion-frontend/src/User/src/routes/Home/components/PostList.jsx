import React, { Component } from 'react';
import PostItem from './PostItem';
import axios from 'axios';
import config from '../../../../../config';
import { BubbleLoader } from 'react-css-loaders';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPost: [],
      pageOfItems: []
    }
    this.onChangePage = this.onChangePage.bind(this);
  }
  getdata = async (link_url) => {
    return await axios.post(`${config.host}/list-post-order`, {
      order: { link_url }
    })
      .then(res => {
        const { _id, content,
          title, description, urlImage } = res.data.data[0] ? res.data.data[0] : {};
        const dataUngTuyen = {
          id: _id,
          urlImage: `${config.imageUrl}/${urlImage}`,
          title,
          description: [description],
          titleView: 'Xem Thêm',
        }
        return dataUngTuyen;
      })
      .catch(err => {
        return {
          id: Math.random(),
          urlImage: ``,
          title: 'Notthing',
          description: 'Notthing',
          titleView: 'Xem Thêm',
        };
      })
  }
  componentDidMount = async () => {
    const dataInter = await this.getdata('ve-chuong-trinh-thuc-tap');
    const dataFresher = await this.getdata('ve-chuong-trinh-fresher');
    const dataWork = await this.getdata('ve-chuong-trinh-di-lam-ngay');
    const dataContact = await this.getdata('lien-he');
    this.setState({ listPost: [dataInter, dataFresher, dataWork, dataContact] });
  }
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }
  render() {
    const { listPost } = this.state;
    const { goTo } = this.props;
    if (listPost.length === 0) {
      return (
        <div>
          <BubbleLoader />
        </div>
      )
    }
    return (
      <div className="row" style={{ margin: 0 }}>
        {
          listPost.map((post, index) => {
            return (
              <PostItem
                goTo={goTo}
                key={post.id + index + Math.random()}
                index={index}
                post={post} />
            )
          })
        }
      </div>
    )
  }
}
export default PostList;