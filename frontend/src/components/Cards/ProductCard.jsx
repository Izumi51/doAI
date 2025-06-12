// { id: 6, category: "brinquedos", name: "Quebra-Cabeça", description: "Quebra-cabeça 500 peças", location: "Salvador, BA" },

//sketch
function ProductCard({ product }) {
    return(<>
        <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {/* Header */}
            <div className="h-48 bg-gradient-to-r from-[#1447e6]/20 to-[#619afc]/10 flex items-center justify-center">
                <span className="text-5xl text-[#1447e6] opacity-30">
                    {product.category === "eletrônicos" ? "📱" : 
                        product.category === "roupas" ? "👕" : "🧸"}
                </span>
            </div>

            {/* Body */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <span className="bg-[#1447e6]/10 text-[#1447e6] text-xs px-2 py-1 rounded-full">
                        {product.category}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4">{product.description}</p>

                {/* Location */}
                <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {product.location}
                </div>

                {/* Action button */}
                <button className="mt-4 w-full bg-gradient-to-r from-[#1447e6] to-[#619afc] text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Quero este item
                </button>
            </div>
        </div>
    </>)
}

export default ProductCard;