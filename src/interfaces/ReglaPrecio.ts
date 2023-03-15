export default interface ReglaPrecio {
	esAplicable(sku: string): boolean;
	calcularPrecio(quantity: number, price: number): number;
}
