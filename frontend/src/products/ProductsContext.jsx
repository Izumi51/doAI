import { createContext } from 'react';

const ProductsContext = createContext({
    products: [],
    getAllProducts: () => {},
    getProductById: () => {},
    getProductsCreatedByUser: () => {},
    getProductsByProcessingUser: () => {},
    createProduct: () => {},
    updateProduct: () => {},
    updateProductState: () => {},
    deleteProduct: () => {},
});

export default ProductsContext;
