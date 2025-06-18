import MapPin from '@heroicons/react/24/outline/MapPinIcon.js'
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, onClick }) {
    const navigate = useNavigate();

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    return (<>
        <section 
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full transform hover:scale-[1.02]"
            onClick={onClick}
        >
            {/* Header */}
            <header className="h-40 lg:h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23ccc"><rect width="100" height="100"/></svg>';
                    }}
                />
            </header>

            {/* Body */}
            <section className="p-4 lg:p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 line-clamp-2 flex-grow">{product.name}</h3>
                    <span className="bg-[#1447e6]/10 text-[#1447e6] text-xs px-2 py-1 rounded-full capitalize flex-shrink-0">
                        {product.condition.toLowerCase()}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2 flex-grow text-sm lg:text-base">{product.description}</p>

                <div className="flex justify-between items-center mb-4">
                    {/* Category */}
                    <span className="inline-flex items-center text-gray-500 text-xs lg:text-sm">
                        <span className="mr-1 truncate">{product.category}</span>
                    </span>

                    {/* Location */}
                    <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-[#333333] hover:text-[#619afc] transition-colors"/>
                    </div>
                </div>

                {/* Action button */}
                <button 
                    className="mt-auto w-full bg-gradient-to-r from-[#1447e6] to-[#619afc] text-white py-2 lg:py-3 rounded-lg hover:opacity-90 transition-all text-sm lg:text-base font-medium"
                    onClick={() => handleProductClick(product.idProduct)}
                >
                    Quero este item
                </button>
            </section>
        </section>
    </>);
}

export default ProductCard;