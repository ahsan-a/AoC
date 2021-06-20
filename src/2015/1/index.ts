import { fromFileUrl, dirname } from 'https://deno.land/std/path/mod.ts';
const input = await Deno.readTextFile(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`);

function p1(): number {
	let floor = 0;

	[...input].forEach((letter) => {
		floor += letter === '(' ? 1 : -1;
	});

	return floor;
}

function p2(): number | void {
	let floor = 0;

	for (let i = 0; i < [...input].length; i++) {
		const letter = [...input][i];

		floor += letter === '(' ? 1 : -1;
		if (floor === -1) return i + 1;
	}
}
console.log(p2());
