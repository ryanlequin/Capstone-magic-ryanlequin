import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CardEdit = () => {
    const navigate = useNavigate()
    const [feedback, setFeedback] = useState("")
    const { serviceCardId } = useParams()
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [card, assignCard] = useState({
        description: "",
        mint: false,
        price: 0, // Add the "price" property with an initial value of 0
    })

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceCards?id=${serviceCardId}`)
                .then(response => response.json())
                .then((data) => {
                    const cardObject = data[0]
                    console.log(cardObject)
                    assignCard(cardObject)
                })
        },
        [serviceCardId]
    )
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the card list
    */

    const localMagicUser = localStorage.getItem("magic_user")
    const magicUserObject = JSON.parse(localMagicUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")


        return fetch(`http://localhost:8088/serviceCards/${serviceCardId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(card)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Seller card condition saved")
            })
            .then(() => {

            })

    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="cardForm">
            <h2 className="cardForm__title">Edit Card Condition</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Card Name:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        style={{
                            height: "2rem"
                        }}
                        className="form-control"
                        placeholder=""
                        value={card?.description}
                        onChange={
                            (evt) => {
                                const copy = { ...card }
                                copy.description = evt.target.value
                                assignCard(copy)
                            }
                        }>{card.description}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number" // Use input type "number" for the price
                        className="form-control"
                        placeholder="Enter the price"
                        value={card?.price}
                        onChange={(evt) => {
                            const copy = { ...card };
                            copy.price = parseFloat(evt.target.value); // Parse the input value as a floating-point number
                            assignCard(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Mint:</label>
                    <input type="checkbox"
                        checked={card?.mint}
                        onChange={
                            (evt) => {
                                const copy = { ...card }
                                copy.mint = evt.target.checked
                                assignCard(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Edit
            </button>
        </form></>
    )
}