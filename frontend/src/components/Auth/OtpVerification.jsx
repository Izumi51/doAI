import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

const OtpVerification = ({ email, onVerified, onCancel, isModal = false }) => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('/auth/otp/verify', {
                email: email,
                otp: otp
            });

            if (response.data.valid) {
                setMessage(response.data.message);
                if (onVerified) {
                    onVerified(email, otp);
                }
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to verify OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            await axios.post('/auth/otp/request', {
                email: email
            });
            setMessage('OTP resent successfully!');
            setTimeLeft(300); // Reset timer
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={isModal ? "" : "max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"}>
            <h2 className="text-2xl font-bold mb-6 text-center">Verificar código</h2>
            
            <div className="mb-4 text-sm text-gray-600 text-center">
                Enter the 6-digit code sent to <strong>{email}</strong>
            </div>

            <div className="mb-4 text-center">
                <span className="text-sm text-gray-500">
                    Time remaining: <span className="font-mono text-red-500">{formatTime(timeLeft)}</span>
                </span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                        OTP Code
                    </label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        maxLength="6"
                        pattern="[0-9]{6}"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-mono"
                        placeholder="123456"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={isLoading || otp.length !== 6}
                        className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="mt-4 text-center">
                <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading || timeLeft > 0}
                    className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {timeLeft > 0 ? `Resend OTP in ${formatTime(timeLeft)}` : 'Resend OTP'}
                </button>
            </div>

            {message && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {message}
                </div>
            )}

            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
        </div>
    );
};

export default OtpVerification;

