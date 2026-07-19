document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  document.querySelectorAll(".dropdown-toggle").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      var item = btn.closest(".has-dropdown");
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".has-dropdown.open").forEach(function (openItem) {
        openItem.classList.remove("open");
        openItem.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".has-dropdown.open").forEach(function (openItem) {
      openItem.classList.remove("open");
      openItem.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
    });
  });
});
