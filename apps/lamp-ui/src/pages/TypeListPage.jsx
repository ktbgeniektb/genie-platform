import React from "react";
import { Link } from "react-router-dom";

const types = [
  ["kyomei", "tankyu"],
  ["kyomei", "hyougen"],
  ["kyomei", "taiken"],
  ["kyomei", "chosen"],
  ["tankyu", "kyomei"],
  ["tankyu", "hyougen"],
  ["tankyu", "taiken"],
  ["tankyu", "chosen"],
  ["hyougen", "kyomei"],
  ["hyougen", "tankyu"],
  ["hyougen", "taiken"],
  ["hyougen", "chosen"],
  ["taiken", "kyomei"],
  ["taiken", "tankyu"],
  ["taiken", "hyougen"],
  ["taiken", "chosen"],
  ["chosen", "kyomei"],
  ["chosen", "tankyu"],
  ["chosen", "hyougen"],
  ["chosen", "taiken"],
];

const typeLabel = {
  kyomei: "共鳴型",
  tankyu: "探求型",
  hyougen: "表現型",
  taiken: "体験型",
  chosen: "挑戦型",
};

const TypeListPage = () => {
  return (
    <div>
      <h1>全タイプ一覧（順序あり20パターン）</h1>
      <ul>
        {types.map(([top1, top2]) => (
          <li key={`${top1}_${top2}`}>
            <Link to={`/result?top1=${top1}&top2=${top2}`}>
              {typeLabel[top1]} × {typeLabel[top2]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeListPage;
