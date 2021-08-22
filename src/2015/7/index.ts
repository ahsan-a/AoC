import { fromFileUrl, dirname } from 'https://deno.land/std/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`).split('\n');

function sortObject(obj: { [key: string]: any }) {
	return Object.keys(obj)
		.sort()
		.reduce(function (result: { [index: string]: any }, key) {
			if (!result) result = {};
			result[key] = obj[key];
			return result;
		}, {});
}

function p1() {
	interface Register {
		operator: 'RSHIFT' | 'LSHIFT' | 'NOT' | 'AND' | 'OR' | 'ASSIGN';
		x: string | number;
		y?: string | number;
	}

	let register: { [key: string]: number | Register } = {};

	for (const i of input) {
		const instructions = i.split(' ');

		const target = instructions.pop() as string;

		instructions.pop(); // remove "->"

		const operator = instructions.find((x) => /[A-Z]/.test(x));
		if (operator) instructions.splice(instructions.indexOf(operator), 1);

		const operands = instructions;

		switch (operator) {
			case 'RSHIFT':
				if (!isNaN(Number(operands[0]))) register[target] = parseInt(operands[0]) >> parseInt(operands[1]);
				else
					register[target] = {
						operator,
						x: operands[0],
						y: parseInt(operands[1]),
					};

				break;
			case 'LSHIFT':
				if (!isNaN(Number(operands[0]))) register[target] = parseInt(operands[0]) << parseInt(operands[1]);
				else
					register[target] = {
						operator,
						x: operands[0],
						y: parseInt(operands[1]),
					};
				break;
			case 'NOT':
				register[target] = {
					operator,
					x: operands[0],
				};
				break;
			case 'AND':
				register[target] = {
					operator,
					x: isNaN(Number(operands[0])) ? operands[0] : parseInt(operands[0]),
					y: operands[1],
				};
				break;
			case 'OR':
				register[target] = {
					operator,
					x: operands[0],
					y: operands[1],
				};
				break;
			case undefined:
				if (isNaN(Number(operands[0])))
					register[target] = {
						operator: 'ASSIGN',
						x: operands[0],
					};
				else register[target] = parseInt(operands[0]);

				break;
		}
	}

	register = sortObject(register);

	function evalRegister(code: string) {
		const ins = register[code];
		if (typeof ins === 'number') return;

		if (typeof ins.x !== 'number') evalRegister(ins.x);
		if (ins.y !== undefined && typeof ins.y !== 'number') evalRegister(ins.y);

		switch (ins.operator) {
			case 'RSHIFT':
				register[code] = (register[ins.x] as number) >> (ins.y as number) || 0;
				break;
			case 'LSHIFT':
				register[code] = (register[ins.x] as number) << (ins.y as number) || 0;
				break;
			case 'AND':
				if (!ins.y) return;
				(register[ins.x] as number) & (register[ins.y] as number);
				register[code] = (isNaN(Number(ins.x)) ? (register[ins.x] as number) : (ins.x as number)) & (register[ins.y] as number);
				break;
			case 'OR':
				register[code] = (register[ins.x] as number) | (register[ins.y || 0] as number);
				break;
			case 'NOT':
				register[code] = ~(register[ins.x] as number);
				break;
			case 'ASSIGN':
				register[code] = typeof ins.x === 'string' ? register[ins.x] : ins.x;
				break;
		}
	}

	for (const i in register) evalRegister(i);
	return register.a;
}
// p1();
console.log(p1());
