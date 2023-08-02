import { useEffect, useState } from "react"
import { Buyer } from "./Buyer"
import "./Buyers.css"

export const BuyerList = () => {
    const [buyers, setBuyers] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                .then((buyerArray) => {
                    setBuyers(buyerArray)
                })
        },
        []
    )

    return <article className="buyers">
        {
            buyers.map(buyer => <Buyer key={`buyer--${buyer.id}`} 
                id={buyer.id} 
                fullName={buyer.fullName} 
                email={buyer.email} />)
        }
    </article>


}