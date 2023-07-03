import { useEffect } from 'react';
import './Weekday.css';

function Weekday(props) {
  // const {date, prevHandler, nextHandler} = props;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  useEffect(() => {
    // console.log(date);
  }, [])
  
  return (
    <div className="days">
      {days.map(day => <div className='day'>{day}</div>)}
    </div>
  );
}

export default Weekday;
