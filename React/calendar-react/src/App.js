import { useEffect, useState } from 'react';
import './App.css';
import Header from './header/Header';
import Weekday from './weekdays/Weekday';
import DayItem from './day-item/DayItem';
import NewEvent from './new-event-modal/NewEvent';

function App() {
  const [dt, setDt] = useState(new Date());
  const [nav, setNav] = useState(0);
  const [days, setDays] = useState([]);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [events, setEvents] = useState(localStorage.getItem('events')? JSON.parse(localStorage.getItem('events')): []);
  const today = new Date();
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setDt(new Date(today.setMonth(today.getMonth() + nav)));
  }, [nav]);

  useEffect(() => {
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    createDays(firstDayOfMonth, daysInMonth);
  }, [dt, events])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    // const e = [
    //   {
    //     date: today.toLocaleDateString(),
    //     title: 'Event for Today',
    //   },
      
    //   {
    //     date: new Date(today.setDate(today.getDate()+1)).toLocaleDateString(),
    //     title: 'Event for tomorrow',
    //   }
    // ];
    // localStorage.setItem('events', JSON.stringify(e));
    console.log(events);
  }, [])
  
  function createDays(paddingCount, daysCount) {
    const daysArr = [];

    for (let i=0; i<paddingCount + daysCount; i++) {
    
        if (i >= paddingCount) {
          const date = new Date(dt.getFullYear(), dt.getMonth(), i - paddingCount + 1);
          const event = events.find(event => event.date === date.toLocaleDateString());
          daysArr.push({
            date: date,
            dateDisplay: i - paddingCount + 1,
            class: (date.getTime() == new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime())? 'current-day day-cell': 'day-cell',
            event,
          })
        }
        else {
          daysArr.push({
            date: null,
            dateDisplay: '',
            class: 'padding-day-cell',
          })
        }
    }
    console.log(daysArr);
    setDays(daysArr);
  }

  const addNewEventHandler = (title) => {
    setEvents(prev => [
      {
        date: selectedDate,
        title,
      },
      ...prev
    ]);
    closeNewEventHandler();
  }
  
  const closeNewEventHandler = () => {
    setShowNewEventModal(false);
  }

  const addEventModal = (date) => {
    setSelectedDate(date.toLocaleDateString());
    setShowNewEventModal(true);
  }

  return (
    <div className="container">
      <Header 
        date={dt.toLocaleDateString("en-IN", {month: 'long', year: 'numeric'})} 
        prevHandler={() => setNav(prevNav => prevNav-1)} 
        nextHandler={() => setNav(prevNav => prevNav+1)} 
      />
      <Weekday />
      <div className='days-container'>
        {days.map(day => (
          <DayItem day={day} addEvent={addEventModal}/>
        ))}
      </div>
      {showNewEventModal && <NewEvent close={() => closeNewEventHandler()} add={(text) => addNewEventHandler(text)}/>}
    </div>
  );
}

export default App;
