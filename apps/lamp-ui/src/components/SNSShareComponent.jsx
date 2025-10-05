import React from "react";
import { motion } from "framer-motion";

const SNSShareComponent = ({ id, topType }) => {
  const url = `${window.location.origin}/result/${id}`;
  const text = `私の診断タイプは「${topType}」でした！ #Lamp診断`;

  return (
    <motion.div
      className="text-center space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-sm text-muted-foreground">
        結果をSNSでシェアしてみよう
      </p>
      <div className="flex justify-center space-x-4">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition"
        >
          X（旧Twitter）でシェア
        </a>
        <a
          href={`https://line.me/R/msg/text/?${encodeURIComponent(
            text + " " + url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#00C300] text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition"
        >
          LINEでシェア
        </a>
      </div>
    </motion.div>
  );
};

export default SNSShareComponent;
