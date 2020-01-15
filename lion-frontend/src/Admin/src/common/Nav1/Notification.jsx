import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import axios from 'axios';
import events from 'events';
import config from '../../../../config';
const eventEmitter = new events.EventEmitter();
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: ""
        }
        this.myEventHandler = this.myEventHandler.bind(this);
    }
    myEventHandler() {
        axios.get(`${config.host}/count-english-not-point`)
            .then((res) => {
                const { success, count } = res.data;
                if (success) {
                    this.setState({ count })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        eventEmitter.on('count', this.myEventHandler);
        eventEmitter.emit('count');
    }
    render() {
        let styleLabel = {
            height: `27px`,
            paddingLeft: `55px`,
        }
        const { count } = this.state;
        return (
            <div style={styleLabel}>
                <div
                    style={{ display: `${this.props.showNotifi && count !== 0 ? `block` : `none`}` }}
                >
                    <Label
                        color='red'>{count}
                    </Label>
                </div>

            </div>
        )
    }
}

export default Notification;