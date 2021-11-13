export default class LocalService {
    // constructor() {
    //     // 
    // }
async onGet(key) {
    try {
      let clearData = localStorage.getItem(key);
  
      return (clearData = JSON.parse(clearData) || undefined);
    } catch (error) {
      console.error('getItem error: ', error);
    }
  };
 
  async onSet(key, value) {
    try {
      const clearData = JSON.stringify(value);
      localStorage.setItem(key, clearData);
    } catch (error) {
      console.error('setItem error: ', error);
    }
  };
 
  async onRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('removeItem error: ', error);
    }
  };
}
//   export { onGetStorage, onSetStorage, onRemoveStorage };