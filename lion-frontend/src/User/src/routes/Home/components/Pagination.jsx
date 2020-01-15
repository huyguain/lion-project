import React, { Component } from 'react';
import imageLeft from '../assets/arrow-left.png';
import imageRight from '../assets/arrow-right.png';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {}
        };
    }
    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.items != prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }
    setPage(page) {
        const { items } = this.props;
        let { pager } = this.state;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        pager = this.getPager(items.length, page);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({ pager: pager });
        this.props.onChangePage(pageOfItems);
    }
    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        console.log(window.innerWidth);
        pageSize = pageSize || 4;
        const totalPages = Math.ceil(totalItems / pageSize);
        let startPage = 0, endPage = 0;
        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
        let startIndex = (currentPage - 1) * pageSize;;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        if (currentPage === totalPages) {
            startIndex = endIndex - pageSize + 1;
        }
        let pages = [];
        for (let i = startPage; i < endPage + 1; i++)pages.push(i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
    render() {
        const { pager } = this.state;
        if (!pager.pages || pager.pages.length <= 0) {
            return null;
        } else {
            return (
                <ul className='customPaging pagination'>
                    <li className={`${pager.currentPage === 1 ? 'disabled' : ''} arrowCustomPaging `}>
                        <img className="arrow-left-post"
                            src={imageLeft} alt=""
                            onClick={() => this.setPage(pager.currentPage - 1)} />
                    </li>
                    {
                        pager.pages.map((page, index) =>
                            <li className='paginationItem' key={index}>
                                <button className={pager.currentPage === page ?
                                    'paginationItemActive' : 'paginationItemNoActive'}
                                    onClick={() => this.setPage(page)}>
                                    {page}</button>
                            </li>
                        )
                    }
                    <li className={`${pager.currentPage === pager.totalPages ? 'disabled' : ''} arrowCustomPaging `}>
                        <img className="arrow-right-post"
                            src={imageRight} alt=""
                            onClick={() => this.setPage(pager.currentPage + 1)} />
                    </li>
                </ul>
            )
        }
    }
}

Pagination.defaultProps = {
    initialPage: 1
};

export default Pagination;