import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { logout } from '../api/auth';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logout();
            toast.success(response.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Welcome to your Dashboard
                    </h2>
                    <p className="text-gray-600">
                        You have successfully logged in to your account.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
