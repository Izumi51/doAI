import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function NotFound() {
    return (<>
        <Header />
        <main className="h-dvh flex flex-col justify-center items-center">
            <div className="relative drop-shadow-2xl drop-shadow-blue-200">
                <h1 className="text-8xl md:text-9xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1447e6] to-[#619afc] drop-shadow-lg">
                    404
                </h1>                    
                <p className="mt-8 text-2xl md:text-3xl text-center text-gray-700 font-medium">
                    Página não encontrada.
                </p>
            </div>
        </main>
        <Footer />
    </>);
}

export default NotFound;