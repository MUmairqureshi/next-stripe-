"use client";

import React, { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";

const BasicAnimationLayout = ({ children }: { children: React.ReactNode }) => {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    document.body.classList.remove("noJS");
    let ctx = gsap.context(() => {
      const storyTimeline = gsap.timeline()

      gsap.set("section.scene img", {
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
        .to("section.scene img", {x: "0vh", duration: 20, ease: "linear"}, "endScene")

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
