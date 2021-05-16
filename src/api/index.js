class Api {
  async getDailyTop(fiat = 'USD', limit = 10) {
    const url = new URL(`${Vue.apiConfig.API_URL}/top/totalvolfull`);
    url.searchParams.append('tsym', fiat);
    url.searchParams.append('limit', limit);

    const { data, error } = await this.makeApiCall(url.href);

    if (error) {
      console.error(error);

      return;
    }

    return data.Data.map(this.fromFullFormat);
  }

  async makeApiCall(url) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Apikey ${Vue.apiConfig.API_KEY}`,
        Accept: 'application/json',
      },
      mode: 'cors',
    });

    const data = await response.json();

    if (data.Response === 'Error') {
      return { error: data.message };
    }

    return { data };
  }

  fromFullFormat(currency) {
    const { CoinInfo, DISPLAY } = currency;

    const display = Object.values(DISPLAY).shift();

    return {
      name: CoinInfo.Name,
      fullName: CoinInfo.FullName,
      price: display.PRICE,
      dailyPercent: display.CHANGEPCT24HOUR,
      image: CoinInfo.ImageUrl,
    };
  }

  unnestByKey(obj, key) {
    return Object.entries(obj).reduce((acc, [parentKey, value]) => {
      return Object.assign(acc, { [parentKey]: value[key] });
    }, {});
  }
}

Vue.api = Vue.prototype.$api = new Api();
