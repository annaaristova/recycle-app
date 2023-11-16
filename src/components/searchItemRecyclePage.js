import searchSign from "../images/searchSign.png"

export default function SearchItem() {


    return(
        <div className="searchBarWrapper">
            <form>
                <input className="searchBar" type="text" placeholder="Search an Item"/>
                <button className="button" type="submit"><img src={searchSign} alt="Search Icon" height="20" width="20"/></button>
            </form>
        </div>
            
    );
}