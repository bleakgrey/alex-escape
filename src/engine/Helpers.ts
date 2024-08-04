import { Assets, Container, PointData, Texture } from 'pixi.js'

export type NodeConstructor = (props: any, children: any[], refs: any) => Container

// This namespace enables syntax highlighting for Typescript in VSCode
declare global {
	namespace JSX {
		type Element = Container
		type ElementClass = NodeConstructor
	}
}

export function getTexture(id: string): Texture {
	const result = Assets.get(id) ?? Texture.WHITE
	return result
}

// This function is used to render scene views (.tsx files)
export function jsx(
	tag: JSX.ElementClass,
	props: any,
	...children: any[]
): Container {
	// Construct node from tag
	if (!props) props = {}
	let node: any = tag(props, children, props.refs || {})

	// Apply props
	for (const prop in props) {
		const value = props[prop]
		switch (prop) {
			case "ref":
				props.ref(node)
				break
			default:
				node[prop] = value
				break
		}
	}

	// Add children
	for (const child of children) {
		if (child && child.addChild) {
			node.addChild(child)
		}
		else {
			console.warn('Skipped non-Node JSX child', child)
		}
	}

	return node
}

export function lerpColor(a: string, b: string, amount: number) {
	var ah = parseInt(a.replace(/#/g, ''), 16),
		ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
		bh = parseInt(b.replace(/#/g, ''), 16),
		br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
		rr = ar + amount * (br - ar),
		rg = ag + amount * (bg - ag),
		rb = ab + amount * (bb - ab);
	return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

export function lerp(a: number, b: number, alpha: number) {
	return a + alpha * (b - a)
}

export function checkAABB(a: Container, b: Container){
	const bounds1 = a.getBounds();
	const bounds2 = b.getBounds();

	return (
		bounds1.x < bounds2.x + bounds2.width
		&& bounds1.x + bounds1.width > bounds2.x
		&& bounds1.y < bounds2.y + bounds2.height
		&& bounds1.y + bounds1.height > bounds2.y
	);
}

export function distance(p1: PointData, p2: PointData) {
	const a = p1.x - p2.x
	const b = p1.y - p2.y
	
	return Math.sqrt(a*a + b*b)
}

export function findChildren(node: Container, array: Container[]) {
	node.children.forEach(child => {
		array.push(child)
		findChildren(child, array)
	})
}