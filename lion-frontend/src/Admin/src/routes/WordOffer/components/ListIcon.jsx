import React, { PureComponent } from 'react'
import '../../styles/index.css';
import config from '../../../../../config';
import { Button, Form, Icon } from 'semantic-ui-react';
import axios from 'axios'
import { listIcon } from './listIcon.js'

class ListIcon extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            listAllIcon: listIcon,
            listIconSearch: [],
            iconSlected: ''
        }
    }
    componentWillReceiveProps(newProps) {
        let { listAllIcon, listIconSearch } = this.state,
            textSearch = newProps.iconText
        if (textSearch === '') this.setState({ iconSlected: '' })
        listIconSearch = listAllIcon.filter(e => {
            return e.indexOf(textSearch) !== -1 && textSearch !== ''
        })
        this.setState({
            listIconSearch
        })
    }
    chooseIcon(iconName) {
        this.setState({
            iconSlected: iconName
        })
        this.props.changeIconOffer(iconName)
    }
    render() {
        const { listAllIcon, listIconSearch, iconSlected } = this.state
        console.log('listAllIcon', listAllIcon)
        console.log('listIconSearch', listIconSearch)
        console.log('text', this.props.iconText)
        return (
            <div className="row">
                {
                    listIconSearch.slice(0, 12).map((element, i) => {
                        return (
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <i className={`fa ${element}`} onClick={() => this.chooseIcon(element)}> {element}</i>
                            </div>
                        )
                    })
                }
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">Selected icon:   <i className={`fa ${iconSlected}`}></i></div>
            </div>
        )
    }
}
export default (ListIcon)