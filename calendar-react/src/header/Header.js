import { useEffect } from 'react';
import './Header.css';

function Header(props) {
  const {date, prevHandler, nextHandler} = props;

  useEffect(() => {
    console.log(date);
  }, [])
  
  return (
    <div className="header">
      <div className='year-display'>{date}</div>
      <div className='button-group'>
        <button className='btn' onClick={prevHandler}>Back</button>
        <button className='btn' onClick={nextHandler}>Next</button>
      </div>
    </div>
  );
}

export default Header;
