import Store from './classes/Store';
import Cart from './classes/Cart';
import { read } from 'fs';

class App {
	store: Store;
	cart: Cart;
	constructor() {
		this.store = new Store();
		this.cart = new Cart();
	}

	run() {
		console.log('Bienvenido a la tienda virtual');

		const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		const menu = () => {
			console.log('\nSeleccione una opción:');
			console.log('1. Ver los productos de la tienda');
			console.log('2. Agregar un producto al carrito');
			console.log('3. Eliminar un producto del carrito');
			console.log('4. Comprar los productos del carrito');
			console.log('5. Salir\n');
			readline.question('Opción seleccionada: ', async (option: string) => {
				switch (option) {
					case '1':
						// Código para ver los productos de la tienda
						// headers
						let products = this.store.getProducts();

						// fixed(2) products price
						console.table(
							products.map((product) => ({
								...product,
								price: '$' + product.price.toFixed(2),
							}))
						);

						readline.question('Presione enter para continuar', () => {
							menu();
						});
						break;
					case '2':
						// Código para agregar un producto al carrito

						// Pedir el SKU del producto y almacenarlo en una variable
						await readline.question(
							'Ingrese el SKU del producto: ',
							async (sku: string) => {
								// Buscar el producto en la tienda
								const product = this.store.getProduct(sku);

								// Si el producto existe, pedir la cantidad y agregarlo al carrito
								if (product) {
									await readline.question(
										'Ingrese la cantidad: ',
										(quantity: string) => {
											try {
												this.cart.addItem(product, parseInt(quantity));
											} catch (err: any) {
												console.log(err.message);
											}
											this.cart.showCart();
											readline.question('Presione enter para continuar', () => {
												menu();
											});
										}
									);
								} else {
									console.log('El producto no existe');
									readline.question('Presione enter para continuar', () => {
										menu();
									});
								}
							}
						);
						break;
					case '3':
						// Código para eliminar un producto del carrito
						await readline.question(
							'Ingrese el SKU del producto: ',
							async (sku: string) => {
								// Buscar el producto en el carrito
								try {
									this.cart.removeItem(sku);
									this.cart.showCart();
								} catch (err: any) {
									console.log(err.message);
								}
								readline.question('Presione enter para continuar', () => {
									menu();
								});
							}
						);
						break;
					case '4':
						// Código para comprar los productos del carrito
						if (this.cart.items.length > 0) {
							this.cart.showCart();
							readline.question(
								'Desea confirmar la compra? (S/N): ',
								(answer: string) => {
									if (answer.toUpperCase() === 'S') {
										this.cart.buy();
									} else {
										console.log('La compra fue cancelada, sapo');
									}
									readline.question('Presione enter para continuar', () => {
										menu();
									});
								}
							);
						} else {
							console.log('El carrito esta vacio');
							readline.question('Presione enter para continuar', () => {
								menu();
							});
						}
						break;
					case '5':
						console.log('Hasta luego, No vuelva!');
						readline.close();
						break;
					default:
						console.log('Opción no válida, intente de nuevo');
						menu();
				}
			});
		};

		menu();
	}
}

const app = new App();
app.run();
