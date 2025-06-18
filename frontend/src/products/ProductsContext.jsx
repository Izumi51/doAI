import { createContext } from 'react';

const ProductsContext = createContext({
    getAllProducts: () => {},
    getProductById: () => {},
    createProduct: () => {},
    updateProduct: () => {},
    updateProductState: () => {},
    deleteProduct: () => {},
});

export default ProductsContext;