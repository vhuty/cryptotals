<?php
/*
Plugin name: Cryptotals Plugin
Plugin URI: https://localhost.com/
Description: Plugin for viewing current totals of the most crypto-currencies
Version: 1.0.0
Author: Vladislav Hutych
Author URI: https://github.com/diagoby
License: GPL2
*/

if(!class_exists('CryptotalsPlugin')) {
  class CryptotalsPlugin {
    private $shortcode_name = 'cryptotals';

    public function register() {
      add_shortcode($this->shortcode_name, [$this, 'shortcode']);
      add_action('wp_enqueue_scripts', [$this, 'scripts']);
    }

    public function shortcode($atts) {
      $json_atts = esc_attr(json_encode([
        'fiats' => $atts['fiats'],
        'limit' => $atts['limit'],
      ]));

      return "
        <div id='app' data-atts='{$json_atts}'>
          <div>
            <tabber :tabs='fiats' @switch='changeFiat'></tabber>
            <list :currencies='currencies'></list>
          </div>
        </div>
      ";
    }

    public function scripts() {
      global $post;

      if(has_shortcode($post->post_content, $this->shortcode_name)) {
        wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js', [], '2.6.12');
        wp_enqueue_script('config', plugin_dir_url(__FILE__) . 'src/config/index.js', [], '1.0.0', true);
        wp_enqueue_script('api', plugin_dir_url(__FILE__) . 'src/api/index.js', ['config'], '1.0.0', true);
        wp_enqueue_script('tabber', plugin_dir_url(__FILE__) . 'src/components/tabber.js', [], '1.0.0', true);
        wp_enqueue_script('list', plugin_dir_url(__FILE__) . 'src/components/list.js', [], '1.0.0', true);
        wp_enqueue_script('main', plugin_dir_url(__FILE__) . 'src/main.js', ['api', 'tabber', 'list'], '1.0.0', true);

        wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css');
      }
    }
  }

  (new CryptotalsPlugin())->register();
}