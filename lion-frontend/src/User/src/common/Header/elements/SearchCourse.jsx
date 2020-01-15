import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../../config'

class SearchCourse extends Component {
    constructor() {
        super();
        this.state = {
            openSuggestSearch: false,
            valueSearch: '',
            dataRsSearch: [],
            indexSelect: -1,
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    dataRsSearch() {
        const { valueSearch } = this.state;
        if (valueSearch === '') return;
        axios.get(`${config.host}/search-suggest-course/${valueSearch}`)
            .then(data => {
                this.setState({ dataRsSearch: data.data.data })
            })
            .catch(
            this.setState({ dataRsSearch: [] })
            )
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.valueSearch !== prevState.valueSearch
            && this.state.indexSelect === -1) {
            if (this.state.valueSearch !== '') this.dataRsSearch();
            else this.setState({ dataRsSearch: [] });
        }
    }
    handleKeyPress(event) {
        const { dataRsSearch, indexSelect } = this.state;
        const length = dataRsSearch.length;
        let index = -1;
        switch (event.keyCode) {
            case 38:
                index = indexSelect > 0 ? indexSelect - 1 : length - 1;
                this.setState({
                    indexSelect: index,
                    valueSearch: dataRsSearch[index] ? dataRsSearch[index].courseName : ''
                })
                break;
            case 40:
                index = indexSelect === length - 1 || indexSelect === -1 ? 0 : indexSelect + 1;
                this.setState({
                    indexSelect: index,
                    valueSearch: dataRsSearch[index] ? dataRsSearch[index].courseName : ''
                })
                break;
            case 13:
                if (indexSelect !== -1) {
                    const itemRs = dataRsSearch[indexSelect];
                    this.props.history.push(`/course-open/${itemRs._id}/${itemRs.learningPath}`)
                    this.setState({ openSuggestSearch: false })
                }
                break;
            default: this.setState({ indexSelect: index });
        }
    }
    render() {
        const { openSuggestSearch, valueSearch, dataRsSearch = [] } = this.state;
        const { history } = this.props;
        return (
            <div className={'middleSearchComponent'}
                onMouseLeave={_ => this.setState({ openSuggestSearch: false, dataRsSearch: [] })}
            >
                <div className={'middleBarSearch'}>
                    <input type='text'
                        placeholder='Find your courses...'
                        onFocus={_ => this.setState({ openSuggestSearch: true })}
                        onChange={event => this.setState({
                            valueSearch: event.target.value,
                            openSuggestSearch: true
                        })}
                        onKeyUp={this.handleKeyPress}
                        ref={(input) => { this.nameInput = input }}
                        value={valueSearch}
                    />
                    < input type='submit' value='' />
                </div>
                <div className={'resultSuggestSearch'}
                    style={{
                        display: openSuggestSearch && dataRsSearch.length !== 0 ? 'block' : 'none'
                    }}>
                    <ul className={'listRsSearch'}>
                        {
                            dataRsSearch.map(itemRs =>
                                <div key={Math.random() + itemRs._id}
                                    onClickCapture={() =>
                                        this.props.history.push(`/course-open/${itemRs._id}/${itemRs.learningPath}`)}
                                    className={'itemSuggestSearch'}
                                >
                                    {itemRs.courseName}
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default SearchCourse;