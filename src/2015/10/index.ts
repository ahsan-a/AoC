let input = '1321131112';

for (let i = 0; i < 50; i++) {
	// @ts-ignore
	input = input.match(/(\d)\1*/g).reduce((a, c) => a + (c.length.toString() + c[0].toString()), '');
}

console.log(input.length);
