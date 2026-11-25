(function () {
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll(".site-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  var video = document.querySelector(".hero__video");
  var play = document.querySelector(".hero__play");
  if (video && video.tagName === "VIDEO") {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var wide = window.matchMedia("(min-width: 1200px)").matches;
    var saveData = navigator.connection && navigator.connection.saveData;
    function showPaused() {
      if (!play) return;
      play.textContent = "Play film";
      play.setAttribute("aria-pressed", "false");
    }
    function showPlaying() {
      if (!play) return;
      play.textContent = "Pause film";
      play.setAttribute("aria-pressed", "true");
    }
    var source = video.querySelector("source");
    function keepFilmOff() {
      if (source && source.getAttribute("src")) {
        video.dataset.src = source.getAttribute("src");
        source.removeAttribute("src");
        video.removeAttribute("src");
        video.load();
      }
    }
    function keepFilmOn() {
      if (source && video.dataset.src && !source.getAttribute("src")) {
        source.src = video.dataset.src;
        video.load();
      }
    }
    if (!reduce && wide && !saveData) {
      var started = video.play();
      if (started && started.then) {
        started.then(showPlaying).catch(showPaused);
      } else {
        showPlaying();
      }
    } else {
      keepFilmOff();
      showPaused();
    }
    if (play) {
      play.addEventListener("click", function () {
        if (video.paused) {
          keepFilmOn();
          var playing = video.play();
          if (playing && playing.catch) {
            playing.catch(showPaused);
          }
          showPlaying();
        } else {
          video.pause();
          showPaused();
        }
      });
    }
  }

  var lightbox = null;
  document.addEventListener("click", function (event) {
    var link = event.target.closest("[data-lightbox]");
    if (link) {
      event.preventDefault();
      if (!lightbox) {
        lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.innerHTML = '<button type="button" class="lightbox__close">Close</button><img alt="">';
        document.body.appendChild(lightbox);
        lightbox.addEventListener("click", function (click) {
          if (click.target === lightbox || click.target.classList.contains("lightbox__close")) {
            lightbox.hidden = true;
          }
        });
      }
      lightbox.querySelector("img").src = link.getAttribute("href");
      lightbox.hidden = false;
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox) {
      lightbox.hidden = true;
    }
  });
})();
