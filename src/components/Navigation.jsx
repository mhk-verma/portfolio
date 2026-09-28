import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

// Magnetic button component
function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300 ${
          scrolled ? 'top-4' : 'top-6'
        }`}
      >
        <motion.div
          className={`glass rounded-full px-4 md:px-8 py-3 md:py-4 flex items-center gap-4 md:gap-8 transition-all duration-300 ${
            scrolled ? 'bg-black/80 backdrop-blur-xl border-[#CE4DDB]/30' : ''
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <motion.a 
            href="#" 
            className="text-lg md:text-xl font-bold text-gradient flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Code2 size={18} className="text-[#A59ADB] md:size-20" />
            <span className="hidden sm:inline">mhk codes</span>
          </motion.a>
          <div className="hidden md:flex items-center gap-4 md:gap-6">
            {navItems.map((item) => (
              <MagneticButton
                key={item.name}
                className="relative"
              >
                <a
                  href={item.href}
                  className={`text-xs md:text-sm font-medium transition-colors relative px-2 md:px-3 py-1 rounded-full ${
                    activeSection === item.href.substring(1)
                      ? 'text-[#A59ADB] bg-[#CE4DDB]/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#CE4DDB]/20 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </MagneticButton>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <MagneticButton
          onClick={() => setIsOpen(!isOpen)}
          className={`glass p-3 rounded-full transition-all duration-300 ${
            isOpen ? 'bg-[#CE4DDB]/20' : ''
          }`}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </MagneticButton>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <motion.a
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold text-gradient mb-8 flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Code2 size={28} className="text-[#A59ADB]" />
                mhk codes
              </motion.a>
              {navItems.map((item, index) => (
                <MagneticButton key={item.name}>
                  <motion.a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className={`text-xl md:text-2xl font-medium transition-colors px-4 md:px-6 py-2 rounded-full ${
                      activeSection === item.href.substring(1)
                        ? 'text-[#A59ADB] bg-[#CE4DDB]/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
