import React, { useState, useEffect, useContext } from 'react';
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import FilterButton from "../components/Buttons/FilterButton.jsx";
import ProductCard from "../components/Cards/ProductCard.jsx";
import ProductContext from '../products/ProductsContext.jsx';
import AuthContext from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Donations() {
    const [activeFilter, setActiveFilter] = useState("todos");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useContext(AuthContext);
    const { getAllProducts } = useContext(ProductContext);
    const navigate = useNavigate();

    const categories = ["todos", ...new Set(
        products.map(product => product.category.toLowerCase())
    )].filter(cat => cat);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                if (data && Array.isArray(data)) {
                    setProducts(data);
                    setFilteredProducts(data);
                } else {
                    setError('Nenhum produto encontradoo!');
                    setProducts([]);
                    setFilteredProducts([]);
                }
            } catch (err) {
                setError('Erro ao carregar os produtos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
        
        if(filterName === "todos") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter(p => 
                    p.category.toLowerCase() === filterName.toLowerCase()
                )
            );
        }
    };

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="text-center py-20 h-dvh flex items-center justify-center flex-col">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando produtos...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="text-center py-20 h-dvh flex items-center justify-center flex-col">
                    <div className="text-red-500 text-xl font-medium">{error}</div>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Tentar novamente
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="px-4 lg:px-8 py-6 lg:py-8 max-w-[95%] lg:max-w-[80%] mx-auto">
                {/* Title */}
                <h1 className="text-2xl lg:text-4xl font-bold text-[#1447e6] mt-4 lg:mt-8 mb-2 text-center lg:text-left">Doações Disponíveis</h1>
                
                {/* Text */}
                <p className="text-gray-700 lg:ml-5 mb-6 lg:mb-10 text-center lg:text-left">Veja os produtos que estão sendo doados!</p>

                {/* Filters */}
                <section className="flex justify-center lg:justify-start gap-3 lg:gap-4 mb-6 lg:mb-8 flex-wrap">
                    {categories.map(category => (
                        <FilterButton 
                            key={category}
                            onClick={() => handleFilterClick(category)}
                            name={
                                category === "todos" 
                                    ? "Todos" 
                                    : category.charAt(0).toUpperCase() + category.slice(1)
                            }
                            active={activeFilter === category}
                        />
                    ))}
                </section>

                {/* Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard 
                            key={product.idProduct}
                            product={product}
                            onClick={() => handleProductClick(product.idProduct)}
                        />
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