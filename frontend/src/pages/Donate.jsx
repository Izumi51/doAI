import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import ProductsContext from '../products/ProductsContext';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { MapPinIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

function Donate() {
    const conditionOptions = [
        { value: 'NOVO', label: 'Novo' },
        { value: 'USADO', label: 'Usado' },
        { value: 'RECONDICIONADO', label: 'Recondicionado' }
    ];

    const categoryOptions = [
        'Eletrônico',
        'Brinquedos',
        'Roupas',
        'Livros',
        'Esportes'
    ];

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        condition: '',
        category: '',
        image: '', // Agora é uma string (URL ou base64)
        location: {
            longitude: 0,
            latitude: 0
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const { createProduct } = useContext(ProductsContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            location: {
                ...prev.location,
                [name]: parseFloat(value) || 0
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        if (!isAuthenticated) {
            setError('Você precisa estar logado para doar um produto');
            return;
        }

        if (!formData.name || !formData.description || !formData.image || !formData.condition || !formData.category) {
            setError('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        try {
            setLoading(true);
            await createProduct(formData); // Envia a string diretamente
            setSuccess(true);
            setTimeout(() => navigate('/donations'), 2000);
        } catch (err) {
            setError(err.message || 'Erro ao criar doação. Tente novamente mais tarde.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center mb-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeftIcon className="size-8 text[#333333] hover:text-[#619afc]" />
                </button>
                <h1 className="text-3xl font-bold text-[#1447e6]">Doar Produto</h1>
            </div>
            
            {success ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p>Doação criada com sucesso! Redirecionando...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Nome do Produto *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    maxLength={100}
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Descrição *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    maxLength={500}
                                />
                                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 caracteres</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Image URL/String */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                    Imagem (URL ou Base64) *
                                </label>
                                <textarea
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    rows="4"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    placeholder="Cole a URL da imagem ou dados em base64"
                                />
                            </div>

                            {/* Condition */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="condition">
                                    Condição *
                                </label>
                                <select
                                    id="condition"
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Selecione a condição</option>
                                    {conditionOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Category */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                    Categoria *
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Selecione a categoria</option>
                                    {categoryOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                            <MapPinIcon className="h-5 w-5 mr-2 text-blue-500" />
                            Localização
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    id="latitude"
                                    name="latitude"
                                    value={formData.location.latitude}
                                    onChange={handleLocationChange}
                                    step="0.000001"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: -23.5505"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    id="longitude"
                                    name="longitude"
                                    value={formData.location.longitude}
                                    onChange={handleLocationChange}
                                    step="0.000001"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: -46.6333"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Você pode obter as coordenadas no Google Maps clicando com o botão direito em um local no mapa
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate('/donations')}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-gradient-to-r from-[#1447e6] to-[#619afc] text-white rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </>
                            ) : (
                                'Publicar Doação'
                            )}
                        </button>
                    </div>
                </form>
            )}
        </main>
        <Footer />
    </>);
}

export default Donate;