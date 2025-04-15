import { ReactNode } from "react"
import HomeNav from "./_components/nav"

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