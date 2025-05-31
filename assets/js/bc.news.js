(() => {
  const renderList = (items) => {
    const container = document.getElementById("row-news");
    if (!container) return;

    container.innerHTML = items
      .map((item, index) => {
        const count = index + 1;
        const color = item.identidade?.[0]?.primary || "#ccc";

        return `
        <li id="${item.id}" class="news item">
          <div class="header">
            <span class="count" style="background-color: ${color}">${count}</span>
            <div class="actions">
              <button class="action remove-news-item" data-id="${item.id}">
                <div class="main-icon icon icon-trash"></div>
              </button>
              <label class="action toggle-news switch" style="width: 48px;">
                <input type="checkbox" class="select-news-item" data-id="${
                  item.id
                }" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="main">
            <h2 class="title">${escapeHTML(item.news)}</h2>
          </div>
        </li>
      `;
      })
      .join("");
  };

  const escapeHTML = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const refreshList = () => {
    const items = toGetStorages("news");
    if (items?.length) renderList(items);
  };

  // Inicializa a lista ao carregar
  refreshList();

  // Formulário de cadastro
  $("#news-form").submit(function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const identidade = toGetStorages("identidade");

    if (data && identidade) {
      const item = {
        news: data.news,
        identidade,
      };

      const result = toCreateStorage("news", item, "create");
      if (result) renderList(result);
    }

    e.target.reset(); // Limpa o formulário
  });

  // Delegação de eventos para remover item
  $(document).on("click", ".remove-news-item", function () {
    const id = this.getAttribute("data-id");
    const result = toDeleteStorage(id, "news", "delete");
    if (result) renderList(result);
  });

  // Delegação de eventos para marcar item
  $(document).on("change", ".select-news-item", function () {
    const id = this.getAttribute("data-id");
    const selectedItem = toGetStorage(id, "news", "select");

    if (this.checked) {
      // Desmarca os outros
      $(".select-news-item").not(this).prop("checked", false);

      // Pega o item e envia
      toSendFront("news", selectedItem, "news", true);
    } else {
      // Se desmarcar, limpa
      toSendFront("news", selectedItem, "news", false);
    }
  });
})();
