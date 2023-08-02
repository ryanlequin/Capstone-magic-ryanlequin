import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const BuyerForm = () => {
    const navigate = useNavigate()
    const [feedback, setFeedback] = useState("")

    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })

    
    const localMagicUser = localStorage.getItem("magic_user")
    const magicUserObject = JSON.parse(localMagicUser)
    // TODO: Get buyer profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/buyers?userId=${magicUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const buyerObject = data[0]
                updateProfile(buyerObject)
            })
    },
        []
    )

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        return fetch(`http://localhost:8088/buyers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("card successfully saved")
            })
            .then(() => {
                
            })
    }

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="profile">
                <h2 className="profile__title">Shipping & Contact Information</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="specialty">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.specialty}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.specialty = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Phone number:</label>
                        <input type="number"
                            className="form-control"
                            value={profile.rate}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.rate = parseFloat(evt.target.value, 2)
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
}