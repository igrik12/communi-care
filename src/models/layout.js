import { action } from 'easy-peasy';

const layoutModel = {
  themeColor: 'light',
  setThemeColor: action((state, payload) => {
    state.themeColor = state.themeColor === 'light' ? 'dark' : 'light';
  })
};

export default layoutModel;
