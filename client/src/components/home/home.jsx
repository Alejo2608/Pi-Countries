import React from "react";
import { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { filterByContinent, getCountries,getActivities, orderByName, orderByPopulation, filterByActivity } from "../../redux/actions/index.js";
import { Link } from "react-router-dom";
import Card from "../card/card.jsx";
import Paginated from "../paginated/paginated.jsx";

export default function Home(){
    const dispatch=useDispatch()
    const allCountries=useSelector((state)=>state.countries)
    const allActivities=useSelector((state)=>state.activities)
    const [orden,setOrden]=useState("")
    const [currentPage,setCurrentPage]=useState(1)
    const [countriesPerPage, setCountriesPerPage]=useState(10)
    const indexOfLastCountrie=currentPage * countriesPerPage
    const indexOfFirstCountrie=indexOfLastCountrie - countriesPerPage
    const currentCountries=allCountries.slice(indexOfFirstCountrie,indexOfLastCountrie)

    const paginated=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    useEffect(()=>{
        dispatch(getActivities())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries())
    }
    function handleFilterByActivity(e){
        e.preventDefault()
        dispatch(filterByActivity(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleFilterContinent(e){
        e.preventDefault()
        dispatch(filterByContinent(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSortPo(e){
        e.preventDefault()
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <div className="bot">
                <button onClick={e=>{handleClick(e)}} className="bu">
                        Volver a cargar todos los paises
                </button>
            </div>
            <div className="sele">
                <select onChange={e=>{handleSort(e)}}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select onChange={e=>{handleSortPo(e)}}>
                    <option value="may">Mayor</option>
                    <option value="men">Menor</option>
                </select>
                <select onChange={e=>{handleFilterContinent(e)}}>
                    <option value="All">Todos</option>
                    <option value="Africa">Africa</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Europe">Europe</option>
                    <option value="South America">South America</option>
                    <option value="North America">North America</option>
                    <option value="Asia">Asia</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <select onChange={e=>{handleFilterByActivity(e)}}>
                    {allActivities.map((act)=>(
                        <option value={act.id}>{act.name}</option>
                    ))}
                    <option>Activi Turistica</option>
                </select>
            </div>
            <div className="carss">
            {
              currentCountries?.map(e=>{
                return(
                    <fragment>
                        <Link to={"home/"+e.id}>
                        <Card
                            flags={e.flags}
                            name={e.name}
                            continents={e.continent}
                            id={e.id}
                        />
                        </Link>
                    </fragment>

                )
              })
            }
            </div>
            <Paginated
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginated={paginated}
            />

        </div>
    )
}