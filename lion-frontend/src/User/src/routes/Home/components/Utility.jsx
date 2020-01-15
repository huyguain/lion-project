import React, { Component } from 'react';

class Utility extends Component {
  render() {
    return (
      <div className="utility">
        <div className="container">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="row">
                <div className="col-md-2">
                  <div className="wrap-icon">
                    <div className="icon-block1">
                      <img src={require("../assets/icon-block1.png")} alt="icon-block1" />
                      <div className="inner-icon-block1"></div>
                    </div>
                    <div className="arrow-bottom" >
                      <img src={require("../assets/arrow-bottom.png")} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-md-10  utility-text">
                  Fresher Academy là nơi các bạn
                trẻ nghĩ đến đầu tiên khi muốn
                theo đuổi ngành phần mềm
                </div>
              </div>
            </div>
            <div className="col-md-3 border-right">
              <div className="row">
                <div className="col-md-2">
                  <img src={require("../assets/icon-block3.png")} alt="icon-block3" />
                </div>
                <div className="col-md-3  utility-text">
                  <div className="wrap-margin-left">
                    <div className="title-medal">Đào Tạo</div>
                    <div className="number-medal">5000</div>
                  </div>
                </div>
                <div className="col-md-7 utility-text">
                  học viên trở thành lập trình viên toàn cầu từ  năm 2001
                </div>
              </div>
            </div>
            <div className="col-md-3 border-right">
              <div className="row">
                <div className="col-md-3">
                  <img src={require("../assets/icon-block2.png")} alt="icon-block2" />
                </div>
                <div className="col-md-9  utility-text">
                  <div>
                    <div>Hotline</div>
                    <div className="text-phone">04 (3) 666 666</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 utility-text">
              <div className="row">
                <div className="col-md-4 utility-text padding-right-0">
                  Follow us:
                </div>
                <div className="col-md-8 utility-text">
                  <div className="icon-social-network"><i className="fa fa-facebook-f" /></div>
                  <div className="icon-social-network"><i className="fa fa-youtube-play"></i></div>
                  <div className="icon-social-network"><i className="fa fa-wikipedia-w"></i></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Utility;