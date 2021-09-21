import { fromFileUrl, dirname } from 'https://deno.land/std@0.105.0/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`).split('\n') as string[];

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
						throw new Error("this shouldn't happen");
				}
			}
		})();

		if (!reg[a]) reg[a] = {};

		reg[a][b] = units;
	}

	return reg;
}
console.log(p1());

function p2() {}
