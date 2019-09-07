function renderToDOM(id, component) {
  const root = document.querySelector(`#${id}`);
  root.appendChild(component.el);
}

const OUR_COMPONENT = "component";

class Component {
  constructor(element, args = {}) {
    this.$$typeof = OUR_COMPONENT;
    this.el = document.createElement(element);
    this.args = args;
    this.mount();
  }

  mount() {
    if (this.args.style) this.applyStyles();
    console.log(this.args.on);
    function callfromMount() {
      console.log("called from mount");
    }
    if (this.args.on) {
      this.args.on.forEach(handler => {
        const [event, func] = Object.entries(handler)[0];
        this.el.addEventListener(event, func);
      });
    }
  }

  render(children) {
    if (!Array.isArray(children)) {
      throw new Error("Children must be an array!");
    }
    const components = [];
    children.forEach(child => {
      if (child.$$typeof === "component") {
        components.push(child.el);
      }
      if (typeof child === "string") {
        this.el.innerText = child;
      }
    });
    this.el.append(...components);

    return this;
  }

  applyStyles() {
    Object.entries(this.args.style).forEach(stylePair => {
      this.el.style[stylePair[0]] = stylePair[1];
    });
  }
}
