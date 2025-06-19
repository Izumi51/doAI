import React from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import ForgotPasswordComponent from '../components/Auth/ForgotPassword';
import Logo from '../assets/doAi.png';
import Footer from '../components/Footer/Footer';

function ForgotPassword() {
    const navigate = useNavigate();

    const handleSuccess = () => {
        // Redirect to login page after successful password reset
        navigate('/login');
    };

    const handleCancel = () => {
        // Redirect back to login page
        navigate('/login');
    };

    return (
        <>
            <div className="absolute inset-x-0 top-0 left-0 w-full h-30 bg-gradient-to-b from-blue-400 to-gray-50 blur-2xl opacity-50 -z-1" />
            <main className="grid place-items-center w-screen h-screen px-4">
                <section className="p-5 w-full max-w-[500px] border border-gray-300 rounded-lg shadow-xl bg-white">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <img src={Logo} alt="Logo do doAi!" className="size-15" />
                        <span className="font-sans text-xl font-semibold text-gray-800">doAi!</span>
                    </Link>

                    {/* ForgotPassword Component */}
                    <ForgotPasswordComponent 
                        onCancel={handleCancel}
                        onSuccess={handleSuccess}
                        isModal={true} // Use modal styling (no extra container)
                    />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default ForgotPassword;

