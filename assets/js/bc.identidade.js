(() => {
  const preview_identidade = document.getElementById("identidade-header");

  function identidadeRow(data) {
    let linitials = [];
    for (var i = 0, len = data.length; i < len; ++i) {
      var identidade =
        '<div class="image-preview"><img id="' +
        data[i].id +
        '" src="images/' +
        data[i].image +
        '" class="image"/></div>' +
        '<div class="color-preview"><span class="color" style="background-color: ' +
        data[i].color +
        '"></span></div>' +
        '<div class="actions"><a class="action remove-dentidade-item" data-type="delete" data-id="' +
        data[i].id +
        '">' +
        '<div class="main-icon icon icon-trash"></div></a><label class="action toggle-lower switch">' +
        '<input value="true" type="checkbox" class="select-dentidade-item" data-type="select" data-id="' +
        data[i].id +
        '" />' +
        '<span class="slider round"></span ></label></div>';
      linitials.push(identidade);
    }
    if (preview_identidade) preview_identidade.innerHTML = linitials;
  }

  if (toGetStorages("identidade").length > 0) {
    var identidade = toGetStorages("identidade");
    lowerRow(identidade);
  }

  $("#dentidade-form").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var formProps = Object.fromEntries(formData);
    var data = {
      color: formProps.color,
      image: formProps.image.name,
    };
    if (data) {
      const response = toCreateStorage("identidade", data, "create");
      if (response) identidadeRow(response);
    }
  });

  $(".remove-dentidade-item").click(function () {
    var id = this.getAttribute("data-id");
    const response = toDeleteStorage(id, "identidade", "delete");
    if (response) identidadeRow(response);
  });

  $(".select-dentidade-item").click(function () {
    var id = this.getAttribute("data-id");
    if (this.checked) {
      const response = toGetStorage(id, "identidade", "select");
      toSendFront("identidade", response, "identidade", this.checked);
    } else {
      toSendFront("identidade", [], "identidade", false);
    }
    //checkUncheck(this, ".select-dentidade-item");
  });
})();
