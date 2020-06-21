export default () => {
  const store = window.localStorage;

  const setItem = (key, value) => {
    store.setItem(key, JSON.stringify(value));
  }

  const getItem = key => {
    const storedValue = store.getItem(key);
    if(storedValue)
      return JSON.parse(storedValue);
    return null;
  }

  return {
    setItem,
    getItem,
  }
}