(() => {
  const e = document.getElementById("identidade-header");
  function t(t) {
    let i = [];
    for (var d = 0, a = t.length; d < a; ++d) {
      var n =
        '<div class="image-preview"><img id="' +
        t[d].id +
        '" src="images/' +
        t[d].image +
        '" class="image"/></div><div class="color-preview"><span class="color" style="background-color: ' +
        t[d].color +
        '"></span></div><div class="actions"><a class="action remove-dentidade-item" data-type="delete" data-id="' +
        t[d].id +
        '"><div class="main-icon icon icon-trash"></div></a><label class="action toggle-lower switch"><input value="true" type="checkbox" class="select-dentidade-item" data-type="select" data-id="' +
        t[d].id +
        '" /><span class="slider round"></span ></label></div>';
      i.push(n);
    }
    e && (e.innerHTML = i);
  }
  toGetStorages("identidade").length > 0 && t(toGetStorages("identidade"));
  $("#dentidade-form").submit(function (e) {
    e.preventDefault();
    var i = new FormData(e.target),
      d = Object.fromEntries(i),
      a = { color: d.color, image: d.image.name };
    if (a && toGetStorages("identidade").length < 1) {
      const e = toCreateStorage("identidade", a, "create");
      e && t(e), location.reload();
    }
  }),
    $(".remove-dentidade-item").click(function () {
      var e = this.getAttribute("data-id");
      const i = toDeleteStorage(e, "identidade", "delete");
      i && t(i), location.reload();
    }),
    $(".select-dentidade-item").click(function () {
      var e = this.getAttribute("data-id");
      if (this.checked) {
        const t = toGetStorage(e, "identidade", "select");
        toSendFront("identidade", t, "identidade", this.checked);
      } else toSendFront("identidade", [], "identidade", !1);
      checkUncheck(this, ".select-dentidade-item");
    });
})();
