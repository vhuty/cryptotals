const LIST_MIN_LIMIT = 10;
const DEFAULT_FIAT = 'USD';

this.app = new Vue({
  el: '#app',
  data: {
    currencies: [],
    fiats: [DEFAULT_FIAT],
    currentFiat: null,
    limit: LIST_MIN_LIMIT,
  },
  methods: {
    async fetchList() {
      this.currencies = await this.$api.getDailyTop(
        this.currentFiat,
        this.limit
      );
    },
    async changeFiat(index) {
      this.currentFiat = this.fiats[index];
      return this.fetchList();
    },
  },
  async mounted() {
    const parameters = JSON.parse(this.$el.dataset.atts);

    const limitNum = Number(parameters.limit);
    if (limitNum > LIST_MIN_LIMIT) {
      this.limit = limitNum;
    }

    if (parameters.fiats) {
      const filteredFiats = parameters.fiats
        .split(new RegExp('[^A-Za-z]+'))
        .filter(Boolean);

      if (filteredFiats.length) {
        this.fiats = filteredFiats.map((fiat) => fiat.toUpperCase());
      }
    }

    this.currentFiat = this.fiats[0];

    setInterval(this.fetchList, 10000);
    await this.fetchList();
  },
});
