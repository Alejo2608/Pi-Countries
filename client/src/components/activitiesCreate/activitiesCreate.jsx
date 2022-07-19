import React, {useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom'
import { getCountries,postActivity} from "../../redux/actions";
import {useDispatch, useSelector} from 'react-redux'

export function ActivitiesCreate(){
    const history=useHistory()
    const dispatch=useDispatch()
    const [errors,setErrors]=useState({})
    const count=useSelector((state)=>state.countries)

    const [input,setInput]=useState({
        name:"",
        difficult:0,
        duration:0,
        season:"",
        country:[]
    })
    const valName=(isNaN(input.name))
    function handleSubmit(e){
        if (valName===false) {
            errors.name=alert("No se permiten numeros en el nombre")
        }else{
        e.preventDefault();
        dispatch(postActivity(input))
        alert('Personaje Creado')
        setInput({
            name:"",
            difficult:0,
            duration:0,
            season:"",
            country:[]
        })
        history.push('/home')
        }}

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])
    console.log(count)

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    function handleSelect(e){
        setInput({
            ...input,
            country:[...input.country,e.target.value]
        })
    }
    function handleCheck(e){
        if (e.target.checked) {
            setInput({
                ...input,
                season:e.target.value
            })
        }
    }

    return(
<div className="created">
            <form onSubmit={e=>handleSubmit(e)} className="form">
                <h1>Crea tu raza</h1>
                <div>
                    <br />
                    <label>Nombre:</label>
                    <br />
                    <input 
                    type="text" 
                    className="field"
                    value={input.name}
                    name="name" 
                    onChange={handleChange}/>
                </div>
                <div>
                    <br />
                    <label>Difficult:</label>
                    <br />
                    <input 
                    type="text" 
                    className="field"
                    value={input.difficult} 
                    name="difficult"
                    onChange={handleChange}/>
                    <br />
                    <br />
                    <label>Duration:</label>
                    <br />
                    <input 
                    type="text" 
                    className="field"
                    value={input.duration} 
                    name="duration"
                    onChange={handleChange}/>
                </div>
                <div>
                    <br />
                    <label>Season:</label>
                    <br />
                    <label><input 
                    type="checkbox"
                    name="Primavera"
                    value="Primavera" 
                    onChange={e=>handleCheck(e)}/>
                    Primavera</label>
                    <label><input 
                    type="checkbox"
                    name="Verano"
                    value="Verano" 
                    onChange={e=>handleCheck(e)}/>
                    Verano</label>
                    <label><input 
                    type="checkbox"
                    name="Otoño"
                    value="Otoño" 
                    onChange={e=>handleCheck(e)}/>
                    Otoño</label>
                    <label><input 
                    type="checkbox"
                    name="Invierno"
                    value="Invierno" 
                    onChange={e=>handleCheck(e)}/>
                    Invierno</label>
                </div>
                <br />
                <br />
                <div className="select">
                    <label> Paises:</label>
                    <br />
                    <br />
                    <select onChange={(e)=>handleSelect(e)}>
                        {count.map((nam)=>(
                            <option value={nam.name}>{nam.name}</option>
                        ))}
                    </select>
                </div>
                <br />
                <ul><li>{input.country.map(e=>e+" ,")}</li></ul>
                <br />
                <div className="crear">
                    <button type="submit" className="center">Crear</button>
                </div>
            </form>
        </div>
    )

}