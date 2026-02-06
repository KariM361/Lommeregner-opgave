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
<div className="display">   {/* ydre container til displayet*/}
<div className="previous">  {/* Viser tidligere tal + operation */}
   
        {previous} {operation}
</div>

 {/*Hvis current er tom → vis 0 i stedet || betyder "fallback værdi" */}
<div className="current">{current || 0}</div>
</div>

  );

};
 
 


 