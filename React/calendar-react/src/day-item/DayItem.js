import { useEffect } from 'react';
import './DayItem.css';

function DayItem(props) {
  
  const {day} = props;

  useEffect(() => {
    if (day.event)
      console.log(day.event);
  }, [])
  
  return (
    <div className={day.class} onClick={() => props.addEvent(day.date)}>
      {day.dateDisplay}
      {day.event && day.event.title && <div className='event'>
        {day.event.title}
        {/* {'jjjjjjjjjjjjjj'} */}
      </div>}
    </div>
  );
}

export default DayItem;
