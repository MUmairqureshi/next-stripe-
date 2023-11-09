"use client";
import React, { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";

const BasicAnimationLayout = ({ children }: { children: React.ReactNode }) => {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    document.body.classList.remove("noJS");

    let ctx = gsap.context(() => {
      const storyTimeline = gsap.timeline()

      gsap.set("section.scene .img", {
        x: (index) => {
          return (index * 100 + 360) + "vh"
        }
      })

      storyTimeline
        .to("section.intro", {opacity: 0, delay: 2})
        .addLabel("startScene")
        .set("section.scene", {opacity: 1}, "startScene")
        .addLabel("endScene")
        // .to("section.intro", {opacity: 0, delay: 1})
        .to("section.scene .img", {x: "0vh", duration: 20, ease: "linear"}, "endScene")

        storyTimeline.pause();
        let update: number | undefined;

        window.addEventListener("scroll", function(){
          const pixels = window.pageYOffset;
          const currentTime = pixels / 300;

          if (update !== undefined) {
            cancelAnimationFrame(update);
          }
          
          update = requestAnimationFrame(function(){
            storyTimeline.seek(currentTime);
          });
        });

        /* CLOUDS TIMELINE ==============*/
        const cloudsTimeline = gsap.timeline({ repeat: -1 })
        const clouds = document.querySelectorAll('g#cloud1, g#cloud2, g#cloud3, g#cloud4, g#cloud5, g#cloud6')

        cloudsTimeline
          .set(clouds, { y: 0 })
          .to(clouds, { y: 5, duration: 2})
          .to(clouds, { y: 0, duration: 2, delay: 0.1 })

      return () => ctx.revert();
    }, root);
  }, []);

  return (
    <main ref={root} style={{ opacity: 0 }} >
      {children}
    </main>
  );
};

export default BasicAnimationLayout;