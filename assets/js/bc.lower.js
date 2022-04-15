(() => {
  function e(e) {
    const t = document.getElementById("row-lower");
    let o = [];
    for (var i = 0, l = e.length; i < l; ++i) {
      var a = i + 1,
        s =
          '<li id="' +
          e[i].id +
          '" class="lower item"><div class="header"><span class="count" style="background-color: ' +
          e[i].identidade[0].color +
          '">' +
          a +
          '</span><div class="actions"><button class="action remove-lower-item" data-type="delete" data-id="' +
          e[i].id +
          '"><div class="main-icon icon icon-trash"></div></button><label class="action toggle-lower switch" style="width: 48px;"><input type="checkbox" class="select-lower-item" data-type="select" data-id="' +
          e[i].id +
          '"/><span class="slider round"></span></label></div></div><div class="main"><h2 class="title">' +
          e[i].title +
          '</h2><h3 class="description">' +
          e[i].subtitle +
          "</h3></div></li>";
      o.push(s);
    }
    t && (t.innerHTML = o);
  }
  toGetStorages("lower").length > 0 && e(toGetStorages("lower"));
  $("#lower-form").submit(function (t) {
    t.preventDefault();
    var o = new FormData(t.target),
      i = Object.fromEntries(o),
      l = toGetStorages("identidade"),
      a = {
        title: i.title,
        subtitle: i.description,
        identidade: toGetStorages("identidade"),
      };
    if (a && l) {
      const t = toCreateStorage("lower", a, "create");
      t && e(t), location.reload();
    }
  }),
    $(".remove-lower-item").click(function () {
      var t = this.getAttribute("data-id");
      const o = toDeleteStorage(t, "lower", "delete");
      o && e(o), location.reload();
    }),
    $(".select-lower-item").click(function () {
      var e = this.getAttribute("data-id");
      const t = toGetStorage(e, "lower", "select");
      toSendFront("lower", t, "lower", this.checked),
        checkUncheck(this, ".select-lower-item");
    });
})();
