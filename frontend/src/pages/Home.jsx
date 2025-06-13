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

        {/* Tittle */}
        <h1 className="my-[50px] pl-[12%] text-4xl font-light">Transformando Doações</h1>

        {/* About */}
        <section className=" bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-[15%] py-10 flex justify-around shadow-2xl">
            <div className="w-1/2">
                <h3 className="text-white text-3xl font-light italic mb-6">Nosso projeto tem um propósito:</h3>
                <p className="text-zinc-100 pl-2 text-lg leading-relaxed font-light first-letter:text-5xl first-letter:font-light first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                    Transformar o ato de doar. Criamos uma 
                    plataforma unificada para simplificar e otimizar o processo de doações, 
                    conectando quem quer ajudar com quem precisa de forma eficiente e transparente.
                </p>
            </div>
            <img src={ImageAbout} alt="imagem de ilustração" className="max-w-2/5 rounded-[5px] shadow-lg"/>
        </section>  

        {/* Cards */}
        <section className="mx-[10%] mt-15">
            <h1 className="text-zinc-600 text-3xl font-light italic mb-6">O que nos move?</h1>
            <p className="text-black px-10 text-lg leading-relaxed font-normal mb-6">
                Sabemos que doar faz a diferença, mas muitas vezes, encontrar o lugar certo ou o 
                item necessário pode ser um desafio. Pensando nisso, desenvolvemos um sistema 
                intuitivo que permite a você:
            </p>
            <section className="px-10 grid grid-1 md:grid-cols-3 gap-10">
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