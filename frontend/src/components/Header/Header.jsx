import Logo from '../../assets/doAi-removebg-preview.png'
import NavBar from '../NavBar/NavBar.jsx'

function Header() {
    return (
        <header className="flex justify-around border-b-1 border-zinc-700">
            <section className="flex items-center-safe">
                <img src={Logo} alt="Logo do doAi!" className="size-20"/> 
                <span className="text-2xl">doAi!</span>
            </section>

            <NavBar />
        </header>
    )
}

export default Header