import { UPLOAD_CANDIDATE, VALIDATE_UPLOAD_CANDIDATE, CLEAR_DATA_CANDIDATE } from '../constants';
import { Map } from 'immutable';
import { validateFileExcel } from '../utility/index';
import axios from 'axios';
import config from '../config';
const initialState = Map({
    message: "",
    data: [],
    show: false,
    messageSuccess: ''
})

const handleData = data => {
    let _data = []
    console.log('data-candida-reducer', data)
    for (let i in data) {
        if (i >= 2) {
            let obj = {
                lastName: (data[i][2]) ? (data[i][2].substr(data[i][2].indexOf(' ') + 1)) : '',
                firstName: (data[i][2]) ? (data[i][2].substr(0, data[i][2].indexOf(' '))) : '',
                DOB: data[i][3] || "",
                mobile: (data[i][5]) ? ((data[i][5].charAt(0) == '0') ? data[i][5].substring(1) : data[i][5]) : "",
                email: data[i][6] || "",
                university: data[i][7] || "",
                note: data[i][13] || "",
                language: data[i][12] || "",
                state: (!data[i][2] || !data[i][5] || !data[i][6] || !data[i][7]) ? "Error" : "Correct"
            }
            _data = [
                ..._data, obj]
        }
    }
    return _data;
}

const UploadCandidate = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_CANDIDATE:
            return state.set('data', handleData(action.data)).set('message', "")
        case VALIDATE_UPLOAD_CANDIDATE:
            return state.set("message", action.message).set('data', [])
        case CLEAR_DATA_CANDIDATE:
            return state.set("message", "").set("data", []).set("show", true).set("messageSuccess", action.message)
        case 'CLEAR_DATA_I':
            return state.set("message", "").set("data", []).set("show", false).set('messageSuccess', "")
        default:
            return state.set("message", "").set("data", [])
    }
}

export default UploadCandidate;