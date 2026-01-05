"use client";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import "./header.css";
import { Menu } from "lucide-react";


export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  // Simplified theme for mobile menu only

  return (
    <div className="header-container">
      <div className="header-content">
        {!isMobile && (
          <div className="header-navigation">
            <Navigation />
          </div>
        )}

        {isMobile && (
          <button
            className="header-mobile-menu-button"
            onClick={(): void => setIsMobile(true)}
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      
    </div>
  );
}
