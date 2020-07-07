import { expect } from "chai";
import {
  createMockEngine,
  cleanHTML,
  waitForError,
  stringifyLoadResult
} from "../utils";
import { EngineEventKind, stringifyVirtualNode } from "paperclip-utils";
import { Engine } from "../../engine";

describe(__filename + "#", () => {
  it("prevents circular dependencies", async () => {
    const graph = {
      "/entry.pc": `<import src="/module.pc">`,
      "/module.pc": `<import src="/entry.pc">`
    };
    const engine = createMockEngine(graph);
    const p = new Promise<any>(resolve => {
      engine.onEvent(event => {
        if (event.kind === EngineEventKind.Error) {
          resolve(event);
        }
      });
    });
    engine.load("/module.pc").catch(() => {});
    const err = await p;
    expect(err.message).to.eql("Circular dependencies are not supported yet.");
  });

  it("dynamic attributes work", async () => {
    const graph = {
      "/entry.pc": `
        <div component as="Component" class="primary" class:alt="alt" class:alt2>
          {children}
        </div>

        <Component />
        <Component alt />
        <Component alt2 />
      `
    };
    const engine = createMockEngine(graph);
    const { preview } = await engine.load("/entry.pc");
    const buffer = `${stringifyVirtualNode(preview)}`;

    expect(cleanHTML(buffer)).to.eql(
      `<div class="_80f4925f_primary primary" data-pc-80f4925f></div><div class="_80f4925f_alt alt _80f4925f_primary primary" data-pc-80f4925f></div><div class="_80f4925f_alt2 alt2 _80f4925f_primary primary" data-pc-80f4925f></div>`
    );
  });

  it("Can import keyframes", async () => {
    const graph = {
      "/entry.pc": `
        <import as="ab" src="./module.pc">
        <style>
          .rule {
            animation: ab.a 5s;
          }
        </style>
      `,
      "/module.pc": `
        <style>
          @keyframes a {
          }
        </style>
      `
    };
    const engine = createMockEngine(graph);
    const result = await engine.load("/entry.pc");

    const buffer = `${stringifyLoadResult(result)}`;

    expect(cleanHTML(buffer)).to.eql(
      `<style>@keyframes _139cec8e_a { } ._80f4925f_rule { animation:_139cec8e_a 5s; }</style>`
    );
  });

  it("Doesn't crash if importing module with parse error", async () => {
    const graph = {
      "/entry.pc": `
        <import src="/module.pc">

        <div>
        </div>
      `,
      "/module.pc": `<bad!`
    };
    const engine = createMockEngine(graph);
    const e = waitForError(engine);
    engine.load("/entry.pc").catch(() => {});
    const err = await e;
    expect(err).to.eql({
      kind: "Error",
      errorKind: "Graph",
      uri: "/module.pc",
      info: {
        kind: "EndOfFile",
        message: "End of file",
        location: { start: 0, end: 1 }
      }
    });
  });

  it("displays an error if a default component is used but not exported", async () => {
    const graph = {
      "/entry.pc": `
        <import as="module" src="/module.pc">

        <module>
        </module>
      `,
      "/module.pc": `nothing to export!`
    };
    const engine = createMockEngine(graph);
    const e = waitForError(engine);
    engine.load("/entry.pc").catch(() => {});
    const err = await e;
    expect(err).to.eql({
      kind: "Error",
      errorKind: "Runtime",
      uri: "/entry.pc",
      location: { start: 56, end: 64 },
      message: "Unable to find component, or it's not exported."
    });
  });

  it("displays error if img src not found", async () => {
    const graph = {
      "/entry.pc": `
        <img src="/not/found.png">
      `
    };
    const engine = createMockEngine(graph, () => {}, {
      resolveFile(uri) {
        return null;
      }
    });

    const e = waitForError(engine);
    engine.load("/entry.pc").catch(() => {});
    const err = await e;
    expect(err).to.eql({
      kind: "Error",
      errorKind: "Runtime",
      uri: "/entry.pc",
      location: { start: 19, end: 33 },
      message: "Unable to resolve file."
    });
  });

  describe("Slots", async () => {
    it("Can render attributes with element bindings", async () => {
      const graph = {
        "/entry.pc": `
          <div a={<div />}></div>
        `
      };
      const engine = createMockEngine(graph);
      const { preview } = await engine.load("/entry.pc");
      const buffer = `${stringifyVirtualNode(preview)}`;

      expect(cleanHTML(buffer)).to.eql(
        `<div a="[Object object]" data-pc-80f4925f></div>`
      );
    });
    xit("Can render text bindings", async () => {
      const graph = {
        "/entry.pc": `
          <div component as="Component" {class}>
            {children}
          </div>
  
          <Component class="a">b</Component>
        `
      };
      const engine = createMockEngine(graph);
      const { preview } = await engine.load("/entry.pc");
      const buffer = `${stringifyVirtualNode(preview)}`;

      expect(cleanHTML(buffer)).to.eql(
        `<div class="a" data-pc-80f4925f>b</div>`
      );
    });
    xit("Displays an error if text binding is defined outside of component", async () => {
      const graph = {
        "/entry.pc": `
          <a {class}></a>
        `
      };
      const engine = createMockEngine(graph);
      const e = waitForError(engine);
      engine.load("/entry.pc");
      const err = await e;
      expect(err).to.eql({
        kind: "Error",
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 12, end: 19 },
        message: "Bindings can only be defined within components."
      });
    });
    xit("Displays error for key-value binding outside of component", async () => {
      const graph = {
        "/entry.pc": `
          <a a={class}></a>
        `
      };
      const engine = createMockEngine(graph);
      const e = waitForError(engine);
      engine.load("/entry.pc").catch(() => {});
      const err = await e;
      expect(err).to.eql({
        kind: "Error",
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 14, end: 21 },
        message: "Bindings can only be defined within components."
      });
    });

    xit("Displays error for spread binding outside of component", async () => {
      const graph = {
        "/entry.pc": `
          <a {...class}></a>
        `
      };
      const engine = createMockEngine(graph);
      const e = waitForError(engine);
      engine.load("/entry.pc").catch(() => {});
      const err = await e;
      expect(err).to.eql({
        kind: "Error",
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 12, end: 22 },
        message: "Bindings can only be defined within components."
      });
    });

    xit("Displays error for text binding outside of component", async () => {
      const graph = {
        "/entry.pc": `
          {a}
        `
      };
      const engine = createMockEngine(graph);
      const e = waitForError(engine);
      engine.load("/entry.pc").catch(() => {});
      const err = await e;
      expect(err).to.eql({
        kind: "Error",
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 9, end: 12 },
        message: "Bindings can only be defined within components."
      });
    });

    xit("Displays error for class binding outside of component", async () => {
      const graph = {
        "/entry.pc": `
          <div class:a>
          </div>
        `
      };
      const engine = createMockEngine(graph);
      const e = waitForError(engine);
      engine.load("/entry.pc").catch(() => {});
      const err = await e;
      expect(err).to.eql({
        kind: "Error",
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 14, end: 21 },
        message: "Bindings can only be defined within components."
      });
    });
  });

  it("Engine can't reload a file if there's an error", async () => {
    const graph = {
      "/entry.pc": `
        abc
      `
    };

    const engine = createMockEngine(graph);
    const result = stringifyLoadResult(await engine.load("/entry.pc"));
    expect(result).to.eql(`<style></style> abc`);

    const e = waitForError(engine);
    engine.updateVirtualFileContent(`/entry.pc`, `<a `);
    const err = await e;
    expect(err).to.eql({
      kind: "Error",
      errorKind: "Graph",
      uri: "/entry.pc",
      info: {
        kind: "EndOfFile",
        message: "End of file",
        location: { start: 0, end: 1 }
      }
    });

    let err2;
    try {
      err2 = await engine.load("/entry.pc");
    } catch (e) {
      err2 = e;
    }

    expect(err2).to.eql({
      kind: "Error",
      errorKind: "Graph",
      uri: "/entry.pc",
      info: {
        kind: "EndOfFile",
        message: "End of file",
        location: { start: 0, end: 1 }
      }
    });

    engine.updateVirtualFileContent(`/entry.pc`, `<a></a>`);

    const result2 = stringifyLoadResult(await engine.load("/entry.pc"));
    expect(result2).to.eql(`<style></style><a data-pc-80f4925f></a>`);
  });

  it("Engine can't reload content if module errors", async () => {
    const graph = {
      "/entry.pc": `
        <import as="Component" src="./module.pc">
        <Component>abc</Component>
      `,
      "/module.pc": `
        <div export component as="default">
          {children} cde
        </div>
      `
    };

    const engine = createMockEngine(graph);
    const result = stringifyLoadResult(await engine.load("/entry.pc"));
    expect(result).to.eql(
      `<style></style><div data-pc-139cec8e>abc cde </div>`
    );

    // make the parse error
    await engine.updateVirtualFileContent(
      "/module.pc",
      `<div export component as="default">
    {chi`
    );

    await engine.updateVirtualFileContent(
      "/entry.pc",
      `<import as="Component" src="./module.pc">
    <Component>defg</Component>`
    );

    let err;

    // shouldn't be able to load /entry.pc now
    try {
      await engine.load("/entry.pc");
    } catch (e) {
      err = e;
    }

    expect(err).to.eql({
      kind: "Error",
      errorKind: "Graph",
      uri: "/module.pc",
      info: {
        kind: "Unterminated",
        message: "Unterminated slot.",
        location: { start: 41, end: 44 }
      }
    });

    // introduce fix
    await engine.updateVirtualFileContent(
      "/module.pc",
      `<div export component as="default">
      cde {children}
    </div>`
    );

    const result3 = stringifyLoadResult(await engine.load("/entry.pc"));
    expect(result3).to.eql(
      `<style></style><div data-pc-139cec8e>cde defg</div>`
    );
  });
});