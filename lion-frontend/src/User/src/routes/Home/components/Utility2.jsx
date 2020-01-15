import React from 'react';

const Utility = props => {
  return (
    <div className="utility2">
      <div className="container">
        <div className="row" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div className="wrap-icon">
            <div className="icon-block1">
              <img src={require("../assets/icon-block1.png")} alt="icon-block1" />
              <div className="inner-icon-block1"></div>
            </div>
            <div className="arrow-bottom" >
              <img src={require("../assets/arrow-bottom.png")} alt="" />
            </div>
          </div>
          <div className="utility-text2" style={{ marginLeft: 18 }}>
            Khám phá cơ hội của bạn tại FPT Software
          </div>
        </div>
      </div>
    </div>
  )
}
export default Utility;