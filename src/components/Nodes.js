import Component from '../core/Component.js';

export default class Nodes extends Component {
  templates() {
    const { isRoot, nodes } = this.props;
    return `
      ${
        isRoot
          ? ''
          : `
      <div class='Node'>
        <img src = 'https://cdn.roto.codes/images/prev.png'>
      </div>`
      }
      ${nodes
        .map(
          (node) => `
          <div class ='Node' data-id='${node.id}'>
            <img src=${
              node.type === 'DIRECTORY'
                ? 'https://cdn.roto.codes/images/directory.png'
                : 'https://cdn.roto.codes/images/file.png'
            }
            >
            ${node.name}
          </div>`
        )
        .join('')}
    `;
  }

  setEvent() {
    const { nodes, onClick, onPrevClick } = this.props;

    this.addEvent({
      eventType: 'click',
      selector: '.Node',
      callback: ({ target }) => {
        const $target = target?.closest('.Node');

        if (!$target) return;

        const { id } = $target.dataset;

        const node = nodes.find((node) => node.id === id);

        if (node) {
          onClick(node);
        } else {
          onPrevClick();
        }
      },
    });
  }
}
