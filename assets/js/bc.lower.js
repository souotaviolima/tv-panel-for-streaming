(() => {
  function lowerRow(data) {
    const preview_lower = document.getElementById("row-lower");
    let linitials = [];
    for (var i = 0, len = data.length; i < len; ++i) {
      var count = i + 1;
      var lower =
        '<li id="' +
        data[i].id +
        '" class="lower item"><div class="header">' +
        '<span class="count" style="background-color: ' +
        data[i].identidade[0].color +
        '">' +
        count +
        '</span><div class="actions"><button class="action remove-lower-item" data-type="delete" data-id="' +
        data[i].id +
        '">' +
        '<div class="main-icon icon icon-trash"></div></button>' +
        '<label class="action toggle-lower switch" style="width: 48px;"><input type="checkbox" class="select-lower-item" data-type="select" data-id="' +
        data[i].id +
        '"/>' +
        '<span class="slider round"></span></label></div></div>' +
        '<div class="main"><h2 class="title">' +
        data[i].title +
        "</h2>" +
        '<h3 class="description">' +
        data[i].subtitle +
        "</h3></div></li>";
      linitials.push(lower);
    }
    if (preview_lower) preview_lower.innerHTML = linitials;
  }

  if (toGetStorages("lower").length > 0) {
    var lower = toGetStorages("lower");
    lowerRow(lower);
  }

  $("#lower-form").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var formProps = Object.fromEntries(formData);
    var identidade = toGetStorages("identidade");
    var data = {
      title: formProps.title,
      subtitle: formProps.description,
      identidade: toGetStorages("identidade"),
    };
    if (data && identidade) {
      const response = toCreateStorage("lower", data, "create");
      if (response) lowerRow(response);
      location.reload();
    }
  });

  $(".remove-lower-item").click(function () {
    var id = this.getAttribute("data-id");
    const response = toDeleteStorage(id, "lower", "delete");
    if (response) lowerRow(response);
    location.reload();
  });

  $(".select-lower-item").click(function () {
    var id = this.getAttribute("data-id");
    const response = toGetStorage(id, "lower", "select");
    toSendFront("lower", response, "lower", this.checked);
    checkUncheck(this, ".select-lower-item");
  });
})();
