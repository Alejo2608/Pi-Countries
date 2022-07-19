import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../../redux/actions";

export default function SearchBar(){
  const dispatch=useDispatch()
  const [name,setName]=useState("")
  
  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameCountries(name))
  }
  return(
    <div>
      <input type="text" placeholder="Search Countries" onChange={(e)=>handleInputChange(e)} className="pagi" />
      <button type="submit" onClick={(e)=>handleSubmit(e)} className="pagiBo">Search</button>
    </div>
  )
}