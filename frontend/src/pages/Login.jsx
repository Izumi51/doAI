import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import Logo from '../assets/doAi.png';
import Footer from '../components/Footer/Footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(!validateInputs()) {
            return;
        }

        setIsLoading(true);
        
        try {
            const success = await login(email, password);

            if(success) {
                navigate('/');
            }else {
                setError('Credenciais inválidas');
            }
        }catch(loginErr) {
            console.error('Login error:', loginErr);
            setError('Erro ao fazer login. Tente novamente.');
        }finally {
            setIsLoading(false);
        }
    };

    function validateInputs() {
        // Validate email
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

        // Validate password
        const validatePassword = () => {
            if (!password.trim()) {
                return { valid: false, message: 'Senha é obrigatória' };
            }
            if (password.length < 6) {
                return { valid: false, message: 'Senha deve ter pelo menos 6 caracteres' };
            }
            return { valid: true };
        };

        const emailValidation = validateEmail();
        const passwordValidation = validatePassword();

        // Verifying if there is any error
        const emailErrors = [
            !emailValidation.valid && emailValidation.message,
        ].filter(Boolean);
        
        const passwordErrors = [
            !passwordValidation.valid && passwordValidation.message
        ].filter(Boolean);

        // Returning the error messages
        if ((emailErrors.length > 0) || (passwordErrors.length > 0)) {
            setEmailError(emailErrors[0]);
            setPasswordError(passwordErrors[0]);
            return false;
        }

        return true;
    }

    // TODO: forgot password
    /*  function handleClickOpen() {
            // Handle forgot password click
            console.log("Forgot password clicked");
        }
    */

    return (<>
        <div className="absolute inset-x-0 top-0 left-0 w-full h-30 bg-gradient-to-b from-blue-400 to-gray-50 blur-2xl opacity-50 -z-1" />    
        <main className="grid place-items-center w-screen h-screen px-4">
            <section className="p-5 w-full max-w-[380px] border border-gray-300 rounded-lg shadow-xl bg-white">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 mb-2">
                    <img src={Logo} alt="Logo do doAi!" className="size-15" />  
                    <span className="font-sans text-xl font-semibold text-gray-800">doAi!</span>
                </Link>

                {/* Title */}
                <h1 className="text-3xl font-light text-left mb-6">Entrar</h1>

                {/* Invalid Credentials */}
                {error && (
                    <section className="mb-3 bg-red-100 border border-red-400 text-red-700 px-5 py-2 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </section>
                )}

                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>

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

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        onClick={validateInputs}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Carregando...' : 'Entrar'}
                    </button>

                    {/* Forgot Password
                    <button 
                        type="button" 
                        onClick={handleClickOpen} 
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-center"
                    >
                        Esqueceu sua senha?
                    </button> */}
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
                    Não tem uma conta?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </section>
        </main>
        <Footer />
    </>);
}

export default Login;