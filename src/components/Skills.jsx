import { motion, useScroll, useTransform } from 'framer-motion';
import { skillsData } from '../data/skills';
import { Cpu, Database, Wrench, Sparkles, Zap, Code2, Terminal, Layers } from 'lucide-react';
import { useState } from 'react';

// Animated skill bar with glow effect
function AnimatedSkillBar({ skill, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="flex justify-between mb-2">
        <motion.span 
          className="text-gray-300 font-medium flex items-center gap-2"
          animate={{ x: isHovered ? 5 : 0 }}
        >
          {skill.name}
          {isHovered && <Zap size={14} className="text-[#A59ADB]" />}
        </motion.span>
        <motion.span 
          className="text-[#A59ADB] font-bold"
          animate={{ scale: isHovered ? 1.1 : 1 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: index * 0.05, ease: "easeOut" }}
          className="h-full relative rounded-full"
          style={{
            background: `linear-gradient(90deg, #CE4DDB 0%, #A59ADB ${skill.level}%, #2E2D2D ${skill.level}%)`
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
        </motion.div>
        {/* Glow effect */}
        <motion.div
          className="absolute top-0 right-0 w-2 h-full bg-[#A59ADB] blur-sm rounded-full"
          animate={{ 
            opacity: isHovered ? 1 : 0.5,
            boxShadow: isHovered ? '0 0 10px #A59ADB' : 'none'
          }}
          style={{ right: `${100 - skill.level}%` }}
        />
      </div>
    </motion.div>
  );
}

// Floating icon component
function FloatingIcon({ icon: Icon, delay = 0 }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay
      }}
    >
      <Icon size={24} className="text-[#A59ADB]" />
    </motion.div>
  );
}

export default function Skills() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 80]);
  const y2 = useTransform(scrollY, [0, 500], [0, -40]);

  const categories = [
    { name: 'Frontend', skills: skillsData.frontend, icon: Code2, color: '#A59ADB' },
    { name: 'Backend', skills: skillsData.backend, icon: Database, color: '#CE4DDB' },
    { name: 'Tools', skills: skillsData.tools, icon: Wrench, color: '#A59ADB' },
    { name: 'Other', skills: skillsData.other, icon: Sparkles, color: '#CE4DDB' }
  ];

  return (
    <section id="skills" className="py-16 md:py-32 relative overflow-visible min-h-screen">
      {/* Background effects */}
      <div className="hidden md:block">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-96 h-96 bg-[#CE4DDB]/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-[#A59ADB]/10 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Cpu size={40} className="text-[#A59ADB]" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
              Skills & Technologies
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive toolkit built through years of experience and continuous learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-2xl relative overflow-hidden group"
              >
                {/* Card glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#CE4DDB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    background: [
                      'radial-gradient(circle at 50% 50%, rgba(139,0,0,0.1) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(165,42,42,0.15) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(139,0,0,0.1) 0%, transparent 70%)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <category.icon size={28} className="text-[#A59ADB]" />
                  </motion.div>
                  <span className="text-gradient">{category.name}</span>
                  <FloatingIcon icon={category.icon} delay={categoryIndex * 0.5} />
                </h3>
                
                <div className="space-y-5 relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <AnimatedSkillBar 
                      key={skill.name} 
                      skill={skill} 
                      index={skillIndex} 
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced technology marquee */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 glass p-8 rounded-2xl overflow-hidden relative"
          >
            <motion.div
              animate={{ x: [0, -1500] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...skillsData.frontend, ...skillsData.backend, ...skillsData.tools, ...skillsData.other].map((skill, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.2, color: '#A59ADB' }}
                  className="text-xl text-gray-400 font-medium cursor-pointer transition-colors"
                >
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Gradient overlays for smooth fade */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/50 to-transparent" />
          </motion.div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Code2, label: 'Languages', value: '10+' },
              { icon: Terminal, label: 'Tools', value: '15+' },
              { icon: Layers, label: 'Frameworks', value: '8+' },
              { icon: Sparkles, label: 'Projects', value: '20+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5, scale: 1.05 }}
                className="glass p-6 rounded-2xl text-center"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="flex justify-center mb-3"
                >
                  <stat.icon size={32} className="text-[#A59ADB]" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold text-gradient mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 + 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
