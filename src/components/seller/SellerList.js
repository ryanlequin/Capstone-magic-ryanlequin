import { useEffect, useState } from "react"
import { Seller } from "./Seller"


export const SellerList = () => {
    const [sellers, setSellers] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/users?isStaff=false`)
                .then(response => response.json())
                .then((sellerArray) => {
                    setSellers(sellerArray)
                })
        }
    )

    return <article className="sellers">
        {
            sellers.map(seller => <Seller key={`seller--${seller.id}`} 
                id={seller.id} 
                fullName={seller.fullName} 
                email={seller.email} />)
        }
    </article>


}