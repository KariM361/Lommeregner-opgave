import style from './Button.module.scss'

// Interface beskriver hvilke props komponenten forventer.
interface ButtonProps {
  label: string;
  onClick: () => void;// () => void betyder: ingen argumenter, returnerer intet
}
 
export const Button = ({ label, onClick }: ButtonProps) => {
  return <button className={style.buttonStyle} onClick={onClick}>{label}</button>;
};

 