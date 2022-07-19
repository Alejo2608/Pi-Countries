import React from "react";
import "../../index.css"

export default function Paginated({countriesPerPage,allCountries,paginated}){
    const pageNumbers=[]

    for (let i = 0; i<=Math.ceil(allCountries/countriesPerPage); i++) {

        pageNumbers.push(i+1)
    }
    return(
        <div className="paginate">
            <ul className="paginated">
                {pageNumbers && 
                pageNumbers.map(number=>{
                        return(
                            <li className="number" key={number}>
                                <button onClick={()=>paginated(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}