(() => {
  function t(t) {
    const e = document.getElementById("row-logo");
    let o = [];
    for (var a = 0, i = t.length; a < i; ++a) {
      var l =
        '<li id="' +
        t[a].id +
        '" class="logo item"><div class="header"><span class="image"><img src="images/' +
        t[a].image +
        '" alt=""/></span></div><div class="main"><h2 class="title">' +
        t[a].title +
        '</h2></div><div class="actions"><a class="action remove-logo-item" data-type="delete" data-id="' +
        t[a].id +
        '"><div class="main-icon icon icon-trash"></div></a><label class="action toggle-lower switch"><input value="false" type="checkbox" class="select-logo-item" data-type="select" data-id="' +
        t[a].id +
        '"/><span class="slider round"></span></label></div></li>';
      o.push(l);
    }
    e && (e.innerHTML = o);
  }
  toGetStorages("logo").length > 0 && t(toGetStorages("logo"));
  $("#logo-form").submit(function (e) {
    e.preventDefault();
    var o = new FormData(e.target),
      a = Object.fromEntries(o),
      i = { title: a.title, image: a.image.name };
    if (i) {
      const e = toCreateStorage("logo", i, "create");
      e && t(e), location.reload();
    }
  }),
    $(".remove-logo-item").click(function () {
      var e = this.getAttribute("data-id");
      const o = toDeleteStorage(e, "logo", "delete");
      o && t(o), location.reload();
    }),
    $(".select-logo-item").click(function () {
      var t = this.getAttribute("data-id");
      const e = toGetStorage(t, "logo", "select");
      toSendFront("logo", e, "logo", this.checked),
        checkUncheck(this, ".select-logo-item");
    });
})();
