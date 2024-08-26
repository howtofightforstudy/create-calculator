import { useState } from 'react';
import './Calculator.css';

function Calculator(){

const [inputValue, setInputValue] = useState('');
const [lastButtonType, setLastButtonType] = useState('number'); 
const [selectedOperator, setSelectedOperator] = useState(null);

  const handleKeyDown = (event) => {
    event.preventDefault();
    };

    const handleButtonClick = (value) => {
      if (value.match(/\d/)) { // Eğer rakam butonuna tıklanmışsa
        if (inputValue.length < 15) {
          setInputValue(prevValue => prevValue + value);
          setLastButtonType('number');
          setSelectedOperator(null); // Rakam kullanıldığında işlem butonlarını tekrar etkinleştir
        }
      } else if (value === '=') { // Eğer eşitlik butonuna tıklanmışsa
        handleCalculate();
      } else { // Eğer işlem butonuna tıklanmışsa
        if (inputValue.length > 0 && selectedOperator === null) { // Son karakter işlem butonu değilse ve işlem butonu kullanılmamışsa
          setInputValue(prevValue => prevValue + value);
          setLastButtonType('operator');
          setSelectedOperator(value); // İşlem butonunu saklar
        } else if (inputValue.length > 0 && lastButtonType === 'operator') {
          // Eğer son buton işlem butonuysa, mevcut işlem butonunu değiştirir
          setInputValue(prevValue => prevValue.slice(0, -1) + value);
          setLastButtonType('operator');
          setSelectedOperator(value); // İşlem butonunu saklar
        }
      }
    };

    const handleCalculate = () => {
      try {
        // inputValue içindeki matematiksel ifadeyi değerlendirip sonucu setInputValue ile göster
        // Güvenlik nedeniyle, eval yerine güvenli bir hesaplama kütüphanesi kullanmak daha iyidir
        const result = eval(inputValue.replace('÷', '/').replace('x', '*')); 
        setInputValue(result.toString());
        setLastButtonType('number');
        setSelectedOperator(null);
      } catch (e) {
        setInputValue('Error');
      }
    };

  const clearInput = () => {
    setInputValue('');
    setLastButtonType('number');
    setHasOperator(null);
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
      setInputValue(prevValue => prevValue.slice(0, -1));
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
          <button className="modButton" onClick={() => handleButtonClick('%')} disabled={selectedOperator !== null}> % </button>
          <button className="nine" onClick={() => handleButtonClick('9')}> 9 </button>
          <button className="six" onClick={() => handleButtonClick('6')}> 6 </button>
          <button className="three" onClick={() => handleButtonClick('3')}> 3 </button>
          <button className="point" onClick={() => handleButtonClick('.')} disabled={selectedOperator !== null}> . </button> 
          </div>

          <div className='column 4'>
          <button className="divButton" onClick={() => handleButtonClick('÷')} disabled={selectedOperator !== null}> ÷ </button>  
          <button className="mulButton" onClick={() => handleButtonClick('x')} disabled={selectedOperator !== null}> x </button>          
          <button className="subButton" onClick={() => handleButtonClick('-')} disabled={selectedOperator !== null}> - </button>   
          <button className="sumButton" onClick={() => handleButtonClick('+')} disabled={selectedOperator !== null}> + </button> 
          <button className="equalButton" onClick={() => handleButtonClick('=')} disabled={lastButtonType==='operator'}> = </button>       
          </div>
        </div>
      </div>
      </div>
    )
    
  }

  export default Calculator;