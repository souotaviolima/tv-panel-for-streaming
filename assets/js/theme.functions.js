function checkUncheck(value, selector) {
  var checks = document.querySelectorAll(selector);
  checks.forEach((c) => {
    !value.checked ? value.checked : (c.checked = c == value);
  });
}

$(".open-modal-function").click(function () {
  const idModal = this.getAttribute("data-id");
  const modal = document.getElementById(idModal);
  modal.classList.add("open");
});

$(".close-modal-function").click(function () {
  const idModal = this.getAttribute("data-id");
  const modal = document.getElementById(idModal);
  modal.classList.remove("open");
});

$(".clear-data-function").click(function () {
  localStorage.removeItem("logos");
  localStorage.removeItem("lower");
  localStorage.removeItem("identidade");
  location.reload();
});
