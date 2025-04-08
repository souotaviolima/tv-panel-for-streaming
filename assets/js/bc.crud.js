function toCreateStorage(key, data, type) {
  try {
    const current = JSON.parse(localStorage.getItem(key)) || [];
    const newItem = { ...data, id: Math.random().toString(36).slice(2) };
    const updated = [...current, newItem];
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Erro ao criar storage:", err);
    return [];
  }
}

function toGetStorages(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (err) {
    console.error("Erro ao obter storages:", err);
    return [];
  }
}

function toGetStorage(id, key, type) {
  try {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    return list.filter(item => item.id === id);
  } catch (err) {
    console.error("Erro ao obter storage:", err);
    return [];
  }
}

function toDeleteStorage(id, key, type) {
  try {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    const updated = list.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Erro ao deletar storage:", err);
    return [];
  }
}
