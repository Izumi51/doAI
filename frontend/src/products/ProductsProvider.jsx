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
            console.error('Error fetching products:', error);
            throw error;
        }
    };

    const getProductById = async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch(error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    };

    const createProduct = async (productData) => {
        console.log('CreateProduct called - isAuthenticated:', isAuthenticated);
        
        if (!isAuthenticated) {
            console.error('Authentication check failed in createProduct');
            throw new Error('Authentication required to create a product');
        }

        try {
            console.log('Making API call to create product:', productData);
            const response = await api.post('/products', productData);
            console.log('Product created successfully:', response.data);
            return response.data;
        } catch(error) {
            console.error('Error creating product:', error);
            console.error('Error response:', error.response);
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
            console.error('Error updating product:', error);
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
            console.error('Error deleting product:', error);
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
            deleteProduct
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;