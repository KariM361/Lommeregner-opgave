import { useCalculator } from "../../Hook/useCalculator";
import { Display } from "../Display/Display";
import { Button } from "../Buttons/Buttons";
import style from '../Calculator/Calculator.module.scss'
 // Calculator komponenten
export const Calculator = () => {
 // henter state + funktioner fra vores hook
 // state = data (tal + operation)
 // funktionerne ændrer state
  const { state, addDigit, chooseOperation, clear, calculate } = useCalculator();
 
  return (
 // Ydre container med styling
<div className={style.calculator}>
 {/* Display viser tidligere tal, operation og nuværende tal */}
<Display
        previous={state.previous}
        operation={state.operation}
        current={state.current}
      />
 
      <div className={style.grid}>
{/* C knap nulstiller lommeregneren */}
<Button label="C" onClick={clear} />
 {/* map() bruges til at lave flere knapper automatisk [7,8,9] bliver til 3 knapper*/}
        {[7, 8, 9].map(n => (
 // React kræver unik key i lister, label konvaterer tal til tekst.
<Button key={n} label={n.toString()}  onClick={() => addDigit(n.toString())} />
        ))}
<Button label="+" onClick={() => chooseOperation("+")} />
 
        {[4, 5, 6].map(n => (
<Button key={n} label={n.toString()} onClick={() => addDigit(n.toString())} />
        ))}
<Button label="-" onClick={() => chooseOperation("-")} />
 
        {[1, 2, 3].map(n => (
<Button key={n} label={n.toString()} onClick={() => addDigit(n.toString())} />
        ))}
<Button label="*" onClick={() => chooseOperation("*")} />
 
        <Button label="0" onClick={() => addDigit("0")} />
<Button label="=" onClick={calculate} />
<Button label="/" onClick={() => chooseOperation("/")} />
</div>
</div>
  );
};

 