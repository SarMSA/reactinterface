import {
  useState,
  useEffect
} from "react";
import {
  BiCalendar
} from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() 
{

  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");

  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase())||
        item.ownerName.toLowerCase().includes(query.toLowerCase())||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a,b) => {
    let order = (orderBy === 'asc')? 1 : -1 ;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1*order : 1*order
    )
  })

 useEffect(() => {
      fetch('./data.json').then((response) => response.json()).then((data) => {
      setAppointmentList(data)
    });
  }, []);
  // useEffect(() => {
  //   fetchData()
  // }, [fetchData]);


  return ( <div className = "App container mx-auto mt-3 font-thin" >
    <h1 className = "text-5xl" >
    <BiCalendar className = "inline-block text-red-400" /> Your appointments </h1> 
    <AddAppointment 
      lastId={appointmentList.reduce((max, item)=> Number(item.id) > max ? Number(item.id): max, 0)}
      onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
    />
    <Search 
      query={query} 
      onQueryChange={myQuery => setQuery(myQuery)}
      sortBy = {sortBy}
      onSortedBy={mySort=> setSortBy(mySort)}
      orderBy={orderBy}
      onOrderedBy={mySort=> setOrderBy(mySort)}
      />
    <ul className = "divide-y divide-gray-200" > 
    {filteredAppointments.map(appointment => ( <AppointmentInfo 
                                                          key = {appointment.id} 
                                                          appointment = {appointment}
                                                          onDeleteAppointment = {appointmentId => {
                                                          setAppointmentList(appointmentList.filter(item => 
                                                            item.id !== appointmentId
                                                          ))
                                                          }}/>
      ))
    } </ul>
    </div>
  );
}



export default App;
