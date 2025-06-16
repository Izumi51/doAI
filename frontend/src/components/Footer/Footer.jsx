import { Link } from 'react-router-dom';
import { FaHeart, FaHandHoldingHeart, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#333333] text-[#f8f9fa] py-6 lg:py-8 px-4 mt-8 lg:mt-12">
        <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Sobre */}
            <section className="space-y-4 mb-6 lg:mb-0">
                <h3 className="text-lg lg:text-xl font-bold flex items-center gap-2">
                    <FaHandHoldingHeart className="text-[#619afc]" /> doAi! 
                </h3>
                <p className="text-gray-300 text-sm lg:text-base">
                    Conectando quem quer ajudar com quem precisa de forma eficiente e transparente.
                </p>
                <section className="flex gap-4">
                    <a href="#" className="text-[#f8f9fa] hover:text-[#619afc] transition">
                        <FaFacebook size={20} />
                    </a>
                    <a href="#" className="text-[#f8f9fa] hover:text-[#619afc] transition">
                        <FaInstagram size={20} />
                    </a>
                    <a href="#" className="text-[#f8f9fa] hover:text-[#619afc] transition">
                        <FaTwitter size={20} />
                    </a>
                </section>
            </section>

            {/* Links Rápidos */}
            <section className="mb-6 lg:mb-0">
                <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
                <ul className="space-y-2 text-sm lg:text-base">
                    <li>
                        <Link to="/" className="text-gray-300 hover:text-[#619afc] transition">Home</Link>
                    </li>
                    <li>
                        <Link to="/donations" className="text-gray-300 hover:text-[#619afc] transition">Doações</Link>
                    </li>
                    <li>
                        <Link to="/donate" className="text-gray-300 hover:text-[#619afc] transition">Doar Agora</Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-gray-300 hover:text-[#619afc] transition">Login</Link>
                    </li>
                </ul>
            </section>

            {/* Contato */}
            <section className="mb-6 lg:mb-0">
                <h4 className="text-lg font-semibold mb-4">Contato</h4>
                <ul className="space-y-2 text-sm lg:text-base">
                    <li className="flex items-center gap-2 text-gray-300">
                        <FaEnvelope className="flex-shrink-0" /> 
                        <span className="break-all">doAi@gmail.com</span>
                    </li>
                    <li className="text-gray-300">
                        Seg-Sex: 9:00 - 18:00
                    </li>
                </ul>
            </section>
        </section>

        <section className="max-w-6xl mx-auto border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p className="flex items-center justify-center gap-1">
                Feito com <FaHeart className="text-red-500" /> por doAi! © {new Date().getFullYear()}
            </p>
        </section>
    </footer>
  );
};

export default Footer;