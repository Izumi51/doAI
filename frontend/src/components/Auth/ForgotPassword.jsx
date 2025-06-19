import React, { useState } from 'react';
import axios from '../../api/axios';
import OtpVerification from './OtpVerification';

const ForgotPassword = ({ onCancel, onSuccess, isModal = false }) => {
    const [step, setStep] = useState('email'); // 'email' | 'otp' | 'password'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('/auth/otp/request', {
                email: email
            });

            setMessage(response.data.message);
            setStep('otp');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpVerified = (verifiedEmail, verifiedOtp) => {
        setOtp(verifiedOtp);
        setStep('password');
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (newPassword.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('/auth/password/reset', {
                email: email,
                otp: otp,
                newPassword: newPassword
            });

            setMessage('Senha alterada com sucesso!');
            setTimeout(() => {
                if (onSuccess) {
                    onSuccess();
                }
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao alterar senha');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpCancel = () => {
        setStep('email');
        setOtp('');
        setError('');
        setMessage('');
    };

    const renderStep = () => {
        switch (step) {
            case 'email':
                return (
                    <div className={isModal ? "" : "max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"}>
                        <h2 className="text-2xl font-bold mb-6 text-center">Esqueceu sua senha?</h2>
                        
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Digite seu email para receber um código de verificação
                        </p>
                        
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {isLoading ? 'Enviando...' : 'Enviar código'}
                                </button>
                                
                                {onCancel && (
                                    <button
                                        type="button"
                                        onClick={onCancel}
                                        className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>

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

            case 'otp':
                return (
                    <OtpVerification 
                        email={email} 
                        onVerified={(email, otpValue) => {
                            setOtp(otpValue);
                            handleOtpVerified(email, otpValue);
                        }}
                        onCancel={handleOtpCancel}
                        isModal={isModal}
                    />
                );

            case 'password':
                return (
                    <div className={isModal ? "" : "max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"}>
                        <h2 className="text-2xl font-bold mb-6 text-center">Nova senha</h2>
                        
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Digite sua nova senha
                        </p>
                        
                        <form onSubmit={handlePasswordReset} className="space-y-4">
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                    Nova senha
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength="6"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirmar senha
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength="6"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {isLoading ? 'Alterando...' : 'Alterar senha'}
                            </button>
                        </form>

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

            default:
                return null;
        }
    };

    if (isModal) {
        return renderStep();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
                    Recuperar Senha
                </h1>
            </div>
            {renderStep()}
        </div>
    );
};

export default ForgotPassword;

