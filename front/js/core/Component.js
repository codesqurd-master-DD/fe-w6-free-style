export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.$self = document.createElement("div");
    this.children = [];
    this.recieveNewProps(props);
    this.setEventLinstener();
  }
  recieveNewProps(newProps) {
    if (this.shouldRender(newProps)) {
      this.props = newProps;
      this.render();
    } else {
      // 렌더하지 않고, 자식 컴포넌트에게 동일 명령
    }
  }
  shouldRender(newProps) {
    // 얕은 비교 vs 깊은 비교
    // 함수 같은 것들은 비교할 필요 없을텐데?
    return this.props !== newProps;
  }
  mountChildComponents() {
    // 자식 컴포넌트의 target이 될 DOM을 선택하세요
    // createChildComponent 함수에 생성자, target, props를 인자로 전달해서 실행하세요.
  }

  setChildProps(targetComponent, props) {}
  createComponent(Constructor, targetselector, getPropsFn) {
    const $target = this.$target.querySelector(targetselector);
    const props = getPropsFn();
    const component = new Constructor($target, props);
    this.children.push({ component, targetselector, getPropsFn });
  }
  getTemplate() {
    // 현 컴포넌트의 내부 html코드를 작성해서 return하세요.
  }
  render() {
    this.$self.innerHTML = this.getTemplate();
    this.$target.appendChild($self);
    this.mountChildComponents();
  }
  setEventLinstener() {
    //addEventLinstener를 사용해서 self에 이벤트를 위임하세요.
  }
  addEventLinstener(eventType, selector, callback) {
    const children = [...this.$self.querySelectorAll(selector)];
    const isTarget = (target) => {
      return children.includes(target) || target.closest(selector);
    };
    this.$self.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
dd;
