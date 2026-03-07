import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./index.css";
import {
  IntroOverviewSection,
  IntroResultsSection,
  IntroSolutionsSection,
  IntroTechSection,
  IntroVideoSection,
} from "./sections";

export default function Intro() {
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const reactLogoRef = useRef<HTMLImageElement | null>(null);
  const laravelLogoRef = useRef<HTMLImageElement | null>(null);
  const centerLogoRef = useRef<HTMLImageElement | null>(null);
  const centerGlowRef = useRef<HTMLDivElement | null>(null);

  const techViewportRef = useRef<HTMLDivElement | null>(null);
  const techBaseSetRef = useRef<HTMLDivElement | null>(null);
  const [techCopies, setTechCopies] = useState(4);
  const [marqueeDistance, setMarqueeDistance] = useState(700);

  useEffect(() => {
    let rafId = 0;
    let previousTime = performance.now();
    let angle = 0;
    let progress = 0;
    let hovered = false;

    const baseSpeed = 0.75;
    const hoverSpeed = 2.2;
    const fusionDurationSec = 5;
    const orbitPathInsetPx = 16;
    const orbitCenterOffsetPx = 3.45;
    const referenceOrbitSizePx = 224;
    const minOrbitScale = 0.58;
    const maxOrbitScale = 1.05;
    const compactOrbitReferencePx = 230;
    const minCompactFactor = 0.72;
    const minLogoScale = 0.05;
    const centerMaxScale = 3.45;

    const onEnter = () => {
      hovered = true;
    };

    const onLeave = () => {
      hovered = false;
    };

    const orbitEl = orbitRef.current;
    orbitEl?.addEventListener("mouseenter", onEnter);
    orbitEl?.addEventListener("mouseleave", onLeave);

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - previousTime) / 1000);
      previousTime = now;

      if (hovered) {
        progress = Math.min(1, progress + dt / fusionDurationSec);
      } else {
        progress = Math.max(0, progress - dt / fusionDurationSec);
      }

      const currentSpeed = baseSpeed + (hoverSpeed - baseSpeed) * progress;
      angle += currentSpeed * dt;

      const orbitSize = orbitEl?.clientWidth ?? 224;
      const maxRadius = Math.max(
        0,
        orbitSize / 2 - orbitPathInsetPx + orbitCenterOffsetPx,
      );
      const radius = maxRadius * (1 - progress);
      const orbitScale = Math.min(
        maxOrbitScale,
        Math.max(minOrbitScale, orbitSize / referenceOrbitSizePx),
      );
      const compactOrbitFactor = Math.min(
        1,
        Math.max(minCompactFactor, orbitSize / compactOrbitReferencePx),
      );
      const logoScale =
        (1 - (1 - minLogoScale) * progress) * orbitScale * compactOrbitFactor;
      const logoOpacity = 1 - progress;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (reactLogoRef.current) {
        reactLogoRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${logoScale})`;
        reactLogoRef.current.style.opacity = `${logoOpacity}`;
      }

      if (laravelLogoRef.current) {
        laravelLogoRef.current.style.transform = `translate(-50%, -50%) translate(${-x}px, ${-y}px) scale(${logoScale})`;
        laravelLogoRef.current.style.opacity = `${logoOpacity}`;
      }

      if (centerLogoRef.current) {
        const centerScale = 1 + (centerMaxScale - 1) * progress;
        centerLogoRef.current.style.transform = `translate(-50%, -50%) scale(${centerScale})`;
      }

      if (centerGlowRef.current) {
        centerGlowRef.current.style.opacity = `${1 - progress}`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      orbitEl?.removeEventListener("mouseenter", onEnter);
      orbitEl?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const recalculateTechMarquee = () => {
      const viewportWidth = techViewportRef.current?.clientWidth ?? 0;
      const baseWidth = techBaseSetRef.current?.scrollWidth ?? 0;

      if (!viewportWidth || !baseWidth) return;

      const copies = Math.max(
        4,
        Math.ceil((viewportWidth * 2) / baseWidth) + 2,
      );
      setTechCopies(copies);
      setMarqueeDistance(baseWidth);
    };

    recalculateTechMarquee();

    const observer = new ResizeObserver(recalculateTechMarquee);
    if (techViewportRef.current) observer.observe(techViewportRef.current);
    if (techBaseSetRef.current) observer.observe(techBaseSetRef.current);

    window.addEventListener("resize", recalculateTechMarquee);
    window.addEventListener("load", recalculateTechMarquee);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", recalculateTechMarquee);
      window.removeEventListener("load", recalculateTechMarquee);
    };
  }, []);

  const techMarqueeStyle = {
    "--marquee-distance": `${marqueeDistance}px`,
    "--marquee-duration": `${Math.max(16, marqueeDistance / 42)}s`,
  } as CSSProperties;

  return (
    <main className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#019c7c] via-[#012e25] to-[#07132a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_42%)]" />

      <section className="relative z-10 mx-auto flex w-full max-w-[2200px] flex-col px-4 py-10 sm:px-6 sm:py-12 lg:px-8 xl:px-10 2xl:px-12 min-[1800px]:max-w-none min-[1800px]:px-[4vw] min-[2200px]:px-[5vw]">
        <div className="w-full">
          <div className="intro-layout">
            <div className="intro-column intro-column-left">
              <IntroOverviewSection
                orbitRef={orbitRef}
                reactLogoRef={reactLogoRef}
                laravelLogoRef={laravelLogoRef}
                centerLogoRef={centerLogoRef}
                centerGlowRef={centerGlowRef}
              />

              <IntroTechSection
                techViewportRef={techViewportRef}
                techBaseSetRef={techBaseSetRef}
                techCopies={techCopies}
                techMarqueeStyle={techMarqueeStyle}
              />
            </div>

            <div className="intro-column intro-column-right">
              <IntroVideoSection />

              <div className="intro-cluster">
                <IntroSolutionsSection />
                <IntroResultsSection />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
