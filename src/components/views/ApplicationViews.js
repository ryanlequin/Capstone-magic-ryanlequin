import { BuyerViews } from "./BuyerViews"
import { SellerViews } from "./SellerViews"

export const ApplicationViews = () => {
    const localMagicUser = localStorage.getItem("magic_user")
    const magicUserObject = JSON.parse(localMagicUser)

    if(magicUserObject.staff) {
        return <BuyerViews />
    }
    else {
        return <SellerViews />
    }

	
}