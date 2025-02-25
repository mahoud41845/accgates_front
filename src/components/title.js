function Title(props) {
    return (
        <h2 className={`mainTitle ${props.classname}`}  >
            {props.title}
            {props.icon}
        </h2>
    )
}


export default Title