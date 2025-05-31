(() => {
  const container = document.getElementById("identidade-header");

  const escapeHTML = (str) =>
    String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const renderIdentidades = (items) => {
    if (!container) return;

    container.innerHTML = items
      .map(
        (item) => `
      <div class="color-preview">
        <span class="color" style="background-color: ${escapeHTML(
          item.primary
        )}"></span>
      </div>
      <div class="actions">
        <a class="action remove-dentidade-item" data-id="${item.id}">
          <div class="main-icon icon icon-trash"></div>
        </a>
        <label class="action toggle-lower switch">
          <input type="checkbox" class="select-dentidade-item" data-id="${
            item.id
          }" />
          <span class="slider round"></span>
        </label>
      </div>
    `
      )
      .join("");
  };

  const refreshIdentidades = () => {
    const items = toGetStorages("identidade");
    if (items?.length) renderIdentidades(items);
  };

  // Renderiza ao carregar
  refreshIdentidades();

  // Envio do formulário
  $("#dentidade-form").submit(function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const newIdentidade = {
      primary: data.primary,
      secondary: data.secondary,
      tertiary: data.tertiary,
      quaternary: data.quaternary,
    };

    const result = toCreateStorage("identidade", newIdentidade, "create");

    if (result) renderIdentidades(result);

    e.target.reset();
  });

  // Delegação para remover item
  $(document).on("click", ".remove-dentidade-item", function () {
    const id = this.getAttribute("data-id");
    const updated = toDeleteStorage(id, "identidade", "delete");
    if (updated) renderIdentidades(updated);
  });

  // Marcar múltiplas identidades
  $(document).on("change", ".select-dentidade-item", function () {
    const checkboxes = $(".select-dentidade-item:checked");

    const selected = Array.from(checkboxes).map((cb) => {
      const id = cb.getAttribute("data-id");
      return toGetStorage(id, "identidade", "select");
    });

    toSendFront("identidade", selected, "identidade", !!selected.length);
  });
})();
