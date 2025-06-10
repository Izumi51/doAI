import Logo from '../assets/doAi.png'
import { Link } from "react-router";
import Footer from '../components/Footer/Footer';

function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission
}

function validateInputs() {
    // Add validation logic here
}

function handleClickOpen() {
    // Handle forgot password click
}

function Login() {
    return (<>
        <main className="grid place-items-center w-screen h-screen bg-gray-50">
            <section className="p-5 w-[380px] border border-gray-300 rounded-lg shadow-xl bg-white">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 mb-2">
                    <img src={Logo} alt="Logo do doAi!" className="size-15" />
                    <span className="font-sans text-xl font-semibold text-gray-800">doAi!</span>
                </Link>

                {/* Title */}
                <h1 className="text-3xl font-light text-left mb-6">Entrar</h1>

                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input id="email" type="email" name="email" placeholder="your@email.com" autoComplete="email" required
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <div className="text-xs text-red-500" id="email-error"></div>
                    </div>

                    {/* Password Field */}
                    <section className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
                        <input id="password" type="password" name="password" placeholder="••••••" autoComplete="current-password" required
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <div className="text-xs text-red-500" id="password-error"></div>
                    </section>

                    {/* Submit Button */}
                    <button type="submit" onClick={validateInputs}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Entrar
                    </button>

                    {/* Forgot Password */}
                    <button type="button" onClick={handleClickOpen} 
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-center">
                        Esqueceu seu senha?
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
                    Não tem uma conta?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </section>
        </main>
        <Footer />
    </>) 
}

export default Login