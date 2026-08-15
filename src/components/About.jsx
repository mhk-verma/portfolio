import { motion } from 'framer-motion';
import { personalData } from '../data/personal';

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-12 text-gradient"
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                {personalData.bio}
              </p>
              <p className="text-gray-400 leading-relaxed">
                I'm passionate about creating seamless user experiences that combine aesthetic design with robust functionality. My approach focuses on clean code, performance optimization, and delivering solutions that make a real impact.
              </p>
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 text-[#A52A2A]">Current Focus</h3>
                <p className="text-gray-300">
                  Building modern web applications with React, exploring new technologies, and contributing to open-source projects.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 text-[#A52A2A]">What I Do</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-[#A52A2A] mt-1">→</span>
                    <span>Build responsive and accessible web applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#A52A2A] mt-1">→</span>
                    <span>Create intuitive user interfaces with modern frameworks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#A52A2A] mt-1">→</span>
                    <span>Develop full-stack solutions with Node.js and databases</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#A52A2A] mt-1">→</span>
                    <span>Optimize performance and user experience</span>
                  </li>
                </ul>
              </div>

              <div className="glass p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 text-[#A52A2A]">Quick Info</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span>{personalData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <a href={`mailto:${personalData.email}`} className="text-[#A52A2A] hover:underline">
                      {personalData.email}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400">{personalData.currentStatus}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
