import React from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar.jsx"

export default function Nav(){
    const dispatch=useDispatch()
    function handleClick(e){
        dispatch(getCountries(e))
    }
    return(
        <nav>
                <ul>
                    <li>
                        <NavLink exact to="/home" onClick={e=>handleClick(e)}>Home</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to="/create">Crear</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink exact to="/countries/:id">Detalles</NavLink>
                    </li>
                </ul>
                <SearchBar/>
        </nav>
    )
}