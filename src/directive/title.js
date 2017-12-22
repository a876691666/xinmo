import Vue from 'vue'

let title = Vue.directive('setTitle', {
  inserted: function (el, binding) {
    document.title = binding.value;
  }
})

export default {
  data () {
    return title
  }
}
