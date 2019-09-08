import { Component } from "./Component";

async function getImage(width, height) {
  const response = await fetch(`https://picsum.photos/${width}/${height}`);
  console.log(response.url);
  return response.url;
}

class PageWrapper extends Component {
  async componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.el.style.width = width + "px";
    this.el.style.height = height + "px";
    const url = await getImage(width, height);
    this.el.style.backgroundImage = `url(${url})`;
  }
}

const Container = new PageWrapper("div", {
  style: { background: "papayawhip" }
});

export const App = () => Container.render();
