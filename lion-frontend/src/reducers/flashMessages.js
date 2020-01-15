import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../constants';

export default (state = [], action = {}) => {
    console.log(1)
    switch(action.type) {
        case ADD_FLASH_MESSAGE:
        console.log(2)
            return [
                ...state,
                {
                    id: Math.random(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            return state.filter(message => message.id !== action.id)
        default: 
            return state;
    }
}