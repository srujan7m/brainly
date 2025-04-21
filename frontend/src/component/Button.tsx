import { ReactElement } from 'react';

type Variants =  "primary" | "secondary";
interface ButtonProps {
    variant : Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: ()=> void
    fullWidth?: boolean;
    loading?: boolean;
    href? : string;
}

const variantStyles ={
    primary:"bg-blue-111 text-blue-112 rounded-lg font-light ",
    secondary:"bg-blue-112 text-blue-111 rounded-lg font-light"
} 
const defaultStyles = "rounded-lg m-2 flex items-center"

const sizeStyles ={
    sm:"py-1 px-2 text-xs font-medium",
    md:"py-2 px-4 text-sm font-medium",
    lg:"py-4 px-8 text-base font-medium",   
} 

export const Button = (props:ButtonProps)=>{
    return <button onClick={props.onClick}
    disabled={props.loading}
    aria-disabled={props.loading}
    className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} 
    ${props.fullWidth ? " w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-45	" : ""}`}>
    {props.startIcon? <div className='pr-2'>{props.startIcon}</div> : null} {props.text}</button>
}
