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

    const createProduct = async (productData, userId) => {
        
        if (!isAuthenticated) {
            throw new Error('Authentication required to create a product');
        }

        try {
            const url = userId ? `/products?userId=${userId}` : '/products';
            const response = await api.post(url, productData);
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

    const updateProductState = async (id, state, userId) => {
        if (!isAuthenticated) {
            throw new Error('Authentication required to update product state');
        }

        try {
            const url = userId ? `/products/${id}/state?userId=${userId}` : `/products/${id}/state`;
            const response = await api.put(url, { state });
            return response.data;
        } catch(error) {
            throw error;
        }
    };

    const getProductsCreatedByUser = async (userId) => {
        if (!isAuthenticated) {
            throw new Error('Authentication required to get user products');
        }

        try {
            const response = await api.get(`/products/created-by/${userId}`);
            return response.data;
        } catch(error) {
            throw error;
        }
    };

    const getProductsByProcessingUser = async (userId) => {
        if (!isAuthenticated) {
            throw new Error('Authentication required to get processing products');
        }

        try {
            const response = await api.get(`/products/processing-by/${userId}`);
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
            getProductsCreatedByUser,
            getProductsByProcessingUser,
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