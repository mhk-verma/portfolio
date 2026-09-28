import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, Send, MapPin, Phone, MessageCircle, Sparkles, Zap } from 'lucide-react';
import { personalData } from '../data/personal';
import { socialsData } from '../data/socials';
import { useState } from 'react';

// ArrowRight component
function CustomArrowRight({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// Contact form with validation
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => setSubmitSuccess(false), 3000);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <motion.div
        whileFocus={{ scale: 1.02 }}
        className="space-y-2"
      >
        <label className="text-gray-300 text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#A59ADB] transition-all ${
            errors.name ? 'border-red-500' : 'border-white/10'
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {errors.name}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        whileFocus={{ scale: 1.02 }}
        className="space-y-2"
      >
        <label className="text-gray-300 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#A59ADB] transition-all ${
            errors.email ? 'border-red-500' : 'border-white/10'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        whileFocus={{ scale: 1.02 }}
        className="space-y-2"
      >
        <label className="text-gray-300 text-sm font-medium">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#A59ADB] transition-all resize-none ${
            errors.message ? 'border-red-500' : 'border-white/10'
          }`}
          placeholder="Your message..."
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {errors.message}
          </motion.p>
        )}
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-4 bg-gradient-to-r from-[#CE4DDB] to-[#A59ADB] rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Send size={20} />
            </motion.div>
            Sending...
          </>
        ) : submitSuccess ? (
          <>
            <Sparkles size={20} />
            Message Sent!
          </>
        ) : (
          <>
            <Send size={20} />
            Send Message
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

// Contact info card
function ContactInfoCard({ icon: Icon, label, value, link, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.a
      href={link}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass p-6 rounded-2xl block group"
    >
      <motion.div
        animate={{ 
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <Icon size={28} className="text-[#A59ADB]" />
      </motion.div>
      <div className="text-gray-400 text-sm mb-1">{label}</div>
      <div className="text-white font-semibold group-hover:text-[#A59ADB] transition-colors">
        {value}
      </div>
    </motion.a>
  );
}

// Particle effect for contact section
function ContactParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#CE4DDB]/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
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

export default function Contact() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -25]);

  return (
    <section id="contact" className="py-16 md:py-32 relative overflow-visible min-h-screen">
      {/* Background effects - desktop only */}
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
              transition={{ duration: 6, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <MessageCircle size={40} className="text-[#A59ADB]" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
              Let's Connect
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gradient mb-6 flex items-center gap-2">
                  <Sparkles size={24} className="text-[#A59ADB]" />
                  Get in Touch
                </h3>
                <p className="text-gray-400 mb-6">
                  Feel free to reach out through any of these channels. I typically respond within 24 hours.
                </p>
                
                <div className="space-y-4">
                  <ContactInfoCard
                    icon={Mail}
                    label="Email"
                    value={personalData.email}
                    link={`mailto:${personalData.email}`}
                    index={0}
                  />
                  <ContactInfoCard
                    icon={MapPin}
                    label="Location"
                    value={personalData.location}
                    link="#"
                    index={1}
                  />
                  <ContactInfoCard
                    icon={Phone}
                    label="Status"
                    value={personalData.currentStatus}
                    link="#"
                    index={2}
                  />
                </div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="glass p-6 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-gradient mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {socialsData.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass p-4 rounded-full hover:bg-[#CE4DDB]/20 transition-all duration-300"
                      aria-label={social.name}
                    >
                      {social.name === 'GitHub' && <Github size={24} />}
                      {social.name === 'Email' && <Mail size={24} />}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gradient mb-6 flex items-center gap-2">
                  <Zap size={24} className="text-[#A59ADB]" />
                  Send a Message
                </h3>
                <ContactForm />
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <motion.a
              href={`mailto:${personalData.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#CE4DDB] to-[#A59ADB] rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[#CE4DDB]/30 transition-all duration-300"
            >
              <Send size={20} />
              Send Me a Message
              <CustomArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
