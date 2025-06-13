import MapPin from '@heroicons/react/24/outline/MapPinIcon.js'

function ProductCard({ product, onClick }) {
    return (<>
        <section 
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer flex flex-col h-full"
            //tirar depois
            onClick={onClick}
        >
            {/* Header */}
            <header className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23ccc"><rect width="100" height="100"/></svg>';
                    }}
                />
            </header>

            {/* Body */}
            <section className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <span className="bg-[#1447e6]/10 text-[#1447e6] text-xs px-2 py-1 rounded-full capitalize">
                        {product.condition.toLowerCase()}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{product.description}</p>

                <div className="flex justify-between items-center">
                    {/* Category */}
                    <span className="inline-flex items-center text-gray-500 text-sm">
                        <span className="mr-1">{product.category}</span>
                    </span>

                    {/* Location */}
                    <div className="flex items-center text-gray-500 text-sm">
                        {/* AQUI VAI TER O LINK DO MAPS */}
                        <MapPin className="size-8 text[#333333] hover:text-[#619afc]"/>
                    </div>
                </div>

                {/* Action button */}
                <button 
                    className="mt-4 w-full bg-gradient-to-r from-[#1447e6] to-[#619afc] text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
                    onClick={(e) => {
                    e.stopPropagation();
                        console.log('Item selecionado:', product.idProduct);
                    }}
                >
                    Quero este item
                </button>
            </section>
        </section>
    </>);
}

export default ProductCard;