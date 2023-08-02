import { Outlet, Route, Routes } from "react-router-dom"
import { CardList } from "../cards/CardList"
import { CardForm } from "../cards/CardForm"
import { Profile } from "../profile/Profile"
import { CardEdit } from "../cards/CardEdit"


export const SellerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1> Magic Card Collector</h1>
                    <div>Your MTG card collection application</div>

                    <Outlet />
                </>
            }>
				
                <Route path="cards" element={ <CardList /> } />
				<Route path="card/create" element={ <CardForm /> } />

                {/* <Route path="profile" element={ <Profile /> } /> */}
				
                <Route path="cards/:serviceCardId/edit" element={ <CardEdit /> } />
            </Route>
        </Routes>
    )
}