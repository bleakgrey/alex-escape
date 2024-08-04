import { SceneState } from "./SceneState"
import { BitmapText, Container, Sprite } from "pixi.js"
import Strings from '../../../assets/strings/en_US.json'
import Colors from '../../../Colors'
import gsap from "gsap"

export class ResultState extends SceneState {
	public canEnter() {
		return this.model.result !== null && this.model.isOutroPlayed;
	}

	public onEnter() {
		const overlay: Sprite = this.getRef('Overlay')
		const endCard: Container = this.getRef('EndCard')

		const button: Container = this.getRef('Cta')
		const buttonBouncer: Container = this.getRef('CtaBouncer')
		const background: Sprite = this.getRef('CtaBackground')
		const text: BitmapText = this.getRef('CtaText')

		const logo: Container = this.getRef('Logo')
		const logoBouncer: Container = this.getRef('LogoBouncer')
		const logoSuccess: Sprite = this.getRef('LogoSuccess')
		const logoFail: Sprite = this.getRef('LogoFail')


		const { result } = this.model

		logoSuccess.visible = !!result
		logoFail.visible = !result
		text.text = result ? Strings.cta_success : Strings.cta_fail
		background.tint = result ? Colors.GREEN : Colors.RED

		button.on('pointerdown', this.onRedirect)

		// Timeline for showing the end card elements
		gsap.timeline()

			// Fade on overlay
			.set([overlay, endCard], { visible: true })
			.from(overlay, { alpha: 0, duration: 1 })

			// Scale the Logo
			.from(logo.scale, { x: 0, y: 0 }, '<+0.75')
			.to(logo.scale, { x: 1, y: 1 }, '<')

			// Scale the CTA button
			.from(button.scale, { x: 0, y: 0 }, '<+0.15')
			.to(button.scale, { x: 1, y: 1 }, '<')

		// Timeline for idle animations of the end card elements
		gsap.timeline()
			// Bounce CTA button
			.to(buttonBouncer.scale, {
				x: 0.95,
				y: 0.95,
				delay: 0,
				duration: 1.15,
				yoyo: true,
				repeat: -1,
			}, '>')

			// Bounce and rotate logo
			.from(logoBouncer, { angle: -4 }, '<')
			.to(logoBouncer, {
				angle: 4,
				duration: 8,
				delay: 0,
				yoyo: true,
				repeat: -1,
				ease: "power1.inOut",
				yoyoEase: "power1.inOut",
			}, '<')
			.to(logoBouncer.scale, {
				x: 0.95,
				y: 0.95,
				delay: 0,
				duration: 10,
				yoyo: true,
				repeat: -1,
			}, '<')
	}

	private onRedirect = () => {
		let url = this.isIOS() ? Strings.url_ios : Strings.url_android

		window.open(url, '_blank')
	}

	private isIOS() {
		return [
		  'iPad Simulator',
		  'iPhone Simulator',
		  'iPod Simulator',
		  'iPad',
		  'iPhone',
		  'iPod'
		].includes(navigator.platform)
		|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)
	  }
}