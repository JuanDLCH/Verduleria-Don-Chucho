import { read } from 'fs';
import Item from './Item';
import Product from './Product';

export default class Cart {
	items: Item[];
	constructor() {
		this.items = [];
	}

	addItem(product: Product, quantity: number) {
		if (quantity <= 0) {
			throw new Error('Quantity must be greater than zero.');
		}
		if (quantity > product.quantity) {
			throw new Error('Not enough units available.');
		}
		const item = this.items.find((item) => item.product.sku === product.sku);
		if (item) {
			item.quantity += quantity;
			item.calculateTotal();
		} else {
			const newItem = new Item(product, quantity);
			newItem.calculateTotal();
			this.items.push(new Item(product, quantity));
		}
		product.quantity -= quantity;
	}

	removeItem(sku: string) {
		const item = this.items.find((item) => item.product.sku === sku);
		if (!item) {
			throw new Error('Item not found.');
		}
		this.items = this.items.filter((item) => item.product.sku !== sku);
		item.product.quantity += item.quantity;
	}

	getTotal() {
		return this.items.reduce((total, item) => total + item.itemTotal, 0);
	}

	showCart() {
		const cartItems = this.items.map((item) => ({
			Name: item.product.name,
			Quantity: item.quantity,
			Total: '$' + item.itemTotal.toFixed(2),
		}));
		console.table(cartItems);

		const totalTable = [{ Total: `$${this.getTotal().toFixed(2)}` }];
		console.table(totalTable);
	}

	async buy() {
		console.log('Gracias por su compra!');
		this.items = [];
	}
}
