import { IRenderMime } from '@jupyterlab/rendermime-interfaces';



import { Widget } from '@phosphor/widgets';

import '../style/index.css';

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'application/vnd.jupyter.dataset+json';

/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'mimerenderer-my_mimetype';

/**
 * A widget for rendering my_mimetype.
 */
export class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render my_mimetype into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    
    let data = model.data[this._mimeType] as string;
    this.node.textContent = data.slice(0, 16384);
    
    return Promise.resolve();
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for my_mimetype data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};

/**
 * Extension definition.
 */
const extension: IRenderMime.IExtension = {
  id: 'huge:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'string',
  fileTypes: [
    {
      name: 'my_mimetype',
      mimeTypes: [MIME_TYPE],
      extensions: ['.huge']
    }
  ],
  documentWidgetFactoryOptions: {
    name: 'Huge Viewer',
    primaryFileType: 'my_mimetype',
    fileTypes: ['my_mimetype'],
    defaultFor: ['my_mimetype']
  }
};

export default extension;
