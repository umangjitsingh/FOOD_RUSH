import React, {useState} from 'react';

function RegisterForm({whatStep}: { whatStep: (step: number) => void }) {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    return (
        <div className=" overflow-hidden bg-background text-foreground w-full min-h-screen">

            {/* REAL TOP ANCHOR */}

            <section className="relative mx-auto max-w-360 px-5 py-5 sm:px-8 lg:px-12 scroll-mt-20">

                {/* Background blobs */}
                <div
                    className="pointer-events-none absolute -right-20 top-8 h-120 w-lg rounded-full bg-primary/10 blur-[130px]"/>
                <div
                    className="pointer-events-none absolute bottom-6 left-0 h-120 w-120 rounded-full bg-primary/4 blur-[110px]"/>

                <div className=" flex items-center justify-center h-screen w-full">
                    <div className="w-full max-w-2xl bg-foreground/20 hover:bg-linear-to-br hover:from-primary/4 hover:to-primary/20 h-160  flex items-center justify-center p-px rounded-2xl">
                        <div className="  bg-background h-full w-full z-90 rounded-2xl">
                            <div className="w-full h-28 flex flex-col items-center justify-center ">
                                <h1 className="max-w-2xl font-serif text-4xl font-bold leading-[0.98] tracking-snug text-balance sm:text-5xl lg:text-[58px] pt-8">Create Account</h1>
                                <p className="text-lg font-medium lowercase tracking-tight text-muted-foreground/60 pt-1.5">join <span className="italic font-extrabold text-lg text-primary/90 uppercase">Savor.</span> now</p>
                            </div>
                            <form className="">
                                <div className="relative z-90 bg-black px-8 py-12">

                                    <input className=" w-full border-2 border-white/60 px-4 py-3 rounded-md " placeholder="You Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default RegisterForm;