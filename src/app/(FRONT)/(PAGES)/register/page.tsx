"use client"
import React, {useState} from 'react';
import RegisterForm from "@/app/(FRONT)/(COMPONENTS)/RegisterForm";
import Welcome from "@/app/(FRONT)/(COMPONENTS)/Welcome";

function Register() {
    const[step,setStep]=useState(1);
    return( <>
            {step===2 && (<RegisterForm whatStep={setStep}/>)}
            {step===1 && (<Welcome whatStep={setStep}/>)}
        </>

    )


}

export default Register;