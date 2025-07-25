import React, { useEffect, useState } from 'react';

const taglines = [
  "🧑‍💻 Transforming Ideas into Digital Reality — Seamlessly.",
  "👨‍💻 Your Brand. Our Code. Infinite Possibilities.",
  "🖨️ Let’s Build Something Great Together Today.",
  "📺 Where Strategy Meets Technology.",
  "👨‍💻 Smart Design Meets Scalable Web Development.",
  "👨‍💻 Your Vision, Our Code, One Powerful Platform.",
  "🖨️ Crafting Modern Interfaces with Powerful Backends.",
  "📺 Building Digital Brands That Inspire and Convert."

];

export default function TaglineRotator() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % taglines.length);
        setAnimate(false);
      }, 500); // same as animation
    }, 4000); // every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-2 bg-askus-purple/100 text-white flex justify-center items-center h10 overflow-hidden">
      <p
        className={`text-center text-sm sm:text-base font-semibold transition-all duration-500 ${
          animate ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {taglines[index]}
      </p>
    </section>
  );
}
