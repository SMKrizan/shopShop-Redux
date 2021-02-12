export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

// opens db connection and connects to object store as 'storeName' and 'method' and 'object' facilitate the transaction; wrapping the fn in a Promise makes working with IDB's asynchronous nature easier
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // opens connection to `shop-shop` db as version 1
    const request = window.indexedDB.open('shop-shop', 1);

    // creates variables to hold reference to the db, transaction (tx), and object store
    let db, tx, store;

    // if version changes (or if this is first time using db), runs this method and creates three object stores 
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // creates object store for each type of data and sets "primary" key index to data `_id`
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    // handles any connection errors
    request.onerror = function (e) {
      console.log('There was an error');
    };

    // on database open success
    request.onsuccess = function (e) {
      // saves db reference to `db` variable
      db = request.result;
      // opens tx to whatever's passed into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, 'readwrite');
      // saves reference to that object store
      store = tx.objectStore(storeName);

      // reports any errors
      db.onerror = function (e) {
        console.log('error', e);
      };

      // checks the value of 'method' and acts accordingly
      switch (method) {
        // overwrites any object data with matching '_id' value or adding it if not present and returns to wherever idbPromise is called
        case 'put':
          store.put(object);
          resolve(object);
          break;
        // returns all store data to wherever idbPromise is called
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        // will remove item from object store; enables removal when offline
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      // when transaction is complete, closes connection
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
