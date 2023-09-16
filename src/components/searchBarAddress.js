export default function SearchBarAddress() {
    return(
        <div className="searchBarWrapper">
            <form className="searchBarForm">
                <input className="searchBar" type="text" placeholder="Enter Address or Zip or Country"/>
                <button className="button" type="submit"><img src="images/searchSign.png" alt="Search Icon" height="20" width="20"/></button>
            </form>
        </div>
    );
}