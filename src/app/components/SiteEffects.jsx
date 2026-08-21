"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "../loading.module.css";

export default function SiteEffects({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), 800);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    const sections = document.querySelectorAll('[class*="section"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((section) => {
      section.classList.add(styles.reveal);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={`${styles.preloader} ${!isLoading ? styles.preloaderHidden : ""}`}
        role="status"
        aria-label="Loading"
        aria-hidden={!isLoading}
      >
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
      {children}
    </>
  );
}