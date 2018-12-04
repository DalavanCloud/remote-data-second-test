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



export class VideoRenderer extends Widget
  implements IRenderMime.IRenderer {
  constructor() {
    super();
    this.addClass('jp-VideoPlayer');
    const video = document.createElement('video');
    video.setAttribute('controls', '');
    this.node.appendChild(video);
  }

  /**
   * Render the data.
   */
    renderModel(model: IRenderMime.IMimeModel): Promise<void> {
      console.log(model);
        const video = this.node.querySelector('video')!;
        let url = JSON.parse(model.data[MIME_TYPE] as string)['stream_url'];
        console.log('model is', model)
        console.log(video)
        video.setAttribute('src', url);
      //video.setAttribute('type', model.mimeType);
    return Promise.resolve(void 0);
  }
}


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
    console.log('data')
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
  createRenderer: options => new VideoRenderer()
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
      extensions: ['.mp4']
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
