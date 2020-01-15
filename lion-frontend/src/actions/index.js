import {
    SET_START,
    SHOW_START,
    TEST_DETAIL_LOAD,
    MULTI_ONLY_ANSWER,
    SEND_LISTANSWER,
    SAVE_POST_TO_STATE,
    SAVE_ID_POST_TO_STATE,
    GEN_CODE,
    ClEAR_DATA_GEN_CODE,
    RESET_ANSWER,
    OPEN_SIDEBAR,
    ClOSE_SIDEBAR,
    VALIDATE_UPLOAD_CANDIDATE,
    UPLOAD_CANDIDATE,
    CLEAR_DATA_CANDIDATE,
    ADD_FLASH_MESSAGE,
    DELETE_FLASH_MESSAGE,
    ADD_QUIZ,
    CURRENT_COURSE,

} from '../constants';
import * as TYPES from '../constants'
import axios from 'axios'
import config from '../config'

export const setStart = (data) => {
    const action = {
        type: SET_START,
        data
    }
    return action;
}
export const showStart = () => {
    const action = {
        type: SHOW_START
    }
    return action
}

//testDetail
export const testDetailLoad = (data, timeStart) => {
    console.log(1)
    return {
        type: TEST_DETAIL_LOAD,
        data,
        timeStart
    }
}

export const multiOnlyAnswer = (idQuestion, key, multi) => {
    return {
        type: MULTI_ONLY_ANSWER,
        idQuestion,
        key,
        multi
    }
}

export const sendListAnser = (timeTest) => {
    return {
        type: SEND_LISTANSWER,
        timeTest
    }
}

export const updateAnswer = (id, answers, multi, essay) => {
    return {
        type: TYPES.UPDATE_ANSWER,
        id,
        answers,
        multi
    }
}

//post-home

export const savePostToState = arrObjPost => {
    return {
        type: SAVE_POST_TO_STATE,
        arrObjPost
    }
}

export const saveIdPostToState = id => {
    return {
        type: SAVE_ID_POST_TO_STATE,
        id
    }
}
export const gencode = (data) => {
    const action = {
        type: GEN_CODE,
        data
    }
    return action
}

//shoNav 

export const showNav = text => {
    const action = {
        type: text
    }
    return action
}

//gencode 

export const clearDataGenCode = () => {
    const action = {
        type: ClEAR_DATA_GEN_CODE
    }
    return action;
}
//test start

export const resetAnswer = () => {
    return {
        type: RESET_ANSWER
    }
}


// sidebar

export const openSidebar = () => {
    return {
        type: OPEN_SIDEBAR
    }
}

export const closeSidebar = () => {
    return {
        type: ClOSE_SIDEBAR
    }
}

//Upload candidate 

export const handleUploadCandidate = data => {
    return {
        type: UPLOAD_CANDIDATE,
        data: data
    }
}

export const validateUploadCandidate = message => {
    return {
        type: VALIDATE_UPLOAD_CANDIDATE,
        message: message
    }
}

export const clearCandidate = message => {
    return {
        type: CLEAR_DATA_CANDIDATE,
        message
    }
}
export const addFlashMessage = (message) => {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    }
}
export const deleteFlashMessage = (id) => {
    return {
        type: DELETE_FLASH_MESSAGE,
        id
    }
}
//quiz
export const addQuiz = (objQuiz) => {
    return {
        type: ADD_QUIZ,
        objQuiz
    }
}
//Current Learning, course
export const changeCurrentCourse = (idCourse, learningPath) => {
    return {
        type: CURRENT_COURSE,
        idCourse,
        learningPath
    }
}