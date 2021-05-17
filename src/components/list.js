Vue.component('list', {
  template: `
    <ol class="list-group" style="width: 450px; max-height: 480px; overflow: scroll;">
      <li 
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="(currency, index) in currencies"
        :key="'C' + 1 + currency.name"
      >
        <img
          class="rounded img-fluid"
          style="width: 50px"
          :src="getCurrencyImage(currency)"
        >
        <div class="ms-2 me-auto">
          {{ getCurrencyName(currency) }}
          <div class="fw-bold">{{ currency.price }}</div>
        </div>
        <span 
          class="badge rounded-pill" 
          :class="[getPercentBadgeType(currency.dailyPercent)]"
        >
          {{ currency.dailyPercent + '%' }}
        </span>
      </li>
    </ol>
  `,
  props: {
    currencies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    getCurrencyName(currency) {
      return `${currency.fullName} (${currency.name})`;
    },
    getCurrencyImage(currency) {
      return `https://www.cryptocompare.com${currency.image}`;
    },
    getPercentBadgeType(percent) {
      const percentNum = Number(percent);

      if (percentNum === 0) return 'bg-secondary';
      if (percentNum > 0) return 'bg-success';
      if (percentNum < 0) return 'bg-danger';
    },
  },
});
