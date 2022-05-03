import "./style.scss";

type Props = {
    size?: 'l' | 'm' | 's',
    type: 'title' | 'body',
    alignment?: 'center' | 'left',
    children: string,
}

export default function Typography({ size = 'm', type, alignment = 'left', children }: Props) {
    const classesNames = `typograph typograph--size-${size} typograph--align-${alignment} typograph--type-${type}`
    return (
        type === 'title' ?
            <h1 className={classesNames}>{children}</h1> :
            <p className={classesNames}>{children}</p>
    )
}