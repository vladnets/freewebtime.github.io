/* not bound to style, should be computed */

export function computeInOffsetByIndex(x,y,index) {
	let outx = x + 15;
	let outy = y + 41 + (index * 14);

	return {x:outx, y:outy};
}

export function computeOutOffsetByIndex(x,y,index) {

	let outx = x + 165;
	let outy = y + 45 + (index * 20);

	return {x:outx, y:outy};

}