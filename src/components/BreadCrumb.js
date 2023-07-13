import Component from '../core/Component.js';

export default class BreadCrumb extends Component {
  templates() {
    const { paths } = this.props;
    return `
    <div class='BreadCrumb__item'>Root</div>
    ${paths
      .map(
        ({ name, id }) => `
    <div class='BreadCrumb__item'  data-id=${id}>${name}</div>
    `
      )
      .join('')}
    `;
  }

  setEvent() {
    const { onClick } = this.props;
    this.addEvent({
      eventType: 'click',
      selector: '.BreadCrumb__item',
      callback: ({ target }) => {
        const $breadCrumbItem = target?.closest('.BreadCrumb__item');
        const { id } = $breadCrumbItem.dataset;

        onClick(id);
      },
    });
  }
}
