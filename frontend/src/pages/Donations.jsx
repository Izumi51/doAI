import { useState, useEffect } from "react";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import FilterButton from "../components/Buttons/FilterButton.jsx";
import ProductCard from "../components/Cards/ProductCard.jsx";

// temp data
const allProducts = [
    { id: 1, category: "eletronic", name: "Fone de ouvido", description: "Fone Bluetooth com cancelamento de ruído", location: "São Paulo, SP" },
    { id: 2, category: "clothing", name: "Camisa Social", description: "Camisa social masculina tamanho M", location: "Rio de Janeiro, RJ" },
    { id: 3, category: "toys", name: "Carrinho de Controle", description: "Carrinho de controle remoto para crianças", location: "Belo Horizonte, MG" },
    { id: 4, category: "eletronic", name: "Smartphone", description: "Smartphone usado em bom estado", location: "Curitiba, PR" },
    { id: 5, category: "clothing", name: "Calça Jeans", description: "Calça jeans feminina tamanho 38", location: "Porto Alegre, RS" },
    { id: 6, category: "toys", name: "Quebra-Cabeça", description: "Quebra-cabeça 500 peças", location: "Salvador, BA" },
];

function Donations() {
    const [activeFilter, setActiveFilter] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    useEffect(() => {
        setFilteredProducts(allProducts);
    }, []);

    const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
        
        if(filterName === "todos") {
            setFilteredProducts(allProducts);
        }else {
            setFilteredProducts(allProducts.filter(p => p.category === filterName));
        }
    };

    const categories = ["todos", ...new Set(allProducts.map(product => product.category))];

    return (
        <>
            <Header />
            <main className="px-4 py-8 max-w-[80%] mx-auto">
                
                {/* Title */}
                <h1 className="text-4xl font-bold text-[#1447e6] mt-8 mb-2">Doações Disponíveis</h1>
                
                {/* Text */}
                <p className="text-gray-700 ml-5 mb-10">Veja os produtos que estão sendo doados!</p>

                {/* Filters */}
                <section className="flex justify-start gap-4 mb-8 flex-wrap">
                    {categories.map(category => (
                        <FilterButton 
                            key={category}
                            onClick={() => handleFilterClick(category)}
                            name={category === "todos" ? "Todos" : category.charAt(0).toUpperCase() + category.slice(1)}
                            active={activeFilter === category}
                        />
                    ))}
                </section>

                {/* Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}

                    {filteredProducts.length === 0 && (
                        <section className="col-span-full text-center py-12">
                            <h3 className="text-xl font-medium text-gray-700">Nenhum item encontrado nesta categoria</h3>
                            <p className="text-gray-500 mt-2">Tente selecionar outra categoria ou volte mais tarde</p>
                        </section>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Donations;