import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

export default function Skills() {
  const categories = [
    { name: 'Frontend', skills: skillsData.frontend, icon: '💻' },
    { name: 'Backend', skills: skillsData.backend, icon: '⚙️' },
    { name: 'Tools', skills: skillsData.tools, icon: '🛠️' },
    { name: 'Other', skills: skillsData.other, icon: '✨' }
  ];

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-12 text-gradient text-center"
          >
            Skills & Technologies
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="glass p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <span className="text-gradient">{category.name}</span>
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.05 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-[#A52A2A]">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.05 }}
                          className="h-full bg-gradient-to-r from-[#8B0000] to-[#A52A2A] rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technology marquee */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 glass p-6 rounded-2xl overflow-hidden"
          >
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...skillsData.frontend, ...skillsData.backend, ...skillsData.tools].map((skill, i) => (
                <span key={i} className="text-xl text-gray-400 font-medium">
                  {skill.name}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
