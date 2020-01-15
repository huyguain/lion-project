import React from 'react';
import { Table, Button, Form, Input, Select, Dropdown, Icon, List, TextArea } from 'semantic-ui-react';
export default (props) => {
    const { data, actions } = props;
    console.log("props", props)
    const getActions = () => {
        return actions ? (
            <div className="cover-action-btn">
                <Button className="float-right cover-btn-cancel" onClick={actions.cancle}>Cancel</Button>
                <Button className="float-right cover-btn-save" onClick={actions.edit}>Edit</Button>
            </div>
        )
        : <div></div>
    }
    console.log("data")
    return (

        <div>
            <Table celled selectable>
                <Table.Body>
                    {
                        data.map((item, index) => {
                            if (!item.value) {
                                return <Table.Row> </Table.Row>
                            }
                            if (item.title === "sections") {
                                return (
                                    <Table.Row className={(index + 1) % 2 === 0 ? "oddItem" : "evenItem"}>
                                        <Table.Cell>{item.title}</Table.Cell>
                                        <Table.Cell>
                                            {
                                                item.value.map((section, index) => {
                                                    return (
                                                        <List.Item className={(index + 1) % 2 === 0 ? "oddItem" : "evenItem"}>
                                                            <List.Content floated='right'>
                                                                <Icon name="list" className="float-right"
                                                                    size="large" onClick={() => actions.viewLectures(section)} />
                                                            </List.Content>
                                                            <List.Content>
                                                                {section.section}
                                                            </List.Content>
                                                        </List.Item>
                                                    )
                                                })
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }
                            return (
                                <Table.Row className={(index + 1) % 2 === 0 ? "oddItem" : "evenItem"}>
                                    <Table.Cell>{item.title}</Table.Cell>
                                    <Table.Cell>{item.value}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }

                </Table.Body>
            </Table>
            {
                getActions()
            }
        </div>
    )
}
