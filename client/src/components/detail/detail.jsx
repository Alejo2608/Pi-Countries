import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getDetailActivi } from "../../redux/actions";
import { useEffect } from "react";

export default function Detail(props){
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getDetailActivi(props.match.params.id))
    },[dispatch])

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myCountrie=useSelector((state)=>state.detail)
    const myActivi=useSelector((state)=>state.acti)
    const si=myActivi.map(e=>e.activities)
    console.log(si)
    return(
        <div className="detail">
            {
                myCountrie.length>0? 
                <div className="detail">
                    <div className="carta">
                        <img src={myCountrie[0].flags} />
                        <h1>Nombre</h1>
                        <h2>{myCountrie[0].name}</h2>
                        <h2>Codigo</h2>
                        <p>{myCountrie[0].id}</p>
                        <h3>Continente</h3>
                        <p>{myCountrie[0].continent}</p>
                        <h3>Capital</h3>
                        <p>{myCountrie[0].capital}</p>
                        <h3>Subregion</h3>
                        <p>{myCountrie[0].subregion}</p>
                        <h3>Area</h3>
                        <p>{myCountrie[0].area} km²</p>
                        <h3>Poblacion</h3>
                        <p>{myCountrie[0].population}</p>
                    </div>
                </div>: <p>Hola</p>
            }
        </div>
    )
}