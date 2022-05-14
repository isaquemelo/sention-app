import "./style.scss";

type Props = {
    size?: 'l' | 'm' | 's',
    type: 'title' | 'body',
    alignment?: 'center' | 'left',
    children?: string,
    className?: string,
}

export default function Typography({ size = 'm', type, alignment = 'left', children, className = '' }: Props) {
    const classesNames = `typograph typograph--size-${size} typograph--align-${alignment} typograph--type-${type}`
    return (
        type === 'title' ?
            <h1 className={`${classesNames} ${className}`}>{children}</h1> :
            <p className={`${classesNames} ${className}`}>{children}</p>
    )
}