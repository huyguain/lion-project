import { ADD_QUIZ } from '../constants';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_QUIZ:
        console.log( 'dasa',action.display)
            return {
                ...state,
                listQuiz: action.objQuiz
            }
        default:
            return state;
    }
}