import Component from '../core/Component.js';

export default class Loading extends Component {
  setup() {
    const { isLoading } = this.props;
    this.$target.style.display = isLoading ? 'block' : 'none';
  }

  templates() {
    return `
      <div class = 'content'>
          <img width='100%' src ='https://cdn.roto.codes/images/nyan-cat.gif' alt='loading...'/>
      </div>
    `;
  }
}
