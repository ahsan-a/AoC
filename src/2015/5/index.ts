import { fromFileUrl, dirname } from 'https://deno.land/std/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`).split('\n');

function p1() {
	let niceStrings: string[] = [];

	input.forEach((inputString) => {
		let approved: boolean[] = [];

		if ((inputString.match(/[aeiou]/gi)?.length ?? []) >= 3) approved.push(true);
		if (inputString.match(/(.)\1/g)) approved.push(true);
		if (!inputString.match(/(ab|cd|pq|xy)/g)) approved.push(true);

		if (approved.length === 3) niceStrings.push(inputString);
	});

	return niceStrings.length;
}

function p2() {
	let niceStrings = 0;

	for (const str of input) {
		if (/(\w)(\w)\w*\1\2/g.test(str) && /(\w)\w\1/g.test(str)) niceStrings++;
	}

	return niceStrings;
}

console.log(p2());
