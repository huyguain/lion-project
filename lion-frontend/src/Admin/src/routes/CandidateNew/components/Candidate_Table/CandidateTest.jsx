import React, { Component } from 'react';
import FormatTable from '../../../../common/Table';
import moment from 'moment';

import FormatTable from '../../../../common/Table';

import moment from 'moment';

 

class CandidateTest extends Component {

    render() {

        let { dataCandidate, id } = this.props

        let CandidateDetail = dataCandidate.filter(e => e._id === id)

        let data = CandidateDetail[0];

        if (!data || data === []) {

            return (

                <div></div>

            )

        } else {

            let dataTable = data.entryCodeIds.map((value, index) => {
                if (!value.englishExamId) {
                    return {
                        stt: index + 1,
                        code: value.code,
                        point: value.point,
                        startTime: (value.startTime) ? moment(value.startTime).format("MM/DD/YYYY") : '',
                        question: value.questionIds.length,
                        result: (value.result) ? value.result : 'UNTESTED',
                        language: value.templateId ? value.templateId.language : ''
                    }
                } else {
                    return {
                        stt: index + 1,
                        code: value.code,
                        point: value.point,
                        startTime: (value.startTime) ? moment(value.startTime).format("MM/DD/YYYY") : '',
                        question: value.englishExamId.questions.length,
                        result: (value.result) ? value.result : 'UNTESTED',
                        language: value.englishExamId ? value.englishExamId.language : ''
                    }
                }
            })
            return (
                <div class="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <caption>
                                Full Name: {data.firstName} {data.lastName}
                                <br />
                                Email: {data.email}
                            </caption>
                            <FormatTable
                                data={dataTable}
                                headers={[
                                    { name: "Stt", prop: "stt", search: false },
                                    { name: "Code", prop: "code", search: true },
                                    { name: "Language", prop: "language", search: true },
                                    { name: "Start Test", prop: "startTime", search: false },
                                    { name: "Question", prop: "question", search: false },

                                    { name: "Point", prop: "point", search: false },

                                    { name: "Result", prop: "result", search: true },

                                ]}

                                actions={[
                                    {
                                        icon: 'fa fa-bars',
                                        action: item => this.props.onViewTest(item.code)
                                    }

                                ]}

                                datadismiss={"modal"}

                                pagerSize={5}

                            />

                        </div>

                    </div>

                </div>

            )

        }

    }

 

}

 

export default (CandidateTest);

 