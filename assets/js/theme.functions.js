function checkUncheck(e, t) {
  document.querySelectorAll(t).forEach((t) => {
    e.checked ? (t.checked = t == e) : e.checked;
  });
}
$(".open-modal-function").click(function () {
  var e = this.getAttribute("data-id");
  document.getElementById(e).classList.add("open");
}),
  $(".close-modal-function").click(function () {
    var e = this.getAttribute("data-id");
    document.getElementById(e).classList.remove("open");
  }),
  $(".clear-data-function").click(function () {
    localStorage.removeItem("logos"),
      localStorage.removeItem("lower"),
      localStorage.removeItem("identidade"),
      location.reload();
  });
