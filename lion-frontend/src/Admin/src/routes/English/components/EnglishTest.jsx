import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import config from '../../../../../config';

class EnglishTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            englishEntries: []
        }
        this.changeStatus = this.changeStatus.bind(this);
    }
    componentDidMount() {
        axios.get(`${config.host}/list-entry-english-test`)
            .then((res) => {
                const { englishEntries } = res.data;
                this.setState({ englishEntries })
                console.log(res);
            })
            .catch(err => console.log(err));
    }
    getFullName(firstName, lastName) {
        return `${firstName} ${lastName}`
    }
    changeStatus(id) {
        this.props.history.push(`/admin/english/mark-english-test/${id}`)
    }
    render() {
        const { englishEntries } = this.state;
        // const countQuestions = englishEntries.englishExamId.questions.length;
        console.log("status", englishEntries)
        return (
            <div className="row justify-content-center cover-layout-editor">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">
                            List english entry test
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <tbody>
                                    {
                                        englishEntries.map(englishItem => (
                                            <tr onClick={() => this.changeStatus(englishItem._id)}
                                                style={englishItem.status ? { background: 'rgba(0, 0, 0, 0.3)' } : { background: 'white' }}>
                                                <td className="mailbox-star"><a href="#"><i class="fa fa-star text-yellow"></i></a></td>
                                                <td className="mailbox-name">
                                                    {englishItem.code}
                                                </td>
                                                <td className="mailbox-subject"><b>
                                                    {this.getFullName(englishItem.candidateId.firstName, englishItem.candidateId.lastName)}</b>
                                                </td>
                                                <td className="mailbox-attachment">{`${englishItem.point}/${(englishItem.englishExamId.questions.length - 1) * 2}`}</td>
                                                <td className="mailbox-date">{moment(englishItem.endTime).format("YYYY-MM-DD")}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {/* <!-- /.table --> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EnglishTest;