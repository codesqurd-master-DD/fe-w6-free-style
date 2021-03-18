import Component from "../core/Component.js";

export default class Header extends Component {
  selectPropsToUse() {}
  getTemplate() {
    return `
        <section id="board" class="flex"></section>
    `;
  }
  setEventLinstener() {}
}
