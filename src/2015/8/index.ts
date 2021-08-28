import { fromFileUrl, dirname } from 'https://deno.land/std@0.105.0/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`).split('\n') as string[];

/*
	- 1198: too low
	- 1344: too high
*/

function p1() {
	let sum = 0;

	for (const line of input) {
		sum += line.length - eval(line).length;
	}

	return sum;
}

function p2() {
	let sum = 0;

	for (const line of input) {
		sum += JSON.stringify(line).length - line.length;
	}

	return sum;
}

console.log(p2());
