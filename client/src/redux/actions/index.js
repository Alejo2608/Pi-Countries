import axios from "axios";
export const GET_COUNTRIES="GET_COUNTRIES"
export const FILTER_CONTINENT="FILTER_CONTINENT"
export const ORDER_BY_NAME="ORDER_BY_NAME"
export const GET_NAME_COUNTRIES='GET_NAME_COUNTRIES'
export const GET_CONTINENTS="GET_CONTINENTS"
export const ORDER_BY_POPULATION='ORDER_BY_POPULATION'
export const GET_DETAIL='GET_DETAIL'
export const GET_DETA_AC='GET_DETA_AC'
export const GET_ACTIVITIES="GET_ACTIVITIES"
export const FILTER_BY_ACTIVITY="FILTER_BY_ACTIVITY"

export function getCountries(){
    return async function(dispatch){
        var json=await axios.get("http://localhost:3001/countries")
        return dispatch({
            type:GET_COUNTRIES,
            payload:json.data
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json=await axios('http://localhost:3001/countries/' + id)
            return dispatch({
                type:GET_DETAIL,
                payload:json.data
            })
        }catch(err){
            console.log(err)
        }
    }
}
export function getDetailActivi(id){
    return async function(dispatch){
        try{
            var json=await axios('http://localhost:3001/countriesAc/' + id)
            return dispatch({
                type:GET_DETA_AC,
                payload:json.data
            })
        }catch(err){
            console.log(err)
        }
    }
}
export function getActivities(){
    return async function(dispatch){
        var json=await axios.get("http://localhost:3001/activities")
        return dispatch({
            type:GET_ACTIVITIES,
            payload:json.data
        })
    }
}
export function filterByActivity(id){
    return async function(dispatch){
        var json=await axios.get("http://localhost:3001/countriesByActivity/"+ id)
        return dispatch({
            type:FILTER_BY_ACTIVITY,
            payload:json.data
        })
    }
}

export function filterByContinent(payload){
    return{
        type:FILTER_CONTINENT,
        payload
    }
}

export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload
    }
}
export function orderByPopulation(payload){
    return{
        type:ORDER_BY_POPULATION,
        payload
    }
}

export function postActivity(payload){
    return async function(dispatch){
        const json=await axios.post('http://localhost:3001/activities',payload)
        console.log(json)
        return json
    }
}
export function getContinents(){
    return async function(dispatch){
        var json=await axios ('http://localhost:3001/countries',{})
        return dispatch({
            type:GET_CONTINENTS,
            payload:json.data
        })
    }
}
export function getNameCountries(payload){
    return async function (dispatch){
        try{
            var json=await axios.get('http://localhost:3001/countries?name=' + payload)
            return dispatch({
                type:GET_NAME_COUNTRIES,
                payload:json.data
            })
        }catch(err){
            console.log(err)
        }

    }
}