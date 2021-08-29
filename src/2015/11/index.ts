const input = 'hxbxwxba';

const alphabet = Array.from(Array(26))
	.map((_, i) => i + 65)
	.map((x) => String.fromCharCode(x).toLowerCase());

let cycles = 0;
function p1(input: string) {
	let password = input;

	loop: while (true) {
		if (cycles !== 0) password = (parseInt(password, 36) + 1).toString(36).replace(/0/g, 'a');

		cycles++;

		// check 2

		if (password.includes('i') || password.includes('o') || password.includes('l')) continue loop;

		// check 1
		let check1 = false;
		for (let i = 0; i < password.length - 2; i++) {
			if (
				alphabet.indexOf(password[i + 2]) - alphabet.indexOf(password[i + 1]) === 1 &&
				alphabet.indexOf(password[i + 1]) - alphabet.indexOf(password[i]) === 1
			)
				check1 = true;
		}

		if (!check1) continue loop;

		const match = password.match(/(\w)\1+/g);
		if (!(match && [...new Set(match)].length >= 2)) {
			continue loop;
		}
		break;
	}

	return password;
}
console.time('p1');
console.log(p1(p1(input)));
console.timeEnd('p1');
console.log(cycles);
