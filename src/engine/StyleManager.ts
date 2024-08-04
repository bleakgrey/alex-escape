import { Container } from "pixi.js";
import { findChildren } from "./Helpers";

export class StyleManager extends Container {

    public start() {
        window.addEventListener('resize', this.onInvalidateStyles)
        this.parent.addListener('childAdded', this.onChildAdded, this)
    }
    
    private onChildAdded(child: Container, container: Container, index: number) {
        const children: Container[] = []
        findChildren(child, children)

        for (const child of children) {
            child.addListener('childAdded', this.onChildAdded, this)
            this.applyStylesToNode(child)
        }
    }

    private onInvalidateStyles = () => {
        const nodes: Container[] = []
        findChildren(this.parent, nodes)

        nodes.forEach(node => this.applyStylesToNode(node))
    }

    private applyStylesToNode(node: Container | any) {
        const { classes } = node

        if (classes) {
            const style = this.parseStyle(classes)

            for (const [key, value] of Object.entries(style)) {
                node[key] = value
            }
        }
    }

    private parseStyle(originalStyle: any) {
        const parsedStyle: any = {}
        const queries: any = {}

        for (const [key, value] of Object.entries(originalStyle)) {
            if (key[0] === '(') {
                queries[key] = value
            } else {
                parsedStyle[key] = value
            }
        }

        for (const [key, value] of Object.entries(queries)) {
            const { matches } = matchMedia(key)

            if (matches) {
                Object.assign(parsedStyle, value)
            }
        }

        return parsedStyle
    }
}