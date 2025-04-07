import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { forgotPassword } from '../api/auth';

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await forgotPassword(email);
            setLoading(false);
            toast.success(response.message);
            navigate('/reset-password');
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Failed to send reset OTP'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Forgot Password
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    {!loading && (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                        >
                            Send Reset OTP
                        </button>
                    )}
                    {loading && (
                        <div className="w-full bg-blue-500 text-white py-2 rounded-lg text-center flex justify-center cursor-not-allowed">
                            <svg
                                className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"
                                viewBox="0 0 24 24"
                            ></svg>
                        </div>
                    )}
                </form>
                <div className="mt-4 text-center">
                    <Link
                        to="/login"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
