export default function SearchBarItem() {
    return(
        <div className="searchBarWrapper">
            <form>
                <input className="searchBar" type="text" placeholder="Search an Item"/>
                <button className="button" type="submit"><img src="images/searchSign.png" alt="Search Icon" height="20" width="20"/></button>
            </form>
        </div>
    );
}