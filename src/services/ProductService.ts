export type Product = {
    id: number;
    name: string;
    price: number;
};

const apiUrl = process.env.REACT_APP_API_LAMBDA_URL;

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${apiUrl}/api/products`);
    if (!response.ok) {
        throw new Error("Error al obtener productos");
    }
    return await response.json();
}

export async function fetchProductById(id: number): Promise<Product> {
    const response = await fetch(`${apiUrl}/api/products/${id}`);
    if (!response.ok) {
        throw new Error("Error al obtener el producto");
    }
    return await response.json();
}