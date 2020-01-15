import React, { Component } from 'react';
import InputEdit from './InputEdit';
import classNames from 'classnames';

class BodyTable extends Component {
    constructor() {
        super();
        this.state = {
            showInput: true
        }
    }
    contentPost(post, indexPost) {
        const { headers } = this.props;
        return headers.map((key, index) =>
            <td key={'tdc' + index + key} className={classNames('textLineTable')}
                data-toggle="tooltip" data-placement="top" title={post[key.prop]} >
                {
                    key.edit ?
                        <InputEdit
                            id={post.id}
                            value={post[key.prop]}
                            type={key.type}
                            showHandleInput={showInput => this.setState({ showInput: showInput })}
                            updateData={newData => { post[key.prop] = newData; key.edit(post, newData) }}
                        />
                        : post[key.prop]
                }
            </td>
        )
    }
    getActions(post) {
        const { actions } = this.props;
        return actions ?
            <td style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                onClick={_ => console.log('2312')}>
                {actions.map((action, index) =>
                    <i key={'action' + action.icon + index}
                        data-toggle="tooltip" data-placement="top" title={action.tooltip}
                        onMouseOver={_ => this.setState({ showInput: false })}
                        onMouseOut={_ => this.setState({ showInput: true })}
                        onMouseLeave={_ => this.setState({ showInput: true })}
                        className={classNames(action.icon, 'iconContentTabel')}
                        onClick={() => action.action(post)}
                    ></i>)
                }
            </td>
            : null
    }
    render() {
        const { showInput } = this.state;
        const { data, ondbClickRow, ondbClick,
            datadismiss, datatoggle, datatarget } = this.props;
        return (
            <tbody>
                {
                    data.map((post, i) =>
                        <tr key={'trc' + i + post._id} data-dismiss={datadismiss}
                            data-toggle={showInput ? datatoggle : ''}
                            data-target={showInput ? datatarget : ''}
                            className={
                                i % 2 === 0 ? 'rowTable1' : 'rowTable2'}
                            onClick={() => showInput ? ondbClickRow(post) : {}}>
                            {this.contentPost(post, i)}
                            {this.getActions(post)}
                        </tr>
                    )
                }
            </tbody>
        )
    }
}
export default BodyTable