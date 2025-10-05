import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  showPrevious: boolean;
  showNext: boolean;
}

const NavigationButtons = ({ 
  onPrevious, 
  onNext, 
  showPrevious, 
  showNext 
}: NavigationButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex items-center justify-between w-full max-w-3xl mx-auto px-6 mt-8"
    >
      {showPrevious ? (
        <Button
          variant="ghost"
          onClick={onPrevious}
          className="group transition-smooth hover:bg-muted"
        >
          <ChevronLeft className="w-5 h-5 mr-2 transition-smooth group-hover:-translate-x-1" />
          Previous
        </Button>
      ) : (
        <div />
      )}

      {showNext && (
        <Button
          variant="ghost"
          onClick={onNext}
          className="group transition-smooth hover:bg-muted"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2 transition-smooth group-hover:translate-x-1" />
        </Button>
      )}
    </motion.div>
  );
};

export default NavigationButtons;
