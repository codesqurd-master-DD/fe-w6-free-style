import Component from "../core/Component.js";

export default class Header extends Component {
  getTemplate() {
    return `<nav>
      <ul class="flex">
        <li>일반번역</li>
        <li>이중번역</li>
        <li>번역결과 비교</li>
        <li>사용자 모드</li>
      </ul>
    </nav>
    <p>
      기본 번역기입니다. 엔진과 언어를 선택해 번역 결과를 얻을 수 있습니다
    </p>`;
  }
  setEventLinstener() {}
}
