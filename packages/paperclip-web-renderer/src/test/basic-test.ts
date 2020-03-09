import { expect } from "chai";
import { Engine } from "paperclip";
import { Renderer } from "../renderer";
import { mockDOMFactory } from "./utils";

describe(__filename + "#", () => {
  [
    [`Hello World`, `hello test`],
    [`<span></span>`, `text`],
    [
      `
        <part id="something">
        </part>
        
        <span></span>
        <something />
        <span>
          aa
          <div />
        </span>
      `,
      `
        <part id="something">
          <span />
        </part>
        
        <span></span>
        <something />
        <span>
          aa
          <div />
        </span>
      `
    ]
  ].forEach(([initial, ...changes]) => {
    it(`can render ${initial} -> ${changes.join("->")}`, () => {
      const engine = createMockEngine(initial);

      const renderer = new Renderer("file://", mockDOMFactory);
      engine.onEvent(renderer.handleEngineEvent);
      engine.load(DUMMY_FILE_URI);

      for (const change of changes) {
        engine.updateVirtualFileContent(DUMMY_FILE_URI, change);

        const renderer2 = new Renderer("file://", mockDOMFactory);
        const engine2 = createMockEngine(change);
        engine2.onEvent(renderer2.handleEngineEvent);
        engine2.load(DUMMY_FILE_URI);

        expect(getRendererHTML(renderer)).to.eql(getRendererHTML(renderer2));
      }
    });
  });
});
const DUMMY_FILE_URI = `file:///dummy-file-name.pc`;

const cleanWS = (html: string) => html.replace(/[\r\n\t\s]+/g, " ").trim();
const createMockEngine = (source: string) =>
  new Engine({
    io: {
      readFile: uri => {
        return source;
      },
      resolveFile: uri => uri,
      fileExists: () => true
    }
  });
const getRendererHTML = (renderer: Renderer) =>
  cleanWS((renderer.mount.childNodes[0] as HTMLElement).innerHTML);
