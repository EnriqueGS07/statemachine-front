export type Product = {
    id: number;
    name: string;
    price: number;
};

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch("http://localhost:8000/api/products");
    if (!response.ok) {
        throw new Error("Error al obtener productos");
    }
    return await response.json();
}

export async function fetchProductById(id: number): Promise<Product> {
    const response = await fetch(`http://localhost:8000/api/products/${id}`);
    if (!response.ok) {
        throw new Error("Error al obtener el producto");
    }
    return await response.json();
}