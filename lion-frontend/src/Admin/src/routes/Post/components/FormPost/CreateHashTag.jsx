import React from 'react';
import { Form, Button, TextArea, Checkbox } from 'semantic-ui-react';

const HashTag = props => {
    const { setListHashTag, listHashTag, value } = props;
    const addHashTag = _ => {
        value.trim() !== '' && setListHashTag([...listHashTag, value.trim()], "");
    }
    return (
        <div className='formCreateHashTag' >
            <Form.Group widths='equal'>
                <Form.Input
                    fluid placeholder='Hash tag'
                    value={value}
                    onChange={event => setListHashTag(listHashTag, event.target.value)}
                />
                <Button className="float-right cover-btn-save"
                    onClick={addHashTag}>Add</Button>
            </Form.Group >
            <div className='row'
                style={{ marginLeft: 0, marginRight: 0, }}
            >
                {
                    listHashTag.map((item, index) => (
                        <div className={'itemHashTag'} key={item + Math.random()}>
                            <i className={`deleteIconItemImage fa fa-minus-circle`}
                                onClick={idex => {
                                    listHashTag.splice(index, 1);
                                    setListHashTag(listHashTag, value)
                                }}
                            />
                            <p style={{
                                backgroundColor: 'rgb(224, 220, 220)'
                            }}>{item}</p>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default HashTag;