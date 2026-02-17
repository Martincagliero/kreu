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
  cursor.style.boxShadow = `0 0 12px rgba(255, 122, 0, 0.6), inset 0 0 8px rgba(255, 200, 100, 0.3)`;
});

window.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
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

  const heroLines = Array.from(document.querySelectorAll(".hero__line"));
  const accentLine = document.querySelector(".hero__line--accent");
  const orderedLines = accentLine
    ? heroLines.filter((line) => line !== accentLine).concat(accentLine)
    : heroLines;

  heroTimeline
    .from([".eyebrow", ".hero__text", ".hero__actions"], {
      opacity: 0,
      y: 20,
      duration: 1.1,
      stagger: 0.1
    }, 0)
    .from(orderedLines, {
      opacity: 0,
      y: 26,
      duration: 1.2,
      stagger: 0.12
    }, ">-0.2");

  gsap.to(".hero__video video", {
    scale: 1.05,
    duration: 18,
    ease: "none",
    repeat: -1,
    yoyo: true
  });

  // Hero gradient pulse and light reflections
  gsap.to(".hero__gradient", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".hero__gradient", {
          opacity: 0.3 + Math.sin(progress * Math.PI) * 0.3
        });
      }
    }
  });

  // Light reflections glow synced with scroll
  gsap.to(".reflection", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top 30%",
      end: "bottom -20%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.utils.toArray(".reflection").forEach((reflection, idx) => {
          const intensity = 0.3 + Math.sin(progress * Math.PI + idx) * 0.4;
          gsap.set(reflection, {
            opacity: intensity
          });
        });
      }
    }
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

  // Bottle section - Advanced animations
  // Halo double-layer intensity with scroll
  gsap.to(".bottle-halo, .bottle-halo--secondary", {
    scrollTrigger: {
      trigger: ".bottle-section",
      start: "top 50%",
      end: "bottom 50%",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const pulseIntensity = 0.4 + Math.sin(progress * Math.PI * 2) * 0.35;
        gsap.set(".bottle-halo", {
          opacity: pulseIntensity * 0.6
        });
        gsap.set(".bottle-halo--secondary", {
          opacity: pulseIntensity * 0.3
        });
      }
    }
  });

  // Bottle light reflection flow synced with scroll
  gsap.to(".bottle-light-reflection", {
    scrollTrigger: {
      trigger: ".bottle-section",
      start: "top 45%",
      end: "bottom 55%",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        const rotationY = Math.sin(progress * Math.PI * 3) * 60;
        const opacity = 0.2 + Math.sin(progress * Math.PI * 2) * 0.2;
        gsap.set(".bottle-light-reflection", {
          rotationY: rotationY,
          opacity: opacity
        });
      }
    }
  });

  // Bottle breathing levitation synced with scroll
  gsap.to(".bottle-img", {
    scrollTrigger: {
      trigger: ".bottle-section",
      start: "top 50%",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const moveY = Math.sin(progress * Math.PI * 3) * 12;
        const scaleEffect = 0.99 + Math.cos(progress * Math.PI * 2) * 0.02;
        gsap.set(".bottle-img", {
          y: moveY,
          scale: scaleEffect,
          opacity: 0.92 + Math.cos(progress * Math.PI * 2) * 0.08
        });
      }
    }
  });

  // Extended breathing animation (time-based)
  gsap.to(".bottle-img", {
    y: -14,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Keyword glow enhancement
  gsap.to(".keyword-glow", {
    scrollTrigger: {
      trigger: ".bottle-section",
      start: "top 45%",
      end: "bottom 55%",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.utils.toArray(".keyword-glow").forEach((keyword) => {
          const glowIntensity = 8 + progress * 14;
          const opacity = 0.35 + progress * 0.5;
          keyword.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(255, 122, 0, ${opacity}))`;
        });
      }
    }
  });

  gsap.to(".hero__glow", {
    y: -20,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      scrub: true
    }
  });

  // Enhanced Editorial Section Animations
  gsap.from(".editorial__line-animated", {
    yPercent: 120,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".editorial__intro",
      start: "top 85%"
    }
  });

  gsap.from(".editorial__subtitle", {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".editorial__intro",
      start: "top 85%",
      delay: 0.2
    }
  });

  // Keyword highlight glow sync with scroll
  gsap.to(".keyword-highlight", {
    scrollTrigger: {
      trigger: ".editorial__intro",
      start: "top 80%",
      end: "bottom 50%",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.utils.toArray(".keyword-highlight").forEach((keyword) => {
          const glowIntensity = 3 + progress * 8;
          keyword.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(255, 122, 0, ${0.2 + progress * 0.4}))`;
        });
      }
    }
  });

  // Watermark rotation parallax
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

  // Halo glow connection to article visibility
  gsap.to(".editorial__halo-glow", {
    scrollTrigger: {
      trigger: ".editorial",
      start: "top 60%",
      end: "bottom 40%",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const intensity = 0.3 + Math.sin(progress * Math.PI * 2) * 0.4;
        gsap.set(".editorial__halo-glow", {
          opacity: intensity
        });
      }
    }
  });

  // Light stream animation
  gsap.to(".editorial__light-stream", {
    scrollTrigger: {
      trigger: ".editorial",
      start: "top 40%",
      end: "bottom 60%",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        const yOffset = Math.sin(progress * Math.PI * 3) * 100;
        const opacity = 0.2 + Math.sin(progress * Math.PI) * 0.3;
        gsap.set(".editorial__light-stream", {
          y: yOffset,
          opacity: opacity
        });
      }
    }
  });

  // Editorial scene animations with scroll trigger
  gsap.utils.toArray(".editorial__scene").forEach((scene, idx) => {
    gsap.from(scene, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scene,
        start: "top 85%",
        once: false
      }
    });

    // Stagger scene title and description
    const title = scene.querySelector(".scene__title");
    const description = scene.querySelector(".scene__description");
    
    if (title) {
      gsap.from(title, {
        opacity: 0,
        y: 16,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scene,
          start: "top 85%"
        },
        delay: 0.15
      });
    }

    if (description) {
      gsap.from(description, {
        opacity: 0,
        y: 16,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scene,
          start: "top 85%"
        },
        delay: 0.3
      });
    }
  });

  // Keyword glow text animation
  gsap.to(".keyword-glow-text", {
    scrollTrigger: {
      trigger: ".editorial",
      start: "top 50%",
      end: "bottom 50%",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.utils.toArray(".keyword-glow-text").forEach((keyword) => {
          const glowIntensity = 4 + progress * 10;
          const opacity = 0.25 + progress * 0.35;
          keyword.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(255, 122, 0, ${opacity}))`;
        });
      }
    }
  });

  // Phrase animations
  gsap.utils.toArray(".editorial__phrase-animated").forEach((phrase) => {
    gsap.from(phrase, {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: phrase,
        start: "top 80%"
      }
    });
  });

  // Enhanced media animations with parallax
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

  // Advanced cursor interactions - change size on hover
  const buttons = document.querySelectorAll(".btn, .nav a, button");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      cursor.style.width = "48px";
      cursor.style.height = "48px";
      cursor.style.borderWidth = "2px";
      cursor.style.boxShadow = "0 0 20px rgba(255, 122, 0, 0.8), inset 0 0 10px rgba(255, 200, 100, 0.4)";
    });
    btn.addEventListener("mouseleave", () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
      cursor.style.borderWidth = "1.5px";
      cursor.style.boxShadow = "0 0 8px rgba(255, 122, 0, 0.3), inset 0 0 4px rgba(255, 200, 100, 0.2)";
    });
  });

  // Parallax depth effect on entire page
  gsap.utils.toArray("section").forEach((section, idx) => {
    const depth = 0.08 + idx * 0.02;
    gsap.to(section, {
      y: (window.innerHeight * depth),
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const yValue = self.progress * 80;
          gsap.set(section, { y: yValue });
        }
      }
    });
  });

  // Scroll-triggered text glow enhancements
  gsap.utils.toArray(".section-title, h3").forEach((title) => {
    gsap.fromTo(title, {
      opacity: 0,
      x: -20,
      filter: "blur(4px)"
    }, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      ease: "power3.out",
      duration: 0.8,
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        once: false
      }
    });
  });
}


