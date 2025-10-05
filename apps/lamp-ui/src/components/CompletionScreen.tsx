import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

interface CompletionScreenProps {
  onSubmit: () => void;
}

const CompletionScreen = ({ onSubmit }: CompletionScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-3xl p-12 md:p-16 shadow-medium"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-primary to-accent"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-3xl md:text-4xl font-light text-foreground mb-4"
        >
          You've completed your reflection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
        >
          Thank you for taking this journey with yourself. Your responses will help illuminate
          what truly motivates you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onSubmit}
            size="lg"
            className="px-12 py-6 text-lg rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-medium transition-smooth"
          >
            View My Results
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-muted-foreground mt-8"
        >
          This is not a test — it's a conversation with yourself
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default CompletionScreen;
