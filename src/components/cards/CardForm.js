import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "./BrandLogo.jpg"

export const CardForm = () => {
    const navigate = useNavigate()
    const [card, update] = useState({
        description: "",
        mint: false,
        price: 0 // Added the price property with a default value of 0
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the card list
    */

    const localMagicUser = localStorage.getItem("magic_user")
    const magicUserObject = JSON.parse(localMagicUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        //Create the object to be saved to the API. added price to object
        const cardToSendToAPI = {
            userId: magicUserObject.id,
            description: card.description,
            mint: card.mint,
            price: card.price, // Include the price in the object to be saved
            dateCompleted: ""
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceCards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cardToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/")
            })
    }
    //added fieldset for the price under mint fieldset.
    return (
        
        <form className="cardForm">
             <div>
            <img className="logo" src={logo} />
        </div>
            <h2 className="cardForm__title">New Card</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Card Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={card.description}
                        onChange={
                            (evt) => {
                                const copy = { ...card }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder=""
                            value={card.price}
                            onChange={(evt) => {
                                const copy = { ...card };
                                copy.price = parseFloat(evt.target.value);
                                update(copy);
                            }}
                        />
                    </div>
                </fieldset>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Mint:</label>
                    <input type="checkbox"
                        value={card.mint}
                        onChange={
                            (evt) => {
                                const copy = { ...card }
                                copy.mint = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add Card
            </button>
        </form>
    )
}