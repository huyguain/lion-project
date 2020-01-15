import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
  render() {
    const { history } = this.props;
    return (
      <footer className="container-fluid">
        <div className="footer-up row">
          <div className="footer-up-left col-lg-3 col-md-3 col-sm-3">
            <div className="ftleft1">
              <img src={require("./assets/LogoFresherAcedamy.png")} alt="" />
            </div>
            <div className="ftleft2">
              <div className="icon">
                {<img src={require("./assets/facebook-icon.png")} alt="" />}
              </div>
              <div className="icon">
                {<img src={require("./assets/google-icon.png")} alt="" />}
              </div>
              <div className="icon">
                {<img src={require("./assets/youtube-icon.png")} alt="" />}
              </div>
              <div className="icon">
                {<img src={require("./assets/in-icon.png")} alt="" />}
              </div>
              <div className="icon">
                {<img src={require("./assets/twiter-icon.png")} alt="" />}
              </div>
            </div>
          </div>
          <div className="footer-up-center col-lg-5 col-md-5 col-sm-5">
            <div className="ftcenter-left">
              <div className="ftcenter-left1">Solutions</div>
              <div className="ftcenter-left2"></div>
              <div className="ftcenter-left3">
                <li>Solution 1</li>
                <li>Solution 2</li>
                <li>Solution 3</li>
                <li>Solution 4</li>
                <li>Solution 5</li>
              </div>
            </div>
            <div className="ftcenter-center">
              <div className="ftcenter-center1" onClick={_ => history.push(`/introduce-listing`)}>Giới Thiệu</div>
              <div className="ftcenter-center2"></div>
              <div className="ftcenter-center3">
                <li onClick={_ => history.push(`/introduce-listing/ve-chuong-trinh-fresher`)}>C.Tr Fresher</li>
                <li onClick={_ => history.push(`/introduce-listing/ve-chuong-trinh-di-lam-ngay`)}>C.Tr Đi làm</li>
                <li onClick={_ => history.push(`/introduce-listing/ve-chuong-trinh-thuc-tap`)}>C.Tr Thực Tập</li>
                <li onClick={_ => history.push(`/introduce-listing/ve-fresher-academy`)}>Fresher Academy</li>
                <li onClick={_ => history.push(`/introduce-listing/ve-fpt-fsoftware`)}>FPT Software</li>
                <li onClick={_ => history.push(`/introduce-listing/lien-he`)}>Liên hệ</li>
              </div>
            </div>
            <div className="ftcenter-right">
              <div className="ftcenter-right1" onClick={_ => history.push(`/news-listing`)}>Tin Tức</div>
              <div className="ftcenter-right2"></div>
              <div className="ftcenter-right3">
                <li onClick={_ => history.push(`/news-listing/doi-song`)}>Đời Sống</li>
                <li onClick={_ => history.push(`/news-listing/su-kien`)}>Sự Kiện</li>
                <li onClick={_ => history.push(`/news-listing/tam-su`)}>Tâm sự Fresher</li>
              </div>
            </div>
          </div>
          <div className="footer-up-right col-lg-3 col-md-3 col-sm-3">
            <div className="footer-up-contact">Contact</div>
            <div className="footer-up-rectangle"></div>
            <input type="text" className="footer-up-email" placeholder="Email" />
            <textarea type="text" className="footer-up-messenger" placeholder="Messenger" />
            <div className="footer-up-send"><button>Send</button></div>
          </div>
        </div>
        <div className="footer-down">
          Site Map  |  Terms of Use  |  Privacy PolicyCopyright © 2005 - 2017 Fresher Academy. All rights reserve
        </div>
      </footer>
    );
  }
}

export default Footer;
