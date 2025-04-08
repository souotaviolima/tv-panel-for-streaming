(() => {
  const container = document.getElementById("row-logo");

  const escapeHTML = (str) =>
    str.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;");

  const renderLogos = (items) => {
    if (!container) return;

    container.innerHTML = items.map(item => `
      <li id="${item.id}" class="logo item">
        <div class="header">
          <span class="image">
            <img src="images/${escapeHTML(item.image)}" alt="" />
          </span>
        </div>
        <div class="main">
          <h2 class="title">${escapeHTML(item.title)}</h2>
        </div>
        <div class="actions">
          <a class="action remove-logo-item" data-id="${item.id}">
            <div class="main-icon icon icon-trash"></div>
          </a>
          <label class="action toggle-lower switch">
            <input type="checkbox" class="select-logo-item" data-id="${item.id}" />
            <span class="slider round"></span>
          </label>
        </div>
      </li>
    `).join("");
  };

  const refreshLogos = () => {
    const logos = toGetStorages("logo");
    if (logos?.length) renderLogos(logos);
  };

  // Inicialização
  refreshLogos();

  // Envio do formulário
  $("#logo-form").submit(function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const newLogo = {
      title: data.title,
      image: data.image.name
    };

    const result = toCreateStorage("logo", newLogo, "create");
    if (result) renderLogos(result);

    e.target.reset();
  });

  // Remoção de logo (event delegation)
  $(document).on("click", ".remove-logo-item", function () {
    const id = this.getAttribute("data-id");
    const result = toDeleteStorage(id, "logo", "delete");
    if (result) renderLogos(result);
  });

  // Seleção de logo
  $(document).on("change", ".select-logo-item", function () {
    const id = this.getAttribute("data-id");
    const logo = toGetStorage(id, "logo", "select");

    toSendFront("logo", logo, "logo", this.checked);
    checkUncheck(this, ".select-logo-item");
  });
})();
