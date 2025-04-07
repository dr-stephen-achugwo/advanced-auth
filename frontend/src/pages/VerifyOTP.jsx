import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { verifyOTP, resendOTP } from '../api/auth';

function VerifyOTP() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await verifyOTP(otp);
            setLoading(false);
            toast.success(response.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await resendOTP();
            toast.success(response.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Failed to resend OTP'
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Verify OTP
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    {!loading && (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                        >
                            Verify
                        </button>
                    )}
                    {loading && (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-not-allowed flex items-center justify-center"
                            disabled
                        >
                            <svg
                                className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                                viewBox="0 0 24 24"
                            ></svg>
                        </button>
                    )}
                </form>
                <button
                    onClick={handleResendOTP}
                    className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                    Resend OTP
                </button>
            </div>
        </div>
    );
}

export default VerifyOTP;
