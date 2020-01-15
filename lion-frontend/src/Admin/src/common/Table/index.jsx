import React, { Component } from 'react';
import orderBy from "lodash/orderBy";
import HeaderTable from './elements/HeaderTable';
import BodyTable from './elements/BodyTable';
import Pagination from './elements/Pagination';
import SearchTable from './elements/SearchTable';
import ExportModal from './elements/ExportModal';
import { Loader, Button } from 'semantic-ui-react';

import './index.css';

const invertDirection = {
    asc: "desc",
    desc: "asc"
};
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageOfItems: [],
            columnToSort: "",
            sortDirection: "desc",
            initialPage: 1
        }
        this.handleSort = this.handleSort.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.updateItemSearch = this.updateItemSearch.bind(this);
        this.onchangeInitialPage = this.onchangeInitialPage.bind(this);
    }
    updateItemSearch(itemSearch) {
        let { data: pageOfItems } = this.props;
        Object.keys(itemSearch).map(item =>
            pageOfItems = pageOfItems.filter(i =>
                RegExp(itemSearch[item].trim().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1").toLowerCase())
                    .test(new String(i[item]).toLowerCase()))
        )
        this.setState({ data: pageOfItems, itemSearch, initialPage: 1 })
    }
    handleSort(columnName) {
        const { columnToSort, sortDirection } = this.state;
        const data = orderBy(this.state.data, columnName,
            columnToSort === columnName
                ? invertDirection[sortDirection]
                : "asc")
        this.setState({
            data,
            columnToSort: columnName,
            sortDirection: columnToSort === columnName
                ? invertDirection[sortDirection]
                : "asc"
        })
    }
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
    componentDidMount() {
        const { headers, data } = this.props;
        let itemSearch = {};
        let itemSearchType = {};
        headers.map(item =>
            item.search ? (itemSearch = { ...itemSearch, [item.prop]: '' },
                itemSearchType = { ...itemSearchType, [item.prop]: item.type })
                : null
        )
        this.setState({
            itemSearch, itemSearchType,
            data: data.map((item, index) => ({ stt: index, ...item }))
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
            this.setState({
                data: this.props.data
            });
        }
    }
    onchangeInitialPage(initialPage) {
        this.setState({ initialPage })
    }
    render() {
        const { headers, actions, onAddItem, ondbClick
            , ondbClickRow, pagerSize = 10, datadismiss, datatarget,
            datatoggle, actionFooter } = this.props;
        const { pageOfItems, initialPage, columnToSort,
            sortDirection, itemSearch, itemSearchType, data } = this.state;
        return (
            <div className="container-fluid">
                {actionFooter &&
                    <ExportModal
                        headers={actionFooter.filedExport ? actionFooter.filedExport : headers}
                        data={data}
                        nameExport={actionFooter.nameExport}
                    />
                }
                <SearchTable onAddItem={onAddItem}
                    itemSearchType={itemSearchType}
                    itemSearch={itemSearch} handleSearch={this.props.updateItemSearch
                        ? this.props.updateItemSearch : this.updateItemSearch} />
                <table className="ui celled table"
                    style={{
                        borderCollapse: 'collapse', marginLeft: '3%',
                        marginRight: '3%', width: '94%'
                    }}>
                    <HeaderTable headers={headers}
                        handleSort={this.handleSort}
                        columnToSort={columnToSort}
                        sortDirection={sortDirection}
                        action={actions ? true : false}
                    />
                    <BodyTable
                        datatoggle={datatoggle}
                        datatarget={datatarget}
                        ondbClickRow={ondbClickRow}
                        ondbClick={ondbClick}
                        headers={headers}
                        actions={actions}
                        datadismiss={datadismiss}
                        data={pageOfItems} />
                </table>
                {
                    pageOfItems.length === 0 &&
                    <div className='NoDataShow'>NO DATA</div>

                }
                <div className='FooterTable' style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: actionFooter ? 'flex-end' : 'flex-start'
                }}>
                    <Pagination
                        items={data}
                        onchangeInitialPage={this.onchangeInitialPage}
                        onChangePage={this.onChangePage}
                        pageSize={pagerSize}
                        initialPage={initialPage}
                    />
                    {
                        actionFooter &&
                        <div style={{ width: '50%', textAlign: 'right', marginRight: '3%' }}>
                            <Button
                                key={Math.random()}
                                className="cover-btn-import"
                                onClick={actionFooter.importTo}
                            >Import</Button>
                            <Button type="button" className="cover-btn-import"
                                data-toggle="modal" data-target="#exportModal">Export</Button>
                            <Button key={Math.random()} className="cover-btn-import">Report</Button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
Table.defaultProps = {
    actionFooter: undefined,
    ondbClick: function () { },
    ondbClickRow: function () { },
    onchangeInitialPage: function () { }
}
export default Table;