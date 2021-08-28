import { fromFileUrl, dirname } from 'https://deno.land/std@0.105.0/path/mod.ts';
const input = Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`).split('\n') as string[];

function p1() {
	const register: { [key: string]: { [key: string]: number } } = {};
	input.forEach((line: string | Array<string>) => {
		line = (line as string).split(' ');
		const [start, end, distance] = [line[0], line[2], parseInt(line[4])];

		register[start] = register[start] || {};
		register[end] = register[end] || {};

		register[start][end] = distance;
		register[end][start] = distance;
	});

	const route = [...Object.keys(register['AlphaCentauri']), 'AlphaCentauri'];

	let distance = Number.MAX_VALUE;

	// keep it running until it's consistent
	for (let i = 0; i <= 100000; i++) {
		let newDistance = 0;
		for (let j = 0; j < route.length - 1; j++) {
			newDistance += register[route[j]][route[j + 1]];
		}

		if (newDistance < distance) distance = newDistance;

		route.sort(() => 0.5 - Math.random());
	}

	return distance;
}

function p2() {
	const register: { [key: string]: { [key: string]: number } } = {};
	input.forEach((line: string | Array<string>) => {
		line = (line as string).split(' ');
		const [start, end, distance] = [line[0], line[2], parseInt(line[4])];

		register[start] = register[start] || {};
		register[end] = register[end] || {};

		register[start][end] = distance;
		register[end][start] = distance;
	});

	const route = [...Object.keys(register['AlphaCentauri']), 'AlphaCentauri'];

	let distance = Number.MIN_VALUE;

	// keep it running until it's consistent
	for (let i = 0; i <= 100000; i++) {
		let newDistance = 0;
		for (let j = 0; j < route.length - 1; j++) {
			newDistance += register[route[j]][route[j + 1]];
		}

		if (newDistance > distance) distance = newDistance;

		route.sort(() => 0.5 - Math.random());
	}

	return distance;
}

console.log(p2());
