const initialState = {
   user:null,
   is_authenticated:false
};

const userReducer = (state=initialState,action) => {
    switch(action.type) {
        case 'SET_USER':
            return{
                ...state,
                user:action.payload
            };
            case 'IS_AUTHENTICATED':
            return{
                ...state,
                is_authenticated:action.payload,
            };
            default:
                return state
    }
}

export default userReducer