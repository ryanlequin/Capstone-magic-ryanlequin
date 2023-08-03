import { Outlet, Route, Routes } from "react-router-dom"
import { CardContainer } from "../cards/CardContainer"
import { BuyerList } from "../buyers/BuyerList"
import { BuyerDetails } from "../buyers/BuyerDetails"
import { SellerList } from "../seller/SellerList"
import { SellerDetails } from "../seller/SellerDetails"



export const BuyerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Magic Card Collector</h1>
                    <div>The MTG collection application</div>

                    <Outlet />
                </>
            }>

                <Route path="cards" element={<CardContainer />} />
                <Route path="buyers" element={<BuyerList />} />
                <Route path="buyers/:buyerId" element={<BuyerDetails />} />
                <Route path="sellers" element={<SellerList />} />
                <Route path="sellers/:sellerId" element={<SellerDetails />} />


            </Route>
        </Routes>
    )
}