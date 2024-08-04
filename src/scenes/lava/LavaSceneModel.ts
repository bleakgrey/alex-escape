import { Model } from '@/engine/Model';
import { Container } from 'pixi.js';

export class LavaSceneModel extends Model {

	public result: boolean | null = null

	public isIntroPlayed = false
	public isOutroPlayed = false

	public droppables: Container[] = []

	public lavaProgress = 0

	public collectedWood = 0
	public requiredWood = 3

}