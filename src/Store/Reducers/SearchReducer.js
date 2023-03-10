import { RECENTSEARCH, RECENTSEARCHREMOVE, RECENTSEARCHREMOVEALL } from "../Actions";

const initialState = { user_id: '', data: [] }
const getUniqueArray=(array)=>{
    var uniqueArray = [];
    for(let i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}


const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECENTSEARCH:
            let updateData=[...state.data,action.data.data]
            updateData=getUniqueArray(updateData)
            console.log('update===>>resucer',updateData)
            return {
                ...state,
                user_id: action.data.user_id,
                data: updateData
            }
        case RECENTSEARCHREMOVE:
            const data = state.data.filter(e => e !== action.data)
            return {
                ...state,
                data: data
            }
        case RECENTSEARCHREMOVEALL:
            return {
                ...state,
                user_id: [],
                data: []
            }
        default:
            return state
    }
}
export default searchReducer;