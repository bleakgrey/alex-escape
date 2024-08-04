import { Container } from 'pixi.js'

export abstract class Scene extends Container {

	public view?: Container | any
	protected viewCreator: (refs: any) => Container

	constructor(
		viewCreator: (refs: any) => Container,
	) {
		super()
		this.viewCreator = viewCreator
	}

	public getRef<T>(label: String): T {
		const node = this.view.getChildByLabel(label, true)

		if (!node) {
			throw new Error(`Can't find reference to node "${label}"`)
		}

		return node
	}

	public onStart() {
		this.view = this.addChild(this.viewCreator({}))
	}
	public onStop() { }

}