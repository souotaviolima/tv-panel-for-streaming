function checkUncheck(selected, selector) {
  document.querySelectorAll(selector).forEach((input) => {
    input.checked = input === selected;
  });
}

// Abrir modal
$(document).on("click", ".open-modal-function", function () {
  const modalId = this.getAttribute("data-id");
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("open");
});

// Fechar modal
$(document).on("click", ".close-modal-function", function () {
  const modalId = this.getAttribute("data-id");
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
});

// Limpar localStorage
$(document).on("click", ".clear-data-function", function () {
  ["logos", "lower", "identidade"].forEach((key) => localStorage.removeItem(key));
  location.reload();
});
