import { CardSearch } from "./CardSearch"
import { CardList } from "./CardList"
import { useState } from "react"

export const CardContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <CardSearch setterFunction={setSearchTerms} />
        <CardList searchTermState={searchTerms} />
    </>
}