import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import css from "./index.css?inline";
import "./index.css";

export const initializeReactApp = (appElement, rootElement, children?) => {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

class CustomAppComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const appElement = this.parentElement as HTMLTemplateElement;
    if (appElement) {
      // const templateContent = template.content;
      const shadowRoot = this.attachShadow({ mode: "open" });

      // create variable to attach the tailwind stylesheet
      const style = document?.createElement("style");

      // attach the stylesheet as text
      style.textContent = css;

      // apply the style
      shadowRoot.appendChild(style);

      const rootElement = document?.createElement("div");
      rootElement.setAttribute("class", "sk-qwertyroot");
      shadowRoot.appendChild(rootElement);

      if (rootElement) {
        initializeReactApp(appElement, rootElement);
      } else {
        console.error("Root element for React app not found.");
      }
    } else {
      console.error("Template not found in parent element.");
    }
  }
}

const container = document?.getElementById("sk-qwerty");

if (container) {
  if (container.getAttribute("data-shadow") !== "true") {
    container.setAttribute("class", "sk-qwertyroot sk-qwerty-3");
    const children = container.innerHTML;

    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i];
      container.removeChild(child);
    }

    // create variable to attach the tailwind stylesheet
    const style = document?.createElement("style");

    // attach the stylesheet as text
    style.textContent = css;

    // apply the style
    container.parentElement.appendChild(style);

    initializeReactApp(container, container, children);
  } else {
    const id = `qwerty-shadow`;
    customElements.define(id, CustomAppComponent);
    container.appendChild(document?.createElement(id));
  }
}
