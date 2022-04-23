import Header from "../Header"

type Props = {
    element: JSX.Element
}

export default function InjectLayoutElements({ element }: Props) {
    return (
        <>
            <Header />
            {element}
        </>
    )
}