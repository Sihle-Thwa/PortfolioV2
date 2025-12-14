"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = false,
  } = options;

  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const elementRef = useRef<T>(null);
  const frozen = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !element || frozen.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);

        if (entry.isIntersecting && freezeOnceVisible) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return {
    ref: elementRef,
    entry,
    isIntersecting: !!entry?.isIntersecting,
    isVisible: !!entry?.isIntersecting,
  };
}

export function useIsVisible<T extends Element>(
  options: UseIntersectionObserverOptions = {}
) {
  const { isVisible, ref } = useIntersectionObserver<T>(options);
  return { isVisible, ref };
}

export function useScrollAnimation<T extends Element>(
  animationClass: string = "animate-fade-in"
) {
  const { isVisible, ref } = useIntersectionObserver<T>({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible && !shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [isVisible, shouldAnimate]);

  return {
    ref,
    className: shouldAnimate ? animationClass : "opacity-0",
  };
}