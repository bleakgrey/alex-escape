import { ExtensionType, BitmapFont, LoaderParserPriority, bitmapFontTextParser, bitmapFontXMLStringParser, ResolvedAsset, Loader, copySearchParams, Texture, DOMAdapter, LoaderParserAdvanced } from "pixi.js";
import { getTexture } from "../Helpers";

export default {
	extension: {
		type: ExtensionType.LoadParser,
		priority: LoaderParserPriority.High,
	},
	type: ExtensionType.LoadParser,
	name: 'inlineFontLoader',

	test(url: string): boolean {
		return false
	},

	async testParse(data: string): Promise<boolean> {
		return bitmapFontTextParser.test(data) || bitmapFontXMLStringParser.test(data);
	},

	async parse(asset: string, data: ResolvedAsset, loader: Loader): Promise<BitmapFont> {
		const bitmapFontData = bitmapFontTextParser.test(asset)
			? bitmapFontTextParser.parse(asset)
			: bitmapFontXMLStringParser.parse(asset);

		const { src } = data;
		const { pages } = bitmapFontData;
		const textureUrls = [];

		const textureOptions = (bitmapFontData.distanceField) ? {
			scaleMode: 'linear',
			alphaMode: 'premultiply-alpha-on-upload',
			autoGenerateMipmaps: false,
			resolution: 1,
		} : {};

		for (let i = 0; i < pages.length; ++i){
			const pageFile = pages[i].file;
			textureUrls.push({
				src: pageFile,
				data: textureOptions
			});
		}

		const textures = textureUrls.map((key) => getTexture(key.src))
		const bitmapFont = new BitmapFont({
			data: bitmapFontData,
			textures
		}, src);

		return bitmapFont;
	},

	async load(url: string, _options: ResolvedAsset): Promise<string> {
		const response = await DOMAdapter.get().fetch(url);
		return await response.text();
	},

	async unload(bitmapFont: BitmapFont, _resolvedAsset: ResolvedAsset, loader: Loader): Promise<void> {
		await Promise.all(bitmapFont.pages.map((page) => loader.unload(page.texture.source._sourceOrigin)));

		bitmapFont.destroy();
	}

};
