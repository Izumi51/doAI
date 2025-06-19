import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductsContext from '../../products/ProductsContext';
import AuthContext from '../../auth/AuthContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { MapPinIcon } from '@heroicons/react/24/outline';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { getProductById, updateProductState } = useContext(ProductsContext);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (fetchError) {
                console.error('Error fetching product:', fetchError);
                setError('Falha ao carregar produto');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, getProductById]);

    const handleItem = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await updateProductState(id, "PROCESSANDO", userId);
            if (result) {
                setSuccess(true);
                setTimeout(() => navigate('/donations'), 2000);
            }
        } catch (error) {
            console.error('Error updating product state:', error);
            const errorMessage = error.response?.status === 403 
                ? 'Acesso negado. Faça login novamente.' 
                : 'Falha ao adquirir produto';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-dvh">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
                <Footer />
            </>
        );
    }


    if (!product) {
        return (
            <>
                <Header />
                <div className="text-center py-20 h-dvh">
                    <div className="text-gray-500 text-xl">Produto não encontrado!</div>
                    <button 
                        onClick={() => navigate('/donations')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Explore as Doações!
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {success ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        <p>Produto adquirido com sucesso! Redirecionando...</p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                {error}
                            </div>
                        )}
                        
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Product Image */}
                            <div className="h-96 bg-gray-100 flex items-center justify-center overflow-hidden">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23ccc"><rect width="100" height="100"/></svg>';
                                    }}
                                />
                            </div>

                            {/* Product Details */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full capitalize">
                                        {product.condition.toLowerCase()}
                                    </span>
                                </div>

                                {/* Category and Location */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-gray-600">{product.category}</span>
                                    <div className="flex items-center text-gray-600">
                                        <MapPinIcon className="h-5 w-5 mr-1" />
                                        <span>{product.location.location}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                                    <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                                </div>
                                
                                {/* User Information */}
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold mb-2">Informações do Produto</h2>
                                    {product.createdByUserName && (
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Doado por:</span> {product.createdByUserName}
                                        </p>
                                    )}
                                    
                                    {product.processingUserName && (
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">Em processamento por:</span> {product.processingUserName}
                                        </p>
                                    )}
                                    
                                    {!product.createdByUserName && !product.processingUserName && (
                                        <p className="text-sm text-gray-500">Informações do usuário não disponíveis</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <Link
                                        to="/donations"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Voltar para Doações
                                    </Link>
                                    <button
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-md hover:opacity-90"
                                        onClick={handleItem}
                                    >
                                        Quero este item!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}

export default ProductDetails;