import { useEffect, useState} from "react"
import { useParams } from "react-router-dom"

export const SellerDetails = () => {
    const {sellerId} = useParams()
    const [seller, updateSeller] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/sellers?_expand=user&userId=${sellerId}`)
            .then(response => response.json())
            .then((data) => {
                const singleSeller = data[0]
                updateSeller(singleSeller)
            })
        },
        [sellerId]
    )

    return <section className="seller">
        <header>{seller?.user?.fullName}</header>
        <div>Email: {seller?.user?.email}</div>
        <div>Address: {seller.address}</div>
        <div>Rate: {seller.phoneNumber}</div>
    </section>
}