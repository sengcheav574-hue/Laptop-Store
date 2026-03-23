import React from "react";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { IoLogoFigma } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";



const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  .about-page {
    background: linear-gradient(135deg, #fdf2f8 0%, #ffffff 50%, #fce7f3 100%);
    color: #1f2937;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* HERO */
  .about-hero {
    padding: 80px 10% 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .about-hero::before {
    content: '';
    position: absolute; top: -120px; right: -80px;
    width: 480px; height: 480px; border-radius: 50%;
    background: radial-gradient(circle, rgba(244,114,182,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: #fce7f3; border: 1px solid #fbcfe8;
    color: #db2777; font-size: 0.7rem; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 6px 14px; border-radius: 50px; margin-bottom: 22px;
  }
  .hero-dot {
    width: 6px; height: 6px; background: #ec4899;
    border-radius: 50%; display: inline-block;
    animation: heroBlink 1.5s infinite;
  }
  @keyframes heroBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .hero-name {
    font-size: clamp(2.8rem, 4.5vw, 4.5rem); font-weight: 800;
    line-height: 1.05; letter-spacing: -2px; color: #1f2937;
  }
  .hero-name .pk { color: #ec4899; }
  .hero-role { margin-top: 14px; font-size: 1.05rem; color: #6b7280; font-weight: 500; }
  .hero-desc {
    margin-top: 20px; color: #4b5563; font-size: 0.95rem;
    line-height: 1.85; max-width: 480px;
  }
  .hero-ctas { margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-pink {
    background: #ec4899; color: #fff; padding: 13px 30px;
    border-radius: 50px; font-size: 0.88rem; font-weight: 700;
    text-decoration: none; display: flex; align-items: center; gap: 8px;
    box-shadow: 0 6px 24px rgba(236,72,153,0.35);
    transition: background .25s, transform .25s, box-shadow .25s;
    border: none; cursor: pointer;
  }
  .btn-pink:hover { background: #db2777; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(236,72,153,0.45); }
  .btn-ghost {
    border: 2px solid #fbcfe8; color: #ec4899;
    padding: 13px 30px; border-radius: 50px; font-size: 0.88rem;
    font-weight: 700; text-decoration: none; transition: all .25s;
    background: transparent; cursor: pointer;
  }
  .btn-ghost:hover { border-color: #ec4899; background: #fce7f3; }
  .hero-socials { margin-top: 30px; display: flex; gap: 10px; }
  .soc {
    width: 40px; height: 40px; border-radius: 12px;
    border: 1.5px solid #fbcfe8; background: #fff;
    display: flex; align-items: center; justify-content: center;
    color: #6b7280; text-decoration: none;
    transition: all .25s; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .soc:hover { border-color: #ec4899; color: #ec4899; transform: translateY(-3px); box-shadow: 0 6px 16px rgba(236,72,153,0.2); }

  /* Photo */
  .hero-right { position: relative; display: flex; justify-content: center; z-index: 1; }
  .photo-wrap { position: relative; width: 330px; }
  .photo-bg {
    position: absolute; inset: -12px; border-radius: 32px;
    background: linear-gradient(135deg, #fbcfe8, #fce7f3); z-index: 0;
  }
  .photo-img {
    position: relative; z-index: 1; width: 100%; aspect-ratio: 3/4;
    object-fit: cover; border-radius: 24px; display: block;
    box-shadow: 0 20px 60px rgba(236,72,153,0.25);
  }
  .badge {
    position: absolute; z-index: 2;
    background: #fff; border: 1.5px solid #fbcfe8;
    border-radius: 16px; padding: 11px 15px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }
  .badge-br { bottom: -14px; right: -18px; }
  .badge-tl { top: -14px; left: -18px; }
  .badge-lbl { font-size: 0.62rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; }
  .badge-val { font-size: 0.9rem; font-weight: 800; color: #ec4899; margin-top: 2px; }

  /* STATS */
  .stats-row {
    display: flex; margin: 0 10%;
    background: #fff; border-radius: 20px;
    border: 1.5px solid #fbcfe8;
    box-shadow: 0 4px 24px rgba(236,72,153,0.08); overflow: hidden;
  }
  .stat { flex: 1; text-align: center; padding: 28px 16px; border-right: 1.5px solid #fbcfe8; }
  .stat:last-child { border-right: none; }
  .stat-num { font-size: 2rem; font-weight: 800; color: #ec4899; }
  .stat-lbl { font-size: 0.7rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

  /* SECTION */
  .about-section { padding: 80px 10%; }
  .section-alt { background: #fdf2f8; }
  .sec-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: #fce7f3; color: #db2777;
    font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 2px; padding: 5px 14px; border-radius: 50px; margin-bottom: 14px;
  }
  .sec-title { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -1px; margin-bottom: 10px; color: #1f2937; }
  .sec-sub { color: #6b7280; font-size: 0.95rem; line-height: 1.8; max-width: 540px; }

  /* ABOUT GRID */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 50px; align-items: start; }
  .about-text p { color: #4b5563; line-height: 1.85; font-size: 0.95rem; margin-bottom: 14px; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 26px; }
  .info-card { background: #fce7f3; border: 1.5px solid #fbcfe8; border-radius: 14px; padding: 13px 15px; }
  .info-k { font-size: 0.63rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 1.5px; }
  .info-v { font-size: 0.9rem; font-weight: 700; color: #1f2937; margin-top: 3px; }
  .info-v.pk { color: #ec4899; }

  /* Timeline */
  .tl { padding-left: 28px; position: relative; }
  .tl::before {
    content: ''; position: absolute; left: 7px; top: 6px; bottom: 6px; width: 2px;
    background: linear-gradient(to bottom, #ec4899, #fce7f3); border-radius: 2px;
  }
  .tl-item { position: relative; margin-bottom: 32px; }
  .tl-dot {
    position: absolute; left: -25px; top: 5px;
    width: 10px; height: 10px; background: #ec4899; border-radius: 50%;
    box-shadow: 0 0 0 3px #fce7f3;
  }
  .tl-year { font-size: 0.68rem; font-weight: 700; color: #ec4899; text-transform: uppercase; letter-spacing: 2px; }
  .tl-title { font-weight: 800; font-size: 1rem; color: #1f2937; margin-top: 4px; }
  .tl-place { font-size: 0.82rem; font-weight: 600; color: #ec4899; margin-top: 2px; }
  .tl-desc { font-size: 0.83rem; color: #6b7280; line-height: 1.75; margin-top: 6px; }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 50px; }
  .skill-card {
    background: #fff; border: 1.5px solid #fbcfe8;
    border-radius: 20px; padding: 24px;
    box-shadow: 0 2px 12px rgba(236,72,153,0.06);
    transition: transform .3s, box-shadow .3s, border-color .3s;
  }
  .skill-card:hover { transform: translateY(-5px); border-color: #ec4899; box-shadow: 0 10px 32px rgba(236,72,153,0.18); }
  .sk-icon { width: 46px; height: 46px; background: #fce7f3; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 14px; }
  .sk-name { font-weight: 800; font-size: 0.95rem; color: #1f2937; margin-bottom: 6px; }
  .sk-desc { font-size: 0.8rem; color: #6b7280; line-height: 1.6; margin-bottom: 14px; }
  .sk-bar-bg { background: #fce7f3; border-radius: 50px; height: 5px; overflow: hidden; }
  .sk-bar { height: 100%; background: linear-gradient(to right, #ec4899, #f472b6); border-radius: 50px; }

  /* PROJECTS */
  .proj-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 50px; }
  .proj-card {
    background: #fff; border: 1.5px solid #fbcfe8;
    border-radius: 20px; padding: 28px;
    box-shadow: 0 2px 12px rgba(236,72,153,0.06);
    transition: transform .3s, box-shadow .3s, border-color .3s; cursor: pointer;
  }
  .proj-card:hover { transform: translateY(-5px); border-color: #ec4899; box-shadow: 0 12px 36px rgba(236,72,153,0.18); }
  .pj-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
  .pj-icon { font-size: 2rem; }
  .pj-tag { background: #fce7f3; color: #db2777; font-size: 0.68rem; font-weight: 700; padding: 4px 12px; border-radius: 50px; letter-spacing: 1px; text-transform: uppercase; }
  .pj-title { font-weight: 800; font-size: 1.05rem; color: #1f2937; margin-bottom: 8px; }
  .pj-desc { font-size: 0.83rem; color: #6b7280; line-height: 1.7; margin-bottom: 18px; }
  .pj-stack { display: flex; flex-wrap: wrap; gap: 6px; }
  .stack-pill { background: #fce7f3; color: #db2777; font-size: 0.7rem; font-weight: 600; padding: 3px 10px; border-radius: 50px; border: 1px solid #fbcfe8; }

  /* CONTACT */
  .contact-box {
    background: #fff; border: 1.5px solid #fbcfe8;
    border-radius: 28px; padding: 64px; text-align: center;
    box-shadow: 0 8px 40px rgba(236,72,153,0.1);
    position: relative; overflow: hidden; margin-top: 40px;
  }
  .contact-box::before {
    content: ''; position: absolute; top: -80px; right: -80px;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(244,114,182,0.15) 0%, transparent 70%);
  }
  .contact-email {
    font-size: clamp(1.4rem, 2.5vw, 2.2rem); font-weight: 800;
    color: #ec4899; text-decoration: none;
    border-bottom: 3px solid #fbcfe8; padding-bottom: 4px; transition: border-color .25s;
  }
  .contact-email:hover { border-color: #ec4899; }
  .c-links { display: flex; justify-content: center; gap: 12px; margin-top: 30px; flex-wrap: wrap; }
  .c-link {
    border: 1.5px solid #fbcfe8; color: #6b7280; padding: 10px 22px;
    border-radius: 50px; text-decoration: none; font-size: 0.83rem;
    font-weight: 600; background: #fff; transition: all .25s;
  }
  .c-link:hover { border-color: #ec4899; color: #ec4899; background: #fce7f3; }

  /* FOOTER */
  .about-footer {
    background: #ec4899; padding: 28px 10%;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
  }
  .foot-brand { font-weight: 800; color: #fff; font-size: 1rem; }
  .foot-links { display: flex; gap: 24px; }
  .foot-links a { color: rgba(255,255,255,0.75); font-size: 0.8rem; text-decoration: none; transition: color .2s; }
  .foot-links a:hover { color: #fff; }
  .foot-copy { color: rgba(255,255,255,0.75); font-size: 0.78rem; }
  .foot-copy span { color: #fff; }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  .hero-left > * { animation: fadeUp .7s ease both; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .about-hero { grid-template-columns: 1fr; padding: 60px 5% 40px; text-align: center; gap: 40px; }
    .about-hero::before { display: none; }
    .hero-right { order: -1; }
    .photo-wrap { width: 230px; }
    .hero-desc { margin: 14px auto; }
    .hero-ctas, .hero-socials { justify-content: center; }
    .stats-row { margin: 0 5%; flex-wrap: wrap; }
    .stat { min-width: 50%; }
    .about-section { padding: 60px 5%; }
    .about-grid, .skills-grid, .proj-grid { grid-template-columns: 1fr; }
    .contact-box { padding: 40px 20px; }
    .about-footer { padding: 24px 5%; flex-direction: column; text-align: center; }
  }
`;

const skills = [
  { icon: "⚛️", name: "React.js", desc: "Building dynamic UIs with hooks, context, and component-driven architecture.", level: 80 },
  { icon: <FaCss3Alt className="text-blue-800"/>, name: "CSS / Tailwind", desc: "Pixel-perfect, responsive layouts with modern CSS and utility-first Tailwind.", level: 90 },
  { icon: <IoLogoJavascript className="text-yellow-600"/>, name: "JavaScript (ES6+)", desc: "Clean, modern JS for interactivity, APIs, async patterns, and DOM manipulation.", level: 78 },
  { icon: <IoLogoFigma />, name: "UI / UX Design", desc: "Figma mockups, visual hierarchy, and intuitive design for real users.", level: 72 },
  { icon: <FaHtml5 className="text-red-700"/>, name: "HTML5", desc: "Semantic, accessible markup — the backbone of every great web project.", level: 95 },
  { icon: <FaGithub />, name: "Git & GitHub", desc: "Version control, branching strategies, and collaborative dev workflows.", level: 70 },
];

const projects = [
  { icon: "🛒", tag: "E-Commerce", title: "LaptopStore", desc: "A full-featured laptop store with brand/price filtering, cart system, search, delivery tracking, and a polished pink responsive UI.", stack: ["React", "Tailwind", "React Router", "JavaScript"] },
  { icon: "👤", tag: "Portfolio", title: "Personal Portfolio", desc: "A developer portfolio with skills, timeline, and contact info — smooth animations and a bold visual identity.", stack: ["HTML", "CSS", "Animations"] },
  { icon: "📱", tag: "UI Design", title: "Mobile App UI Concept", desc: "A Figma mockup for a food delivery app targeting Cambodian users — clean cards, bold typography, intuitive navigation.", stack: ["Figma", "UI/UX", "Prototype"] },
  { icon: "📊", tag: "Dashboard", title: "Admin Dashboard UI", desc: "A responsive admin panel with data tables, charts, and dark layout — built for NPIC coursework, focused on usability.", stack: ["React", "Tailwind", "Charts"] },
];

const timeline = [
  { year: "2023 — Present", title: "BSc. Software Engineering", place: "National Polytechnic Institute of Cambodia (NPIC)", desc: "Studying CS fundamentals, web development, databases, algorithms, and software design with a focus on frontend specialization." },
  { year: "2024", title: "LaptopStore — Frontend Developer", place: "Personal / Academic Project", desc: "Designed and built a full e-commerce frontend with product listings, cart system, search & filter, and a responsive pink-themed React UI." },
  { year: "2022", title: "Started Web Development", place: "Self-taught", desc: "Learned HTML, CSS, JavaScript from scratch and fell in love with UI design and browser technologies." },
];

const GitHubIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TelegramIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function About() {
  return (
    <div className="about-page">
      <style>{styles}</style>

      {/* HERO */}
      <div className="about-hero">
        <div className="hero-left">
          <div className="hero-tag">
            <span className="hero-dot" /> About Page · LaptopStore
          </div>
          <h1 className="hero-name">
            Pov<br /><span className="pk">Sengchiev</span>
          </h1>
          <p className="hero-role">Frontend Software Engineer · UI/UX Enthusiast</p>
          <p className="hero-desc">
            A passionate frontend developer from Cambodia, crafting beautiful and performant web experiences.
            Currently studying Software Engineering at NPIC — building interfaces that feel alive.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-pink">✉ Get In Touch</a>
            <a href="#projects" className="btn-ghost">View Projects →</a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/" className="soc" title="GitHub"><GitHubIcon /></a>
            <a href="#" className="soc" title="LinkedIn"><LinkedInIcon /></a>
            <a href="https://t.me/STEPHENCHOW007" className="soc" title="Telegram"><TelegramIcon /></a>
            <a href="https://web.facebook.com/sengcheav123" className="soc" title="Facebook"><FacebookIcon /></a>
          </div>
        </div>

        <div className="hero-right">
          <div className="photo-wrap">
            <div className="photo-bg" />
            <img src="src\assets\images\111.png" alt="Pov Sengchiev" className="photo-img" />
            <div className="badge badge-br">
              <div className="badge-lbl">Location</div>
              <div className="badge-val">🇰🇭 Phnom Penh</div>
            </div>
            <div className="badge badge-tl">
              <div className="badge-lbl">Major</div>
              <div className="badge-val">Frontend Dev</div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-row">
        {[
          { num: "2+", lbl: "Years Learning" },
          { num: "10+", lbl: "Projects Built" },
          { num: "NPIC", lbl: "University" },
          { num: "SE", lbl: "Software Eng." },
          { num: "∞", lbl: "Passion for UI" },
        ].map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section id="about" className="about-section section-alt">
        <div className="sec-tag">👤 Who I Am</div>
        <h2 className="sec-title">About Me</h2>
        <p className="sec-sub">A story of curiosity, code, and creativity from the heart of Cambodia.</p>
        <div className="about-grid">
          <div className="about-text">
            <p>Hi! I'm <strong style={{ color: "#ec4899" }}>Pov Sengchiev</strong>, a frontend software engineering student at the <strong>National Polytechnic Institute of Cambodia (NPIC)</strong>. I'm passionate about building interfaces that are not just functional, but genuinely beautiful.</p>
            <p>My journey into web development started with simple HTML pages and grew into a deep love for React, design systems, and creating seamless user experiences. The best frontends are ones users never have to think about — they just work, and feel right.</p>
            <p>Outside of coding, I love exploring design trends, gaming, and contributing to the growing tech community in Cambodia. Always looking to collaborate on exciting projects.</p>
            <div className="info-grid">
              {[
                { k: "Full Name", v: "Pov Sengchiev" },
                { k: "Location", v: "Phnom Penh 🇰🇭" },
                { k: "University", v: "NPIC" },
                { k: "Major", v: "Software Engineering" },
                { k: "Specialization", v: "Frontend Dev" },
                { k: "Status", v: "● Open to Work", pk: true },
              ].map((item, i) => (
                <div className="info-card" key={i}>
                  <div className="info-k">{item.k}</div>
                  <div className={`info-v${item.pk ? " pk" : ""}`}>{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tl">
            {timeline.map((t, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-dot" />
                <div className="tl-year">{t.year}</div>
                <div className="tl-title">{t.title}</div>
                <div className="tl-place">{t.place}</div>
                <div className="tl-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="about-section">
        <div className="sec-tag">⚡ What I Know</div>
        <h2 className="sec-title">Technical Skills</h2>
        <p className="sec-sub">Technologies and tools I use to bring ideas to life.</p>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-card" key={i}>
              <div className="sk-icon">{s.icon}</div>
              <div className="sk-name">{s.name}</div>
              <div className="sk-desc">{s.desc}</div>
              <div className="sk-bar-bg">
                <div className="sk-bar" style={{ width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="about-section section-alt">
        <div className="sec-tag">🚀 What I've Built</div>
        <h2 className="sec-title">Projects</h2>
        <p className="sec-sub">A selection of work I'm proud of — from e-commerce to personal experiments.</p>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <div className="proj-card" key={i}>
              <div className="pj-head">
                <div className="pj-icon">{p.icon}</div>
                <div className="pj-tag">{p.tag}</div>
              </div>
              <div className="pj-title">{p.title}</div>
              <div className="pj-desc">{p.desc}</div>
              <div className="pj-stack">
                {p.stack.map((tech, j) => (
                  <span className="stack-pill" key={j}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="about-section">
        <div className="sec-tag">✉ Let's Connect</div>
        <h2 className="sec-title">Get In Touch</h2>
        <p className="sec-sub">Whether it's a project, internship, or just a hello — I'd love to hear from you.</p>
        <div className="contact-box">
          <div className="sec-tag" style={{ marginBottom: 18 }}><BiMailSend /> My Email</div>
          <a href="mailto:povsengchiev@email.com" className="contact-email">
            sengcheav574@email.com
          </a>
          <div className="c-links">
            <a href="https://github.com/" className="c-link flex justify-center items-center gap-2"><GitHubIcon /> GitHub</a>
            <a href="#" className="c-link flex justify-center items-center gap-2"><LinkedInIcon /> LinkedIn</a>
            <a href="https://t.me/STEPHENCHOW007" className="c-link flex justify-center items-center gap-2"><TelegramIcon /> Telegram</a>
            <a href="https://web.facebook.com/sengcheav123" className="c-link flex justify-center items-center gap-2"><FacebookIcon /> Facebook</a>
          </div>
        </div>
      </section>

    
    </div>
  );
}
