export default class Component {
  $target;
  state = {};
  props;

  constructor({ $target, props }) {
    this.$target = $target;
    this.props = props;

    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  setState(newState) {
    const prevState = this.state;
    const nextState = { ...prevState, ...newState };
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.templates();
    this.mounted();
  }

  mounted() {}

  setEvent() {}

  templates() {
    return '';
  }

  addEvent({ eventType, selector, callback }) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target?.closest(selector);

    this.$target.addEventListener(eventType, (event) => {
      const eventTarget = event.target;
      if (!isTarget(eventTarget)) return;
      callback(event);
    });
  }
}
