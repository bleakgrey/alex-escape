import { jsx, ContainerNode, SpriteNode } from "@/engine"
import { Sprite } from "pixi.js"
import Assets from "@/Assets"
import gsap from 'gsap'

const Styles = {
    ARROW: {
		angle: 90,
        position: { x: 0, y: -170 },
		'(orientation: portrait)': {
			angle: 0,
            position: { x: -170, y: 0 },
		}
	},
    ICON_LOG: {
        position: { x: 0, y: -170 },
        scale: { x: 1.15, y: 1.15 },
		'(orientation: portrait)': {
			angle: 0,
            position: { x: -170, y: 0 },
            scale: { x: 1, y: 1 },
		}
    },
    ICON_WOOD: {
        position: { x: 0, y: 170 },
        scale: { x: 1.15, y: 1.15 },
		'(orientation: portrait)': {
			angle: 0,
            position: { x: 170, y: 0 },
            scale: { x: 1, y: 1 },
		}
    },
}

export function MergeHint() {
    let arrow!: Sprite
    let icons: Sprite[] = []

    const root = <ContainerNode>
        <SpriteNode ref={(n: Sprite) => arrow = n} classes={Styles.ARROW}
            texture={Assets.HINT_ARROW}
            anchor={{ x: -0.2, y: 0.5 }}
        />
        <SpriteNode ref={(n: Sprite) => icons.push(n)} classes={Styles.ICON_LOG}
            texture={Assets.HINT_LOG}
            anchor={{ x: 0.5, y: 0.5 }}
        />
        <SpriteNode ref={(n: Sprite) => icons.push(n)} classes={Styles.ICON_WOOD}
            texture={Assets.HINT_WOOD}
            anchor={{ x: 0.5, y: 0.5 }}
        />
    </ContainerNode>

    gsap.timeline({ yoyo: true, repeat: -1 })
        .set(icons, { angle: -4 })
        .to(icons, { angle: 4, duration: 2, ease: "bounce.in", yoyoEase: "bounce.in" })
    gsap.timeline({ yoyo: true, repeat: -1, repeatDelay: 0 })
        .set(arrow.scale, { x: 1.2, y: 1.2 })
        .to(arrow.scale, { x: '-=0.25', y: '-=0.1', duration: 1 })

    return root
}