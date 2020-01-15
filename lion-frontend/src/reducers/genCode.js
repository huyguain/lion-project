import { GEN_CODE, ClEAR_DATA_GEN_CODE } from '../constants'

const initialState = {
    data: "",
}

const TemplateCode = (state = initialState, action) => {
    switch (action.type) {
        case GEN_CODE:
        return {
            ...state,
            data: action.data
        }
        case ClEAR_DATA_GEN_CODE:
            return {
                ...state,
                data: ''
            }
        default:
            return state;
    }
}

export default TemplateCode