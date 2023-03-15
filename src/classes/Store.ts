const fs = require('fs');
import Product from './Product';

export default class Store {
	products: Product[];
	constructor() {
		this.products = [];
		this.loadProducts();
	}

	async loadProducts() {
		try {
			const data = fs.readFileSync('products.txt', 'utf8');
			const lineas = data.split('\n');

			lineas.forEach((linea: string) => {
				const campos = linea.trim().split(',');
				console.log(campos);

				this.products.push(
					new Product(
						campos[0],
						campos[1],
						campos[2],
						parseInt(campos[3]),
						parseFloat(campos[4])
					)
				);
			});

			console.log(
				`Se cargaron ${this.products.length} productos desde el archivo.`
			);
		} catch (err: any) {
			console.error(`Error al cargar los productos: ${err.message}`);
		}
	}

	getProducts() {
		return this.products;
	}

	getProduct(sku: string) {
		return this.products.find((product) => product.sku === sku);
	}

	checkAvailability(product: Product, quantity: number) {
		return product.quantity >= quantity;
	}

	accumulateSale(value: number) {
		// Acumular valor de venta en la tienda
	}
}
