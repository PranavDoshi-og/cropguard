import { motion } from "framer-motion";

export default function StatCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition"
    >
      <div className="flex justify-between mb-4">
        <h3 className="text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <div className="text-green-600">
          {icon}
        </div>
      </div>

      <p className="text-4xl font-bold">
        {value}
      </p>
    </motion.div>
  );
}