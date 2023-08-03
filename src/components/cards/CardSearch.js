export const CardSearch = ({ setterFunction }) => {
    return (
        <div>
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" className="search--bar" placeholder="Search card name"></input>
        </div>
    )
}