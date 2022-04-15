////// CRUD //////

function toCreateStorage(name, data, type) {
  try {
    var Storages = localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : [];
    if (Storages) {
      data.id = Math.random().toString(36).slice(2);
      var Storage = [...Storages, data];
      localStorage.setItem(name, JSON.stringify(Storage));
      return Storage;
    } else {
      localStorage.setItem(name, Storage);
      return Storage;
    }
  } catch (error) {
    console.log(error);
  }
}

function toGetStorages(name) {
  try {
    var Storages = localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : [];
    if (Storages) return Storages;
  } catch (error) {
    console.log(error);
  }
}

function toGetStorage(id, name, type) {
  try {
    var Storages = localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : [];
    Storages = Storages.filter((stor) => stor.id === id);
    if (Storages) return Storages;
  } catch (error) {
    console.log(error);
  }
}

function toDeleteStorage(id, name, type) {
  try {
    var Storages = localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : [];
    Storages = Storages.filter((stor) => stor.id !== id);
    if (Storages) {
      var Storage = JSON.stringify(Storages);
      localStorage.setItem(name, Storage);
      return Storages;
    }
  } catch (error) {
    console.log(error);
  }
}
