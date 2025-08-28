import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

export default function AppLayout() {
  return (
    <div style={{minHeight:"100vh", display:"flex", flexDirection:"column"}}>
      <header style={{padding:"10px 16px", borderBottom:"1px solid #eee", fontWeight:600}}>
        Atlas
      </header>

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