export default class Product {
	sku: string;
	name: string;
	description: string;
	quantity: number;
	price: number;
	constructor(
		sku: string,
		name: string,
		description: string,
		quantity: number,
		price: number
	) {
		this.sku = sku;
		this.name = name;
		this.description = description;
		this.quantity = quantity;
		this.price = price;
	}

	hayUnidades(quantity: number) {
		return this.quantity >= quantity;
	}
}
