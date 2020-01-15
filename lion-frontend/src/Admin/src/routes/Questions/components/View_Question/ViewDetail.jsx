import React, { Component } from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import TableView from '../../../../common/TableView';
import config from '../../../../../../config';


class ViewDatail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            load: false
        }
        this.onCancle = this.onCancle.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
    }

    createMarkup(text) {
        let  _text  =  text.split(`<`).join(`&lsaquo;`)
        let  _text1  =  _text.split(`>`).join(`&rsaquo;`)
        let  _text2  =  _text1.split(`'`).join(`&Prime;;`)
        return  (
             _text2.split("\n").map(value  =>  {
                return  (
                    <div  dangerouslySetInnerHTML={{ __html:  value.split(" ").join('&nbsp') }} />

                )
            })
        )
    }
    onCancle() {
        const { history } = this.props;
        history.push("/admin/question/view-question");
    }
    onEdit() {
        const { history } = this.props;
        const { id } = this.props.match.params;
        history.push(`/admin/question/edit-question/${id}`)
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const userToken = localStorage.getItem('userToken');
        axios.get(`${config.host}/getQuestionById/${id}`, { headers: { userToken } })
            .then(res => {
                const { data } = res;
                const dataQuestion = [
                    {
                        title: "Question",
                        value: this.createMarkup(data.question)
                    },
                    {
                        title: "Course",
                        value: data.course

                    },
                    {
                        title: "Section",
                        value: data.section
                    },
                    {
                        title: "Multi",
                        value: data.multi ? 'Yes' : 'No',
                    },
                    {
                        title: "Level",
                        value: data.level === 1 ? "Easy" : (data.level === 2 ? "Medium" : "Hard")
                    },
                    {
                        title: "Correct Answers",
                        value: data.correct.toString()
                    },
                    {
                        title: "Option A",
                        value: data.options.a ? this.createMarkup(data.options.a) : ""
                    },
                    {
                        title: "Option B",
                        value: data.options.b ? this.createMarkup(data.options.b) : ""
                    },
                    {
                        title: "Option C",
                        value: data.options.c ? this.createMarkup(data.options.c) : ""
                    },
                    {
                        title: "Option D",
                        value: data.options.d ? this.createMarkup(data.options.d) : ""
                    }
                ]
                console.log(dataQuestion);
                this.setState({ data: dataQuestion, load: true });
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        const { load, data } = this.state;
        if (!load) {
            return (
                <div className="cover-loader">
                    <Loader active inline='centered'>
                        Loading...
                    </Loader>
                </div>
            )
        }
        return (
            <div className="row justify-content-center cover-layout-editor">
                <div className="col-md-8">
                    <div className="cover-title-0">View Question</div>
                    <div className="cover-line-blue"></div>
                    <TableView
                        data={data}
                        actions={
                            {
                                edit: this.onEdit,
                                cancle: this.onCancle
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}

export default ViewDatail;