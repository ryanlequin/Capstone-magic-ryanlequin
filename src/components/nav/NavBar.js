import { SellerNav } from "./SellerNav"
import { BuyerNav } from "./BuyerNav"
import "./NavBar.css"

export const NavBar = () => {
    const localMagicUser = localStorage.getItem("magic_user")
    const magicUserObject = JSON.parse(localMagicUser)

    if(magicUserObject.staff) {
        return <BuyerNav />
    }
    else {
        return <SellerNav />
    }

}
