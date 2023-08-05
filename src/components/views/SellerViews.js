import { Outlet, Route, Routes } from "react-router-dom"
import { CardList } from "../cards/CardList"
import { CardForm } from "../cards/CardForm"
import { CardEdit } from "../cards/CardEdit"
import { CardContainer } from "../cards/CardContainer"

export const SellerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    
                    <Outlet />
                </>
            }>

                <Route path="/" element={<CardContainer />} />
                <Route path="card/create" element={<CardForm />} />
                <Route path="/" element={<CardList />} />
                <Route path="cards/:serviceCardId/edit" element={<CardEdit />} />
            </Route>
        </Routes>
    )
}