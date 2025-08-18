import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './button';

interface AnimatedCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const AnimatedCard = ({ 
  icon, 
  title, 
  description, 
  buttonText = "Learn More",
  onButtonClick 
}: AnimatedCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const tiltX = mousePosition.y / 10;
  const tiltY = -mousePosition.x / 10;

  return (
    <motion.div
      className="relative bg-card rounded-xl p-8 shadow-soft border border-border overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tiltX,
        rotateY: tiltY,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.1,
      }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      whileHover={{
        boxShadow: [
          "var(--shadow-soft)",
          "0 20px 40px hsl(var(--primary) / 0.1), 0 0 0 1px hsl(var(--accent) / 0.1)",
          "0 25px 50px hsl(var(--accent) / 0.15), 0 0 0 1px hsl(var(--accent) / 0.2)"
        ],
      }}
    >
      {/* Subtle glow background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.div
          className="flex justify-center mb-6"
          animate={{
            translateZ: isHovered ? 20 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        <motion.h3
          className="text-2xl font-bold mb-4 text-primary"
          animate={{
            translateZ: isHovered ? 15 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-muted-foreground mb-6 leading-relaxed"
          animate={{
            translateZ: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
        
        <motion.div
          animate={{
            translateZ: isHovered ? 25 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onButtonClick}
            className="group relative overflow-hidden"
            asChild
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">{buttonText}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};