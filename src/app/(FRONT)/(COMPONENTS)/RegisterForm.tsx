import React, {SyntheticEvent, useState} from 'react';
import {User, Mail, Lock, ArrowRight, EyeClosed, Eye, Loader2} from "lucide-react";
import clsx from "clsx";
import axios from "axios";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";


function RegisterForm({whatStep}: { whatStep: (step: number) => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async(e:SyntheticEvent) => {
        e.preventDefault();
        try{
            setLoading(true);
            const response = await axios.post("/api/auth/register", {name, email, password});
            console.log("response->",response)
            if(response.status === 201){
                router.push("/login");
            }
            console.log("response.data->",response.data);
            setLoading(false);
        }catch (e:any) {
            console.log(e)
            setError(e.response.data.message);
            setLoading(false);
        }

    }
    const isValid = name && email && password;
   

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
                    <button className="absolute top-14 left-14 p-2 px-6 rounded-md bg-primary/80 hover:bg-primary text-primary-foreground font-semibold" onClick={() => whatStep(1)}>Back</button>
                    <div className="w-full max-w-xl bg-border hover:bg-linear-to-br hover:from-primary/10 hover:to-primary/40 h-160 transition-all  flex items-center justify-center p-px rounded-2xl">

                        <div className="  bg-black h-full w-full z-90 rounded-2xl">
                            <div className="w-full h-28 flex flex-col items-center justify-center ">
                                <h1 className="max-w-2xl font-serif text-4xl font-bold leading-[0.98] tracking-snug text-balance sm:text-5xl lg:text-[58px] pt-8">Create
                                    Account</h1>
                                <p className="text-lg font-medium lowercase tracking-tight text-muted-foreground/60 pt-1.5">join <span
                                    className="italic font-extrabold text-lg text-primary/90 uppercase">Savor.</span> now
                                </p>
                            </div>
                            <form className="w-full flex flex-col items-center">
                                <div className="pt-12  w-full px-20">
                                    <div className="relative z-90 mb-4 ">
                                        <User
                                            className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground h-5 w-5"/>
                                        <input
                                            className=" w-full border-2 border-border  pl-12 py-3 rounded-md placeholder:text-muted-foreground"
                                            placeholder="Your Name" value={name}
                                            onChange={(e) => setName(e.target.value)}/>
                                    </div>

                                    <div className="relative z-90 mb-4">
                                        <Mail
                                            className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground h-5 w-5"/>
                                        <input
                                            className=" w-full border-2 border-border  pl-12 py-3 rounded-md placeholder:text-muted-foreground"
                                            placeholder="Your Email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}/>
                                    </div>

                                    <div className="relative z-90 ">
                                        <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground h-5 w-5"/>
                                        {showPassword ? (
                                            <Eye className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground h-5 w-5" onClick={() => setShowPassword(!showPassword)}/>
                                        ) : (
                                            <EyeClosed className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground h-5 w-5" onClick={() => setShowPassword(!showPassword)}/>
                                        )}
                                        <input type={showPassword ? "text" : "password"}
                                            className=" w-full border-2 border-border  pl-12 py-3 rounded-md placeholder:text-muted-foreground"
                                            placeholder="Your Password" value={password}
                                            onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>

                                <div className="mt-6 flex  items-center  max-w-xl w-1/2">
                                    <button
                                        disabled={!isValid}
                                        className={clsx(
                                            "w-full flex shrink-0 items-center justify-center gap-4 rounded-md bg-primary px-3 py-4 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] sm:px-5",
                                            !isValid && "opacity-50 cursor-not-allowed"
                                        )}
                                        onClick={(e) => handleRegister(e)}>
                                        {loading ? <Loader2 size={17} className="animate-spin"/> : <span>Register Now</span>}
                                        <ArrowRight size={17}/>
                                    </button>
                                </div>

                                <div className="flex items-center justify-center gap-2 px-8 w-full mt-4">
                                    <div className="w-full h-0.5 bg-border"/>
                                    <div>or</div>
                                    <div className="w-full h-0.5 bg-border"/>
                                </div>

                                <div className="mt-6 flex  items-center   w-full px-20">
                                    <button
                                        type="button"
                                        className="w-full flex shrink-0 items-center justify-center gap-4  rounded-md bg-primary-foreground  border-2 border-primary px-3 py-4 text-sm font-bold text-primary transition-transform hover:scale-[1.02] sm:px-5"
                                        onClick={() => signIn("google")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em"
                                             viewBox="0 0 14 14">
                                            <g fill="none">
                                                <path fill="#f49f0d"
                                                      d="M11.36 5.83H7.87a.51.51 0 0 0-.51.52v1.41a.51.51 0 0 0 .51.51h2.29a2.75 2.75 0 0 1-3 2.79c-2.24 0-3.32-1.9-3.32-4.06S5 2.94 7.16 2.94a4.07 4.07 0 0 1 2.64.86a.49.49 0 0 0 .72-.22l.63-1.44a.51.51 0 0 0-.15-.63a7.07 7.07 0 0 0-3.8-1C3.56.5 1.08 3.33 1.08 7s2.49 6.5 6.08 6.5s5.76-2.56 5.76-6c0-1.1-.44-1.67-1.56-1.67"></path>
                                                <path stroke="#df4a0a" strokeLinecap="round" strokeLinejoin="round"
                                                      d="M11.36 5.83H7.87a.51.51 0 0 0-.51.52v1.41a.51.51 0 0 0 .51.51h2.29a2.75 2.75 0 0 1-3 2.79c-2.24 0-3.32-1.9-3.32-4.06S5 2.94 7.16 2.94a4.07 4.07 0 0 1 2.64.86a.49.49 0 0 0 .72-.22l.63-1.44a.51.51 0 0 0-.15-.63a7.07 7.07 0 0 0-3.8-1C3.56.5 1.08 3.33 1.08 7s2.49 6.5 6.08 6.5s5.76-2.56 5.76-6c0-1.1-.44-1.67-1.56-1.67"></path>
                                            </g>
                                        </svg>
                                        <span>Continue with Google</span>
                                        <ArrowRight size={17}/>
                                    </button>
                                </div>
                                <p className="text-muted-foreground text-sm pt-1.5">Already have an account?
                                    <span className="text-primary cursor-pointer" onClick={()=>router.push("/login")}>{" "}Login</span>
                                </p>

                            </form>
                            {error && <p className=" text-red-500 mt-4 w-full text-center font-mono font-bold animate-bounce ">{error}</p>}
                        </div>

                    </div>
                </div>
            </section>
        </div>

    );
}

export default RegisterForm;