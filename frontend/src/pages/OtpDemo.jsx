import React from 'react';
import OtpFlow from '../components/Auth/OtpFlow';
import { useNavigate } from 'react-router-dom';

const OtpDemo = () => {
    const navigate = useNavigate();

    const handleOtpComplete = (email) => {
        console.log(`OTP verification completed for: ${email}`);
        // You can redirect or perform any action after successful verification
        setTimeout(() => {
            navigate('/'); // Redirect to home after 3 seconds
        }, 3000);
    };

    return (
        <div>
            <OtpFlow 
                onComplete={handleOtpComplete}
                title="EmailJS OTP Demo"
            />
        </div>
    );
};

export default OtpDemo;

