import { Point, Sprite } from "pixi.js"

export class CameraState {
    public cameraBox?: Sprite

    public shakeAmount = 0
    public shakeMagnitude = new Point(20, 10)
}