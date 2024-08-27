import { useEffect, useRef } from 'react';

const DraggableWrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const objectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const object = objectRef.current!

    const handleMouseEnter = () => {
      object.style.transform = 'scale(1.2)';
    };

    const handleMouseLeave = () => {
      object.style.transform = 'scale(1)';
    };

    const handleMouseMove = (e: MouseEvent) => {
      const boxRect = object.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const offsetX = (mouseX - (boxRect.left + boxRect.width / 2)) / 5;
      const offsetY = (mouseY - (boxRect.top + boxRect.height / 2)) / 5;

      object.style.transform = `scale(1.2) translate(${offsetX}px, ${offsetY}px)`;
    };

    object.addEventListener('mouseenter', handleMouseEnter);
    object.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      object.removeEventListener('mouseenter', handleMouseEnter);
      object.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={objectRef} style={{ display: 'inline-block', transition: 'transform 0.1s ease' }}>
      {children}
    </div>
  );
};

export default DraggableWrapper;