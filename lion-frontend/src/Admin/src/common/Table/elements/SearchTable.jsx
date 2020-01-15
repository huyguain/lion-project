import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'
import moment from 'moment';
import classNames from 'classnames';

class SearchTable extends Component {
    jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getDate(date) {
        if (date === '') return '';
        const form = date.split("/");
        const dt = new Date(form[2], form[0] - 1, form[1]);
        return moment(dt).format("YYYY-MM-DD");
    }
    render() {
        let { itemSearch = {}, itemSearchType = {}, handleSearch, onAddItem } = this.props;
        return (
            <Form className="cover-wrap-form-table containerSearchTable">
                <Form.Group widths='equal'>
                    {
                        Object.keys(itemSearch).map(item => {
                            return <Form.Input
                                fluid
                                key={`${item}+item+input` + Math.random()}
                                placeholder={this.jsUcfirst(item)}
                                type={itemSearchType[item]}
                                defaultValue={itemSearchType[item] === 'date' ?
                                    this.getDate(itemSearch[item]) : itemSearch[item]}
                                onChange={event => itemSearch[item] = itemSearchType[item] === 'date' ?
                                    moment(event.target.value).format("MM/DD/YYYY") === 'Invalid date' ? '' : moment(event.target.value).format("MM/DD/YYYY")
                                    : event.target.value}
                            />
                        })
                    }
                    <Button className={classNames('cover-btn-search-table')}
                        onClick={_ => handleSearch(itemSearch)}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Button>
                    {
                        onAddItem ?
                            <Button className={classNames('cover-btn-create-table')}
                                onClick={_ => onAddItem()}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </Button>
                            : null
                    }
                </Form.Group>
            </Form>
        )
    }
}

export default SearchTable;