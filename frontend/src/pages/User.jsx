import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ProductCard from "../components/Cards/ProductCard.jsx";
import ProductContext from '../products/ProductsContext.jsx';
import AuthContext from '../auth/AuthContext';
import { 
    PlusIcon, 
    HeartIcon, 
    GiftIcon,
    UserIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ExclamationTriangleIcon,
    ClockIcon
} from "@heroicons/react/24/outline";

function User() {
    const [activeTab, setActiveTab] = useState("created");
    const [userProducts, setUserProducts] = useState([]);
    const [processingProducts, setProcessingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const productsPerPage = 8;
    
    const { isAuthenticated, userName, userId } = useContext(AuthContext);
    const { getProductsCreatedByUser, getProductsByProcessingUser } = useContext(ProductContext);
    const navigate = useNavigate();

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const fetchUserProducts = async () => {
            if (!isAuthenticated || !userId) return;
            
            try {
                setLoading(true);
                setError(null);
                
                console.log('Fetching products for userId:', userId);
                
                // Use the new specialized functions
                const [createdProducts, processingProducts] = await Promise.all([
                    getProductsCreatedByUser(userId),
                    getProductsByProcessingUser(userId)
                ]);
                
                console.log('Created products:', createdProducts);
                console.log('Processing products:', processingProducts);
                
                setUserProducts(Array.isArray(createdProducts) ? createdProducts : []);
                setProcessingProducts(Array.isArray(processingProducts) ? processingProducts : []);
                
            } catch (err) {
                console.error('Error fetching user products:', err);
                setError('Erro ao carregar seus produtos');
                setUserProducts([]);
                setProcessingProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProducts();
    }, [isAuthenticated, userId, getProductsCreatedByUser, getProductsByProcessingUser]);

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    const handleCreateProduct = () => {
        navigate('/donate');
    };

    const memoizedCreatedProducts = useMemo(() => 
        userProducts.slice(
            (page - 1) * productsPerPage,
            page * productsPerPage
        ), 
        [userProducts, page]
    );

    const handleRetry = () => {
        setError(null);
        setLoading(true);
        // Re-trigger the useEffect by updating a dependency
        window.location.reload();
    };

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }  

    if (error) {
        return (
            <>
                <Header />
                <div className="text-center py-16">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-500 text-lg mb-4">{error}</p>
                    <button 
                        onClick={handleRetry}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg mx-auto"
                    >
                        <ArrowPathIcon className="h-5 w-5" />
                        Tentar novamente
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="px-4 lg:px-8 py-6 lg:py-8 max-w-[95%] lg:max-w-[80%] mx-auto">
                {/* User Profile Header */}
                <section className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-xl p-6 lg:p-8 mb-8 text-white">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <UserIcon className="h-12 w-12" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">
                                Olá, {userName}!
                            </h1>
                            <p className="text-blue-100 text-sm lg:text-base">
                                Gerencie suas doações e processamentos
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tabs */}
                <section className="flex flex-col sm:flex-row gap-2 lg:gap-4 mb-6 lg:mb-8">
                    <button
                        onClick={() => setActiveTab("created")}
                        className={`flex items-center justify-center gap-2 px-4 lg:px-6 py-3 rounded-lg font-medium transition-all ${
                            activeTab === "created"
                                ? "bg-blue-700 text-white shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        aria-label="Meus produtos doados"
                    >
                        <GiftIcon className="h-5 w-5" />
                        Minhas Doações ({userProducts.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("processing")}
                        className={`flex items-center justify-center gap-2 px-4 lg:px-6 py-3 rounded-lg font-medium transition-all ${
                            activeTab === "processing"
                                ? "bg-blue-700 text-white shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        aria-label="Produtos em processamento"
                    >
                        <ClockIcon className="h-5 w-5" />
                        Em Processamento ({processingProducts.length})
                    </button>
                </section>

                {/* Created Products Tab */}
                {activeTab === "created" && (
                    <section>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div>
                                <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Suas Doações</h2>
                                <p className="text-gray-600 text-sm lg:text-base">Produtos que você está doando para a comunidade</p>
                            </div>
                            <button
                                onClick={handleCreateProduct}
                                className="flex items-center gap-2 bg-gradient-to-r from-[#1447e6] to-[#619afc] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm lg:text-base"
                                aria-label="Doar novo item"
                            >
                                <PlusIcon className="h-5 w-5" />
                                Nova Doação
                            </button>
                        </div>
                        
                        {userProducts.length === 0 ? (
                            <div className="text-center py-16 bg-gray-50 rounded-xl">
                                <GiftIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhuma doação cadastrada</h3>
                                <p className="text-gray-500 mb-6">Compartilhe itens que você não usa mais e ajude outras pessoas</p>
                                <button
                                    onClick={handleCreateProduct}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1447e6] to-[#619afc] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                    Fazer Primeira Doação
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                                    {memoizedCreatedProducts.map((product) => (
                                        <ProductCard 
                                            key={product.idProduct}
                                            product={product}
                                            onClick={() => handleProductClick(product.idProduct)}
                                        />
                                    ))}
                                </div>
                                {userProducts.length > productsPerPage && (
                                    <div className="flex justify-center mt-8 gap-2">
                                        {Array.from({ length: Math.ceil(userProducts.length / productsPerPage) }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`w-10 h-10 rounded-full ${
                                                    page === i + 1 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                )}

                {/* Processing Products Tab */}
                {activeTab === "processing" && (
                    <section>
                        <div className="mb-6">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Produtos em Processamento</h2>
                            <p className="text-gray-600 text-sm lg:text-base">Produtos que você está processando para outros usuários</p>
                        </div>
                        
                        {processingProducts.length === 0 ? (
                            <div className="text-center py-16 bg-gray-50 rounded-xl">
                                <ClockIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum produto em processamento</h3>
                                <p className="text-gray-500 mb-6">Quando você aceitar processar doações de outros usuários, elas aparecerão aqui</p>
                                <button
                                    onClick={() => navigate('/donations')}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1447e6] to-[#619afc] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all"
                                >
                                    <HeartIcon className="h-5 w-5" />
                                    Explorar Doações
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                                {processingProducts.map((product) => (
                                    <ProductCard 
                                        key={product.idProduct}
                                        product={product}
                                        onClick={() => handleProductClick(product.idProduct)}
                                        showProcessingBadge={true}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}

export default User;