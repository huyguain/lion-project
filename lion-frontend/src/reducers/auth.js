import { CHANGE_LAYOUT } from '../constants'
export default (state = "block", action) => {
    switch (action.type) {
        case CHANGE_LAYOUT:
        console.log( 'dasa',action.display)
            return {
                state: action.display
            }
        default:
            return state;
    }
}