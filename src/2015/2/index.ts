import { fromFileUrl, dirname } from 'https://deno.land/std/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`).split('\n');

function p1() {
	let total = 0;

	input.forEach((dimension) => {
		const [l, w, h] = dimension.split('x').map((x) => parseInt(x));
		total += Math.min(l * 2 + w * 2, w * 2 + h * 2, h * 2 + l * 2) + l * w * h;
	});

	return total;
}

function p2() {
	let total = 0;

	return total;
}

console.log(p1());
