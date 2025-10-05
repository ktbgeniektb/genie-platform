import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const NameInputPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleStart = () => {
    if (!name.trim()) {
      alert("お名前を入力してください");
      return;
    }
    const params = new URLSearchParams();
    params.append("name", name);
    if (email.trim()) params.append("email", email);
    navigate(`/diagnosis?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-card/70 backdrop-blur-sm shadow-lg rounded-2xl p-8 border border-border text-center"
      >
        {/* アイコン */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-medium">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-light text-foreground mb-2">
          あなたの<span className="font-semibold text-primary">「好き」</span>を探す旅へ
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          まずはあなたの情報を少しだけ教えてください
        </p>

        <div className="space-y-4 text-left">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">お名前</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例）田中 花子"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              メールアドレス（任意）
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="例）example@email.com"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              ※ 結果を後で確認したい方はご入力ください
            </p>
          </div>
        </div>

        <Button
          onClick={handleStart}
          size="lg"
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-medium transition-smooth"
        >
          診断を始める
        </Button>

        <p className="text-xs text-muted-foreground mt-6">
          入力された情報は診断結果の保存以外には使用しません
        </p>
      </motion.div>
    </div>
  );
};

export default NameInputPage;
