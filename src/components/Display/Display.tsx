import style from './Display.module.scss'

// Interface beskriver hvilke props komponenten forventer.
// Props = data der sendes IND i komponenten.
interface DisplayProps {
// previous = det tidligere tal (fx første tal i regnestykket)
  previous: string;
 // operation kan være en tekst (+ - * /) eller null
  // null betyder: ingen operation valgt endnu
  operation: string | null;
  // current = det nuværende tal brugeren skriver
  current: string;

}
 // "destructurer" props direkte i parameteren
// Det betyder vi trækker previous, operation og current ud
export const Display = ({ previous, operation, current }: DisplayProps) => {
 // return = det der vises på skærmen
  return (
<div className={style.display}>  
<div className={style.previous}>  
   
        {previous} {operation}
</div>

 {/*Hvis current er tom → vis 0 i stedet || betyder "fallback værdi" */}
<div className={style.current}>{current || 0}</div>
</div>

  );

};
 
 


 