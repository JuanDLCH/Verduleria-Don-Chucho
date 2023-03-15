import Product from './Product';
import RulesController from './RulesController';

export default class Item {
	product: Product;
	quantity: number;
	itemTotal: number;
	controller = new RulesController();
	constructor(product: Product, quantity: number) {
		this.product = product;
		this.quantity = quantity;
		this.itemTotal = 0;
		this.calculateTotal();
	}

	getQuantity() {
		return this.quantity;
	}

	setQuantity(quantity: number) {
		this.quantity = quantity;
		this.calculateTotal();
	}

	calculateTotal() {
		const { sku, price } = this.product;
		const { quantity } = this;
		const Rule = this.controller.getRule(sku);

		if (Rule) {
			this.itemTotal = Rule.calcularPrecio(quantity, price);
		} else {
			this.itemTotal = price * quantity;
		}
	}
}
