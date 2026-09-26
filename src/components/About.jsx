import { motion, useScroll, useTransform } from 'framer-motion';
import { personalData } from '../data/personal';
import { User, MapPin, Mail, Calendar, Briefcase, Zap, Code2, Sparkles, ArrowRight, Target, Rocket } from 'lucide-react';
import { useState } from 'react';

// Timeline component
function TimelineItem({ year, title, description, index, isLeft }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-8`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        className={`w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}
      >
        <motion.div
          className="glass p-6 rounded-2xl relative"
          animate={{
            boxShadow: isHovered ? '0 10px 40px rgba(139,0,0,0.3)' : 'none'
          }}
        >
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#CE4DDB] rounded-full text-sm font-bold"
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            {year}
          </motion.div>
          <h4 className="text-xl font-bold text-gradient mb-2">{title}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="w-2/12 flex justify-center"
        animate={{ scale: isHovered ? 1.2 : 1 }}
      >
        <div className="w-4 h-4 bg-[#A59ADB] rounded-full relative">
          <motion.div
            className="absolute inset-0 bg-[#A59ADB] rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
      
      <div className="w-5/12" />
    </motion.div>
  );
}

// Interactive info card
function InfoCard({ icon: Icon, label, value, link, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass p-6 rounded-2xl cursor-pointer"
    >
      <motion.div
        animate={{ 
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-4"
      >
        <Icon size={32} className="text-[#A59ADB]" />
      </motion.div>
      <div className="text-center">
        <div className="text-gray-400 text-sm mb-1">{label}</div>
        {link ? (
          <motion.a
            href={link}
            className="text-[#A59ADB] font-semibold hover:underline"
            whileHover={{ scale: 1.1 }}
          >
            {value}
          </motion.a>
        ) : (
          <motion.div
            className="text-white font-semibold"
            animate={{ color: isHovered ? '#A59ADB' : '#ffffff' }}
          >
            {value}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Service card
function ServiceCard({ icon: Icon, title, description, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass p-8 rounded-2xl relative overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#CE4DDB]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-4"
      >
        <Icon size={40} className="text-[#A59ADB]" />
      </motion.div>
      <h3 className="text-xl font-bold text-gradient mb-3 relative z-10">{title}</h3>
      <p className="text-gray-400 text-sm relative z-10">{description}</p>
      <motion.div
        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ x: isHovered ? 0 : 10 }}
      >
        <ArrowRight size={20} className="text-[#A59ADB]" />
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 60]);
  const y2 = useTransform(scrollY, [0, 500], [0, -30]);

  const timeline = [
    { year: '2021', title: 'Started Journey', description: 'Began my journey in web development, learning HTML, CSS, and JavaScript' },
    { year: '2022', title: 'React Development', description: 'Mastered React and started building modern web applications' },
    { year: '2023', title: 'Full Stack', description: 'Expanded to full-stack development with Node.js and databases' },
    { year: '2024', title: 'Professional', description: 'Working on professional projects and contributing to open-source' }
  ];

  const services = [
    { icon: Code2, title: 'Web Development', description: 'Building responsive and performant web applications' },
    { icon: Target, title: 'UI/UX Design', description: 'Creating intuitive and beautiful user interfaces' },
    { icon: Rocket, title: 'Performance', description: 'Optimizing applications for speed and efficiency' }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
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
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <User size={40} className="text-[#A59ADB]" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
              About Me
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Passionate developer creating digital experiences that make a difference
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left side - Bio and focus */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ x: 5 }}
                className="glass p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold text-gradient mb-4 flex items-center gap-2">
                  <Sparkles size={24} className="text-[#A59ADB]" />
                  Who I Am
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  {personalData.bio}
                </p>
                <p className="text-gray-400 leading-relaxed">
                  I'm passionate about creating seamless user experiences that combine aesthetic design with robust functionality. My approach focuses on clean code, performance optimization, and delivering solutions that make a real impact.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="glass p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold text-gradient mb-4 flex items-center gap-2">
                  <Zap size={24} className="text-[#A59ADB]" />
                  Current Focus
                </h3>
                <p className="text-gray-300">
                  Building modern web applications with React, exploring new technologies, and contributing to open-source projects. Always learning and pushing the boundaries of what's possible.
                </p>
              </motion.div>
            </motion.div>

            {/* Right side - Info cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <InfoCard 
                  icon={MapPin} 
                  label="Location" 
                  value={personalData.location} 
                  index={0}
                />
                <InfoCard 
                  icon={Mail} 
                  label="Email" 
                  value={personalData.email} 
                  link={`mailto:${personalData.email}`}
                  index={1}
                />
                <InfoCard 
                  icon={Calendar} 
                  label="Experience" 
                  value="3+ Years" 
                  index={2}
                />
                <InfoCard 
                  icon={Briefcase} 
                  label="Status" 
                  value={personalData.currentStatus} 
                  index={3}
                />
              </div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <h3 className="text-2xl font-bold text-gradient mb-6">What I Do</h3>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <ServiceCard 
                      key={service.title}
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-gradient mb-8 text-center">My Journey</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#CE4DDB] to-[#A59ADB] -translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <TimelineItem
                  key={item.year}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
