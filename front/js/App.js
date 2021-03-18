import Header from "./component/Header.js";
import Deact from "./core/Deact.js";

export default class App extends Deact {
  setState() {
    this.state = {};
  }
  //   setPropsFromState() {}
  getTemplate() {
    return `
        <header></header>
        <section class="container flex"></section>
      `;
  }
  mountComponents() {
    this.createComponent(Header, "header");
  }
}
