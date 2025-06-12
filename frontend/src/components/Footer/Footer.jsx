import { Link } from 'react-router-dom';
import { FaHeart, FaHandHoldingHeart, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#333333] text-[#f8f9fa] py-8 px-4 mt-12">
        <section className="max-w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-auto">

            {/* Sobre */}
            <section className="space-y-4 mb-10 md:mb-0">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <FaHandHoldingHeart className="text-[#619afc]" /> doAi! 
                </h3>
                <p className="text-gray-300 pr-10">
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
            <section className="mb-10 md:mb-0">
                <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
                <ul className="space-y-2">
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
            <section className="mb-10 md:mb-0">
                <h4 className="text-lg font-semibold mb-4">Contato</h4>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-300">
                        <FaEnvelope /> doAi@gmail.com
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