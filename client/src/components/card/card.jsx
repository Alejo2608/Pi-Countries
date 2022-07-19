import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";

export default function Card({id,name,flags,continents}){
    const dispatch=useDispatch()


    return(
        <Link to={'/countries/' + id} onClick={()=>dispatch(getDetail(id))}>
            <div className="card">
                <div className="img">
                    <img src={flags} alt="img not found" />
                </div>
                <div className="name">
                    <h1>Nombre</h1>
                    <h1>{name}</h1>
                </div>
                <div className="conti">
                    <h2>Continente</h2>
                    <h2>{continents}</h2>
                </div>
        </div>
        </Link>
    )
}