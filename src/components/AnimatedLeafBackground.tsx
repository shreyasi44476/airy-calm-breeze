import { Leaf } from 'lucide-react';

const AnimatedLeafBackground = () => {
  const leaves = [
    { top: '10%', left: '5%', size: 16, delay: '0s', duration: '8s', opacity: 0.15 },
    { top: '25%', right: '8%', size: 20, delay: '2s', duration: '10s', opacity: 0.12 },
    { top: '45%', left: '3%', size: 14, delay: '4s', duration: '12s', opacity: 0.1 },
    { top: '60%', right: '5%', size: 18, delay: '1s', duration: '9s', opacity: 0.14 },
    { top: '80%', left: '10%', size: 12, delay: '3s', duration: '11s', opacity: 0.08 },
    { top: '15%', right: '15%', size: 10, delay: '5s', duration: '14s', opacity: 0.1 },
    { top: '70%', right: '12%', size: 16, delay: '2.5s', duration: '10s', opacity: 0.12 },
    { top: '35%', left: '8%', size: 14, delay: '6s', duration: '13s', opacity: 0.09 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf, index) => (
        <div
          key={index}
          className="absolute animate-float-leaf"
          style={{
            top: leaf.top,
            left: leaf.left,
            right: leaf.right,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
          }}
        >
          <Leaf 
            className="text-primary" 
            style={{ 
              width: leaf.size, 
              height: leaf.size,
              opacity: leaf.opacity,
            }} 
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedLeafBackground;
