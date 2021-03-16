export default class Deact {
  constructor($target) {
    this.$target = $target;
    this.build();
  }
  async build() {
    await setup();
    this.render();
    this.mount();
  }
  async setup() {
    // state를 초기화하세요.
    // 비동기 처리가 필요하면 await를 사용하세요.
  }
  render() {
    this.$target.innerHTML = this.getTemplate();
    this.mount();
  }
  mount() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
  }
}
