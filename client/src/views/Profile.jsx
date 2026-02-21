import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

function Profile() {
    const [ currentUser, setCurrentUser ] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/current_user2', {credentials: 'include'})
        .then(res => res.json())
        .then(data => {
            console.log('Current user data2:', data.user);
            setCurrentUser(data.user)
        })
        .catch(err => console.error('Error fetching current user:', err));
    }, []);

    const [form, setForm] = useState({
        bio: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(form)
            });
            const data = await res.json();
            console.log(data);
            alert(data.message);
        } catch (err) {
            console.error('Profile update error:', err);
        }


    }

    return (
        <>
        <form
            onSubmit={handleSubmit}
            className="w-full h-full justify-center flex flex-col flex-1 gap-4 ">
         
            
            <div className="flex flex-1 gap-4 items-center">
                {/* Profile Picture */}
                <div className="mt-4 rounded-full w-32 h-32 bg-blue-300 justify-center items-center cursor-pointer flex"><FaUser className="w-16 h-16 m-auto text-blue-500" /></div>
                <h1 className=" top-15 text-2xl font-bold">{currentUser || 'Loading...'}</h1>
            </div>

            <textarea
                name="bio"
                placeholder="Write your bio..."
                value={form.bio}
                onChange={handleChange}
                className="w-60 p-3 rounded bg-gray-200"
            >
            </textarea>
            <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                className="w-60 p-3 rounded bg-gray-200"
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-60 p-3 rounded bg-gray-200"
            />

            <div className=" flex flex-col gap-4 ">        
                <button
                    type="submit"
                    className="w-30 bg-blue-500 text-white p-3 rounded font-semibold"
                >
                    Save Profile
                </button>
            </div>
        </form>
        </>
    );
}
export default Profile;