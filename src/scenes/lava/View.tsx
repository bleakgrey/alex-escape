import Assets from '../../Assets'
import Colors from '../../Colors'
import Styles from './Styles'
import { jsx, ContainerNode, SpriteNode, LabelNode } from '@/engine'
import { Viewport } from './components/camera/Viewport'
import { Pivot } from './components/Pivot'
import { Log } from './components/merge/Log'
import { Bridge } from './components/Bridge'
import { Bubble } from './components/ui/Bubble'
import { FlowingLava } from './components/FlowingLava'
import { Hand } from './components/merge/Hand'
import { UiNode } from './components/ui/UiNode'
import { Texture } from 'pixi.js'
import { MergeHint } from './components/ui/MergeHint'
import { EffectsNode } from './components/fx/EffectsNode'
import { Character } from './components/alex/Character'

export default () =>
	<ContainerNode>
		<Viewport>
			<ContainerNode label={'World'}
				sortableChildren={true}
			>
				<SpriteNode label={'Background'} texture={Assets.BG} />

				<ContainerNode label={'Bridge'} classes={Styles.BRIDGE}>
					<Bridge />
					<ContainerNode label={'BubbleBouncer'}>
						<Bubble label={'Bubble'} scale={{x: 0, y: 0}} />
					</ContainerNode>
				</ContainerNode>

				<SpriteNode label={'Volcano'}
					texture={Assets.VOLCANO}
					anchor={{ x: 0.5, y: 0.95 }}
					position={{ x: 576, y: 1220 }}
				>
					<Pivot/>
				</SpriteNode>
				<FlowingLava label={'Lava'} x={370} y={480} alpha={0} />
				<SpriteNode
					texture={Assets.FG}
					anchor={{ x: 0, y: 1 }}
					position={{ x: 0, y: 2048 }}
				/>

				<Log position={{x: 1355, y: 1090}} />
				<Log position={{x: 1230, y: 1260}} />
				<Log position={{x: 1170, y: 1024}} />
				<Log position={{x: 1000, y: 1250}} />
				<Log position={{x: 1024, y: 990}} />
				<Log position={{x: 900, y: 1111}} />

				<Pivot label={'PivotEntry'} position={{x: 740, y: 1230}} />
				<Pivot label={'PivotBridge'} position={{x: 1090, y: 1111}} />
				<Pivot label={'PivotPresents'} classes={Styles.PIVOT_PRESENTS} />
				<Pivot label={'PivotVolcano'} classes={Styles.PIVOT_VOLCANO} />
				<Pivot label={'PivotGameplay'} position={{x: 1200, y: 999}} />
				<Pivot label={'PivotEscape'} position={{ x: 1520, y: 860 }} />

				<Character label={'Character'}
					position={{x: 1090, y: 1111}}
					scale={{x: -1, y: 1}}
				/>
				<SpriteNode label={'BridgeFg'}
					classes={Styles.BRIDGE}
					texture={Assets.BRIDGE_FG}
					visible={false}
				/>

				<EffectsNode />
				<Hand label={'Hand'} zIndex={Infinity} />

				<SpriteNode label={'CameraBox'}
					classes={Styles.CAMERA_VIEW}
					anchor={{x: 0.5, y: 0.5}}
					// texture={Texture.WHITE}
					// alpha={0.2}
				/>
			</ContainerNode>
		</Viewport>


		<UiNode label={'HUD'}
			classes={Styles.END_CARD}
			zIndex={Infinity}
		>
			<MergeHint label={'MergeHint'}
				classes={Styles.MERGE_HINT}
				scale={{x: 0, y: 0}}
			/>
		</UiNode>


		<UiNode zIndex={Infinity}>
			<SpriteNode label={'Overlay'}
				fill={{x:1, y:1}}
				texture={Texture.WHITE}
				alpha={0.75}
				visible={false}
				tint={Colors.BLACK}
				eventMode={'static'}
			/>
		</UiNode>


		<UiNode label={'EndCard'}
			zIndex={Infinity}
			classes={Styles.END_CARD}
			visible={false}
		>
			<ContainerNode
				label={'Logo'}
				classes={Styles.END_CARD_LOGO}
			>
				<ContainerNode label={'LogoBouncer'}>
					<SpriteNode label={'LogoSuccess'}
						texture={Assets.LOGO}
						anchor={{x: 0.5, y: 0.5}}
					/>
					<SpriteNode label={'LogoFail'}
						texture={Assets.FAIL}
						anchor={{x: 0.5, y: 0.5}}
					/>
				</ContainerNode>
			</ContainerNode>
			<ContainerNode label={'Cta'} classes={Styles.END_CARD_BUTTON}>
				<ContainerNode label={'CtaBouncer'}>
					<SpriteNode
						label={'CtaBackground'}
						scale={{x: 0.6, y: 0.6}}
						texture={Assets.BUTTON}
						anchor={{x: 0.5, y: 0.5}}
					/>
					<LabelNode
						label={'CtaText'}
						style={{ fontSize: 64, fill: 0xffffff }}
						anchor={{x: 0.5, y: 0.75}}
					/>
				</ContainerNode>
			</ContainerNode>
		</UiNode>
	</ContainerNode>