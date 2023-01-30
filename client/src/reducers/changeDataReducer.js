const CHANGE_EMAIL = "CHANGE_EMAIL";


const defaultState = {
    email: '',
    currentUser: {}
}

export default function changeDataReducer(state = defaultState, action){
    switch(action.type){
        case CHANGE_EMAIL: return {...state, currentUser: action}
        default: 
            return state;
    }
}

export const changeEml = (email, user) => ({type: CHANGE_EMAIL, payload: user.email = email});