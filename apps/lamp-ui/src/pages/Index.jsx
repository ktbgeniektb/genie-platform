import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* アイコン */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-primary to-accent shadow-medium"
        >
          <Lightbulb className="w-12 h-12 text-white" />
        </motion.div>

        {/* タイトル */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-light text-foreground mb-6"
        >
          Welcome to Lamp
        </motion.h1>

        {/* サブコピー */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-muted-foreground mb-12 leading-relaxed"
        >
          A gentle journey to discover what truly motivates you.
          <br />
          Reflect deeply — uncover your inner light.
        </motion.p>

        {/* ボタン */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate("/name")}
            size="lg"
            className="px-12 py-6 text-lg rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-medium transition-smooth"
          >
            Begin Your Reflection
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground mt-8"
        >
          About 10 minutes · 30 questions · No wrong answers
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Index;
