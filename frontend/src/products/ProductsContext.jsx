import { createContext } from 'react';

const ProductsContext = createContext({
    getAllProducts: () => {},
    getProductById: () => {},
    createProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {},
});

export default ProductsContext;