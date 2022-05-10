import Header from "../Header"
import NavigationBar from "../NavigationBar"

type Props = {
    element: JSX.Element
}

export default function InjectLayoutElements({ element }: Props) {
    return (
        <>
            <Header />
            {element}
            <NavigationBar />
        </>
    )
}