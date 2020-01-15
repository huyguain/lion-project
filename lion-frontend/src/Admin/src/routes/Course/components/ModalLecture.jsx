import React, { Component } from 'react';
import TableView from '../../../common/TableView';
import { Table } from 'semantic-ui-react';
import classNames from 'classnames';
class Modal extends Component {
    render() {
        const { displayDialog, closeDialog, dataDiaLog } = this.props;
        return (
            <div className="modal" tabIndex="-1" role="dialog"
                style={{ display: displayDialog ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end'
                        }}>
                            <h5 className="modal-title" style={{ width: '100%' }}>{dataDiaLog.title}</h5>
                            <button type="button" className="close"
                                onClick={_ => closeDialog()}
                                data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '250px', overflow: "scroll" }}>

                            {
                                dataDiaLog.section.lectures.map((lecture, index) => (
                                    <div>
                                        <h3>Lecture {index + 1}</h3>
                                        <Table celled selectable>
                                            <Table.Body>
                                                <Table.Row className="oddItem">
                                                    <Table.Cell>Type</Table.Cell>
                                                    <Table.Cell>{lecture.type}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row className={classNames({
                                                    'eventItem': true,
                                                    'hide-input': lecture.type === 'quiz'
                                                })}>
                                                    <Table.Cell>Url Video</Table.Cell>
                                                    <Table.Cell>{lecture.urlVideo}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row className={classNames({
                                                    'eventItem': true,
                                                    'hide-input': lecture.type === 'quiz'
                                                })}>
                                                    <Table.Cell>Title</Table.Cell>
                                                    <Table.Cell>{lecture.title}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row className={classNames({
                                                    'eventItem': true,
                                                    'hide-input': lecture.type === 'video'
                                                })}>
                                                    <Table.Cell >Duration</Table.Cell>
                                                    <Table.Cell>{lecture.duration}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row className={classNames({
                                                    'eventItem': true,
                                                    'hide-input': lecture.type === 'video'
                                                })}>
                                                    <Table.Cell>Number Question</Table.Cell>
                                                    <Table.Cell>{lecture.numberQuestion}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row className={classNames({
                                                    'eventItem': true,
                                                    'hide-input': lecture.type === 'video'
                                                })}>
                                                    <Table.Cell>Pass Score</Table.Cell>
                                                    <Table.Cell>{lecture.passScore}</Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </div>
                                )

                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Modal;