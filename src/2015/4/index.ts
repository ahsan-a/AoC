import { Md5 } from 'https://deno.land/std/hash/md5.ts';

const input = 'bgvyzdsv';

// for part 2 add a 0 to the regex
function p1() {
	let i = 1;
	while (true) {
		const hash = new Md5().update(`${input}${i}`);
		if (!hash.toString().match(/^00000.+/g)) i++;
		else return i;
	}
}

console.log(p1());
