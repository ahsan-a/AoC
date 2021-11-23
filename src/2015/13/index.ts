import { fromFileUrl, dirname } from 'https://deno.land/std@0.105.0/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`).split('\n') as string[];

function randomise<T>(a: T[]): T[] {
	let b, d;
	let c = a.length;
	while (c) (b = (Math.random() * (--c + 1)) | 0), (d = a[c]), (a[c] = a[b]), (a[b] = d);
	return a;
}

function p1() {
	const reg: {
		[key: string]: {
			[key: string]: number;
		};
	} = {};

	for (const l of input) {
		const line = l.split(' ');

		const [a, b] = [line[0], line.at(-1)?.replace('.', '')];
		if (!b) throw new Error('ljksdfsdjfkl');

		const units = (function () {
			{
				switch (line[2]) {
					case 'gain':
						return parseInt(line[3]);
					case 'lose':
						return parseInt(line[3]) * -1;
					default:
						throw new Error('fuck you typescript');
				}
			}
		})();

		if (!reg[a]) reg[a] = {};
		reg[a][b] = units;
	}

	let best = 0;

	const x = Object.keys(reg);
	for (let i = 0; i < 99999; i++) {
		const arr = randomise(x);
		let change = 0;

		for (let j = 0; j < arr.length; j++) {
			// @ts-ignore jesus christ
			const partners: string[] = [arr.at(j - 1), arr.at((j + 1) % arr.length)];

			change += reg[arr[j]][partners[0]] + reg[arr[j]][partners[1]];
		}

		if (change > best) best = change;
	}

	return best;
}

function p2() {
	const reg: {
		[key: string]: {
			[key: string]: number;
		};
	} = {};

	for (const l of input) {
		const line = l.split(' ');

		const [a, b] = [line[0], line.at(-1)?.replace('.', '')];
		if (!b) throw new Error('ljksdfsdjfkl');

		const units = (function () {
			{
				switch (line[2]) {
					case 'gain':
						return parseInt(line[3]);
					case 'lose':
						return parseInt(line[3]) * -1;
					default:
						throw new Error('fuck you typescript');
				}
			}
		})();

		if (!reg[a]) reg[a] = {};
		reg[a][b] = units;
	}

	let best = 0;

	const x = Object.keys(reg);

	reg['me'] = {};
	for (const i of x) {
		reg['me'][i] = 0;
		reg[i]['me'] = 0;
	}

	x.push('me');

	for (let i = 0; i < 99999; i++) {
		const arr = randomise(x);
		let change = 0;

		for (let j = 0; j < arr.length; j++) {
			// @ts-ignore jesus christ
			const partners: string[] = [arr.at(j - 1), arr.at((j + 1) % arr.length)];
			change += reg[arr[j]][partners[0]] + reg[arr[j]][partners[1]];
		}

		if (change > best) best = change;
	}

	return best;
}

console.log(p2());
