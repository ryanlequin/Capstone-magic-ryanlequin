import { SellerForm } from "./SellerForm"
import { BuyerForm } from "./BuyerForm"

export const Profile = () => {
    const localMagicUser = localStorage.getItem("magic_user")
    const magicUserObject = JSON.parse(localMagicUser)

    if(magicUserObject.staff) {
        return <BuyerForm />
    }
    else {
        return <SellerForm />
    }

}