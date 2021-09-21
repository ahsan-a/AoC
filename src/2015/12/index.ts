import { fromFileUrl, dirname } from 'https://deno.land/std@0.105.0/path/mod.ts';
const input = JSON.parse(Deno.readTextFileSync(`${dirname(fromFileUrl(import.meta.url))}\\input.txt`));

// const input = ;

function p1() {
	let sum = 0;
	function recurse(node: any) {
		if (typeof node === 'string') return;
		else if (typeof node === 'number') sum += node;
		else if (Array.isArray(node)) node.forEach(recurse);
		// p1
		// else if (typeof node === 'object') Object.keys(node).forEach((key) => recurse(node[key]));
		// p2
		else if (typeof node === 'object' && !Object.values(node).some((x) => x === 'red')) Object.keys(node).forEach((key) => recurse(node[key]));
	}

	recurse(input);

	return sum;
}

console.log(p1());

function p2() {}
