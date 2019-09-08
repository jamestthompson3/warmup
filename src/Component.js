const OUR_COMPONENT = "component";

export class Component {
  constructor(element, args = {}) {
    this.$$typeof = OUR_COMPONENT;
    this.el = document.createElement(element);
    this.args = args;
  }

  componentDidMount() {}

  setup() {
    if (this.args.style) this.applyStyles();
    if (this.args.on) {
      this.args.on.forEach(handler => {
        Object.entries(handler).forEach(([event, func]) => {
          this.el.addEventListener(event, func);
        });
      });
    }
  }

  render(children = []) {
    this.setup();
    this.componentDidMount();
    if (!Array.isArray(children)) {
      throw new Error("Children must be an array!");
    }
    const components = [];
    children.forEach(child => {
      if (child.$$typeof === OUR_COMPONENT) {
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
