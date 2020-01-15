import { 
    NAV_ADMIN,
    NAV_DASHBOARD,
    NAV_TEMPLATE,
    NAV_QUESTION,
    NAV_USER,
    NAV_GENERATE_CODE,
    NAV_PANEL,
    NAV_POST,
} from '../constants';

const showNav = (state = [], action) => {
    switch (action.type) {
        case NAV_ADMIN:
            return action.type;
        case NAV_DASHBOARD:
            return action.type;
        case NAV_TEMPLATE:
            return action.type;
        case NAV_QUESTION:
            return action.type;
        case NAV_USER:
            return action.type;
        case NAV_GENERATE_CODE:
            return action.type;
        case NAV_PANEL:
            return action.type;
        case NAV_POST:
            return action.type;
        default:
            return NAV_DASHBOARD;
    }
}

export default showNav;