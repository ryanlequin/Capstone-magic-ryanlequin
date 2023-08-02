import { useEffect, useState} from "react"
import { useParams } from "react-router-dom"

export const BuyerDetails = () => {
    const {buyerId} =useParams()
    const [buyer, updateBuyer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/buyers?_expand=user&_embed=buyerCards&userId=${buyerId}`)
            .then(response => response.json())
            .then((data) => {
                const singleBuyer = data[0]
                updateBuyer(singleBuyer)
            })
        },
        [buyerId]
    )

    return <section className="buyer">
        <header>{buyer?.user?.fullName}</header>
        <div>Email: {buyer?.user?.email}</div>
        <div>Specialty: {buyer.specialty}</div>
        <div>Rate: {buyer.rate}</div>
        <footer>Currently selling {buyer?.buyerCards?.length} cards</footer>
    </section>
}