import { useEffect, useState } from 'react';
import './NewEvent.css';

function NewEvent(props) {
  
  const [text, setText] = useState('');
  
  const textHandler = (text) => {
    setText(text);
    console.log(text);
  }

  return (
    <>
      <div className='modal'>
        <h2>Add New Event</h2>
        <input onChange={e => textHandler(e.target.value)}/>
        <div className='btn-group'>
        <button className='btn' onClick={() => props.add(text)}>Add</button>
        <button className='btn' onClick={props.close}>Close</button>
      </div>
      </div>
      <div className='backdrop'></div>
    </>
  );
}

export default NewEvent;
