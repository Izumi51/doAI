import Header from "../components/Header/Header.jsx"
import Footer from "../components/Footer/Footer.jsx"
import ImageAbout from "../assets/image1about.jpg"
import AboutCard from "../components/Cards/AboutCard.jsx"
import MapIcon from "@heroicons/react/24/outline/MapIcon.js"
import HeartIcon from "@heroicons/react/24/outline/HeartIcon.js"
import CartIcon from "@heroicons/react/24/outline/ShoppingCartIcon.js"

function Home() {
    return (<>
        <Header />

        {/* Title */}
        <h1 className="my-8 lg:my-[50px] px-4 lg:pl-[12%] text-2xl lg:text-4xl font-light text-center lg:text-left">Transformando Doações</h1>

        {/* About */}
        <section className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-4 lg:px-[15%] py-8 lg:py-10 flex flex-col lg:flex-row justify-around items-center gap-6 lg:gap-0 shadow-2xl">
            <div className="w-full lg:w-1/2">
                <h3 className="text-white text-xl lg:text-3xl font-light italic mb-4 lg:mb-6 text-center lg:text-left">Nosso projeto tem um propósito:</h3>
                <p className="text-zinc-100 px-2 lg:pl-2 text-base lg:text-lg leading-relaxed font-light text-justify lg:first-letter:text-5xl lg:first-letter:font-light lg:first-letter:float-left lg:first-letter:mr-2 lg:first-letter:leading-none">
                    Transformar o ato de doar. Criamos uma 
                    plataforma unificada para simplificar e otimizar o processo de doações, 
                    conectando quem quer ajudar com quem precisa de forma eficiente e transparente.
                </p>
            </div>
            <img src={ImageAbout} alt="imagem de ilustração" className="w-full max-w-sm lg:max-w-2/5 rounded-[5px] shadow-lg"/>
        </section>

        {/* Cards */}
        <section className="mx-4 lg:mx-[10%] mt-8 lg:mt-15">
            <h1 className="text-zinc-600 text-xl lg:text-3xl font-light italic mb-4 lg:mb-6 text-center lg:text-left">O que nos move?</h1>
            <p className="text-black px-4 lg:px-10 text-base lg:text-lg leading-relaxed font-normal mb-6 text-justify">
                Sabemos que doar faz a diferença, mas muitas vezes, encontrar o lugar certo ou o 
                item necessário pode ser um desafio. Pensando nisso, desenvolvemos um sistema 
                intuitivo que permite a você:
            </p>
            <section className="px-4 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                <AboutCard 
                    title={"Encontrar localidades para doação:"} 
                    content={"Descubra pontos de coleta próximos a você, como abrigos, ONGs e centros comunitários, facilitando a entrega das suas doações."}
                    icon={<MapIcon />}
                    ref={"/"}
                />
                <AboutCard 
                    title={"Visualizar produtos disponíveis para doação:"} 
                    content={"Navegue por uma variedade de itens que outras pessoas estão oferecendo, desde roupas e alimentos até móveis e eletrônicos, e manifeste seu interesse no que for relevante para você ou para uma instituição que você conhece."}
                    icon={<CartIcon />}
                    ref={"/donations"}
                />
                <AboutCard 
                    title={"Doar produtos de forma simples:"} 
                    content={"Anuncie os itens que você deseja doar em poucos cliques. Nosso sistema otimiza o processo para que sua doação chegue rapidamente a quem precisa."}
                    icon={<HeartIcon />}
                    ref={"/donate"}
                />
            </section>
        </section>

        <Footer />  
    </>)
}

export default Home