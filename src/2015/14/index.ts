import { fromFileUrl, dirname } from 'https://deno.land/std@0.105.0/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`).split('\n') as string[];

function p1() {
	const reg: { [key: string]: { speed: number; length: number; cooldown: number } } = {};
	for (let x of input) {
		const i = x.split(' ');
		reg[i[0]] = { speed: parseInt(i[3]), length: parseInt(i[6]), cooldown: parseInt(i.at(-2) as string) };
	}

	let highest = 0;

	for (let x in reg) {
		let seconds = 2503;
		let distance = 0;
		const i = reg[x];

		while (seconds > 0) {
			if (seconds < i.length) {
				distance += seconds * i.speed;
				break;
			}

			distance += i.length * i.speed;
			seconds -= i.length;

			if (seconds <= i.cooldown) break;
			seconds -= i.cooldown;
		}

		if (distance > highest) highest = distance;
	}

	console.log(highest);
}
function p2() {}

p1();
