import { useReducer } from "react";
 // Det er "formen" på lommeregnerens data
interface CalculatorState {
  current: string; // current = tallet brugeren er i gang med at skrive
  previous: string;// previous = det forrige tal (før operation)
  operation: string | null; // operation = + - * / eller null hvis ingen valgt
}
 // Action type beskriver ALLE mulige handlinger i appen
// Reducer pattern = state ændres kun via actions
type Action =
  | { type: "ADD_DIGIT"; payload: string }  // Tilføj et ciffer (0-9)
  | { type: "CHOOSE_OPERATION"; payload: string } // Brugeren vælger + - * /
  | { type: "CLEAR" }  // Nulstil alt
  | { type: "CALCULATE" };  // Udfør beregning
 // Start state når appen loader
const initialState: CalculatorState = {
  current: "",
  previous: "",
  operation: null,
};
 // Hjælpefunktion der udfører matematik
// Den kører IKKE React — bare ren JavaScript
function calculate(prev: number, curr: number, op: string) {
  // switch vælger hvilken operation vi laver
  switch (op) {
    case "+": return prev + curr;
    case "-": return prev - curr;
    case "*": return prev * curr;
     // beskytter mod division med 0
    case "/": return curr === 0 ? 0 : prev / curr;
    // fallback hvis noget går galt
    default: return curr;
  }
}
 // Reducer = hjernen i useReducer
// Den bestemmer hvordan state ændres
function reducer(state: CalculatorState, action: Action): CalculatorState {
// switch kigger på hvilken action der blev sendt
  switch (action.type) {
    // Tilføj et ciffer til current
    case "ADD_DIGIT":
      return {
         // ...state kopierer eksisterende state
        ...state,
        // tilføjer nyt tal til current
        current: state.current + action.payload,
      };
  // Brugeren vælger en operation
    case "CHOOSE_OPERATION":
       // hvis intet tal er skrevet → gør ingenting
      if (!state.current) return state;
      return {
        previous: state.current,
        operation: action.payload,
        current: "",
      };
     // Nulstil alt
    case "CLEAR":
      return initialState;
   // Udfør beregning
    case "CALCULATE":
       // hvis noget mangler → gør ingenting
      if (!state.previous || !state.current || !state.operation) return state;
        // konverterer tekst til tal
      const result = calculate(
        Number(state.previous),
        Number(state.current),
        state.operation
      );
      return {
        current: result.toString(),
        previous: "",
        operation: null,
      };
      // fallback hvis ukendt action
    default:
      return state;
  }
}
 // Custom hook som UI-komponenter bruger
export function useCalculator() {
    // useReducer giver os state + dispatch funktion
  const [state, dispatch] = useReducer(reducer, initialState);
 
  //  returnerer state
 return {
    state,
     // wrapper funktion der sender ADD_DIGIT action
    addDigit: (digit: string) =>
      dispatch({ type: "ADD_DIGIT", payload: digit }),
    // vælg operation
    chooseOperation: (op: string) =>
      dispatch({ type: "CHOOSE_OPERATION", payload: op }),
     // nulstil
    clear: () => dispatch({ type: "CLEAR" }),
     // beregn
    calculate: () => dispatch({ type: "CALCULATE" }),
  };
}