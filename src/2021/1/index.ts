import { fromFileUrl, dirname } from 'https://deno.land/std@0.105.0/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`)
	.split('\n')
	.map((x) => parseInt(x)) as number[];

function p1() {
	let j = -1;
	let count = -1;
	input.forEach((i) => {
		if (i > j) count++;
		j = i;
	});

	console.log(count);
}
function p2() {
	let j = -1;
	let count = -1;

	for (let i = 0; i < input.length - 2; i++) {
		const num = input[i] + input[i + 1] + input[i + 2];
		if (num > j) count++;
		j = num;
	}

	console.log(count);
}
