import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../api/auth';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false); // New state for loading

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true); // Disable button and show spinner

        try {
            const response = await login(formData);
            toast.success(response.message);
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false); // Re-enable button after request completes
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer flex items-center justify-center"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"
                                viewBox="0 0 24 24"
                            ></svg>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link
                        to="/forgot-password"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <div className="mt-4 text-center">
                    <span className="text-gray-600">
                        Don't have an account?{' '}
                    </span>
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
