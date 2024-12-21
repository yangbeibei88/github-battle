import { useEffect, useState } from "react";

export function Loading({ text = "Loading", speed = 300 }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const id = window.setInterval(() => {
      setContent((content) => {
        return content === `${text}...` ? text : `${content}.`;
      });
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <p className="absolute text-xl left-0 right-0 mt-5 text-center">
      {content}
    </p>
  );
}
