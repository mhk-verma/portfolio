import { motion } from 'framer-motion';
import { ArrowRight, Github, Mail } from 'lucide-react';
import { personalData } from '../data/personal';

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0505]" />
      
      {/* Burgundy accent area */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#8B0000]/20 to-transparent" />
      
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-[#A52A2A] font-medium mb-2">Hello, I'm</p>
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="text-gradient">Mahak</span>
                <br />
                <span className="text-white">Verma</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-300 font-light"
            >
              {personalData.title}
            </motion.p>

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
              <a
                href="#projects"
                className="group glass px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#8B0000]/20 transition-all duration-300"
              >
                View Projects
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a
                href={personalData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#8B0000]/20 transition-all duration-300"
              >
                <Github size={20} />
                GitHub
              </a>
              <a
                href={`mailto:${personalData.email}`}
                className="glass px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#8B0000]/20 transition-all duration-300"
              >
                <Mail size={20} />
                Contact
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(139, 0, 0, 0.3)',
                    '0 0 100px rgba(139, 0, 0, 0.5)',
                    '0 0 60px rgba(139, 0, 0, 0.3)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8B0000]/30 to-transparent blur-2xl"
              />

              {/* Portrait container */}
              <div className="relative w-80 h-96 md:w-96 md:h-[500px]">
                <img
                  src="/images/hero-portrait.png"
                  alt="Mahak Verma"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-[#8B0000]/20 to-black flex items-center justify-center rounded-2xl border-2 border-[#8B0000]/30">
                        <div class="text-center">
                          <div class="text-6xl font-bold text-gradient mb-2">MV</div>
                          <p class="text-gray-400">Add your photo</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-24 h-24 border border-[#8B0000]/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-32 h-32 border border-[#8B0000]/20 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-[#A52A2A] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
