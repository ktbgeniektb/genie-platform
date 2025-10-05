// src/pages/DiagnosisPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import questions from "@/data/questions";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import NavigationButtons from "@/components/NavigationButtons";
import CompletionScreen from "@/components/CompletionScreen";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const DiagnosisPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get("name") || "匿名";
  const email = query.get("email") || null;

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // ===== 回答選択 =====
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    // 最後の質問でなければ自動で次へ
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => setCurrentQuestionIndex((i) => i + 1), 400);
    } else {
      // 全て回答完了時
      setTimeout(() => setIsCompleted(true), 400);
    }
  };

  // ===== 前へ / 次へ =====
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((i) => i - 1);
  };
  const handleNext = () => {
    if (
      currentQuestionIndex < totalQuestions - 1 &&
      answers[currentQuestionIndex] !== null
    ) {
      setCurrentQuestionIndex((i) => i + 1);
    }
  };

  // ===== スコア計算ロジック（旧版をそのまま統合）=====
  const calculateScore = (answers) => {
    const scoreMap = {
      kyomei: 0,
      tankyu: 0,
      hyougen: 0,
      taiken: 0,
      chosen: 0,
    };

    questions.forEach((q, i) => {
      const answer = answers[i];
      if (typeof answer === "number") {
        scoreMap[q.main] += answer * q.weightMain;
        if (q.sub && q.weightSub) {
          scoreMap[q.sub] += answer * q.weightSub;
        }
      }
    });

    const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
    const topType = `${sorted[0][0]}_${sorted[1][0]}`;
    return { score: scoreMap, topType };
  };

  // ===== 提出処理（Laravelへ送信）=====
  const handleSubmit = async () => {
    const result = calculateScore(answers);

    try {
      const response = await fetch(`${apiBaseUrl}/diagnosis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          top_type: result.topType,
          score: result.score,
        }),
      });

      const data = await response.json();

      toast({
        title: "診断完了",
        description: "結果を保存しました。",
      });

      navigate(`/result/${data.id}`);
    } catch (error) {
      toast({
        title: "エラー",
        description: "保存中に問題が発生しました。",
        variant: "destructive",
      });
    }
  };

  // ===== レンダリング =====
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-6 px-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-light text-primary">Lamp</h1>
          <p className="text-sm text-muted-foreground">Self Reflection</p>
        </div>
      </motion.header>

      {/* Progress */}
      {!isCompleted && (
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={totalQuestions}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 md:py-12">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            </motion.div>
          ) : (
            <CompletionScreen onSubmit={handleSubmit} />
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Buttons */}
      {!isCompleted && (
        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          showPrevious={currentQuestionIndex > 0}
          showNext={answers[currentQuestionIndex] !== null}
        />
      )}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="py-6 text-center text-sm text-muted-foreground"
      >
        Take your time — there are no wrong answers
      </motion.footer>
    </div>
  );
};

export default DiagnosisPage;
