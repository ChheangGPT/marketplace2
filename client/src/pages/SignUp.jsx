import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import bg from "../assets/bg_image.jpg";
import { motion } from "framer-motion";
export default function SignUp() {

    // 🧠 React memory: this is where ALL input data lives
    // If it's not here, backend will never see it
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birth: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    // 📨 Runs whenever user types / selects / checks
    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        // Update ONLY the field that changed
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    // 🚀 Runs when user clicks "Sign Up"
    function handleSubmit(e) {
        e.preventDefault(); // stop page refresh

        // 🛑 simple frontend checks (UX, not security)
        if (!form.firstName || !form.email || !form.password) {
            const i = document.getElementById("warning");
            i.classList.remove("hidden");
            setTimeout(() => {
                i.classList.add("hidden");
            }, 1000);
            return;
        }

        if (form.password !== form.confirmPassword) {
            const i = document.getElementById("warning");
            i.innerHTML = "<h1>Passwords do not match</h1>";

            i.classList.remove("hidden");
            setTimeout(() => {
                i.classList.add("hidden");
            }, 1000);
            return;
        }

        if (!form.agree) {
            alert("You must agree to the terms");
            return;
        }

        // If all good → send to backend
        console.log("Sending to backend:", form);
    }

    return (
        <>
            <div className="overflow-hidden relative flex w-full min-h-screen items-center justify-center bg-black/5 backdrop-blur-2xl bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>

                {/* for dark and blur bg */}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/10 to-black/60 backdrop-blur-xs"></div>

                {/* 🧾 Form wrapper (IMPORTANT for submit) */}
                <motion.form
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    onSubmit={handleSubmit}
                    className=" z-10 p-14 flex flex-col items-center justify-center  w-full sm:w-6/12 md:w-full xl:w-6/12 rounded-4xl bg-linear-to-br from-black/50 via-white/30 to-blue-950"
                >
                    <div className="text-4xl font-extrabold  pb-10 pt-10 flex gap-x-6">
                        <div className="flex uppercase whitespace-nowrap text-slate-900">
                            <h1 title="MULTI">M</h1>
                            <h1 title="CATEGORY">C</h1>
                            <h1 title="E-COMMERCE">E</h1>
                        </div>
                        <h1 className="font-semibold text-slate-200">Marketplace</h1>
                    </div>

                    <div className="flex flex-col w-full sm:w-3/5 gap-3 ">

                        {/* FIRST + LAST NAME */}
                        <div className="grid grid-cols-2 gap-3 text-slate-200 font-medium">
                            <div className="flex flex-col">
                                <label>First Name</label>
                                <input
                                    name="firstName"                 // key in state
                                    value={form.firstName}           // React → input
                                    onChange={handleChange}          // input → React
                                    type="text"
                                    className="bg-gray-300/40 p-3 rounded-lg text-lg"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label>Last Name</label>
                                <input
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    type="text"
                                    className="bg-gray-300/40 p-3 rounded-lg text-lg"
                                />
                            </div>
                        </div>

                        {/* GENDER + BIRTH */}
                        <div className="flex flex-col 2xl:flex-row justify-between w-full gap-4 items-start sm:items-center font-medium ">
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-slate-200">Gender</label>
                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    className="bg-gray-300/40 p-2 rounded-lg w-full "
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="non-binary">Non-binary</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2  w-full">
                                <label className="text-slate-200">Birth</label>
                                <input
                                    name="birth"
                                    value={form.birth}
                                    onChange={handleChange}
                                    type="date"
                                    className="bg-gray-300/40 p-2 rounded-lg w-full"
                                />
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-xl text-slate-200">Email</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                className="bg-gray-300/40 p-3 rounded-lg text-lg"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-xl text-slate-200">Password</label>
                            <input
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type="password"
                                className="bg-gray-300/40 p-3 rounded-lg text-lg"
                            />
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-xl text-slate-200">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                type="password"
                                className="bg-gray-300/40 p-3 rounded-lg text-lg"
                            />
                        </div>

                        {/* TERMS */}
                        <div className="flex gap-2 items-center text-lg text-slate-200 font-medium">
                            <input
                                type="checkbox"
                                name="agree"
                                checked={form.agree}
                                onChange={handleChange}
                            />
                            <label>I agree to the Terms & Privacy Policy</label>
                        </div>

                        <div id="warning" className="hidden text-red-500 absolute bottom-54"> <div className="flex text-lg gap-1 items-center text-start"><FaTimesCircle /><h1 className=" mb-0.5 p-0">make sure to complete all requirment</h1></div></div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="bg-text p-4  text-2xl text-white rounded-lg mt-4 hover:bg-blue-950/85"
                        >
                            Sign Up
                        </button>

                    </div>

                    <Link to="/login" className="text-gray-200 mt-5 text-lg hover:underline hover:text-gray-400">
                        already has accounts? Login
                    </Link>

                    <div className="mt-5 w-2/5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <span className="flex-1 h-px bg-gray-400"></span>
                            <span className="text-sm">or</span>
                            <span className="flex-1 h-px bg-gray-400"></span>
                        </div>
                    </div>
                </motion.form>
            </div>
        </>
    );
}
