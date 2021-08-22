import { fromFileUrl, dirname } from 'https://deno.land/std/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`).split('\n');

function p1() {
	let lights: boolean[][] = [];

	let lit = 0;

	for (const ins of input) {
		const [x1, x2]: number[] = ins.match(/\d\d?\d?,/g)?.map((x: string | number) => (x = parseInt((x as string).replace(/,/g, '')))) as number[];
		const [y1, y2] = ins.match(/,\d\d?\d?/g)?.map((x: string | number) => (x = parseInt((x as string).replace(/,/g, '')))) as number[];

		const instruction = ins.match(/[a-z]+\s[a-z]*\s?\d/g)?.map((x) => x.replaceAll('turn ', '').replace(/\s\d/g, ''))[0] as
			| 'on'
			| 'off'
			| 'toggle';

		for (let i = x1; i <= x2; i++) {
			if (!lights[i]) lights[i] = [];
			for (let j = y1; j <= y2; j++) {
				switch (instruction) {
					case 'on':
						if (!lights[i][j]) lit++;
						lights[i][j] = true;
						break;
					case 'off':
						if (lights[i][j]) lit--;
						lights[i][j] = false;
						break;

					case 'toggle':
						lit += lights[i][j] === true ? -1 : 1;
						lights[i][j] = !lights[i][j];
						break;
				}
			}
		}
	}

	return lit;
}

console.log(p1());
