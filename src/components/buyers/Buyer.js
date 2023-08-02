import { Link } from "react-router-dom"

export const Buyer = ({ id, fullName, email }) => {

            return <section className="buyer" >
                <div>
                    <Link to={`/buyers/${id}`}>Name: {fullName}</Link>
                </div>
                <div>Email: {email}</div>
            </section>
}