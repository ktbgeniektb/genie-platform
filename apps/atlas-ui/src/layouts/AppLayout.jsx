import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import CosmicBg from "../components/CosmicBg";
import StudentsKPI from "../components/StudentsKPI";

export default function AppLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0b0f1a", // 黒基調
        color: "#f1f5f9", // 薄い白文字
      }}
    >
      <header
        style={{
          padding: "10px 16px",
          borderBottom: "1px solid #1e293b",
          fontWeight: 600,
          color: "#60a5fa", // 青アクセント
        }}
      >
        Atlas
      </header>

      <CosmicBg />

      <StudentsKPI
        items={[
          { label: "26卒内定出し", value: "68/70", hint: "+3" },
          { label: "26卒内定承諾", value: "31/35", hint: "+3" },
          { label: "26卒説明会着席数（年次）", value: "4,557/5,000", hint: "+12" },
          { label: "26卒説明会着席数（月次）", value: "30/20", hint: "+12" },
          { label: "27卒内定出し", value: "0/70" },
          { label: "27卒内定承諾", value: "0/35" },
          { label: "27卒説明会着席数（年次）", value: "2,624/7,500", hint: "+8" },
          { label: "27卒説明会着席数（月次）", value: "185/365", hint: "+10" },
        ]}
      />

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "16px",
          padding: "16px",
        }}
      >
        <aside
          style={{
            borderRight: "1px solid #1e293b",
            paddingRight: "12px",
          }}
        >
          <ul
            style={{
              display: "grid",
              gap: 8,
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <NavLink
                to="/students"
                style={({ isActive }) => ({
                  color: isActive ? "#60a5fa" : "#e2e8f0",
                  textDecoration: "none",
                  fontWeight: isActive ? 600 : 400,
                })}
              >
                Students
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/students/new"
                style={({ isActive }) => ({
                  color: isActive ? "#60a5fa" : "#e2e8f0",
                  textDecoration: "none",
                  fontWeight: isActive ? 600 : 400,
                })}
              >
                Create
              </NavLink>
            </li>
          </ul>
        </aside>

        <main style={{ paddingRight: "8px" }}>
          <Outlet />
        </main>
      </div>

      <footer
        style={{
          padding: "8px 16px",
          borderTop: "1px solid #1e293b",
          fontSize: 12,
          color: "#94a3b8",
        }}
      >
        © Genie/Atlas
      </footer>
    </div>
  );
}
