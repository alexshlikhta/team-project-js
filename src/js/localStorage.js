const keys = {
  WATCHED: 'Watched',
  QUEUE: 'Queue',
};

export const load = key => {
  try {
    const localData = localStorage.getItem(key);
    localStorage.getItem('last-tab');

    return localData === null ? undefined : JSON.parse(localData);
  } catch (err) {
    console.error('Get error: ', err);
  }
};

export const save = (key, value) => {
  try {
    const localData = JSON.stringify(value);
    localStorage.setItem(key, localData);
  } catch (err) {
    console.error('Set error: ', err);
  }
};

export const remove = (key, value) => {
  const localData = load(key);
  localData.splice(localData.indexOf(value), 1);
  save(key, localData);
};

export default { load, save, remove, keys };

// export default class LocalService {
//     // constructor() {
//     //     //
//     // }
// async onGet(key) {
//     try {
//       let clearData = localStorage.getItem(key);

//       return (clearData = JSON.parse(clearData) || undefined);
//     } catch (error) {
//       console.error('getItem error: ', error);
//     }
//   };

//   async onSet(key, value) {
//     try {
//       const clearData = JSON.stringify(value);
//       localStorage.setItem(key, clearData);
//     } catch (error) {
//       console.error('setItem error: ', error);
//     }
//   };

//   async onRemove(key) {
//     try {
//       localStorage.removeItem(key);
//     } catch (error) {
//       console.error('removeItem error: ', error);
//     }
//   };
// }
//   export { onGet, onSet, onRemove };
