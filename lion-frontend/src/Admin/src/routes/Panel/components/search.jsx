import React, { Component } from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'
// import './SearchEntryCode.css'
class Search extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state
        return (
            <Form className="cover-wrap-form-table">
                <Form.Group widths='equal'>
                    <Form.Input fluid placeholder='Language' id="search-language" />
                    <Form.Input fluid placeholder='Language' id="search-language" />
                    <Button className="cover-btn-search-table" onClick={() => this.props.search()}>
                        <center>
                            <Icon name='search' />
                        </center>
                    </Button>
                    <Button className="cover-btn-create-table" onClick={() => this.props.add.push('/admin/panel/create-panel')}>
                        <center>
                            <Icon name='plus' />
                        </center>
                    </Button>
                </Form.Group>
            </Form>
        )
    }
}

export default Search;