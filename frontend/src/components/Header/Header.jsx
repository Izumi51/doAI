import Logo from '../../assets/doAi.png'
import NavBar from '../NavBar/NavBar.jsx'

function Header() {
    return (<>
        <div className="absolute inset-x-0 top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-300 to-gray-50 blur-2xl opacity-50 -z-1" />
        
        <header className="w-[95%] lg:w-4/5 mt-3 lg:mt-5 mx-auto px-4 lg:px-7 sticky rounded-xl lg:rounded-2xl border-zinc-500 bg-white/60 shadow-2xl top-3 lg:top-5 flex justify-between items-center backdrop-blur-2xl z-[9999] min-h-[60px] lg:min-h-[70px]">
            <section className="flex items-center">
                <img src={Logo} alt="Logo do doAi!" className="w-8 h-8 lg:w-12 lg:h-12"/> 
                <span className="text-lg lg:text-2xl ml-2">doAi!</span>
            </section>

            <NavBar />
        </header> 
    </>)
}

export default Header