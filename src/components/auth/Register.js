import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [seller, setSeller] = useState({
        email: "",
        fullName: "",
        isStaff: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(seller)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("magic_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${seller.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateSeller = (evt) => {
        const copy = {...seller}
        copy[evt.target.id] = evt.target.value
        setSeller(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateSeller}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateSeller}
                        type="email" id="email" className="form-control"
                        placeholder="Enter your email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="form-group"> Shipping Address </label>
                    <input onChange={updateSeller}
                        type="text" id="address" className="form-control"
                        placeholder="Enter your address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="form-group"> Phone Number </label>
                    <input onChange={updateSeller}
                        type="text" id="tel" className="form-control"
                        placeholder=" Enter your phone number" required />
                </fieldset>
                {/* <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...seller}
                        copy.isStaff = evt.target.checked
                        setSeller(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="email"> I am an Buyer </label>
                </fieldset> */}
                
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}
