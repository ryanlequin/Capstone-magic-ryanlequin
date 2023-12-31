import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "./magiccardback.jpeg"


export const Card = ({ cardObject, currentUser, buyers, getAllCards }) => {

    const Navigate = useNavigate()

    let assignedBuyer = null

    if (cardObject.buyerCards.length > 0) {
        const cardBuyerRelationship = cardObject.buyerCards[0]
        assignedBuyer = buyers.find(buyer => buyer.id === cardBuyerRelationship.buyerId)
    }

    const userBuyer = buyers.find(buyer => buyer.userId === currentUser.id)


    const canClose = () => {
        if (userBuyer?.id === assignedBuyer?.id && cardObject.dateCompleted === "") {
            return <button onClick={closeCard} className="sell--card"> Sell </button>

        }
        else {
            return <p>Selling</p>
        }

    }
    const editButton = () => {
        return <button
            onClick={() => Navigate(`/cards/${cardObject.id}/edit`)} className="card--edit"
        >Edit</button>
    }



    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceCards/${cardObject.id}`, {
                    method: "DELETE"
                })

                    .then(() => {
                        getAllCards()

                    })
            }} className="card--delete"> Delete </button>
        }
        else {
            return ""
        }

    }


    const closeCard = () => {
        const copy = {
            userId: cardObject.userId,
            description: cardObject.description,
            mint: cardObject.mint,
            dateCompleted: new Date()

        }

        return fetch(`http://localhost:8088/serviceCards/${cardObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)

        })
            .then(response => response.json())
            .then(getAllCards) //pull new api state back in

    }

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
                onClick={() => {
                    fetch(`http://localhost:8088/buyerCards`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            buyerId: userBuyer.id,
                            serviceCardId: cardObject.id
                        })
                    })
                        .then(response => response.json())
                        .then(() => {

                            getAllCards()
                        })
                }}
            >Buy</button>
        }
        else {
            return ""
        }
    }


    return <section className="card" key={`card--${cardObject.id}`}>
        <header>
        <div>
            <img className="cardimage" src={image} />
        </div>

        </header>
        <section>{cardObject.description}</section>
        <section>Mint: {cardObject.mint ? "yes" : "no"}</section>
        {cardObject.price !== undefined ? <section>Price: ${cardObject.price}</section> : null}
        <footer>
            {
                cardObject.buyerCards.length
                    ? `Requested to purchase by ${assignedBuyer !== null ? assignedBuyer?.user?.fullName : ""}`
                    : buttonOrNoButton()
            }
            {

            }
            {
                canClose()
            }
            {
                editButton()
            }

            {
                deleteButton()
            }

        </footer>


    </section>
}

