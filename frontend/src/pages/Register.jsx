import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import Logo from '../assets/doAi.png';
import Footer from '../components/Footer/Footer';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(!validateInputs()) {
            return;
        }

        setIsLoading(true);

        try {
            const success = await register(email, password, name);

            if(success) {
                // Auto Login
                const loginSuccess = await login(email, password);
                if (loginSuccess) {
                    navigate('/');
                }else {
                    navigate('/login');
                }
            }
        }catch(err) {
            setError(err.message || 'Erro ao registrar. Tente novamente.');
        }finally {
            setIsLoading(false);
        }
    };
    
    function validateInputs() {
        // Name Validation
        const validateName = () => {
            if (!name.trim()) {
                return { valid: false, message: 'Nome é obrigatório' };
            }
            if (name.length < 3) {
                return { valid: false, message: 'Nome deve ter pelo menos 3 caracteres' };
            }
            return { valid: true };
        };

        // Email Validation
        const validateEmail = () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.trim()) {
                return { valid: false, message: 'Email é obrigatório' };
            }
            if (!emailRegex.test(email)) {
                return { valid: false, message: 'Email inválido' };
            }
            return { valid: true };
        };

        // Password Validation
        const validatePassword = () => {
            if (!password.trim()) {
                return { valid: false, message: 'Senha é obrigatória' };
            }
            if (password.length < 8) {
                return { valid: false, message: 'Senha deve ter pelo menos 8 caracteres' };
            }
            if (!/[A-Z]/.test(password)) {
                return { valid: false, message: 'Senha deve conter pelo menos uma letra maiúscula' };
            }
            if (!/\d/.test(password)) {
                return { valid: false, message: 'Senha deve conter pelo menos um número' };
            }
            if (!/[\W_]/.test(password)) {
                return { valid: false, message: 'Senha deve conter pelo menos um caractere especial' };
            }
            return { valid: true };
        };

        // ConfirmPassword Validation
        const validateConfirmPassword = () => {
            if (password !== confirmPassword) {
                return { valid: false, message: 'As senhas não coincidem' };
            }
            return { valid: true };
        };

        const nameValidation = validateName();
        const emailValidation = validateEmail();
        const passwordValidation = validatePassword();
        const confirmPasswordValidation = validateConfirmPassword();

        // Verifying if there is any error
        const nameErrors = [
            !nameValidation.valid && nameValidation.message,
        ].filter(Boolean);
        
        const emailErrors = [
            !emailValidation.valid && emailValidation.message,
        ].filter(Boolean);
        
        const passwordErrors = [
            !passwordValidation.valid && passwordValidation.message
        ].filter(Boolean);
        
        const confirmPasswordErrors = [
            !confirmPasswordValidation.valid && confirmPasswordValidation.message
        ].filter(Boolean);

        // Returning the error messages
        if (
            (emailErrors.length > 0) || 
            (passwordErrors.length > 0) ||
            (nameErrors.length > 0) || 
            (confirmPasswordErrors.length > 0)
        ) {
            setNameError(nameErrors[0]);
            setEmailError(emailErrors[0]);
            setPasswordError(passwordErrors[0]);
            setConfirmPasswordError(confirmPasswordErrors[0]);

            return false;
        }

        return true;
    }
    
    // TODO forgot password
    /*
        function handleClickOpen() {
            // Handle forgot password click
        }
    */

    return (<>
        <div className="absolute inset-x-0 top-0 left-0 w-full h-30 bg-gradient-to-b from-blue-400 to-gray-50 blur-2xl opacity-50 -z-1" />    
        <main className="grid place-items-center w-screen">
            <section className="p-5 mt-10 mb-10 w-[380px] border border-gray-300 rounded-lg shadow-xl bg-white">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 mb-2">
                    <img src={Logo} alt="Logo do doAi!" className="size-15" />  
                    <span className="font-sans text-xl font-semibold text-gray-800">doAi!</span>
                </Link>

                {/* Title */}
                <h1 className="text-3xl font-light text-left mb-6">Cadastre-se</h1>

                {error && (
                    <section className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </section>
                )}

                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>

                    {/* Name Field */}
                    <section className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome</label>
                        <input 
                            id="name" 
                            type="name" 
                            name="name" 
                            placeholder="Seu nome" 
                            autoComplete="name" 
                            required
                            className="px-3 py-2 border border-gray-300 rounded-md hover:border-zinc-600 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameError && (
                            <p className="pl-2 font-bold text-xs text-red-500">{nameError}</p>
                        )}
                    </section>

                    {/* Email Field */}
                    <section className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            name="email" 
                            placeholder="your@email.com" 
                            autoComplete="email" 
                            required
                            className="px-3 py-2 border border-gray-300 rounded-md hover:border-zinc-600 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                            {emailError && (
                            <p className="pl-2 font-bold text-xs text-red-500">{emailError}</p>
                        )}
                    </section>

                    {/* Password Field */}
                    <section className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
                        <input 
                            id="password" 
                            type="password" 
                            name="password" 
                            placeholder="••••••" 
                            autoComplete="current-password" 
                            required
                            className="px-3 py-2 border border-gray-300 rounded-md hover:border-zinc-600 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                            <p className="pl-2 font-bold text-xs text-red-500">{passwordError}</p>
                        )}
                    </section>

                    {/* Confirm Password Field */}
                    <section className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmar senha</label>
                        <input 
                            id="confirmPassword" 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="••••••" 
                            autoComplete="new-password" 
                            required
                            className="px-3 py-2 border border-gray-300 rounded-md hover:border-zinc-600 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && (
                            <p className="pl-2 font-bold text-xs text-red-500">{confirmPasswordError}</p>
                        )}
                    </section>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        onClick={validateInputs}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Carregando...' : 'Cadastrar-se'}
                    </button>
                </form>

                {/* Divider */}
                <section className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300"></span>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-2 bg-white text-sm text-gray-500">ou</span>
                    </div>
                </section>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Entrar
                    </Link>
                </p>
            </section>
        </main>
        <Footer />
    </>)
}

export default Register