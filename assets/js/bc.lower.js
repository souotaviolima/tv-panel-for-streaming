(() => {
  const renderList = (items) => {
    const container = document.getElementById("row-lower");
    if (!container) return;

    container.innerHTML = items.map((item, index) => {
      const count = index + 1;
      const color = item.identidade?.[0]?.primary || "#ccc";

      return `
        <li id="${item.id}" class="lower item">
          <div class="header">
            <span class="count" style="background-color: ${color}">${count}</span>
            <div class="actions">
              <button class="action remove-lower-item" data-id="${item.id}">
                <div class="main-icon icon icon-trash"></div>
              </button>
              <label class="action toggle-lower switch" style="width: 48px;">
                <input type="checkbox" class="select-lower-item" data-id="${item.id}" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="main">
            <h2 class="title">${escapeHTML(item.title)}</h2>
            <h3 class="description">${escapeHTML(item.subtitle)}</h3>
          </div>
        </li>
      `;
    }).join("");
  };

  const escapeHTML = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const refreshList = () => {
    const items = toGetStorages("lower");
    if (items?.length) renderList(items);
  };

  // Inicializa a lista ao carregar
  refreshList();

  // Formulário de cadastro
  $("#lower-form").submit(function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const identidade = toGetStorages("identidade");

    if (data && identidade) {
      const item = {
        title: data.title,
        tag: data.tag,
        subtitle: data.description,
        identidade,
      };

      const result = toCreateStorage("lower", item, "create");
      if (result) renderList(result);
    }

    e.target.reset(); // Limpa o formulário
  });

  // Delegação de eventos para remover item
  $(document).on("click", ".remove-lower-item", function () {
    const id = this.getAttribute("data-id");
    const result = toDeleteStorage(id, "lower", "delete");
    if (result) renderList(result);
  });

  // Delegação de eventos para marcar item
  $(document).on("change", ".select-lower-item", function () {
    const id = this.getAttribute("data-id");
    const selectedItem = toGetStorage(id, "lower", "select");

    if (this.checked) {
      // Desmarca os outros
      $(".select-lower-item").not(this).prop("checked", false);
  
      // Pega o item e envia
      toSendFront("lower", selectedItem, "lower", true);
    } else {
      // Se desmarcar, limpa
      toSendFront("lower", selectedItem, "lower", false);
    }
  });
  
})();
