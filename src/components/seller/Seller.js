import { Link } from "react-router-dom"

export const Seller = ({ id, fullName, email }) => {

    return <section className="seller" >
        <div>
            <Link to={`/sellers/${id}`}>Name: {fullName}</Link>
        </div>
        <div>Email: {email}</div>
    </section>
}