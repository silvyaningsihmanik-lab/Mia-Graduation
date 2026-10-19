
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");

let revealObserver = null;

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(
    "#invitation .reveal"
  );

  if (revealObserver) {
    revealObserver.disconnect();
  }

  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element) => {
      element.classList.remove("visible");
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }
}

openButton.addEventListener("click", () => {
  invitation.classList.remove("locked");
  opening.classList.add("hide");
  document.body.classList.remove("no-scroll");

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

  setupRevealAnimations();
});

closeButton.addEventListener("click", () => {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }

  opening.classList.remove("hide");
  invitation.classList.add("locked");
  document.body.classList.add("no-scroll");

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

  document.querySelectorAll("#invitation .reveal").forEach((element) => {
    element.classList.remove("visible");
  });
});

document.body.classList.add("no-scroll");
