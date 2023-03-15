import { ReglaPrecioEA, ReglaPrecioSP, ReglaPrecioWE } from './ReglasPrecio';
import ReglaPrecio from 'interfaces/ReglaPrecio';

export default class RulesController {
	private reglas: ReglaPrecio[] = [];

	constructor() {
		this.reglas.push(new ReglaPrecioEA());
		this.reglas.push(new ReglaPrecioSP());
		this.reglas.push(new ReglaPrecioWE());
	}

	public getRules(): ReglaPrecio[] {
		return this.reglas;
	}

	public getRule(sku: string): ReglaPrecio | undefined {
		return this.reglas.find((regla) => regla.esAplicable(sku));
	}
}
