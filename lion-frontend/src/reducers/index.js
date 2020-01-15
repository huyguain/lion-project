import { combineReducers } from 'redux';
import TestDetail from './testDetail';
import post from './post';
import TemplateCode from './genCode';
import ShowNav from './ShowNav';
import Sidebar from './Sidebar';
import ImportCandidate from './UploadCandidate';
import currentCourse from './currentCourse'

const reducer = combineReducers({
    TestDetail,
    post: post,
    TemplateCode: TemplateCode,
    ShowNav,
    Sidebar,
    ImportCandidate,
    currentCourse
})
export default reducer;
