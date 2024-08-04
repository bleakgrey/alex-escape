import { Model } from '@/engine/Model';
import { Container } from 'pixi.js';
import { CharacterSequence } from './components/alex/CharacterSequence';

export class LavaSceneModel extends Model {

    public result: boolean | null = null

    public isIntroPlayed = false
    public isOutroPlayed = false

    public droppables: Container[] = []

    public lavaProgress = 0

    public collectedWood = 0
    public requiredWood = 3

    public alexSequence?: CharacterSequence

}