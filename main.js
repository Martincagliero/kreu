const preloader = document.getElementById("preloader");
const loaderValue = document.getElementById("loaderValue");
const bottleLiquid = document.querySelector(".bottle-liquid");
const navbar = document.getElementById("navbar");
const cursor = document.querySelector(".cursor");

let loadProgress = 0;

const updatePreloader = () => {
  loadProgress += 1;
  const height = Math.min(loadProgress, 100) * 2.2;
  bottleLiquid.setAttribute("y", `${268 - height}`);
  bottleLiquid.setAttribute("height", `${height}`);
  loaderValue.textContent = `${loadProgress}%`;

  if (loadProgress >= 100) {
    bottleLiquid.style.filter = "url(#liquidGlow) drop-shadow(0 0 12px rgba(255,122,0,0.6))";
    setTimeout(() => {
      preloader.classList.add("hide");
      preloader.addEventListener("transitionend", () => preloader.remove());
    }, 400);
    clearInterval(loaderTimer);
  }
};

const loaderTimer = setInterval(updatePreloader, 26);

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

window.addEventListener("mousemove", (event) => {
  cursor.style.opacity = "1";
  cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.15;
  hero.style.transform = `translateY(${offset}px)`;
});

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero__content > *", {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
    duration: 1.2,
    stagger: 0.12,
    ease: "power2.out",
    delay: 0.2
  });

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%"
      }
    });
  });

  gsap.to(".bottle-img", {
    y: -12,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".hero__glow", {
    y: -20,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      scrub: true
    }
  });

  gsap.from(".editorial__line", {
    yPercent: 120,
    opacity: 0,
    duration: 1.1,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".editorial__intro",
      start: "top 80%"
    }
  });

  gsap.from(".editorial__subtitle", {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".editorial__intro",
      start: "top 80%"
    }
  });

  gsap.to(".editorial__watermark img", {
    rotate: 2,
    opacity: 0.03,
    ease: "none",
    scrollTrigger: {
      trigger: ".editorial",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.utils.toArray(".editorial__media, .fragment__piece, .editorial__fullscreen-media").forEach((media) => {
    const img = media.querySelector("img");
    const veil = media.querySelector(".editorial__veil");
    const sweep = media.querySelector(".editorial__sweep");
    const depth = Number(media.dataset.depth || 0.12);

    gsap.from(media, {
      opacity: 0,
      y: 36,
      scale: 0.98,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: media,
        start: "top 80%"
      }
    });

    if (veil) {
      gsap.fromTo(veil, {
        xPercent: 0
      }, {
        xPercent: 110,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: media,
          start: "top 80%"
        }
      });
    }

    if (sweep) {
      gsap.fromTo(sweep, {
        xPercent: -120,
        opacity: 0
      }, {
        xPercent: 120,
        opacity: 0.8,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: media,
          start: "top 80%"
        }
      });
    }

    if (img) {
      gsap.to(img, {
        y: -80 * depth,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: media,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    if (media.classList.contains("clip-animate")) {
      const targetClip = getComputedStyle(media).clipPath;
      if (targetClip === "none") {
        return;
      }
      gsap.fromTo(media, {
        clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"
      }, {
        clipPath: targetClip,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: media,
          start: "top 85%"
        }
      });
    }
  });

  const fullscreen = document.querySelector(".editorial__fullscreen");
  const fullscreenImage = document.querySelector(".editorial__fullscreen-media img");

  if (fullscreen && fullscreenImage) {
    gsap.to(fullscreenImage, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: fullscreen,
        start: "top top",
        end: "+=120%",
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });
  }
}
