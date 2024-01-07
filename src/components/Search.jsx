import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";
import { useState } from "react";


const Dropdown = ({toggleStor, onSortedBy, onOrderedBy, sortBy, orderBy}) => {
    const itemSortedBy = [
      {id: 1, name: 'petName', title: 'Pet Name'},
      {id: 2, name: 'ownerName', title: 'Owner Name'},
      {id: 3, name: 'aptDate', title: 'Date'},
                                                   
    ];
    const itemOrderdBy = [
      {id: 1, name: 'asc', title: 'Asc'},
      {id: 2, name: 'desc', title: 'Desc'},

    ];

    if(!toggleStor) {
      return null;
    }
    return (
        <div className="origin-top-right absolute right-0 mt-2 w-56
        rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {itemSortedBy.map((item) => (
            <div onClick={()=> onSortedBy(item.name)} key={item.id}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
            role="menuitem">{item.title} {(sortBy === item.name) && <BiCheck />}</div>
          ))}
          {itemOrderdBy.map((item) => (
            <div onClick={()=> onOrderedBy(item.name)} key={item.id}
            className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 ${(item.id === 1)? "border-t-2": ""}`}
            role="menuitem">{item.title} {(orderBy === item.name) && <BiCheck />}</div>
          ))}
        </div>
      </div>
    )
}
const Search = ({query, onQueryChange, orderBy, onOrderedBy, sortBy, onSortedBy}) => {
  let [toggleStor, setToggleStor] = useState(false)
    return (
    <div className="py-5">
        <div className="mt-1 relative roundSed-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BiSearch />
            <label htmlFor="query" className="sr-only" />
          </div>
          <input 
          onChange={(event) => {onQueryChange(event.target.value)}}
          type="text" name="query" id="query" value={query}
            className="pl-8 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-solid border-2 border-gray-300" placeholder="Search" />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <div>
              <button 
              onClick={()=> {setToggleStor(!toggleStor)}}
              type="button"
                className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center" id="options-menu" aria-haspopup="true" aria-expanded="true">
                Sort By <BiCaretDown className="ml-2" />
              </button>
              <Dropdown 
                toggleStor= {toggleStor}
                sortBy = {sortBy}
                orderBy = {orderBy}
                onSortedBy = {mysort => onSortedBy(mysort)}
                onOrderedBy = {myorder => onOrderedBy(myorder)}
              />
            </div>
          </div>
        </div>
    </div> 
    )
}

export default Search;