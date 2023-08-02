import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const BuyerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cards">Cards</Link>
            </li>

            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/buyers">Buyers</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/sellers">Sellers</Link>
            </li> */}

            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li> */}
            {
                localStorage.getItem("magic_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("magic_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
