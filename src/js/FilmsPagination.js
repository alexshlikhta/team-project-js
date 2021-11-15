import Pagination from 'tui-pagination';
import ApiServices from './ApiServices';
import RenderMarkup from './RenderMarkup';

const ref = {
  paginationBox: document.getElementById('tui-pagination'),
};

export default class FilmsPagination {
  constructor() {
    this.apiServices = new ApiServices();
    this.renderMarkup = new RenderMarkup();
  }
  async init(options, type) {
    const paginationOptions = {
      totalItems: options.total_results,
      visiblePages: 5,
      page: options.page,
      centerAlign: false,
      template: {
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton: `<span class="tui-ico-{{type}}"><svg width="100%" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.33341 6H10.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.00008 10.6668L10.6667 6.00016L6.00008 1.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </span>`,
        disabledMoveButton: `<span class="tui-ico-{{type}}"><svg width="100%" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.6666 6H1.33331" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.99998 10.6668L1.33331 6.00016L5.99998 1.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </span>`,
      },
    };

    const filmsPagination = new Pagination(ref.paginationBox, paginationOptions);

    filmsPagination.on('afterMove', async event => {
      this.apiServices.page = event.page;
      // this.apiServices.query = event.page;
      let pagData;

      if (type === 'popular') {
        pagData = await this.apiServices.fetchPopularFilms();
        this.renderMarkup.renderMarkup(pagData, { showVotes: false });
      } else {
        pagData = await this.apiServices.fetchQueriedFilms();
        this.renderMarkup.renderMarkup(pagData, { showVotes: false });
      }
    });
  }
}
