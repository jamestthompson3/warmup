import { App } from "./App";

function renderToDOM(id, component) {
  const root = document.querySelector(`#${id}`);
  root.appendChild(component.el);
}

renderToDOM("root", App());
