import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/productAPI';
import AuthContext from '../auth/AuthContext';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function Donate() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        condition: 'NOVO',
        category: 'Eletrônico',
        image: '',
        location: {
            longitude: 0,
            latitude: 0
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    // ... implementar handleChange e handleSubmit similares ao ProductForm
    // ... incluir validação do formulário

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Doar Produto</h1>
                {/* Formulário de doação */}
            </main>
            <Footer />
        </>
    );
}

export default Donate;