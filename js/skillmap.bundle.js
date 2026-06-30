(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      module.exports = window.React;
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports, module) {
      module.exports = window.ReactDOM;
    }
  });

  // node_modules/d3/index.js
  var require_d3 = __commonJS({
    "node_modules/d3/index.js"(exports, module) {
      module.exports = window.d3;
    }
  });

  // entry.jsx
  var import_react2 = __toESM(require_react());
  var import_client = __toESM(require_client());

  // SkillTreemap.jsx
  var import_react = __toESM(require_react());
  var d3 = __toESM(require_d3());
  var A4_W = 794;
  var A4_H = 1123;
  var MH = 50;
  var MT = 40;
  var TITLE_H = 52;
  var LEGEND_H = 58;
  var MB = 28;
  var TM_X = MH;
  var TM_Y = MT + TITLE_H;
  var TM_W = A4_W - MH * 2;
  var TM_H = A4_H - MT - TITLE_H - LEGEND_H - MB;
  var TITLE_TY = MT + Math.round(TITLE_H * 0.65);
  var LEG_Y = TM_Y + TM_H + 14;
  var COLORS = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD", "#D4537E", "#BA7517", "#639922"];
  var I18N = {
    de: {
      levels: ["Grundkenntnisse", "Erste Erfahrung", "Projekterfahrung", "Experte", "Guru"],
      defaultTitle: "Kenntnisprofil",
      newCategory: "Kategorie",
      newSkill: "Kenntnis",
      edit: "Bearbeiten",
      titleLabel: "TITEL",
      categories: "KATEGORIEN",
      addSkill: "+ Kenntnis",
      addCategory: "+ Kategorie",
      levelsHeading: "STUFEN",
      panel: "\u25C0 Panel",
      editShort: "\u270F Bearbeiten",
      popupBlocked: "Der Browser hat das Druckfenster blockiert. Bitte Pop-ups f\xFCr diese Seite erlauben und erneut versuchen.",
      invalidJSON: "Ung\xFCltige JSON-Datei",
      langButton: "EN"
    },
    en: {
      levels: ["Basic knowledge", "First experience", "Project experience", "Expert", "Guru"],
      defaultTitle: "Skill profile",
      newCategory: "Category",
      newSkill: "Skill",
      edit: "Edit",
      titleLabel: "TITLE",
      categories: "CATEGORIES",
      addSkill: "+ Skill",
      addCategory: "+ Category",
      levelsHeading: "LEVELS",
      panel: "\u25C0 Panel",
      editShort: "\u270F Edit",
      popupBlocked: "The browser blocked the print window. Please allow pop-ups for this page and try again.",
      invalidJSON: "Invalid JSON file",
      langButton: "DE"
    }
  };
  function rgba(hex, a) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  var CAT_CHAR_W = 5.6;
  function wrapCategoryName(name, width) {
    const avail = Math.max(width - 14, 30);
    const maxChars = Math.max(4, Math.floor(avail / CAT_CHAR_W));
    const upper = name.toUpperCase();
    if (upper.length <= maxChars) return [upper];
    const words = upper.split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      const t = cur ? cur + " " + w : w;
      if (t.length > maxChars && cur) {
        lines.push(cur);
        cur = w;
      } else cur = t;
    }
    if (cur) lines.push(cur);
    return lines.slice(0, 3);
  }
  var _id = 1e3;
  var uid = () => `${++_id}`;
  var DEFAULT = [
    { id: "c1", name: "Frontend", skills: [
      { id: "s1", name: "React", level: 5 },
      { id: "s2", name: "CSS", level: 4 },
      { id: "s3", name: "TypeScript", level: 4 },
      { id: "s4", name: "HTML", level: 5 }
    ] },
    { id: "c2", name: "Backend", skills: [
      { id: "s5", name: "Node.js", level: 4 },
      { id: "s6", name: "Python", level: 4 },
      { id: "s7", name: "SQL", level: 3 }
    ] },
    { id: "c3", name: "Tools", skills: [
      { id: "s8", name: "Git", level: 5 },
      { id: "s9", name: "Docker", level: 3 },
      { id: "s10", name: "Figma", level: 3 }
    ] },
    { id: "c4", name: "Soft Skills", skills: [
      { id: "s11", name: "Teamwork", level: 5 },
      { id: "s12", name: "Kommunikation", level: 4 }
    ] }
  ];
  function useNodes(cats) {
    return (0, import_react.useMemo)(() => {
      const active = cats.filter((c) => c.skills.length > 0);
      if (!active.length) return { cats: [], skills: [] };
      const data = {
        name: "root",
        children: active.map((cat, ci) => ({
          name: cat.name,
          ci: ci % COLORS.length,
          children: cat.skills.map((s) => ({
            name: s.name,
            value: s.level * 20,
            level: s.level,
            ci: ci % COLORS.length,
            category: cat.name
          }))
        }))
      };
      const root = d3.hierarchy(data).sum((d) => d.value).sort((a, b) => b.value - a.value);
      d3.treemap().size([TM_W, TM_H]).paddingOuter(6).paddingTop((d) => {
        if (d.depth !== 1) return 0;
        const w = (d.x1 ?? TM_W) - (d.x0 ?? 0);
        const lines = wrapCategoryName(d.data.name, w).length;
        return 10 + lines * 11;
      }).paddingInner(2).round(true)(root);
      return {
        cats: root.children.map((n) => ({
          name: n.data.name,
          ci: n.data.ci,
          x0: n.x0,
          y0: n.y0,
          x1: n.x1,
          y1: n.y1,
          lines: wrapCategoryName(n.data.name, n.x1 - n.x0)
        })),
        skills: root.leaves().map((n) => ({
          name: n.data.name,
          level: n.data.level,
          ci: n.data.ci,
          category: n.data.category,
          x0: n.x0,
          y0: n.y0,
          x1: n.x1,
          y1: n.y1
        }))
      };
    }, [cats]);
  }
  function App() {
    const [lang, setLang] = (0, import_react.useState)("de");
    const t = I18N[lang];
    const LEVELS = t.levels;
    const [title, setTitle] = (0, import_react.useState)(I18N.de.defaultTitle);
    const [titleIsDefault, setTitleIsDefault] = (0, import_react.useState)(true);
    const [cats, setCats] = (0, import_react.useState)(DEFAULT);
    const [panelOpen, setPanelOpen] = (0, import_react.useState)(true);
    const [tip, setTip] = (0, import_react.useState)(null);
    const containerRef = (0, import_react.useRef)(null);
    const [svgW, setSvgW] = (0, import_react.useState)(0);
    const { cats: catNodes, skills: skillNodes } = useNodes(cats);
    (0, import_react.useEffect)(() => {
      const el = containerRef.current;
      if (!el) return;
      const ro = new ResizeObserver(([e]) => setSvgW(Math.floor(e.contentRect.width - 40)));
      ro.observe(el);
      return () => ro.disconnect();
    }, []);
    const toggleLang = () => {
      const next = lang === "de" ? "en" : "de";
      setLang(next);
      if (titleIsDefault) setTitle(I18N[next].defaultTitle);
    };
    const updateTitle = (v) => {
      setTitle(v);
      setTitleIsDefault(false);
    };
    const addCat = () => setCats((p) => [...p, { id: uid(), name: t.newCategory, skills: [] }]);
    const delCat = (id) => setCats((p) => p.filter((c) => c.id !== id));
    const setName = (id, v) => setCats((p) => p.map((c) => c.id === id ? { ...c, name: v } : c));
    const addSkill = (cid) => setCats((p) => p.map((c) => c.id === cid ? { ...c, skills: [...c.skills, { id: uid(), name: t.newSkill, level: 3 }] } : c));
    const delSkill = (cid, sid) => setCats((p) => p.map((c) => c.id === cid ? { ...c, skills: c.skills.filter((s) => s.id !== sid) } : c));
    const setSkill = (cid, sid, f, v) => setCats((p) => p.map((c) => c.id === cid ? { ...c, skills: c.skills.map((s) => s.id === sid ? { ...s, [f]: v } : s) } : c));
    const filename = (ext) => (title || "skills").replace(/\s+/g, "_").toLowerCase() + "." + ext;
    const getExportSVG = (0, import_react.useCallback)(() => {
      const el = document.getElementById("a4-svg");
      if (!el) return null;
      const clone = el.cloneNode(true);
      clone.setAttribute("width", A4_W);
      clone.setAttribute("height", A4_H);
      return clone;
    }, []);
    const exportSVG = (0, import_react.useCallback)(() => {
      const clone = getExportSVG();
      if (!clone) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" }));
      a.download = filename("svg");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, [title, getExportSVG]);
    const exportPNG = (0, import_react.useCallback)(() => {
      const clone = getExportSVG();
      if (!clone) return;
      const SC = 2, xml = new XMLSerializer().serializeToString(clone);
      const du = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(xml)));
      const cv = document.createElement("canvas");
      cv.width = A4_W * SC;
      cv.height = A4_H * SC;
      const ctx = cv.getContext("2d");
      ctx.scale(SC, SC);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, A4_W, A4_H);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const a = document.createElement("a");
        a.href = cv.toDataURL("image/png");
        a.download = filename("png");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      img.src = du;
    }, [title, getExportSVG]);
    const printPDF = (0, import_react.useCallback)(() => {
      const clone = getExportSVG();
      if (!clone) return;
      const fontStack = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
      clone.removeAttribute("width");
      clone.removeAttribute("height");
      clone.setAttribute("style", `display:block;width:100%;height:100%;font-family:${fontStack};`);
      clone.setAttribute("font-family", fontStack);
      const svgMarkup = new XMLSerializer().serializeToString(clone);
      const win = window.open("", "_blank");
      if (!win) {
        alert(t.popupBlocked);
        return;
      }
      win.document.open();
      win.document.write(
        '<!doctype html><html><head><meta charset="utf-8"><title>' + (title || t.defaultTitle) + `</title><style>@page{size:A4;margin:0;}*{box-sizing:border-box;}html,body{margin:0;padding:0;}svg,text{font-family:${fontStack};}#sheet{width:206mm;height:288mm;margin:4mm auto 0;}#sheet svg{display:block;width:100%;height:100%;}</style></head><body><div id="sheet">` + svgMarkup + "</div></body></html>"
      );
      win.document.close();
      const doPrint = () => {
        try {
          win.focus();
          win.print();
        } catch (e) {
        }
      };
      win.onload = doPrint;
      setTimeout(doPrint, 400);
    }, [getExportSVG, title, t]);
    const exportJSON = (0, import_react.useCallback)(() => {
      const data = JSON.stringify({ title, categories: cats }, null, 2);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([data], { type: "application/json" }));
      a.download = filename("json");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, [title, cats]);
    const importJSON = (0, import_react.useCallback)(() => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json,application/json";
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const data = JSON.parse(ev.target.result);
            if (typeof data.title === "string") {
              setTitle(data.title);
              setTitleIsDefault(false);
            }
            if (Array.isArray(data.categories)) setCats(data.categories);
          } catch {
            alert(t.invalidJSON);
          }
        };
        reader.readAsText(file);
      };
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    }, [t]);
    const svgH = svgW > 0 ? Math.round(svgW * A4_H / A4_W) : 0;
    const dots = (n) => "\u25CF".repeat(n) + "\u25CB".repeat(5 - n);
    return /* @__PURE__ */ import_react.default.createElement("div", { style: {
      display: "flex",
      background: "#94A3B8",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
    } }, panelOpen && /* @__PURE__ */ import_react.default.createElement("div", { style: {
      width: 284,
      flexShrink: 0,
      background: "#fff",
      borderRight: "1px solid #E2E8F0",
      overflowY: "auto",
      padding: "14px 14px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 10
    } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { fontWeight: 700, fontSize: 15, color: "#0F172A", flex: 1 } }, t.edit), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: toggleLang,
        title: "Sprache / Language",
        style: {
          padding: "3px 10px",
          borderRadius: 6,
          border: "1px solid #E2E8F0",
          background: "#fff",
          color: "#4F46E5",
          cursor: "pointer",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.5px"
        }
      },
      t.langButton
    )), /* @__PURE__ */ import_react.default.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 4 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 11, fontWeight: 600, color: "#64748B", letterSpacing: "0.6px" } }, t.titleLabel), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        value: title,
        onChange: (e) => updateTitle(e.target.value),
        style: {
          padding: "6px 8px",
          border: "1px solid #E2E8F0",
          borderRadius: 6,
          fontSize: 13,
          outline: "none",
          color: "#0F172A"
        }
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: "#64748B", letterSpacing: "0.6px" } }, t.categories), cats.map((cat, ci) => {
      const col = COLORS[ci % COLORS.length];
      return /* @__PURE__ */ import_react.default.createElement("div", { key: cat.id, style: {
        border: `1.5px solid ${rgba(col, 0.28)}`,
        borderRadius: 8,
        padding: "9px 9px 7px",
        background: rgba(col, 0.05)
      } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: 9, height: 9, borderRadius: 2, background: col, flexShrink: 0 } }), /* @__PURE__ */ import_react.default.createElement(
        "input",
        {
          value: cat.name,
          onChange: (e) => setName(cat.id, e.target.value),
          style: {
            flex: 1,
            padding: "3px 6px",
            border: `1.5px solid ${rgba(col, 0.38)}`,
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 700,
            background: "transparent",
            outline: "none",
            color: "#0F172A",
            minWidth: 0
          }
        }
      ), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => delCat(cat.id), style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#CBD5E1",
        fontSize: 18,
        padding: "0 2px",
        lineHeight: 1
      } }, "\xD7")), cat.skills.map((s) => /* @__PURE__ */ import_react.default.createElement("div", { key: s.id, style: { display: "flex", alignItems: "center", gap: 4, marginBottom: 5 } }, /* @__PURE__ */ import_react.default.createElement(
        "input",
        {
          value: s.name,
          onChange: (e) => setSkill(cat.id, s.id, "name", e.target.value),
          style: {
            flex: 1,
            padding: "3px 6px",
            border: "1px solid #E2E8F0",
            borderRadius: 4,
            fontSize: 12,
            outline: "none",
            minWidth: 0,
            color: "#0F172A"
          }
        }
      ), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 0, flexShrink: 0 } }, [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          key: i,
          onClick: () => setSkill(cat.id, s.id, "level", i),
          title: LEVELS[i - 1],
          style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 2px",
            color: i <= s.level ? col : "#D1D5DB",
            fontSize: 14,
            lineHeight: 1
          }
        },
        "\u25CF"
      ))), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => delSkill(cat.id, s.id), style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#CBD5E1",
        fontSize: 16,
        padding: 0,
        lineHeight: 1,
        flexShrink: 0
      } }, "\xD7"))), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => addSkill(cat.id), style: {
        width: "100%",
        padding: "3px 0",
        marginTop: 2,
        border: `1px dashed ${rgba(col, 0.55)}`,
        borderRadius: 4,
        background: "transparent",
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 600,
        color: col
      } }, t.addSkill));
    }), /* @__PURE__ */ import_react.default.createElement("button", { onClick: addCat, style: {
      padding: "7px 12px",
      border: "2px dashed #CBD5E1",
      borderRadius: 8,
      background: "transparent",
      cursor: "pointer",
      fontSize: 12,
      color: "#64748B"
    } }, t.addCategory), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: 4 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: "#64748B", letterSpacing: "0.6px", marginBottom: 6 } }, t.levelsHeading), LEVELS.map((l, i) => /* @__PURE__ */ import_react.default.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 3 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 12, color: "#334155", fontWeight: 600, minWidth: 54, letterSpacing: 1 } }, dots(i + 1)), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 11, color: "#64748B" } }, l)))), /* @__PURE__ */ import_react.default.createElement("div", { style: { borderTop: "1px solid #E2E8F0", paddingTop: 10, display: "flex", gap: 6 } }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: exportJSON, style: {
      flex: 1,
      padding: "6px 0",
      borderRadius: 6,
      border: "1px solid #E2E8F0",
      background: "#fff",
      color: "#4F46E5",
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 600
    } }, "\u2193 JSON"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: importJSON, style: {
      flex: 1,
      padding: "6px 0",
      borderRadius: 6,
      border: "1px solid #E2E8F0",
      background: "#fff",
      color: "#64748B",
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 600
    } }, "\u2191 JSON"))), /* @__PURE__ */ import_react.default.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: {
      background: "#fff",
      borderBottom: "1px solid #E2E8F0",
      padding: "9px 14px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexShrink: 0
    } }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setPanelOpen((p) => !p), style: {
      padding: "5px 10px",
      borderRadius: 6,
      border: "1px solid #E2E8F0",
      background: panelOpen ? "#EEF2FF" : "#fff",
      color: panelOpen ? "#4F46E5" : "#64748B",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600
    } }, panelOpen ? t.panel : t.editShort), /* @__PURE__ */ import_react.default.createElement("div", { style: { flex: 1, fontSize: 12, color: "#64748B", textAlign: "center" } }, "DIN A4 \xB7 794 \xD7 1123 px"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: exportSVG, style: {
      padding: "5px 12px",
      borderRadius: 6,
      border: "1px solid #E2E8F0",
      background: "#fff",
      color: "#4F46E5",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600
    } }, "\u2193 SVG"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: exportPNG, style: {
      padding: "5px 12px",
      borderRadius: 6,
      border: "1px solid #E2E8F0",
      background: "#fff",
      color: "#4F46E5",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600
    } }, "\u2193 PNG"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: printPDF, style: {
      padding: "5px 14px",
      borderRadius: 6,
      border: "none",
      background: "#4F46E5",
      color: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600
    } }, "\u2193 PDF")), /* @__PURE__ */ import_react.default.createElement("div", { ref: containerRef, style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    } }, svgW > 100 && /* @__PURE__ */ import_react.default.createElement("div", { style: { boxShadow: "0 6px 40px rgba(0,0,0,0.35)", display: "inline-block", lineHeight: 0 } }, /* @__PURE__ */ import_react.default.createElement(
      "svg",
      {
        id: "a4-svg",
        viewBox: `0 0 ${A4_W} ${A4_H}`,
        width: svgW,
        height: svgH,
        xmlns: "http://www.w3.org/2000/svg",
        style: { display: "block", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }
      },
      /* @__PURE__ */ import_react.default.createElement("rect", { width: A4_W, height: A4_H, fill: "white" }),
      /* @__PURE__ */ import_react.default.createElement(
        "text",
        {
          x: A4_W / 2,
          y: TITLE_TY,
          textAnchor: "middle",
          fontSize: 26,
          fontWeight: "700",
          fill: "#0F172A"
        },
        title
      ),
      /* @__PURE__ */ import_react.default.createElement("line", { x1: MH, y1: TM_Y - 10, x2: A4_W - MH, y2: TM_Y - 10, stroke: "#E2E8F0", strokeWidth: 0.5 }),
      /* @__PURE__ */ import_react.default.createElement("g", { transform: `translate(${TM_X},${TM_Y})` }, catNodes.map((cat) => /* @__PURE__ */ import_react.default.createElement("g", { key: cat.name }, /* @__PURE__ */ import_react.default.createElement(
        "rect",
        {
          x: cat.x0,
          y: cat.y0,
          width: cat.x1 - cat.x0,
          height: cat.y1 - cat.y0,
          fill: rgba(COLORS[cat.ci], 0.09),
          stroke: rgba(COLORS[cat.ci], 0.28),
          strokeWidth: 1,
          rx: 6
        }
      ), /* @__PURE__ */ import_react.default.createElement(
        "text",
        {
          x: cat.x0 + 7,
          y: cat.y0 + 15,
          fontSize: 10,
          fontWeight: "700",
          fill: COLORS[cat.ci],
          letterSpacing: "0.5"
        },
        cat.lines.map((line, li) => /* @__PURE__ */ import_react.default.createElement("tspan", { key: li, x: cat.x0 + 7, dy: li === 0 ? 0 : 11 }, line))
      ))), skillNodes.map((sk) => {
        const w = sk.x1 - sk.x0, h = sk.y1 - sk.y0, col = COLORS[sk.ci];
        const isHov = tip?.category === sk.category && tip?.name === sk.name;
        const aw = w - 8;
        const rawFs = aw / (sk.name.length * 0.58);
        const nameFontSize = Math.min(13, Math.max(7, rawFs));
        const maxChars = Math.floor(aw / (Math.max(7, nameFontSize) * 0.58));
        const displayName = sk.name.length > maxChars && maxChars > 1 ? sk.name.slice(0, maxChars - 1) + "\u2026" : sk.name;
        const tinyTile = w < 16 || h < 12;
        const showName = !tinyTile && h >= 14;
        const showLevel = !tinyTile && h >= 26;
        const showDots = w > 55 && h > 44;
        const levelFs = Math.max(7, Math.min(11, w / 6));
        const midY = sk.y0 + h / 2;
        const nameY = showLevel ? midY - 8 : midY;
        const levelY = midY + (showName ? 10 : 0);
        return /* @__PURE__ */ import_react.default.createElement(
          "g",
          {
            key: `${sk.category}-${sk.name}`,
            style: { cursor: "default" },
            onMouseEnter: () => setTip(sk),
            onMouseLeave: () => setTip(null)
          },
          /* @__PURE__ */ import_react.default.createElement(
            "rect",
            {
              x: sk.x0 + 1,
              y: sk.y0 + 1,
              width: w - 2,
              height: h - 2,
              fill: col,
              rx: 4,
              opacity: isHov ? 1 : 0.83,
              style: { transition: "opacity 0.12s" }
            }
          ),
          showName && /* @__PURE__ */ import_react.default.createElement(
            "text",
            {
              x: sk.x0 + w / 2,
              y: nameY,
              textAnchor: "middle",
              dominantBaseline: "middle",
              fontSize: nameFontSize,
              fontWeight: "600",
              fill: "white",
              style: { pointerEvents: "none", userSelect: "none" }
            },
            displayName
          ),
          showLevel && /* @__PURE__ */ import_react.default.createElement(
            "text",
            {
              x: sk.x0 + w / 2,
              y: levelY,
              textAnchor: "middle",
              dominantBaseline: "middle",
              fontSize: levelFs,
              fontWeight: "600",
              fill: "rgba(255,255,255,0.85)",
              style: { pointerEvents: "none" }
            },
            sk.level,
            showDots ? ` ${dots(sk.level)}` : ""
          )
        );
      })),
      tip && (() => {
        const w = tip.x1 - tip.x0, cx = TM_X + tip.x0 + w / 2, ty = TM_Y + tip.y0;
        const ttW = 148, tx = Math.max(4, Math.min(A4_W - ttW - 4, cx - ttW / 2));
        const topY = Math.max(TM_Y - 36, ty - 38);
        return /* @__PURE__ */ import_react.default.createElement("g", null, /* @__PURE__ */ import_react.default.createElement("rect", { x: tx, y: topY, width: ttW, height: 32, fill: "rgba(15,23,42,0.90)", rx: 4 }), /* @__PURE__ */ import_react.default.createElement(
          "text",
          {
            x: tx + ttW / 2,
            y: topY + 12,
            textAnchor: "middle",
            fontSize: 10,
            fontWeight: "700",
            fill: "white"
          },
          tip.name
        ), /* @__PURE__ */ import_react.default.createElement(
          "text",
          {
            x: tx + ttW / 2,
            y: topY + 24,
            textAnchor: "middle",
            fontSize: 9,
            fill: "rgba(255,255,255,0.8)"
          },
          dots(tip.level),
          " ",
          LEVELS[tip.level - 1]
        ));
      })(),
      /* @__PURE__ */ import_react.default.createElement("line", { x1: MH, y1: LEG_Y - 6, x2: A4_W - MH, y2: LEG_Y - 6, stroke: "#E2E8F0", strokeWidth: 0.5 }),
      /* @__PURE__ */ import_react.default.createElement("g", { transform: `translate(${MH},${LEG_Y})` }, LEVELS.map((label, i) => {
        const cx = TM_W / 5 * i + TM_W / 10;
        return /* @__PURE__ */ import_react.default.createElement("g", { key: i }, /* @__PURE__ */ import_react.default.createElement("text", { x: cx, y: 14, textAnchor: "middle", fontSize: 13, fill: "#1E293B", fontWeight: "700" }, i + 1), /* @__PURE__ */ import_react.default.createElement("text", { x: cx, y: 28, textAnchor: "middle", fontSize: 9.5, fill: "#334155" }, label), /* @__PURE__ */ import_react.default.createElement("text", { x: cx, y: 42, textAnchor: "middle", fontSize: 9, fill: "#94A3B8", letterSpacing: 1 }, dots(i + 1)));
      }))
    )))));
  }

  // entry.jsx
  var mountPoint = document.getElementById("skill-treemap-root");
  if (mountPoint) {
    (0, import_client.createRoot)(mountPoint).render(import_react2.default.createElement(App));
  } else {
    console.error('skill-treemap: Kein Element mit id="skill-treemap-root" gefunden.');
  }
})();