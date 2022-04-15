function toCreateStorage(t, e, o) {
  try {
    var r = localStorage.getItem(t) ? JSON.parse(localStorage.getItem(t)) : [];
    if (r) {
      e.id = Math.random().toString(36).slice(2);
      var a = [...r, e];
      return localStorage.setItem(t, JSON.stringify(a)), a;
    }
    return localStorage.setItem(t, a), a;
  } catch (t) {
    console.log(t);
  }
}
function toGetStorages(t) {
  try {
    var e = localStorage.getItem(t) ? JSON.parse(localStorage.getItem(t)) : [];
    if (e) return e;
  } catch (t) {
    console.log(t);
  }
}
function toGetStorage(t, e, o) {
  try {
    var r = localStorage.getItem(e) ? JSON.parse(localStorage.getItem(e)) : [];
    if ((r = r.filter((e) => e.id === t))) return r;
  } catch (t) {
    console.log(t);
  }
}
function toDeleteStorage(t, e, o) {
  try {
    var r = localStorage.getItem(e) ? JSON.parse(localStorage.getItem(e)) : [];
    if ((r = r.filter((e) => e.id !== t))) {
      var a = JSON.stringify(r);
      return localStorage.setItem(e, a), r;
    }
  } catch (t) {
    console.log(t);
  }
}
