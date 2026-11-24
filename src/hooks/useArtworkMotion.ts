import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prepareArmArtwork } from "./armArtwork";

gsap.registerPlugin(ScrollTrigger);

export function useArtworkMotion() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("all", () => {
      if (window.scrollY === 0 && !window.location.hash) {
        gsap.from(".hero-copy", { opacity: 0.72, y: 9, duration: 0.65, ease: "power2.out" });
      }
      const distance = () => window.innerWidth <= 600 ? 11 : 24;
      const human = prepareArmArtwork(".hand-human canvas", "human");
      const robot = prepareArmArtwork(".hand-robot canvas", "robot");
      const hands = gsap.timeline({
        defaults: { duration: 1, ease: "sine.inOut" },
        scrollTrigger: {
          trigger: ".hero-scene",
          start: "clamp(top 17%)",
          end: () => "+=" + Math.round(window.innerHeight * 1.3),
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      hands
        .fromTo(".hand-human", { xPercent: () => -distance() }, { xPercent: 0, duration: 1.13 }, 0)
        .fromTo(".hand-robot", { xPercent: distance }, { xPercent: 0, duration: 1.13 }, 0.1)
        .fromTo(".human-shadow", { xPercent: () => -distance() / 0.34, scaleX: 0.78, opacity: 0.16 }, { xPercent: 0, scaleX: 1.12, opacity: 0.62 }, 0)
        .fromTo(".robot-shadow", { xPercent: () => distance() / 0.34, scaleX: 0.78, opacity: 0.16 }, { xPercent: 0, scaleX: 1.12, opacity: 0.62, duration: 0.9 }, 0.1)
        .fromTo(".hero-light", { opacity: 0 }, { opacity: 1 }, 0)
        .fromTo(".metal-shine", { opacity: 0 }, { opacity: 0.24, duration: 0.24 }, 0.62)
        .to(".metal-shine", { opacity: 0, duration: 0.25 }, 0.86)
        .fromTo(".hero-quote", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.38 }, 1.48)
        .to({}, { duration: 0.38 });
      if (human) {
        hands.fromTo(human.motion, { progress: 0 }, { progress: 1, ease: "none", duration: 1.35, onUpdate: human.draw }, 0.09);
      }
      if (robot) {
        hands.fromTo(robot.motion, { progress: 0 }, { progress: 1, ease: "none", duration: 1.28, onUpdate: robot.draw }, 0.16);
      }

      const table = gsap.timeline({
        defaults: { duration: 1, ease: "sine.out" },
        scrollTrigger: {
          trigger: ".table-scene",
          start: "top 9%",
          end: () => "+=" + Math.round(window.innerHeight * 3.5),
          pin: true,
          scrub: 0.45,
        },
      });
      const labels = gsap.utils.toArray<HTMLElement>(".guest-label");
      const objects = gsap.utils.toArray<HTMLElement>(".object-layer");
      objects.forEach((object, index) => {
        table.fromTo(object, { opacity: 0 }, { opacity: 1, duration: 0.65 }, 0.87 + index * 0.56);
      });
      gsap.utils.toArray<HTMLElement>(".guest-layer").forEach((layer, index) => {
        const start = 0.45 + index;
        const label = labels[index];
        table.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: 0.85 }, start);
        table.fromTo(label, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.27 }, start);
        if (index < labels.length - 1) {
          table.to(label, { opacity: 0, y: -6, duration: 0.22 }, start + 0.78);
        }
      });
      table.to(".table-scene-shadow", { opacity: 0.48, duration: 2.6 }, "-=2.2")
        .to({}, { duration: 0.65 });

      const landscape = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: ".landscape", start: "top bottom", end: "clamp(bottom 35%)", scrub: 0.45 },
      });
      landscape
        .fromTo('.landscape img[src$="nuvens.png"]', { xPercent: -6, yPercent: 3 }, { xPercent: 6, yPercent: -3 }, 0)
        .fromTo('.landscape img[src$="templo.png"]', { yPercent: 7 }, { yPercent: 0 }, 0)
        .fromTo(".landscape-logo", { yPercent: 12 }, { yPercent: 0 }, 0)
        .fromTo('.landscape img[src$="primeiro-plano.png"]', { yPercent: 14 }, { yPercent: 0 }, 0);

      const transitions = [
        [".edition", ".section-heading"],
        [".builders", ".builders-copy"],
        [".rhythm", ".rhythm-options"],
        [".final-scene", ".final-copy"],
      ];
      transitions.forEach(([trigger, content]) => {
        gsap.fromTo(content, { y: 22, opacity: 0.78 }, {
          y: 0,
          opacity: 1,
          ease: "sine.out",
          scrollTrigger: { trigger, start: "top 95%", end: "top 56%", scrub: 0.35 },
        });
      });
      ScrollTrigger.refresh();
      return () => {
        human?.dispose();
        robot?.dispose();
      };
    });
    return () => media.revert();
  }, []);
}
