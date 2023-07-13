import Component from './core/Component.js';
import Nodes from './components/Nodes.js';
import { request } from './apis/api.js';
import Loading from './components/Loading.js';
import BreadCrumb from './components/BreadCrumb.js';
import ImageViewer from './components/ImageViewer.js';
import {
  validate,
  validateNode,
  validateNodeArray,
} from './utils/validation.js';

export default class App extends Component {
  setup() {
    this.state = {
      isRoot: true,
      isLoading: false,
      nodes: [],
      paths: [],
      selectedImageUrl: null,
    };

    this.fetchNodes();
  }

  templates() {
    return `
    <nav class='Loading Modal'></nav>
    <nav class='Breadcrumb'></nav>
    <div class='Nodes'></div>
    <div class='ImageViewer Modal'></div>
    `;
  }

  setEvent() {
    window.addEventListener('keyup', ({ key }) => {
      const { isRoot } = this.state;
      const isBackspace = key === 'Backspace';

      if (isRoot || !isBackspace) return;
      this.onClickPrevNode();
    });

    window.addEventListener('keyup', ({ key }) => {
      key === 'Escape' && this.handleCloseImage();
    });
  }

  mounted() {
    const { isRoot, nodes, selectedImageUrl, isLoading, paths } = this.state;

    const $loadingModal = this.$target.querySelector('.Loading');
    new Loading({ $target: $loadingModal, props: { isLoading } });

    const $breadCrumb = this.$target.querySelector('.Breadcrumb');
    new BreadCrumb({
      $target: $breadCrumb,
      props: {
        paths,
        onClick: this.onClickBreadCrumb.bind(this),
      },
    });

    const $nodes = this.$target.querySelector('.Nodes');
    new Nodes({
      $target: $nodes,
      props: {
        isRoot,
        nodes,
        selectedImageUrl: selectedImageUrl,
        onPrevClick: this.onClickPrevNode.bind(this),
        onClick: this.onClickNode.bind(this),
      },
    });

    const $imageViewer = this.$target.querySelector('.ImageViewer');
    new ImageViewer({
      $target: $imageViewer,
      props: {
        selectedImageUrl,
        handleClose: this.handleCloseImage.bind(this),
      },
    });
  }

  handleCloseImage() {
    this.setState({
      ...this.state,
      selectedImageUrl: null,
    });
  }

  async onClickBreadCrumb(id) {
    if (id) {
      const { paths } = this.state;
      const pathIndex = paths.findIndex((path) => path.id === id);
      const nextPaths = paths.slice(0, pathIndex + 1);

      validateNodeArray({
        nodeArray: nextPaths,
        nodeArrayName: Object.keys({ nextPaths })[0],
      });

      this.setState({
        ...this.state,
        paths: nextPaths,
      });
    } else {
      this.setState({
        ...this.state,
        paths: [],
      });
    }

    await this.fetchNodes(id);
  }

  async onClickPrevNode() {
    const nextPaths = [...this.state.paths];
    nextPaths.pop();

    validateNodeArray({
      nodeArray: nextPaths,
      nodeArrayName: Object.keys({ nextPaths })[0],
    });

    this.setState({
      ...this.state,
      paths: nextPaths,
    });
    if (nextPaths.length === 0) {
      await this.fetchNodes();
    } else {
      await this.fetchNodes(nextPaths[nextPaths.length - 1].id);
    }
  }

  async onClickNode(node) {
    if (node.type === 'DIRECTORY') {
      await this.fetchNodes(node.id);

      validateNode(node);

      this.setState({
        ...this.state,
        paths: [...this.state.paths, node],
        isRoot: false,
      });
    }

    if (node.type === 'FILE') {
      this.setState({
        ...this.state,
        selectedImageUrl: `https://kdt-frontend.cat-api.programmers.co.kr/static${node.filePath}`,
        isRoot: false,
      });
    }
  }

  async fetchNodes(id) {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const nodes = await request(id ? `/${id}` : '/');

    validateNodeArray({
      nodeArray: nodes,
      nodeArrayName: Object.keys({ nodes })[0],
    });

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
      isLoading: false,
    });
  }
}
