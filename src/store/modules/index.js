/**
 * Created by gxk on 2017/9/4.
 */
/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/);
import commodity from './commodity.js'
const modules = {
  commodity:commodity
};
files.keys().forEach(key => {
  if (key === './index.js') return;
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
