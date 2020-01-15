import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gencode } from '../../../../../../actions';
import FormatTable from '../../../../common/Table'

class ModalTemaplate extends Component {
    send(value) {
        this.props.gencode(value)
    }
    render() {
        let { dataTemplate } = this.props
        return (
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <FormatTable
                            data={dataTemplate}
                            headers={[
                                { name: "Language", prop: "language", search: true },
                                { name: "Test Name", prop: "testName", search: true },
                                { name: "Easy", prop: "easy", search: false },
                                { name: "Medium", prop: "medium", search: false },
                                { name: "Hard", prop: "hard", search: false },
                                { name: "Pass Score", prop: "passScore", search: false },
                                { name: "Duration", prop: "duration", search: false },
                            ]}
                            datadismiss={"modal"}
                            pagerSize={5}
                            ondbClickRow={item => this.send(item)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { gencode })(ModalTemaplate);