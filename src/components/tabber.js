Vue.component('tabber', {
  template: `
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" class="nav-item" @click="switchTab(tab)">
        <a class="nav-link" :class="{ active: isActiveTab(tab) }">{{ tab }}</a>
      </li>
    </ul>
  `,
  props: {
    tabs: {
      type: Array,
      default: ['Current'],
    },
  },
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    switchTab(tab) {
      const index = this.tabs.indexOf(tab);
      if (this.current !== index) {
        this.current = index;
        this.$emit('switch', index);
      }
    },
    isActiveTab(tab) {
      return this.tabs.indexOf(tab) === this.current;
    },
  },
});
