import { SAVE_POST_TO_STATE, SAVE_ID_POST_TO_STATE } from '../constants'

const initialState = {
    arrPost : '',
    idPost : ''
}

const post = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_POST_TO_STATE :
            return {
                ...state,
                arrPost : action.arrObjPost
            }
        case SAVE_ID_POST_TO_STATE:
            return {
                ...state,
                idPost : action.idPost
            }
        default : 
            return state; 
    }
}

export default post