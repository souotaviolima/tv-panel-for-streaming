(() => {
  const container = document.getElementById("identidade-header");

  const escapeHTML = (str) =>
    str.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;");

  const renderIdentidades = (items) => {
    if (!container) return;

    container.innerHTML = items.map(item => `
      <div class="image-preview">
        <img id="${item.id}" src="images/${escapeHTML(item.image)}" class="image" />
      </div>
      <div class="color-preview">
        <span class="color" style="background-color: ${escapeHTML(item.color)}"></span>
      </div>
      <div class="actions">
        <a class="action remove-dentidade-item" data-id="${item.id}">
          <div class="main-icon icon icon-trash"></div>
        </a>
        <label class="action toggle-lower switch">
          <input type="checkbox" class="select-dentidade-item" data-id="${item.id}" />
          <span class="slider round"></span>
        </label>
      </div>
    `).join("");
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
      color: data.color,
      image: data.image.name
    };

    const current = toGetStorages("identidade");
    if (newIdentidade && current.length < 1) {
      const result = toCreateStorage("identidade", newIdentidade, "create");
      if (result) renderIdentidades(result);
    }

    e.target.reset();
  });

  // Delegação para remover item
  $(document).on("click", ".remove-dentidade-item", function () {
    const id = this.getAttribute("data-id");
    const updated = toDeleteStorage(id, "identidade", "delete");
    if (updated) renderIdentidades(updated);
  });

  $(document).on("change", ".select-dentidade-item", function () {
    const id = this.getAttribute("data-id");
  
    if (this.checked) {
      // Desmarcar todos os outros
      $(".select-dentidade-item").not(this).prop("checked", false);
  
      // Enviar item selecionado
      const selected = toGetStorage(id, "identidade", "select");
      toSendFront("identidade", selected, "identidade", true);
    } else {
      // Se o usuário desmarcar o item, limpa tudo
      toSendFront("identidade", [], "identidade", false);
    }
  });
  

})();
