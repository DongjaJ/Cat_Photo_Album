import Component from '../core/Component.js';

export default class ImageViewer extends Component {
  templates() {
    const { selectedImageUrl } = this.props;
    this.$target.style.display = selectedImageUrl ? 'block' : 'none';

    return `
      ${
        selectedImageUrl
          ? `<div class='content'>
          <img src='${selectedImageUrl}'>
        </div>`
          : ''
      }`;
  }

  setEvent() {
    const { handleClose } = this.props;
    this.addEvent({
      eventType: 'click',
      selector: '.Modal',
      callback: ({ target }) => {
        target.classList.contains('Modal') && handleClose();
      },
    });
  }
}
