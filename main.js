const preloader = document.getElementById("preloader");
const loaderValue = document.getElementById("loaderValue");
const bottleLiquid = document.querySelector(".bottle-liquid");
const bottleOutline = document.querySelector(".bottle-outline");
const navbar = document.getElementById("navbar");
const cursor = document.querySelector(".cursor");

const updateLiquid = (value) => {
  const clamped = Math.min(Math.max(value, 0), 100);
  const height = clamped * 2.2;
  bottleLiquid.setAttribute("y", `${268 - height}`);
  bottleLiquid.setAttribute("height", `${height}`);
  loaderValue.textContent = `${Math.round(clamped)}%`;
};

const finishPreloader = () => {
  preloader.classList.add("hide");
  preloader.addEventListener("transitionend", () => preloader.remove());
};

if (window.gsap) {
  if (bottleOutline) {
    const outlineLength = bottleOutline.getTotalLength();
    gsap.set(bottleOutline, {
      strokeDasharray: outlineLength,
      strokeDashoffset: outlineLength
    });
  }

  const progress = { value: 0 };
  gsap.timeline({
    defaults: { ease: "power3.out" }
  })
    .to(".preloader__wrap", { opacity: 1, duration: 0.6 })
    .to(".preloader__logo", { opacity: 1, y: 0, duration: 0.6 }, "<")
    .to(".preloader__particles span", { opacity: 1, duration: 0.6, stagger: 0.08 }, "-=0.2")
    .to(".bottle-outline", { strokeDashoffset: 0, duration: 1.6, ease: "power2.out" }, "-=0.3")
    .to(progress, {
      value: 100,
      duration: 2.4,
      ease: "power2.out",
      onUpdate: () => updateLiquid(progress.value)
    }, "<")
    .to(".bottle-liquid", {
      filter: "url(#liquidGlow) drop-shadow(0 0 16px rgba(255,122,0,0.55))",
      duration: 0.8
    }, "-=0.6")
    .to(".preloader__sweep", { opacity: 0.6, xPercent: 120, duration: 1.4 }, "-=1.0")
    .to(".preloader__wrap", { opacity: 0, duration: 0.6 }, "+=0.2")
    .add(() => finishPreloader());
} else {
  let loadProgress = 0;
  const loaderTimer = setInterval(() => {
    loadProgress += 1;
    updateLiquid(loadProgress);
    if (loadProgress >= 100) {
      clearInterval(loaderTimer);
      setTimeout(finishPreloader, 400);
    }
  }, 28);
}

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

  const heroTimeline = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  heroTimeline
    .from([".eyebrow", ".hero__text", ".hero__actions"], {
      opacity: 0,
      y: 20,
      duration: 1.1,
      stagger: 0.1
    }, 0)
    .from(".hero__line", {
      opacity: 0,
      y: 26,
      duration: 1.2,
      stagger: 0.12
    }, 0.1)
    .from(".hero__line--accent", {
      opacity: 0,
      y: 30,
      duration: 1.3,
      delay: 0.2
    }, ">-0.2");

  gsap.to(".hero__video video", {
    scale: 1.05,
    duration: 18,
    ease: "none",
    repeat: -1,
    yoyo: true
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

  gsap.utils.toArray(".editorial__media, .fullscreen-media").forEach((media) => {
    const img = media.querySelector("img");
    const veil = media.querySelector(".editorial__veil");
    const sweep = media.querySelector(".editorial__sweep");
    const depth = Number(media.dataset.depth || 0.12);
    const drift = Number(media.dataset.drift || 0);
    const rotate = Number(media.dataset.rotate || 0);

    gsap.from(media, {
      opacity: 0,
      y: 36,
      scale: 0.98,
      rotate: rotate,
      duration: 1.3,
      ease: "power4.out",
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

    if (drift) {
      gsap.to(media, {
        x: drift,
        ease: "none",
        scrollTrigger: {
          trigger: media,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    gsap.fromTo(media, {
      scale: 0.98
    }, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: media,
        start: "top bottom",
        end: "bottom center",
        scrub: true
      }
    });

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

  gsap.utils.toArray(".editorial__phrase").forEach((phrase) => {
    gsap.fromTo(phrase, {
      opacity: 0,
      filter: "blur(6px)",
      y: 12
    }, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: phrase,
        start: "top 75%",
        end: "bottom 45%",
        scrub: true
      }
    });
  });

  const fullscreen = document.querySelector(".scene--fullscreen");
  const fullscreenImage = document.querySelector(".fullscreen-media img");
  const fullscreenText = document.querySelector(".editorial__overlay-text");

  if (fullscreen && fullscreenImage) {
    gsap.to(fullscreenImage, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: fullscreen,
        start: "top top",
        end: "+=140%",
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });

    if (fullscreenText) {
      gsap.fromTo(fullscreenText, {
        opacity: 0,
        y: 24,
        filter: "blur(8px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: fullscreen,
          start: "top 35%",
          end: "bottom 35%",
          scrub: true
        }
      });
    }
  }
}
