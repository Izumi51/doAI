import React, { useState, useContext } from 'react';
import ProductsContext from './ProductsContext';
import api from '../api/axios';
import AuthContext from '../auth/AuthContext';

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    const getAllProducts = async () => {
        try {
            const  response = await api.get('/products');
            setProducts(response.data);
            return response.data;
        } catch(error) {
            throw error;
        }
    };

    const getProductById = async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch(error) {
            throw error;
        }
    };

    const createProduct = async (productData) => {
        
        if (!isAuthenticated) {
            throw new Error('Authentication required to create a product');
        }

        try {
            const response = await api.post('/products', productData);
            return response.data;
        } catch(error) {
            throw error;
        }
    };

    const updateProduct = async (id, productData) => {
        if (!isAuthenticated) {
            throw new Error('Authentication required to update a product');
        }

        try {
            const response = await api.put(`/products/${id}`, productData);
            return response.data;
        } catch(error) {
            throw error;
        }
    };

    const updateProductState = async (id, state) => {
        if (!isAuthenticated) {
            throw new Error('Authentication required to update product state');
        }

        try {
            const response = await api.put(`/products/${id}/state`, { state });
            return response.data;
        } catch(error) {
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        if (!isAuthenticated) {
            throw new Error('Authentication required to delete a product');
        }

        try {
            await api.delete(`/products/${id}`);
        } catch(error) {
            throw error;
        }
    };

    return (
        <ProductsContext.Provider value={{
            products,
            getAllProducts,
            getProductById,
            createProduct,
            updateProduct,
            updateProductState,
            deleteProduct
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;