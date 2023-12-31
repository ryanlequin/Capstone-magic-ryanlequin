import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Cards.css"
import { Card } from "./Card"
import logo from "./BrandLogo.gif"


export const CardList = ({ searchTermState }) => {
    const [cards, setCards] = useState([])
    const [buyers, setBuyers] = useState([])
    const [filteredCards, setFiltered] = useState([])
    const [mint, setMint] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate();

    const localMagicUser = localStorage.getItem("magic_user")
    const magicUserObject = JSON.parse(localMagicUser)





    useEffect(
        () => {
            const searchedCards = cards.filter(card =>
                card.description.toLowerCase().startsWith(searchTermState.toLowerCase()))
            setFiltered(searchedCards)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            if (mint) {
                const mintCards = cards.filter(card => card.mint === true)
                setFiltered(mintCards)
            }
            else {
                setFiltered(cards)
            }
        },
        [mint]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceCards?_embed=buyerCards`)
                .then(response => response.json())
                .then((cardArray) => {
                    setCards(cardArray)
                })
            fetch(`http://localhost:8088/buyers?_expand=user`)
                .then(response => response.json())
                .then((buyerArray) => {
                    setBuyers(buyerArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    const getAllCards = () => {
        fetch(`http://localhost:8088/serviceCards?_embed=buyerCards`)
            .then(response => response.json())
            .then((cardArray) => {
                setCards(cardArray)

            })
    }



    useEffect(
        () => {
            if (magicUserObject.staff) {
                setFiltered(cards)
            }
            else {
                const myCards = cards.filter(card => card.userId === magicUserObject.id)
                setFiltered(myCards)
            }
        },
        [cards]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openCardArray = cards.filter(card => {
                    return card.userId === magicUserObject.id && card.dateCompleted === ""
                })
                setFiltered(openCardArray)
            }
            else {
                const myCards = cards.filter(card => card.userId === magicUserObject.id)
                setFiltered(myCards)
            }
        },
        [openOnly]
    )
    return <>
        
            <div>
            <img className="gif" src={logo} />
        </div>

{
            magicUserObject.staff
                ? <>
                    <button onClick={() => { setMint(true) }}>Mint only cards</button>
                    <button onClick={() => { setMint(false) }}>Show all cards</button>
                </>
                : <>
                   <div className="my--buttons">  <button className="add--card" onClick={() => navigate("/card/create")}>Add card</button>
                    <button className="to--sell" onClick={() => updateOpenOnly(true)}>To sell</button>
                    <button className="all--cards" onClick={() => updateOpenOnly(false)}>All cards</button></div>
                </>
        }
        <h2>Your Collection</h2>

       
        <article className="cards">
           
            {
                filteredCards.map(
                    (card) =>
                        <Card
                            getAllCards={getAllCards}
                            buyers={buyers} 
                            currentUser={magicUserObject}
                            cardObject={card} />
                )
            }
        </article>
        </>
        }
       


