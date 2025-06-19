import React, { useState } from 'react';
import OtpRequest from './OtpRequest';
import OtpVerification from './OtpVerification';

const OtpFlow = ({ onComplete, title = "Email Verification" }) => {
    const [step, setStep] = useState('request'); // 'request' | 'verify' | 'completed'
    const [email, setEmail] = useState('');

    const handleOtpSent = (userEmail) => {
        setEmail(userEmail);
        setStep('verify');
    };

    const handleOtpVerified = (userEmail) => {
        setStep('completed');
        if (onComplete) {
            onComplete(userEmail);
        }
    };

    const handleCancel = () => {
        setStep('request');
        setEmail('');
    };

    const renderStep = () => {
        switch (step) {
            case 'request':
                return <OtpRequest onOtpSent={handleOtpSent} />;
            case 'verify':
                return (
                    <OtpVerification 
                        email={email} 
                        onVerified={handleOtpVerified} 
                        onCancel={handleCancel}
                    />
                );
            case 'completed':
                return (
                    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
                        <div className="mb-4">
                            <svg 
                                className="mx-auto h-12 w-12 text-green-500" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M5 13l4 4L19 7" 
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-green-600">Verification Complete!</h2>
                        <p className="text-gray-600">Your email has been successfully verified.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
                    {title}
                </h1>
            </div>
            {renderStep()}
        </div>
    );
};

export default OtpFlow;

