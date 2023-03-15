import ReglaPrecio from '../interfaces/ReglaPrecio';

export class ReglaPrecioEA implements ReglaPrecio {
	esAplicable(sku: string) {
		return sku.startsWith('EA');
	}
	calcularPrecio(quantity: number, price: number) {
		return price * quantity;
	}
}

export class ReglaPrecioWE implements ReglaPrecio {
	esAplicable(sku: string) {
		return sku.startsWith('WE');
	}
	calcularPrecio(quantity: number, price: number) {
		const grams = quantity * 1000;
		const pricePerKilo = price / 1000;
		return pricePerKilo * grams;
	}
}

export class ReglaPrecioSP implements ReglaPrecio {
	esAplicable(sku: string) {
		return sku.startsWith('SP');
	}
	calcularPrecio(quantity: number, price: number) {
		const fullPrice = price * quantity;
		const discountUnits = Math.floor(quantity / 3);
		if (discountUnits > 2.5) {
			return fullPrice / 2;
		} else {
			const maxDiscountUnits = Math.floor(quantity / 3);
			const discount = Math.min(discountUnits * 0.2, maxDiscountUnits * 0.5);
			return fullPrice * (1 - discount);
		}
	}
}
