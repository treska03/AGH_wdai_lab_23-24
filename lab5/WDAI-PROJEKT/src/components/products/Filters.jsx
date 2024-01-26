import '../../styles/filters.css'

export const Filters = ({handleChange}) => {

    return (
        <>
            <ul className="flex column filterBy">
                <li className="searchBar">
                    <label htmlFor="sortByName">Wyszukaj produkt:</label>
                    <input type="text" className="filter__input" 
                    onChange={(event) => handleChange({searchFor:event.currentTarget.value})}
                    placeholder="Nazwa produktu"/>
                </li>
            </ul>
            <div className="flex column orderBy">
                <label htmlFor="">Sortuj po:</label>
                <select
                    id='orderBy__select'
                    onChange={(event) => handleChange({ orderBy: event.currentTarget.value })}>
                    <option value="">Domyślnie</option>
                    <option value="alpha">Alfabetycznie</option>
                    <option value="priceAsc">Cena rosnąco</option>
                    <option value="priceDesc">Cena malejąco</option>
                </select>
            </div>
            <ul className="flex filterPrice">
                <li>
                <input type="text" className="filter__input" 
                    onChange={(event) => handleChange({priceMin:parseFloat(event.currentTarget.value)})}
                    placeholder="Min cena"/>
                </li>
                <li>
                <input type="text" className="filter__input" 
                    id="priceMaxSetter"
                    onChange={(event) => handleChange({priceMax:parseFloat(event.currentTarget.value)})}
                    placeholder="Max cena"/>
                </li>
            </ul>
            {/* <div className="flex resetFilters">
                <button className='btnReset'>
                    RESETUJ FILTRY
                </button>
            </div> */}
        </>
    )
}