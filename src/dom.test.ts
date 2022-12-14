import { assertEquals } from "../dev-deps.ts";
import { element, formatStyle, formatStylesheet, setInnerHtml } from "./dom.ts";

Deno.test("element()", () => {
  assertEquals(element("div", {}), "<div>");

  assertEquals(
    element("body", {
      tagProps: { id: "b" },
      children: [
        element("div", {
          tagProps: { style: "width:50%" },
          children: [
            element("img", {
              tagProps: { src: "./icon.png" },
            }),
            element("input", { tagProps: { name: "i", value: "test" } }),
          ],
          closed: true,
        }),
        element("div", {
          children: element("span", {
            children: "Hello World!",
          }),
        }),
      ],
    }),
    "<body id=b><div style=width:50%><img src=./icon.png><input name=i value=test></div><div><span>Hello World!",
  );
});

Deno.test("setInnerHtml()", () => {
  assertEquals(
    setInnerHtml(
      "body",
      element("a", { tagProps: { href: "#" }, children: "link" }),
    ),
    "body.innerHTML='<a href=#>link'",
  );

  assertEquals(
    setInnerHtml(
      "b",
      [
        element("p", { children: "Hello " }),
        element("span", { children: "World" }),
        "!",
      ],
    ),
    "b.innerHTML='<p>Hello <span>World!'",
  );

  assertEquals(
    setInnerHtml(
      "b",
      element("p", { children: "Hello '\"`World`\"'!", closed: true }),
    ),
    "b.innerHTML='<p>Hello \\'\"`World`\"\\'!</p>'",
  );
});

Deno.test("formatStyle()", () => {
  assertEquals(
    formatStyle({ display: "flex", justifyContent: "center", width: 32 }),
    "display:flex;justify-content:center;width:32",
  );
});

Deno.test("formatStylesheet()", () => {
  assertEquals(
    formatStylesheet({
      "*:hover": { paddingLeft: 4 },
      div: { display: "flex", justifyContent: "center" },
      ".center": { textAlign: "center" },
      "@media(orientation:portrait)": formatStylesheet({
        "#root>*": {
          flexDirection: "column",
        },
      }),
    }),
    "*:hover{padding-left:4}div{display:flex;justify-content:center}.center{text-align:center}@media(orientation:portrait){#root>*{flex-direction:column}}",
  );
});
