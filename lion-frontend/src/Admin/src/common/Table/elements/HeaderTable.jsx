import React, { Component } from 'react';
import classNames from 'classnames';

class HeaderTable extends Component {
    getStyle(prop, direction) {
        const { columnToSort, sortDirection } = this.props;
        if (prop !== columnToSort)
            return {}
        if (direction === sortDirection)
            return {
                color: '#000000'
            }
        return {
            color: '#ffffff'
        }
    }
    getAction() {
        const { action } = this.props;
        return action ?
            <th className={classNames('HeaderTableCol')}>
                <div className={classNames('HeaderTableColContent')}>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <span className={'HeaderTableTitle'}>Action</span>
                    </div>
                    <div className={classNames('HeaderTableColoringLeft')} />
                </div>
            </th>
            : null
    }
    render() {
        const { headers, handleSort } = this.props;
        return (
            <thead className={"HeaderTable"}>
                <tr role='row'>
                    {
                        headers.map((header, index) =>
                            <th key={Math.random() + header}
                                className={"HeaderTableCol"}
                                onClick={_ => handleSort(header.prop)}>
                                <div className={classNames("HeaderTableColContent")}>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <span className={classNames("HeaderTableTitle")}>
                                            {header.name}</span>
                                        <div className={"HeaderTableIconSort"}>
                                            <i className={classNames("fa fa-angle-up", "iconSort")}
                                                aria-hidden="true"
                                                style={this.getStyle(header.prop, 'asc')}>
                                            </i>
                                            <i className={classNames("fa fa-angle-down", "iconSort")}
                                                aria-hidden="true"
                                                style={this.getStyle(header.prop, 'desc')}>
                                            </i>
                                        </div>
                                    </div>
                                    <div className={classNames(index === 0 ?
                                        "HeaderTableColoring" : "HeaderTableColoringLeft")} />
                                </div>
                            </th>
                        )
                    }
                    {
                        this.getAction()
                    }
                </tr>
            </thead >
        )
    }
}

export default HeaderTable;