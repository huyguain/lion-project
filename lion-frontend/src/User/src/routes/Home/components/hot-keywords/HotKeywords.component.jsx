import React, { Component } from 'react';
import './HotKeywords.component.css'
import axios from 'axios';

class HotKeywordsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: []
    }
  }

  componentDidMount() {
    axios.get(`https://raw.githubusercontent.com/tikivn/android-home-test/v2/keywords.json`)
      .then(res => {
        if (!res) return;
        if (res.status === 200 && res.data) {
          const keywords = res.data.map(keyword => {
            if (keyword.split(' ').length === 1) return keyword;
            return this.splitKeyword(keyword);
          });
          console.log('huynt keywords', keywords);
          this.setState({ keywords });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidUpdate() { }

  splitKeyword(keyword) {
    let min = 999;
    let index = 0;
    const keywordLeng = keyword.length;
    for (let i = 0; i < keywordLeng; i += 1) {
      if (keyword[i] !== ' ') continue;
      if (min >= Math.abs(keywordLeng - 2 * i - 1)) {
        min = Math.abs(keywordLeng - 2 * i - 1);
        index = i;
        continue;
      }
      break;
    }
    return keyword.slice(0, index) + '\n' + keyword.slice(index + 1);
  }

  render() {
    // const { slides = [] } = this.props;
    // const { activeIndex } = this.state;
    // if (activeIndex === -1 || slides.length === 0) {
    //     return (
    //         <div className={'carouselShowContainer'}>
    //             <BubbleLoader />
    //         </div>
    //     );
    // }
    const { keywords } = this.state;
    const colors = [
      "#fa6772",
      "#202c39",
      "#b1f0bd",
      "#2ac821",
      "#d61cce",
      "#48cabc",
      "#e2d79b",
      "#2c08c1",
      "#094afc",
      "#d39c0e",
      "#baaab3",
      "#fd0a03",
      "#0dfbcc",
      "#f2e599",
      "#e9e269",
      "#79f1ae",
      "#978d3c",
      "#67cd40",
      "#94610b",
      "#e29ac6"
    ];  
    return (
      <div className="key-words">
        {
          keywords.map((value, index) => {
            return <div className="word-item d-flex"style={
              {
                background: colors[index]
              }
            }>
              <pre key={index}>{value}</pre>
              </div>
          })
        }
      </div>
    )
  }
}

export default HotKeywordsComponent;