(() => {
  function logoRow(data) {
    const preview_logo = document.getElementById("row-logo");
    let linitials = [];
    for (var i = 0, len = data.length; i < len; ++i) {
      var logo =
        '<li id="' +
        data[i].id +
        '" class="logo item"><div class="header"><span class="image">' +
        '<img src="images/' +
        data[i].image +
        '" alt=""/></span></div>' +
        '<div class="main"><h2 class="title">' +
        data[i].title +
        '</h2></div><div class="actions">' +
        '<a class="action remove-logo-item" data-type="delete" data-id="' +
        data[i].id +
        '"><div class="main-icon icon icon-trash"></div></a>' +
        '<label class="action toggle-lower switch"><input value="false" type="checkbox" class="select-logo-item" data-type="select" data-id="' +
        data[i].id +
        '"/><span class="slider round">' +
        "</span></label></div></li>";
      linitials.push(logo);
    }
    if (preview_logo) preview_logo.innerHTML = linitials;
  }

  if (toGetStorages("logo").length > 0) {
    var logo = toGetStorages("lower");
    lowerRow(logo);
  }

  $("#logo-form").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var formProps = Object.fromEntries(formData);
    var data = {
      title: formProps.title,
      image: formProps.image.name,
    };
    if (data) {
      const response = toCreateStorage("logo", data, "create");
      if (response) logoRow(response);
    }
  });

  $(".remove-logo-item").click(function () {
    var id = this.getAttribute("data-id");
    const response = toDeleteStorage(id, "logo", "delete");
    if (response) logoRow(response);
  });

  $(".select-logo-item").click(function () {
    var id = this.getAttribute("data-id");
    const response = toGetStorage(id, "logo", "select");
    toSendFront("logo", response, "logo", this.checked);
    checkUncheck(this, ".select-logo-item");
  });
})();
