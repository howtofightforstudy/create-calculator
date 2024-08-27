import { useState } from 'react';
import './Calculator.css';

function Calculator(){

const [inputValue, setInputValue] = useState('');
const [lastButtonType, setLastButtonType] = useState('number'); 
const [selectedOperator, setSelectedOperator] = useState(null);
const [errorMessage, setErrorMessage] = useState('');

    const handleKeyDown = (event) => {
      event.preventDefault();
    };

    const removeLeadingZeros = (value) => {
      return value.replace(/^0+(?!$)/, '');
    };

    const handleButtonClick = (value) => {
      if (value.match(/\d/)) { 
        if (inputValue.length < 17) {
          let newValue = inputValue + value;
          newValue = removeLeadingZeros(newValue); // Başlangıç sıfırlarını kaldır
          setInputValue(newValue);
          setLastButtonType('number');
          setSelectedOperator(null); 
          setErrorMessage(''); 
        } else {
          setErrorMessage('You have exceeded the character limit. (limit: 17 characters)');
        }
      } else if (value === '=') { 
        handleCalculate();
      } else { 
        if (inputValue.length > 0 && selectedOperator === null) {
          setInputValue(prevValue => removeLeadingZeros(prevValue) + value);
          setLastButtonType('operator');
          setSelectedOperator(value); 
          setErrorMessage(''); 
        } else if (inputValue.length > 0 && lastButtonType === 'operator') {
          setInputValue(prevValue => removeLeadingZeros(prevValue).slice(0, -1) + value);
          setLastButtonType('operator');
          setSelectedOperator(value);
          setErrorMessage(''); 
        }
      }
    };

    const handleCalculate = () => {
    try {
      const result = eval(inputValue.replace('÷', '/').replace('x', '*')); 
      setInputValue(result.toString());
      setLastButtonType('number');
      setSelectedOperator(null);
      setErrorMessage(''); 
    } catch (e) {
      setInputValue('Error');
      setErrorMessage('Faulty operation');
    }
  };

  const clearInput = () => {
    setInputValue('');
    setLastButtonType('number');
    setSelectedOperator(null);
    setErrorMessage(''); 
  };

  const oneByOne = () => {
    if (inputValue.length > 0) {
      const lastChar = inputValue[inputValue.length - 1];
      if (lastChar.match(/[\d.]/)) {
        setLastButtonType('number');
      } else {
        setSelectedOperator(null); // İşlem butonu silinirse tekrar etkinleştirir
        setLastButtonType('operator');
      }
      setInputValue(prevValue => removeLeadingZeros(prevValue).slice(0, -1));
      setErrorMessage(''); 
    }
  };

    return(
      <div className='generalDiv'>
        <h1>CALCULATOR</h1> 
       <div className="responsive">

        <div>
         <input
         className='screen'
         type="text"
         value= {inputValue} readOnly
         onChange={handleKeyDown}>  
        </input>
        </div>

        <div className="symbols">
          <div className='column a'>
          <button className="clear" onClick={() => clearInput()}> C </button> 
          <button className="seven" onClick={() => handleButtonClick('7')}> 7 </button>  
          <button className="four" onClick={() => handleButtonClick('4')}> 4 </button>          
          <button className="one" onClick={() => handleButtonClick('1')}> 1 </button>
          <button className="zero" onClick={() => handleButtonClick('0')}> 0 </button> 
          </div>

            <div className='column b'>
          <button className="delete" onClick={() => oneByOne()}> del </button> 
          <button className="eight" onClick={() => handleButtonClick('8')}> 8 </button>
          <button className="five" onClick={() => handleButtonClick('5')}> 5 </button>
          <button className="two" onClick={() => handleButtonClick('2')}> 2 </button>
          <button className="double_zero" onClick={() => handleButtonClick('00')}> 00 </button>      
          </div>

            <div className='column c'>
          <button className="modButton" onClick={() => handleButtonClick('%')} disabled={selectedOperator !== null}> % </button>
          <button className="nine" onClick={() => handleButtonClick('9')}> 9 </button>
          <button className="six" onClick={() => handleButtonClick('6')}> 6 </button>
          <button className="three" onClick={() => handleButtonClick('3')}> 3 </button>
          <button className="point" onClick={() => handleButtonClick('.')} disabled={selectedOperator !== null}> . </button> 
          </div>

          <div className='column d'>
          <button className="divButton" onClick={() => handleButtonClick('÷')} disabled={selectedOperator !== null}> ÷ </button>  
          <button className="mulButton" onClick={() => handleButtonClick('x')} disabled={selectedOperator !== null}> x </button>          
          <button className="subButton" onClick={() => handleButtonClick('-')} disabled={selectedOperator !== null}> - </button>   
          <button className="sumButton" onClick={() => handleButtonClick('+')} disabled={selectedOperator !== null}> + </button> 
          <button className="equalButton" onClick={() => handleButtonClick('=')} disabled={selectedOperator !== null}> = </button>       
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
      </div>
    )
    
  }

  export default Calculator;