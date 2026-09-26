import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Code2, Star, Zap } from 'lucide-react';
import { projectsData } from '../data/projects';
import { useState } from 'react';

// 3D Card with tilt effect
function ProjectCard3D({ project, index, isFeatured = false }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  if (isFeatured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        className="group"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1000
            }}
            animate={{
              rotateX,
              rotateY
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative rounded-2xl overflow-hidden aspect-video glass cursor-pointer"
          >
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
              className="relative h-full"
            >
              <img 
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', project.image);
                  e.target.style.display = 'none';
                  e.target.parentElement.querySelector('.fallback-text').style.display = 'flex';
                }}
              />
              <div className="fallback-text absolute inset-0 bg-gradient-to-br from-[#CE4DDB]/20 to-black flex items-center justify-center" style={{display: 'none'}}>
                <div className="text-center p-8">
                  <div className="text-4xl font-bold text-gradient mb-2">{project.name}</div>
                  <p className="text-gray-400">Image loading failed</p>
                </div>
              </div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: isHovered ? 0.8 : 0.6 }}
              />
              <motion.div 
                className="absolute inset-0 bg-[#CE4DDB]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <ArrowRight className="text-white w-16 h-16" />
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Floating badges */}
            <motion.div
              className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs flex items-center gap-1"
              animate={{ y: isHovered ? -5 : 0 }}
            >
              <Star size={12} className="text-[#A59ADB]" />
              <span className="text-gray-300">Featured</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            animate={{
              x: isHovered ? 10 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-3xl font-bold text-gradient"
              animate={{ 
                textShadow: isHovered ? '0 0 20px rgba(139,0,0,0.5)' : 'none'
              }}
            >
              {project.name}
            </motion.h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 glass rounded-full text-sm text-gray-300 cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-[#CE4DDB]/20 transition-all duration-300"
              >
                <Github size={20} />
                Code
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-[#CE4DDB]/20 transition-all duration-300"
              >
                <ExternalLink size={20} />
                Live Demo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -10 : 0
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass p-6 rounded-2xl group cursor-pointer"
    >
      <motion.div 
        className="aspect-video rounded-xl bg-gradient-to-br from-[#CE4DDB]/20 to-black mb-4 flex items-center justify-center overflow-hidden relative"
        animate={{ scale: isHovered ? 1.02 : 1 }}
      >
        <img 
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Image failed to load:', project.image);
            e.target.style.display = 'none';
            e.target.parentElement.querySelector('.fallback-text-small').style.display = 'flex';
          }}
        />
        <div className="fallback-text-small absolute inset-0 flex items-center justify-center" style={{display: 'none'}}>
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient">{project.name}</div>
          </div>
        </div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
      <motion.h4 
        className="text-xl font-semibold mb-2 group-hover:text-[#A59ADB] transition-colors"
        animate={{ x: isHovered ? 5 : 0 }}
      >
        {project.name}
      </motion.h4>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 3).map((tech) => (
          <motion.span
            key={tech}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 bg-[#CE4DDB]/20 rounded-full text-xs text-gray-300"
          >
            {tech}
          </motion.span>
        ))}
      </div>
      <motion.div 
        className="flex gap-3"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, color: '#A59ADB' }}
          className="text-gray-400 transition-colors"
          aria-label="View code"
        >
          <Github size={20} />
        </motion.a>
        <motion.a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, color: '#A59ADB' }}
          className="text-gray-400 transition-colors"
          aria-label="View live"
        >
          <ExternalLink size={20} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  
  const featuredProjects = projectsData.filter(p => p.featured);
  const otherProjects = projectsData.filter(p => !p.featured);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#CE4DDB]/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#A59ADB]/10 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-6 relative z-10">
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
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Code2 size={40} className="text-[#A59ADB]" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my best work, featuring modern technologies and innovative solutions
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="space-y-24 mb-20">
            {featuredProjects.map((project, index) => (
              <ProjectCard3D 
                key={project.id} 
                project={project} 
                index={index} 
                isFeatured={true}
              />
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-8 text-gradient flex items-center gap-3"
              >
                <Zap size={28} className="text-[#A59ADB]" />
                Other Projects
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <ProjectCard3D 
                    key={project.id} 
                    project={project} 
                    index={index} 
                    isFeatured={false}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
