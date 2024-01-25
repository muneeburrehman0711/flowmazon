"use client";

import {ComponentProps } from "react";
import { useFormStatus} from "react-dom";

type FormSubmitButtonProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">
export default function formSubmitButton(
    {children,
    className,
    ...props
    } : FormSubmitButtonProps

) {
   
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const {pending} = useFormStatus();

    return(
        <button
        {...props}
         className={`btn btn-primary ${className}`}
        type="submit"
        disabled={pending}
        >
            {pending &&  <span className="loading loading-spinner" />}
            {children}</button>
    ); 
    }