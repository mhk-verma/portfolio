import { motion } from 'framer-motion';
import { Mail, Github, Send } from 'lucide-react';
import { personalData } from '../data/personal';
import { socialsData } from '../data/socials';

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-gradient"
          >
            Let's Connect
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Have a project in mind or just want to chat? I'd love to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass p-8 md:p-12 rounded-3xl mb-12"
          >
            <a
              href={`mailto:${personalData.email}`}
              className="inline-flex items-center gap-4 text-2xl md:text-3xl font-semibold text-[#A52A2A] hover:text-[#8B0000] transition-colors"
            >
              <Mail size={32} />
              {personalData.email}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {socialsData.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="glass p-4 rounded-full hover:bg-[#8B0000]/20 transition-all duration-300"
                aria-label={social.name}
              >
                {social.name === 'GitHub' && <Github size={28} />}
                {social.name === 'Email' && <Mail size={28} />}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <a
              href={`mailto:${personalData.email}`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[#8B0000]/30 transition-all duration-300"
            >
              <Send size={20} />
              Send Me a Message
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowRight({ className }) {
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
