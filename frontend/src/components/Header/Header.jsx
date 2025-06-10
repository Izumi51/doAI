import Logo from '../../assets/doAi.png'
import NavBar from '../NavBar/NavBar.jsx'

function Header() {
    return (<>
        <div className="absolute inset-x-0 top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-300 to-gray-50 blur-2xl opacity-50 -z-1" />
        <header className="w-4/5 mt-5 m-auto pr-7 pl-7 sticky rounded-2xl border-zinc-500 bg-white/60 shadow-2xl top-5 flex justify-between backdrop-blur-2xl">
            <section className="flex items-center-safe">
                <img src={Logo} alt="Logo do doAi!" className="size-12"/> 
                <span className="text-2xl">doAi!</span>
            </section>

            <NavBar />
        </header> 
    </>)
}

export default Header