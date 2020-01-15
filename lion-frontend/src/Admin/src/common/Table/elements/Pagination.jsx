import React, { Component } from 'react';
import imageLeft from '../assets/arrow-left.png';
import imageRight from '../assets/arrow-right.png';
import classNames from 'classnames';

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
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }
    setPage(page) {
        const { items, pageSize } = this.props;
        let { pager } = this.state;
        if (items.length === 0) {
            this.setState({ pager: {} });
            this.props.onChangePage([]);
        }
        if (page < 1 || page > Math.ceil(items.length / pageSize)) {
            return;
        }
        pager = this.getPager(items.length, page, pageSize);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({ pager: pager });
        this.props.onchangeInitialPage(pager.currentPage)
        this.props.onChangePage(pageOfItems);
    }
    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
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
                <ul className={classNames("PaginationTable", 'pagination')}>
                    <li className={classNames("paginationArrowPaginationTable",
                        pager.currentPage === 1 ? 'disabled' : '', )}
                        onClick={() => this.setPage(pager.currentPage - 1)} >
                        <img className={"arrowLeftPaginationTable"}
                            src={imageLeft} alt=""
                        />
                    </li>
                    {
                        pager.pages.map((page, index) =>
                            <li className={classNames("paginationItemPaginationTable")} key={index}>
                                <button className={pager.currentPage === page ?
                                    "paginationItemActivePaginationTable" :
                                    "paginationItemNoActivePaginationTable"}
                                    onClick={() => this.setPage(page)}>
                                    {page}</button>
                            </li>
                        )
                    }
                    <li className={classNames(pager.currentPage === pager.totalPages ?
                        'disabled' : '', "paginationArrowPaginationTable")}
                        onClick={() => this.setPage(pager.currentPage + 1)}>
                        <img className={"arrowRightPostPaginationTable"}
                            src={imageRight} alt=""
                        />
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