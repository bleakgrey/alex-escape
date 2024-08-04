import { BitmapText, Graphics, Sprite, Container, Texture, AnimatedSprite, Spritesheet, Text, TextOptions, TextStyle } from "pixi.js";
import { getTexture, NodeConstructor } from "../Helpers";

export const SpriteNode: NodeConstructor = (props, children, refs) => {
	if (props.texture && typeof props.texture === 'string') {
		props.texture = getTexture(props.texture)
	}

	return new Sprite(props.texture)
}

export const AnimatedSpriteNode: NodeConstructor = (props, children, refs) => {
	const node = new AnimatedSprite([Texture.EMPTY])

	const sheet = new Spritesheet(getTexture(props.texture), props.atlas)
	sheet.parse().then((textures) => {
		node.textures = Object.values(textures)

		if (props.autoplay) {
			node.play()
		}
	})

	return node
}

export const ContainerNode: NodeConstructor = () => {
	return new Container()
}

export const LabelNode: NodeConstructor = (props) => {
	const defaultStyle: Partial<TextStyle> = {
		fontFamily: 'Pridi-Regular',
	}

	const style: Partial<TextStyle> = Object.assign(defaultStyle, props.style || {})
	props.style = style

	return new BitmapText(props.text || '', {
		style,
	})
}

export const DrawableNode: NodeConstructor = () => {
	return new Graphics()
}

