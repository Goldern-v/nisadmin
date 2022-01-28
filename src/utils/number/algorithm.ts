//自定义加法运算
export const addNum = (num1: number = 0, num2: number = 0) => {
	let sq1 = 0, sq2 = 0, m = 0;
	try {
		sq1 = num1.toString().split(".")[1].length;
	}
	catch (e) {
		sq1 = 0;
	}
	try {
		sq2 = num2.toString().split(".")[1].length;
	}
	catch (e) {
		sq2 = 0;
	}
	m = Math.pow(10, Math.max(sq1, sq2));
	return (num1 * m + num2 * m) / m;
}