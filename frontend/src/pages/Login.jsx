import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",   
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", formData);

            //Storing token
            localStorage.setItem("token", res.data.token);

            navigate("/"); //temporary
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }   
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded"
                    onChange={handleChange}
                    required
                />

                <button className="w-full bg-red-600 text-white py-2 rounded">
                    Login
                </button>

                <p className="mt-3 text-sm text-center">
                    Dont have an account?{" "}
                    <Link to="/register" className="text-red-600">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;