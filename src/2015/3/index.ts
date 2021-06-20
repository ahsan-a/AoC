import { fromFileUrl, dirname } from 'https://deno.land/std/path/mod.ts';
const input = [...Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`)];

function p1() {
	const pos = {
		x: 0,
		y: 0,
	};
	const visited = [[true]];
	let houses = 1;

	input.forEach((dir) => {
		switch (dir) {
			case '^':
				pos.y++;
				break;
			case 'v':
				pos.y--;
				break;
			case '>':
				pos.x++;
				break;
			case '<':
				pos.x--;
				break;
		}
		if (!visited[pos.x]?.[pos.y]) {
			if (!visited[pos.x]) visited[pos.x] = [];
			visited[pos.x][pos.y] = true;
			houses++;
		}
	});

	return houses;
}

function p2() {
	const pos = {
		santa: {
			x: 0,
			y: 0,
		},
		rob: {
			x: 0,
			y: 0,
		},
	};

	const visited = [[true]];
	let houses = 1;

	for (let i = 0; i < input.length; i++) {
		const dir = input[i];

		const person = i % 2 === 0 ? 'santa' : 'rob';

		switch (dir) {
			case '^':
				pos[person].y++;
				break;
			case 'v':
				pos[person].y--;
				break;
			case '>':
				pos[person].x++;
				break;
			case '<':
				pos[person].x--;
				break;
		}

		if (!visited[pos[person].x]?.[pos[person].y]) {
			if (!visited[pos[person].x]) visited[pos[person].x] = [];
			visited[pos[person].x][pos[person].y] = true;
			houses++;
		}
	}

	return houses;
}

console.log(p2());
