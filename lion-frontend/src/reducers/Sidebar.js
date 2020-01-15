import { ClOSE_SIDEBAR, OPEN_SIDEBAR } from '../constants'

const sidebar = (state = '', action) => {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return action.type;
        case ClOSE_SIDEBAR:
            return action.type;
        default:
            return state;
    }
}

export default sidebar;