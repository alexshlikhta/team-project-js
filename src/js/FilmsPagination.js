import Pagination from 'tui-pagination';
import ApiServices from './ApiServices.js';
import LocalService from './LocalStorage.js';
import RenderMarkup from './RenderMarkup.js';

const ref = {
  paginationBox: document.getElementById('tui-pagination'),
};

export default class FilmsPagination {
  constructor() {
    this.apiServices = new ApiServices();
    this.renderMarkup = new RenderMarkup();
    this.localService = new LocalService();
    this.pagination;
  }

  async init(type, query) {
    let visiblePages = 5;

    if (window.innerWidth > 768) {
      visiblePages = 7;
    }

    const paginationOptions = {
      totalItems: parseInt(this.localService.getLocalTotalCards()),
      itemsPerPage: 20,
      visiblePages: visiblePages,
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}"></span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}"></span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };

    if (paginationOptions.totalItems > 1) {
      ref.paginationBox.classList.remove('hidden');
      this.pagination = new Pagination(ref.paginationBox, paginationOptions);

      this.pagination.on('afterMove', async event => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let pagData;

        if (type === 'popular') {
          this.localService.setPaginationPage(event.page);
          pagData = await this.apiServices.fetchPopularFilms();
          this.renderMarkup.renderMarkup(pagData, { showVotes: false });
        } else if (type === 'query') {
          this.apiServices.query = query;
          this.localService.setPaginationPage(event.page);
          pagData = await this.apiServices.fetchQueriedFilms();
          this.renderMarkup.renderMarkup(pagData, { showVotes: false });
        } else if (type === 'library') {
        } else {
          return;
        }
      });
    } else {
      ref.paginationBox.classList.add('hidden');
    }
  }
}
