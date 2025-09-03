import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import CosmicBg from "../components/CosmicBg";
import StudentsKPI from "../components/StudentsKPI";
import { SimpleGrid } from "@mantine/core";

export default function AppLayout() {
  return (
    <div style={{minHeight:"100vh",minWeight:"100vw", display:"flex", flexDirection:"column"}}>
      <header style={{padding:"10px 16px", borderBottom:"1px solid #eee", fontWeight:600}}>
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
          { label: "27卒説明会着席数（月次）", value: "185/365", hint: "+10" }
        ]}
      />

      <div style={{
        flex:1,
        display:"grid",
        gridTemplateColumns:"240px 1fr",
        gap:"16px",
        padding:"16px"
      }}>
        <aside style={{borderRight:"1px solid #eee", paddingRight:"12px"}}>
          <ul style={{display:"grid", gap:8, listStyle:"none", padding:0, margin:0}}>
            <li><NavLink to="/students">Students</NavLink></li>
            <li><NavLink to="/students/new">Create</NavLink></li>
          </ul>
        </aside>

        <main style={{paddingRight:"8px"}}>
          <Outlet />
        </main>
      </div>

      <footer style={{padding:"8px 16px", borderTop:"1px solid #eee", fontSize:12, color:"#666"}}>
        © Genie/Atlas
      </footer>
    </div>
  );
}