import * as TYPES from '../constants'

let initiaState = {
    idCourse: '',
    learningPath: ''
}

const currentCourse = (state = initiaState, action) => {
    switch(action.type) {
        case TYPES.CURRENT_COURSE: 
            return {
                idCourse: action.idCourse,
                learningPath: action.learningPath
            }
        default:
            return state
    }
}

export default currentCourse