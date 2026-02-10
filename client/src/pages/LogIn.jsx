import { Link } from "react-router-dom";
import bg from "../assets/bg_image.jpg";
import { motion } from "framer-motion";

export default function Login() {
    return (
        <>
            <div className=" overflow-hidden relative flex w-screen min-h-screen items-center justify-center bg-cover bg-center  backdrop-blur-2xl" style={{ backgroundImage: `url(${bg})` }}>

                {/* for dark and blur bg */}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/10 to-black/60 backdrop-blur-xs"></div>

                <motion.div
                    initial={{opacity:0,y:5}}
                    animate={{opacity:1,y:0}}
                    transition={{duration:0.6,ease:"easeOut"}}
                    className="z-10 p-5 sm:p-20 lg:p-14 pt-20 lg:pt-14 flex flex-col items-center justify-center bg-linear-to-br from-black/30 via-white/30 to-blue-950 w-full sm:w-3/5 h-screen sm:h-3/5 lg:h-fit lg:w-6/12 rounded-4xl">
                    <div className="text-4xl lg:text-5xl font-extrabold  pb-10 pt-10 flex gap-x-6">
                        <div className="flex uppercase text-slate-900">
                            <h1 title="MULTI">M</h1>
                            <h1 title="CATEGORY">C</h1>
                            <h1 title="E-COMMERCE">E</h1>
                        </div>
                        <h1 className="font-semibold text-slate-200">Marketplace</h1>
                    </div>
                    <div className=" flex flex-col w-full lg:w-3/5 gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="Email" className="font-medium text-xl text-slate-200">Email</label>
                            <input id="Email" type="email" placeholder="Email or Phone Number" className="bg-gray-300/40 p-3 rounded-lg text-lg" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="Password" className="font-medium text-xl text-slate-200">Password</label>
                            <input id="Password" type="password" placeholder="Password" className="bg-gray-300/40 p-3 rounded-lg text-lg" />
                        </div>
                        <div className="w-full flex justify-center text-gray-200 text-lg hover:text-gray-400 hover:underline">Forgot password</div>
                        <button type="submit" className="hover:bg-text p-4 text-2xl text-white rounded-lg mt-2 bg-blue-950/85">Login</button>
                    </div>

                    <Link to="/sign_up" className="text-gray-200 mt-5 text-lg hover:underline hover:text-gray-400"> Sign Up?</Link>

                    <div className="mt-5 w-2/5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <span className="flex-1 h-px bg-gray-400"></span>
                            <span className="text-sm">or</span>
                            <span className="flex-1 h-px bg-gray-400"></span>
                        </div>
                    </div>
                </motion.div>

            </div>

        </>
    );
}