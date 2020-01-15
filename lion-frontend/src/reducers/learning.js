import * as TYPES from '../constants'

const initiaState = {
    learning: []
}

const handleLearningFetchSuccess = (state, action) => {
    console.log({...state, learning: action.data})
    return {
        ...state,
        learning: action.data
    }
}

const learning = (state = initiaState, action) => {
    const handles = {
        [TYPES.FETCH_LEARNING_PATH_SUCCESS]: handleLearningFetchSuccess
    }
    return handles[action.type]
            ? handles[action.type](state, action)
            : state
}

export default learning