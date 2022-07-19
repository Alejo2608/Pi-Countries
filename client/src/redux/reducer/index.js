import {FILTER_CONTINENT, GET_DETA_AC, FILTER_BY_ACTIVITY, GET_ACTIVITIES, GET_CONTINENTS, GET_COUNTRIES,GET_DETAIL,GET_NAME_COUNTRIES,ORDER_BY_NAME, ORDER_BY_POPULATION} from "../actions/index.js"
const initialState={
    countries:[],
    allCoun:[],
    continents:[],
    detail:[],
    activities:[],
    acti:[]
}


function rootReducer(state=initialState,action){
    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries:action.payload,
                allCoun:action.payload
            }
        case FILTER_BY_ACTIVITY:
            const ap=action.payload
            const coun=ap.map(e=>e.countries)
            const si=coun[0]
            return{
                ...state,
                countries:si
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                activities:action.payload
            }
        case FILTER_CONTINENT:{
            const allCountries=state.allCoun
            const fil=action.payload==="All"? allCountries: allCountries.filter(c=>c.continent.includes(action.payload))
            console.log(fil)
            return{
                ...state,
                countries:fil
            }
        }
        case GET_CONTINENTS:
            const conti=state.countries.map(e=>e.continent)
            const uni=[]
            conti.forEach((e)=>{
                if(!uni.includes(e)){
                    uni.push(e)
                }
            })
            console.log(uni)
            return{
                ...state,
                continents:uni
            }

        case GET_DETAIL:
            return{
                ...state,
                detail:action.payload
            }

        case GET_DETA_AC:
                return{
                    ...state,
                    acti:action.payload
                }

        case GET_NAME_COUNTRIES:
            return {
                ...state,
                countries:action.payload
            }
        case "POST_COUNTRIES":
            return{
                ...state
            }
        case ORDER_BY_POPULATION:
            let sorA=action.payload==="men"?
            state.countries.sort(function(a,b){
                if (a.population>b.population) {
                    return 1
                }
                if (b.population>a.population) {
                    return -1
                }
                return 0
            }):
            state.countries.sort(function(a,b){
                if(a.population>b.population){
                    return -1
                }
                if(b.population>a.population){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                countries:sorA
            }
        case ORDER_BY_NAME:
                let sortedArr=action.payload==="asc"?
                    state.countries.sort(function(a,b){
                        if(a.name>b.name){
                            return 1
                        }
                        if(b.name>a.name){
                            return -1
                        }
                        return 0
                    }):
                    state.countries.sort(function(a,b){
                        if(a.name>b.name){
                            return -1
                        }
                        if(b.name>a.name){
                            return 1
                        }
                        return 0
                    })
                    return{
                        ...state,
                        countries:sortedArr
                    }

            default:
                return state
    }

}

export default rootReducer