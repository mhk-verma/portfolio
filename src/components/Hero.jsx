import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Mail, Code2, Zap, Sparkles } from 'lucide-react';
import { personalData } from '../data/personal';
import { useState, useEffect } from 'react';
import heroImage from '../assets/hero.png';

// Particle effect component
function Particles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#CE4DDB]/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [1, 0, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Typing animation component
function TypingAnimation({ text, className = "" }) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    let timeout;

    const typeText = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
        timeout = setTimeout(typeText, 100);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setDisplayText('');
          index = 0;
          setIsTyping(true);
          timeout = setTimeout(typeText, 500);
        }, 2000);
      }
    };

    typeText();

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-8 bg-[#A59ADB] ml-1"
      />
    </span>
  );
}

// 3D Tilt card component
function TiltCard({ children, className = "" }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      animate={{
        rotateX,
        rotateY
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center px-4 md:px-6">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1A1A1A] to-[#2E2D2D]" />
      
      {/* Background effects - desktop only for mobile performance */}
      <div className="hidden md:block">
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#CE4DDB]/30 to-transparent"
        />
        <motion.div 
          style={{ y: y2, opacity }}
          className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-gradient-to-r from-[#A59ADB]/20 to-transparent"
        />
      </div>
      
      {/* Particle effects - desktop only for performance */}
      <div className="hidden md:block">
        <Particles />
      </div>
      
      {/* Animated floating elements - desktop only */}
      <div className="hidden md:block">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#CE4DDB]/20 rounded-full blur-3xl"
        />
      </div>
      
      <div className="hidden md:block">
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#A59ADB]/15 rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-4 md:px-6 py-16 md:py-20 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Enhanced Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#CE4DDB] to-[#A59ADB]"
              />
              <p className="text-[#A59ADB] font-medium mb-4 flex items-center gap-2">
                <Sparkles size={16} className="animate-pulse" />
                Hello, I'm
              </p>
              <h1 className="text-7xl md:text-9xl font-bold mb-4">
                <span className="text-gradient">Mahak</span>
                <br />
                <motion.span 
                  className="text-white"
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(255,255,255,0.1)',
                      '0 0 40px rgba(139,0,0,0.3)',
                      '0 0 20px rgba(255,255,255,0.1)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Verma
                </motion.span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <Code2 className="text-[#A59ADB] animate-pulse" size={24} />
              <TypingAnimation 
                text={personalData.title}
                className="text-2xl md:text-4xl text-gray-300 font-light"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-400 max-w-lg leading-relaxed"
            >
              {personalData.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full font-medium flex items-center gap-2 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#CE4DDB] to-[#A59ADB]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                />
                <span className="relative flex items-center gap-2 text-white">
                  View Projects
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </span>
              </motion.a>
              
              <motion.a
                href={personalData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#CE4DDB]/20 transition-all duration-300"
              >
                <Github size={20} />
                GitHub
              </motion.a>
              
              <motion.a
                href={`mailto:${personalData.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#CE4DDB]/20 transition-all duration-300"
              >
                <Mail size={20} />
                Contact
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-8 pt-4"
            >
              <div className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-gradient"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  6+
                </motion.div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-gradient"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  3+
                </motion.div>
                <div className="text-gray-400 text-sm">Years Exp</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-gradient"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  100%
                </motion.div>
                <div className="text-gray-400 text-sm">Dedication</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Enhanced Portrait with 3D effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <TiltCard className="relative">
              {/* Enhanced glow effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(139, 0, 0, 0.4)',
                    '0 0 120px rgba(139, 0, 0, 0.6)',
                    '0 0 60px rgba(139, 0, 0, 0.4)',
                  ],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#CE4DDB]/40 to-transparent blur-3xl"
              />

              {/* Portrait container with enhanced styling */}
              <div className="relative w-80 h-96 md:w-96 md:h-[500px] flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <img 
                    src={heroImage} 
                    alt="Mahak Verma" 
                    className="w-full h-full object-contain relative z-10"
                    style={{ maxWidth: '250px', height: 'auto' }}
                  />
                  
                  {/* Animated border ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-[#CE4DDB]/30 rounded-full"
                    style={{ padding: '10px' }}
                  />
                </motion.div>
              </div>

              {/* Enhanced decorative elements */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-8 -right-8 w-32 h-32 border border-[#CE4DDB]/40 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-8 -left-8 w-40 h-40 border border-[#A59ADB]/30 rounded-full"
              />
              
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 glass px-4 py-2 rounded-full text-sm"
              >
                <Zap size={16} className="inline mr-2 text-[#A59ADB]" />
                <span className="text-gray-300">Available</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-0 left-0 glass px-4 py-2 rounded-full text-sm"
              >
                <Sparkles size={16} className="inline mr-2 text-[#A59ADB]" />
                <span className="text-gray-300">Creative</span>
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-12 border-2 border-gray-600 rounded-full flex justify-center pt-2 cursor-pointer hover:border-[#A59ADB] transition-colors"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-4 bg-gradient-to-b from-[#CE4DDB] to-[#A59ADB] rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
