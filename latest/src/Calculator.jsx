import { useState } from 'react';
import './Calculator.css';

function Calculator(){

  const hadleKeyDown = (event) => {
    event.preventDefault();
  }

  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (value) => {
      setInputValue((prevValue) => prevValue + value);
  };

  const clearInput = () => {
    setInputValue('');
  };

  const oneByOne = () => {
    if (inputValue.length > 0) {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  const collection = (value) => {
    if(onClick)
    setInputValue((prevValue) => prevValue + value);
    else
    setInputValue(prevValue);
  }
  
    return(
      <div className="responsive">
        <div>
          <input 
          className='screen'
          type="text"
          value= {inputValue} readOnly>  
          </input>
        </div>

        <div className="symbols">
          <div className='column 1'>
          <button className="clear" onClick={() => clearInput()}> C </button> 
          <button className="seven" onClick={() => handleButtonClick('7')}> 7 </button>  
          <button className="four" onClick={() => handleButtonClick('4')}> 4 </button>          
          <button className="one" onClick={() => handleButtonClick('1')}> 1 </button>
          <button className="zero" onClick={() => handleButtonClick('0')}> 0 </button> 
          </div>

            <div className='column 2'>
          <button className="delete" onClick={() => oneByOne()}> del </button> 
          <button className="eight" onClick={() => handleButtonClick('8')}> 8 </button>
          <button className="five" onClick={() => handleButtonClick('5')}> 5 </button>
          <button className="two" onClick={() => handleButtonClick('2')}> 2 </button>
          <button className="double_zero" onClick={() => handleButtonClick('00')}> 00 </button>      
          </div>

            <div className='column 3'>
          <button className="mod"> % </button>
          <button className="nine" onClick={() => handleButtonClick('9')}> 9 </button>
          <button className="six" onClick={() => handleButtonClick('6')}> 6 </button>
          <button className="three" onClick={() => handleButtonClick('3')}> 3 </button>
          <button className="point" onClick={() => handleButtonClick('.')}> . </button> 
          </div>

          <div className='column 4'>
          <button className="divi"> ÷ </button>  
          <button className="mult"> x </button>          
          <button className="subt"> - </button>   
          <button className="coll" onClick={() => collection('+')}> + </button> 
          <button className="equals"> = </button>           
          </div>
        </div>
      </div>
    )
    
  }

  export default Calculator;