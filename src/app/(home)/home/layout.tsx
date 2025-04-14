import { ReactNode } from "react"
import HomeNav from "./nav"

const HomeLayout = ({
        children
}: {
        children:ReactNode
}) => {
        return (
                <div>
                        <HomeNav />
                        { children }
                </div>
        )
}

export default HomeLayout