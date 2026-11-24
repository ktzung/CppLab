/* CppLab — isometric stage renderer for data-structure scenes */
window.CppStage = (function () {
  "use strict";

  const KEY = "cpplab-scene-3d";
  const CAM_KEY = "cpplab-iso-cam";
  const LAYER_KEY = "cpplab-iso-layers";
  const KINDS = new Set(["array", "list", "stack", "queue", "tree", "graph", "memory", "recursion", "complexity", "flow"]);
  const W = 540;
  const Z_MIN = 0.9;
  const Z_MAX = 2.4;
  const YAW_MAX = 16;
  let seq = 0;
  let enterSeq = 0;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  function loadCam() {
    try {
      const raw = JSON.parse(localStorage.getItem(CAM_KEY) || "{}");
      return { zoom: clamp(Number(raw.zoom) || 1, Z_MIN, Z_MAX), yaw: clamp(Number(raw.yaw) || 0, -YAW_MAX, YAW_MAX) };
    } catch (err) { return { zoom: 1, yaw: 0 }; }
  }
  function saveCam(cam) {
    try { localStorage.setItem(CAM_KEY, JSON.stringify(cam)); } catch (err) { /* ignore */ }
  }
  function loadLayers() {
    try {
      const raw = JSON.parse(localStorage.getItem(LAYER_KEY) || "{}");
      return { addr: raw.addr !== false };
    } catch (err) { return { addr: true }; }
  }
  function saveLayers(layers) {
    try { localStorage.setItem(LAYER_KEY, JSON.stringify(layers)); } catch (err) { /* ignore */ }
  }
  const CAM = loadCam();
  const LAYERS = loadLayers();
  function tip(title, lines) {
    return { title: String(title), lines: lines.filter((line) => line != null && line !== "").map(String) };
  }

  function list(value) { return Array.isArray(value) ? value : []; }
  function num(value) {
    const n = Number(String(value == null ? "" : value).replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  function toInts(value) { return list(value).map(Number).filter((n) => Number.isFinite(n)); }
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function cut(value, n) {
    const text = String(value == null ? "" : value);
    return text.length > n ? `${text.slice(0, Math.max(1, n - 1))}…` : text;
  }
  function fmt(n) {
    const v = Number(n);
    if (!Number.isFinite(v)) return String(n == null ? "" : n);
    return v.toLocaleString("vi-VN");
  }
  const F = (n) => (Math.round(Number(n) * 10) / 10).toString();
  const P = (x, y) => `${F(x)} ${F(y)}`;

  function on() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "1") return true;
      if (saved === "0") return false;
    } catch (err) { /* private mode */ }
    return typeof window !== "undefined" && window.innerWidth >= 900;
  }
  function toggle() {
    const next = !on();
    try { localStorage.setItem(KEY, next ? "1" : "0"); } catch (err) { /* ignore */ }
    return next;
  }
  function canRender(kind) { return KINDS.has(kind); }

  function wrapText(text, max) {
    const words = String(text || "").trim().split(/\s+/).filter(Boolean);
    const lines = [];
    let cur = "";
    words.forEach((word) => {
      if (!cur) cur = word;
      else if ((cur + " " + word).length <= max) cur += " " + word;
      else { lines.push(cur); cur = word; }
    });
    if (cur) lines.push(cur);
    return lines.slice(0, 3);
  }

  function defs(id) {
    return `<defs>
      <pattern id="${id}-h" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0V7" stroke="var(--iso-hatch)" stroke-width="1.7"/>
      </pattern>
      <marker id="${id}-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="var(--iso-edge)"/></marker>
      <marker id="${id}-aa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="var(--coral)"/></marker>
      <marker id="${id}-ad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="var(--mint)"/></marker>
    </defs>`;
  }

  function shadow(cx, cy, rx, ry) {
    return `<ellipse class="iso-shadow" cx="${F(cx)}" cy="${F(cy)}" rx="${F(rx)}" ry="${F(ry)}"/>`;
  }

  function block(id, cx, cy, w, d, h, opt) {
    const o = opt || {};
    const hw = w / 2;
    const hd = d / 2;
    const lift = o.lift || 0;
    const base = cy - lift;
    const top = base - h;
    const cls = ["iso-block", o.tone ? `is-${o.tone}` : "", o.cls || ""].filter(Boolean).join(" ");
    const hatch = o.hatch === false ? "" : ` fill="url(#${id}-h)"`;
    const idx = enterSeq++;
    const tipAttr = o.tip
      ? ` tabindex="0" role="button" data-tip="${esc(JSON.stringify(o.tip))}" aria-label="${esc(`${o.tip.title}. ${o.tip.lines.join(". ")}`)}"`
      : "";
    let out = `<g class="${cls}" style="--i:${idx}"${tipAttr}>`;
    out += `<path class="iso-face-l" d="M${P(cx - hw, top)}L${P(cx, top + hd)}L${P(cx, base + hd)}L${P(cx - hw, base)}Z"/>`;
    out += `<path class="iso-face-r" d="M${P(cx, top + hd)}L${P(cx + hw, top)}L${P(cx + hw, base)}L${P(cx, base + hd)}Z"${hatch}/>`;
    out += `<path class="iso-face-t" d="M${P(cx, top - hd)}L${P(cx + hw, top)}L${P(cx, top + hd)}L${P(cx - hw, top)}Z"/>`;
    if (o.topText != null) {
      out += `<text class="iso-val" x="${F(cx)}" y="${F(top + 5)}" text-anchor="middle" font-size="${o.topSize || 16}">${esc(cut(o.topText, o.cut || 6))}</text>`;
    }
    if (o.value != null) {
      const ty = top + h * 0.6 + hd * 0.45;
      out += `<text class="iso-val" x="${F(cx - w * 0.24)}" y="${F(ty)}" text-anchor="middle" font-size="${o.size || 15}">${esc(cut(o.value, o.cut || 8))}</text>`;
    }
    if (o.name) {
      out += `<text class="iso-sub" x="${F(cx - w * 0.24)}" y="${F(top + h * 0.28 + hd * 0.2)}" text-anchor="middle" font-size="11">${esc(cut(o.name, 12))}</text>`;
    }
    if (o.note) {
      out += `<text class="iso-note" x="${F(cx - 14)}" y="${F(base - 9)}" text-anchor="end" font-size="10.5">${esc(cut(o.note, 24))}</text>`;
    }
    if (o.addr) {
      out += `<text class="iso-addr" x="${F(cx - w * 0.24)}" y="${F(base - 6)}" text-anchor="middle">${esc(o.addr)}</text>`;
    }
    out += `</g>`;
    return out;
  }

  function pill(x, y, text, opt) {
    const o = opt || {};
    const label = String(text == null ? "" : text);
    const w = Math.max(30, label.length * 6.5 + 16);
    const h = o.h || 19;
    const tone = o.tone ? ` is-${o.tone}` : "";
    return `<g class="iso-pill${tone}">
      <rect x="${F(x - w / 2)}" y="${F(y - h / 2)}" width="${F(w)}" height="${h}" rx="${F(h / 2)}"/>
      <text x="${F(x)}" y="${F(y + 3.6)}">${esc(label)}</text>
    </g>`;
  }

  function lead(x1, y1, x2, y2, cls) {
    return `<line class="iso-lead${cls ? " " + cls : ""}" x1="${F(x1)}" y1="${F(y1)}" x2="${F(x2)}" y2="${F(y2)}"/>`;
  }

  function captionPart(scene, y, x) {
    const lines = wrapText(scene.caption, 66);
    if (!lines.length) return { svg: "", height: 0 };
    return {
      svg: lines.map((line, i) => `<text class="iso-caption" x="${F(x || 40)}" y="${F(y + i * 17)}">${esc(line)}</text>`).join(""),
      height: lines.length * 17
    };
  }

  /* ---------- painters ---------- */

  function paintArray(scene, id) {
    const values = list(scene.values);
    if (!values.length) return null;
    const n = values.length;
    const step = Math.min(92, 500 / n);
    const rise = step * 0.42;
    const cw = Math.min(64, Math.max(32, step * 0.78));
    const cd = 30;
    const ch = 36;
    const x0 = 270 - ((n - 1) * step) / 2;
    const y0 = 96;
    const pos = values.map((_, i) => ({ x: x0 + i * step, y: y0 + i * rise }));
    const active = new Set(toInts(scene.active));
    const sorted = new Set(toInts(scene.sorted));
    const win = new Set(toInts(scene.window));
    const cmp = new Set(toInts(scene.compare));
    const dy = (n - 1) * rise;
    const padX = 18;
    const L = pos[0].x - cw / 2 - padX;
    const R = pos[n - 1].x + cw / 2 + padX;
    const backL = pos[0].y - cd / 2 - 12;
    const frontL = pos[0].y + cd / 2 + 12;
    const frontR = frontL + dy;
    const depth = 18;
    let body = "";
    body += shadow(270, frontR + depth + 12, (R - L) / 2 + 8, 15);
    body += `<path class="iso-slab-r" d="M${P(R, backL + dy)}L${P(R, frontR)}L${P(R, frontR + depth)}L${P(R, backL + dy + depth)}Z"/>`;
    body += `<path class="iso-slab-f" d="M${P(L, frontL)}L${P(R, frontR)}L${P(R, frontR + depth)}L${P(L, frontL + depth)}Z"/>`;
    body += `<path class="iso-slab-t" d="M${P(L, backL)}L${P(R, backL + dy)}L${P(R, frontR)}L${P(L, frontL)}Z"/>`;
    body += `<text class="iso-slab-label" x="${F(L + 18)}" y="${F(frontL + depth - 6)}">${esc(scene.label || "a")}</text>`;
    values.forEach((_, i) => {
      body += `<text class="iso-index" x="${F(pos[i].x)}" y="${F(pos[i].y + cd / 2 + 9)}" text-anchor="middle">${i}</text>`;
    });
    values.forEach((value, i) => {
      const tone = active.has(i) ? "active" : sorted.has(i) ? "done" : "";
      const extra = [cmp.has(i) ? "is-compare" : "", win.has(i) ? "is-window" : ""].filter(Boolean).join(" ");
      body += block(id, pos[i].x, pos[i].y - 3, cw, cd, ch, {
        value,
        size: cw < 34 ? 12 : cw < 46 ? 14 : 17,
        cut: cw < 34 ? 3 : 4,
        lift: active.has(i) ? 6 : 0,
        tone,
        cls: extra,
        tip: tip(`${scene.label || "a"}[${i}]`, [
          `giá trị: ${value}`,
          active.has(i) ? "đang xét" : "",
          sorted.has(i) ? "đã xếp xong" : "",
          cmp.has(i) ? "đang so sánh" : "",
          win.has(i) ? "trong cửa sổ trượt" : ""
        ])
      });
    });
    const groups = {};
    list(scene.pointers).forEach((raw) => {
      const p = typeof raw === "object" ? raw : { index: raw, label: "ptr" };
      const idx = Number(p.index);
      if (!Number.isFinite(idx) || idx < 0 || idx >= n) return;
      (groups[idx] = groups[idx] || []).push(String(p.label == null ? "ptr" : p.label));
    });
    Object.keys(groups).forEach((key) => {
      const idx = Number(key);
      groups[idx].forEach((label, k) => {
        const px = pos[idx].x;
        const py = pos[idx].y - ch - 32 - k * 21 - (active.has(idx) ? 6 : 0);
        body += lead(px, py + 10, px, pos[idx].y - ch - 6 - (active.has(idx) ? 6 : 0));
        body += pill(px, py, label, { h: 18 });
      });
    });
    const cap = captionPart(scene, frontR + depth + 44);
    body += cap.svg;
    const height = Math.max(300, frontR + depth + 52 + cap.height);
    return { body, height };
  }

  function paintList(scene, id) {
    const nodes = list(scene.nodes).map((raw, i) => (typeof raw === "object"
      ? Object.assign({}, raw, { id: raw.id || `n${i}` })
      : { id: `n${i}`, value: raw }));
    if (!nodes.length) return null;
    const n = nodes.length;
    const step = Math.min(160, 470 / Math.max(1, n - 1 || 1));
    const cw = 74;
    const cd = 34;
    const ch = 44;
    const x0 = 270 - ((n - 1) * step) / 2;
    const y0 = 128;
    const rise = step * 0.3;
    const pos = nodes.map((_, i) => ({ x: x0 + i * step, y: y0 + i * rise }));
    const active = new Set(list(scene.active).map(String));
    const headId = scene.head != null ? String(scene.head) : null;
    const dy = (n - 1) * rise;
    const padX = 22;
    const L = pos[0].x - cw / 2 - padX;
    const R = pos[n - 1].x + cw / 2 + padX;
    const backL = pos[0].y - cd / 2 - 14;
    const frontL = pos[0].y + cd / 2 + 14;
    const frontR = frontL + dy;
    const depth = 16;
    let body = "";
    body += shadow(270, frontR + depth + 12, (R - L) / 2 + 6, 14);
    body += `<path class="iso-slab-r" d="M${P(R, backL + dy)}L${P(R, frontR)}L${P(R, frontR + depth)}L${P(R, backL + dy + depth)}Z"/>`;
    body += `<path class="iso-slab-f" d="M${P(L, frontL)}L${P(R, frontR)}L${P(R, frontR + depth)}L${P(L, frontL + depth)}Z"/>`;
    body += `<path class="iso-slab-t" d="M${P(L, backL)}L${P(R, backL + dy)}L${P(R, frontR)}L${P(L, frontL)}Z"/>`;
    body += `<text class="iso-slab-label" x="${F(L + 18)}" y="${F(frontL + depth - 6)}">DANH SÁCH LIÊN KẾT</text>`;
    nodes.forEach((node, i) => {
      body += `<text class="iso-index" x="${F(pos[i].x)}" y="${F(pos[i].y + cd / 2 + 10)}" text-anchor="middle">${i + 1}</text>`;
    });
    for (let i = 0; i < n - 1; i += 1) {
      const a = pos[i];
      const b = pos[i + 1];
      const activeEdge = active.has(nodes[i].id) || active.has(nodes[i + 1].id) || active.has(String(i)) || active.has(String(i + 1));
      const mk = activeEdge ? `${id}-aa` : `${id}-a`;
      body += `<path class="iso-edge${activeEdge ? " is-active" : ""}" d="M${P(a.x + cw * 0.2, a.y - ch - 8)}Q${P((a.x + b.x) / 2, Math.min(a.y, b.y) - ch - 34)} ${P(b.x - cw * 0.32, b.y - ch - 6)}" marker-end="url(#${mk})"/>`;
    }
    nodes.forEach((node, i) => {
      const isActive = active.has(node.id) || active.has(String(i)) || node.state === "active";
      const tone = isActive ? "active" : node.state === "done" ? "done" : node.state === "muted" ? "muted" : "";
      body += block(id, pos[i].x, pos[i].y - 3, cw, cd, ch, {
        topText: node.value,
        topSize: 19,
        cut: 4,
        addr: node.addr,
        lift: isActive ? 6 : 0,
        tone,
        tip: tip(`nút ${i + 1}${node.id ? ` · ${node.id}` : ""}`, [
          node.value != null ? `giá trị: ${node.value}` : "",
          node.addr ? `địa chỉ: ${node.addr}` : "",
          headId === node.id || String(i) === headId ? "đang là head" : "",
          isActive ? "đang được trỏ tới" : ""
        ])
      });
    });
    const headIndex = headId == null ? -1 : nodes.findIndex((node, i) => node.id === headId || String(i) === headId);
    const hIdx = headIndex >= 0 ? headIndex : 0;
    if (scene.head != null) {
      const hx = pos[hIdx].x;
      const hy = pos[hIdx].y - ch - 40;
      body += lead(hx, hy + 10, hx, pos[hIdx].y - ch - 8);
      body += pill(hx, hy, scene.headLabel || "head", { tone: "ink" });
    }
    const last = pos[n - 1];
    const nx = last.x + cw / 2 + 46;
    body += lead(last.x + cw / 2 + 4, last.y - ch / 2 - 4, nx - 18, last.y - ch / 2 - 4);
    body += pill(nx, last.y - ch / 2 - 4, "NULL", { tone: "ghost" });
    const cap = captionPart(scene, frontR + depth + 46);
    body += cap.svg;
    const height = Math.max(320, frontR + depth + 54 + cap.height);
    return { body, height };
  }

  function paintStack(scene, id) {
    const items = list(scene.items);
    if (!items.length) return null;
    const n = items.length;
    const top = scene.top != null ? Number(scene.top) : n - 1;
    const active = new Set(toInts(scene.active));
    const gap = n > 5 ? 34 : 46;
    const w = 208;
    const d = 48;
    const h = 28;
    const baseY = 286;
    let body = "";
    body += shadow(270, baseY + 44, 130, 17);
    body += `<path class="iso-ground" d="M${P(270 - 118, baseY + 20)}L${P(270 + 118, baseY + 20)}L${P(270 + 132, baseY + 34)}L${P(270 - 132, baseY + 34)}Z"/>`;
    items.forEach((value, i) => {
      const y = baseY - i * gap;
      const isActive = active.has(i) || i === top;
      body += block(id, 270, y, w, d, h, {
        value,
        size: 17,
        cut: 12,
        lift: active.has(i) ? 6 : 0,
        tone: active.has(i) ? "active" : "",
        cls: i === top ? "is-top" : "",
        tip: tip(`phần tử ${i + 1}`, [
          `giá trị: ${value}`,
          i === top ? "đỉnh ngăn xếp (top)" : "",
          active.has(i) ? "vừa được xử lý" : ""
        ])
      });
    });
    if (top >= 0 && top < n) {
      const ty = baseY - top * gap - h / 2 - (active.has(top) ? 6 : 0);
      body += lead(270 + w / 2 + 8, ty, 270 + w / 2 + 34, ty);
      body += pill(270 + w / 2 + 62, ty, "top", { tone: "ink" });
    }
    const cap = captionPart(scene, baseY + 78);
    body += cap.svg;
    return { body, height: Math.max(330, baseY + 86 + cap.height) };
  }

  function paintQueue(scene, id) {
    const items = list(scene.items);
    if (!items.length) return null;
    const n = items.length;
    const active = new Set(toInts(scene.active));
    const step = Math.min(150, 470 / n);
    const w = 84;
    const d = 34;
    const h = 46;
    const x0 = 270 - ((n - 1) * step) / 2;
    const y0 = 176;
    const rise = step * 0.24;
    const front = scene.front != null ? Number(scene.front) : -1;
    const rear = scene.rear != null ? Number(scene.rear) : -1;
    const dy = (n - 1) * rise;
    const L = x0 - w / 2 - 22;
    const R = x0 + (n - 1) * step + w / 2 + 22;
    const backL = y0 - d / 2 - 10;
    const frontL = y0 + d / 2 + 10;
    const frontR = frontL + dy;
    const depth = 18;
    let body = "";
    body += shadow(270, frontR + depth + 12, (R - L) / 2 + 8, 15);
    body += `<path class="iso-slab-r" d="M${P(R, backL + dy)}L${P(R, frontR)}L${P(R, frontR + depth)}L${P(R, backL + dy + depth)}Z"/>`;
    body += `<path class="iso-slab-f" d="M${P(L, frontL)}L${P(R, frontR)}L${P(R, frontR + depth)}L${P(L, frontL + depth)}Z"/>`;
    body += `<path class="iso-slab-t" d="M${P(L, backL)}L${P(R, backL + dy)}L${P(R, frontR)}L${P(L, frontL)}Z"/>`;
    body += `<text class="iso-slab-label" x="${F(L + 18)}" y="${F(frontL + depth - 6)}">HÀNG ĐỢI</text>`;
    items.forEach((value, i) => {
      const x = x0 + i * step;
      const y = y0 + i * rise;
      body += `<text class="iso-index" x="${F(x)}" y="${F(y + d / 2 + 9)}" text-anchor="middle">${i}</text>`;
    });
    items.forEach((value, i) => {
      const x = x0 + i * step;
      const y = y0 + i * rise;
      const isActive = active.has(i);
      const tone = isActive ? "active" : i === front ? "front" : "";
      body += block(id, x, y, w, d, h, {
        topText: value,
        topSize: 18,
        cut: 5,
        lift: isActive ? 6 : 0,
        tone,
        tip: tip(`vị trí ${i}`, [
          `giá trị: ${value}`,
          i === front ? "đầu hàng (front)" : "",
          i === rear ? "cuối hàng (rear)" : "",
          isActive ? "đang được lấy ra" : ""
        ])
      });
    });
    [["front", front], ["rear", rear]].forEach((entry, k) => {
      const idx = entry[1];
      if (!Number.isFinite(idx) || idx < 0 || idx >= n) return;
      const x = x0 + idx * step;
      const y = y0 + idx * rise - h - 36 - k * 22;
      body += lead(x, y + 10, x, y0 + idx * rise - h - 8);
      body += pill(x, y, entry[0], { tone: "ink" });
    });
    const cap = captionPart(scene, frontR + depth + 44);
    body += cap.svg;
    return { body, height: Math.max(330, frontR + depth + 52 + cap.height) };
  }

  function paintGraphLike(scene, id, kind) {
    const nodes = list(scene.nodes).map((raw, i) => {
      const node = typeof raw === "object" ? raw : { id: raw, label: raw };
      return Object.assign(node, {
        id: node.id != null ? node.id : `n${i}`,
        x: node.x != null ? Number(node.x) : 90 + (i % 4) * 175,
        y: node.y != null ? Number(node.y) : 70 + Math.floor(i / 4) * 110
      });
    });
    if (!nodes.length) return null;
    const byId = {};
    nodes.forEach((node) => { byId[node.id] = node; });
    const active = new Set(list(scene.active).map(String));
    const bh = 42;
    const bw = 72;
    const bd = 38;
    let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity;
    nodes.forEach((node) => {
      minX = Math.min(minX, node.x - 54);
      maxX = Math.max(maxX, node.x + 54);
      minY = Math.min(minY, node.y - 64);
      maxY = Math.max(maxY, node.y + 50);
    });
    const span = Math.max(1, maxX - minX);
    const scale = Math.min(1.45, 520 / span);
    const tx = 270 - scale * (minX + maxX) / 2;
    const ty = 46 - scale * minY;
    let inner = "";
    list(scene.edges).forEach((raw, i) => {
      const edge = Array.isArray(raw) ? { from: raw[0], to: raw[1] } : raw;
      const a = byId[edge.from];
      const b = byId[edge.to];
      if (!a || !b) return;
      const ax = a.x; const ay = a.y - bh / 2;
      const bx = b.x; const by = b.y - bh / 2;
      const len = Math.hypot(bx - ax, by - ay) || 1;
      const trim = 32;
      const x1 = ax + ((bx - ax) / len) * trim;
      const y1 = ay + ((by - ay) / len) * trim;
      const x2 = bx - ((bx - ax) / len) * (trim + 2);
      const y2 = by - ((by - ay) / len) * (trim + 2);
      const bend = kind === "tree" ? 0 : (i % 2 ? 11 : -11);
      const mx = (x1 + x2) / 2 + (bend * (by - ay)) / len;
      const my = (y1 + y2) / 2 - (bend * (bx - ax)) / len;
      const isActive = edge.state === "active" || active.has(String(edge.from)) || active.has(String(edge.to));
      const isDone = edge.state === "done";
      const mk = isDone ? `${id}-ad` : isActive ? `${id}-aa` : `${id}-a`;
      inner += `<path class="iso-edge${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}" d="M${P(x1, y1)}Q${P(mx, my)} ${P(x2, y2)}" marker-end="url(#${mk})"/>`;
      if (edge.weight != null) {
        inner += `<g class="iso-weight"><rect x="${F(mx - 15)}" y="${F(my - 10)}" width="30" height="19" rx="9.5"/><text x="${F(mx)}" y="${F(my + 3.5)}" text-anchor="middle">${esc(cut(edge.weight, 4))}</text></g>`;
      }
    });
    nodes.forEach((node) => {
      const isActive = node.state === "active" || active.has(String(node.id));
      const isDone = node.state === "done";
      const label = node.label != null ? node.label : node.id;
      inner += block(id, node.x, node.y + bh / 2, bw, bd, bh, {
        topText: label,
        topSize: String(label).length > 4 ? 13.5 : 17,
        cut: 8,
        tone: isActive ? "active" : isDone ? "done" : node.state === "muted" ? "muted" : "",
        lift: isActive ? 4 : 0,
        tip: tip(`đỉnh ${label}`, [
          String(node.id) !== String(label) ? `mã: ${node.id}` : "",
          isActive ? "đang duyệt" : "",
          isDone ? "đã duyệt xong" : "",
          node.badge ? `nhãn: ${node.badge}` : ""
        ])
      });
      if (node.badge) {
        inner += pill(node.x + 46, node.y - 20, node.badge, { tone: "ink", h: 19 });
      }
    });
    const contentBottom = ty + scale * maxY;
    const cap = captionPart(scene, contentBottom + 42);
    const body = `<g transform="translate(${F(tx)} ${F(ty)}) scale(${F(scale)})">${inner}</g>` + cap.svg;
    const height = Math.max(300, contentBottom + 50 + cap.height);
    return { body, height };
  }

  function paintMemory(scene, id) {
    const stack = list(scene.stack);
    const heap = list(scene.heap);
    const cols = [
      { title: "STACK", sub: "biến cục bộ", x: 140, items: stack, empty: "chưa có biến" },
      { title: "HEAP", sub: "cấp phát động", x: 400, items: heap, empty: "chưa cấp phát" }
    ];
    const maxItems = Math.max(1, stack.length, heap.length);
    const many = maxItems > 3;
    const gap = many ? 62 : 72;
    const h = many ? 46 : 56;
    const baseY = 300;
    const w = 244;
    const d = 26;
    let body = "";
    body += shadow(270, baseY + 62, 240, 18);
    cols.forEach((col) => {
      body += `<text class="iso-col-title" x="${F(col.x)}" y="40" text-anchor="middle">${esc(col.title)}</text>`;
      body += `<text class="iso-col-sub" x="${F(col.x)}" y="56" text-anchor="middle">${esc(col.sub)}</text>`;
      body += `<line class="iso-guide" x1="${F(col.x)}" y1="66" x2="${F(col.x)}" y2="${F(baseY + 18)}"/>`;
      if (!col.items.length) {
        body += block(id, col.x, baseY, w, d, h, { topText: "—", tone: "ghost", hatch: false });
        body += `<text class="iso-sub" x="${F(col.x)}" y="${F(baseY + 30)}" text-anchor="middle" font-size="12.5">${esc(col.empty)}</text>`;
        return;
      }
      col.items.forEach((item, i) => {
        const y = baseY - i * gap;
        body += block(id, col.x, y, w, d, h, {
          value: item.value,
          size: many ? 14 : 16,
          cut: 12,
          name: item.name,
          addr: item.addr,
          tone: item.active ? "active" : "",
          lift: item.active ? 5 : 0,
          hatch: false,
          tip: tip(item.name || "ô nhớ", [
            item.value != null ? `giá trị: ${item.value}` : "",
            item.addr ? `địa chỉ: ${item.addr}` : "",
            item.active ? "đang được dùng" : ""
          ])
        });
      });
    });
    const pointers = list(scene.pointers);
    if (pointers.length) {
      let px = 150 - ((pointers.length - 1) * 170) / 2;
      body += `<text class="iso-col-sub" x="40" y="${F(baseY + 86)}">con trỏ</text>`;
      pointers.forEach((raw) => {
        const p = typeof raw === "object" ? raw : { name: raw, target: raw };
        body += pill(px, baseY + 80, `${p.name || "ptr"} → ${p.target || "?"}`, { tone: "ink", h: 21 });
        px += 170;
      });
    }
    const cap = captionPart(scene, baseY + (pointers.length ? 118 : 92));
    body += cap.svg;
    return { body, height: Math.max(340, baseY + (pointers.length ? 126 : 100) + cap.height) };
  }

  function paintRecursion(scene, id) {
    const frames = list(scene.frames);
    if (!frames.length) return null;
    const n = frames.length;
    const w = 344;
    const d = 42;
    const h = n > 3 ? 40 : 50;
    const gap = n > 3 ? 64 : n > 2 ? 72 : 82;
    const baseY = 304;
    let body = "";
    body += shadow(270, baseY + 28, 190, 17);
    body += pill(96, 30, "CALL STACK", { tone: "ink" });
    frames.forEach((frame, i) => {
      const y = baseY - i * gap;
      body += block(id, 270, y, w, d, h, {
        topText: frame.fn,
        topSize: n > 3 ? 16 : 17,
        cut: 18,
        value: frame.note || "đang chờ",
        size: n > 3 ? 11.5 : 12.5,
        cut: 32,
        tone: frame.active ? "active" : "",
        lift: frame.active ? 5 : 0,
        tip: tip(`${frame.fn} · #${i + 1}`, [
          frame.note || "đang chờ",
          frame.active ? "khung đang chạy" : "khung đang chờ",
          i === n - 1 ? "lời gọi mới nhất" : ""
        ])
      });
      body += pill(270 + w / 2 + 34, y - h / 2 - (frame.active ? 5 : 0), `#${i + 1}`, { tone: "ink", h: 19 });
    });
    const cap = captionPart(scene, baseY + 66);
    body += cap.svg;
    return { body, height: Math.max(330, baseY + 74 + cap.height) };
  }

  function magnitude(row) {
    const hay = `${row.text || ""} ${row.value || ""}`;
    const matches = hay.match(/\d[\d.,]*/g);
    if (matches && matches.length) {
      const raw = matches[matches.length - 1].replace(/[.,]/g, "");
      const value = Number(raw);
      if (Number.isFinite(value) && value > 0) return value;
    }
    const text = String(row.value || "");
    if (/O\(1\)/.test(text)) return 1;
    if (/log/.test(text)) return 10;
    if (/n\s*\^\s*2|n²|n2/.test(text)) return 1000;
    return 10;
  }

  function paintComplexity(scene, id) {
    const rows = list(scene.rows);
    if (!rows.length) return null;
    const mags = rows.map(magnitude);
    const logs = mags.map((v) => Math.log10(v + 1));
    const maxLog = Math.max(0.6, ...logs);
    const step = Math.min(150, 490 / rows.length);
    const w = Math.min(120, step * 0.84);
    const d = 46;
    const baseY = 300;
    const x0 = 270 - ((rows.length - 1) * step) / 2;
    const L = x0 - w / 2 - 30;
    const R = x0 + (rows.length - 1) * step + w / 2 + 30;
    let body = "";
    body += shadow(270, baseY + 58, Math.min(264, (R - L) / 2 + 8), 16);
    body += `<rect class="iso-rail" x="${F(L)}" y="${F(baseY + 18)}" width="${F(R - L)}" height="26" rx="13"/>`;
    body += `<rect class="iso-slab-f" x="${F(L)}" y="${F(baseY + 44)}" width="${F(R - L)}" height="7" rx="3.5"/>`;
    body += `<text class="iso-slab-label" x="${F(L + 24)}" y="${F(baseY + 36)}">BIG-O</text>`;
    rows.forEach((row, i) => {
      const x = x0 + i * step;
      const h = 34 + (logs[i] / maxLog) * 152;
      const top = baseY - h;
      const isActive = !!row.active;
      const label = String(row.label || "");
      body += block(id, x, baseY, w, d, h, {
        topText: row.label,
        topSize: label.length > 6 ? 13.5 : label.length > 4 ? 15 : 17,
        cut: 14,
        tone: isActive ? "active" : "",
        tip: tip(String(row.label || "độ phức tạp"), [
          row.value ? `chi phí: ${row.value}` : "",
          row.text || "",
          isActive ? "đang được chọn" : ""
        ])
      });
      body += `<text class="iso-index" x="${F(x)}" y="${F(baseY + 37)}" text-anchor="middle" font-size="12">${esc(cut(row.value, 12))}</text>`;
      const noteY = top - 32;
      if (row.text) body += pill(x, noteY, cut(row.text, 22), { tone: isActive ? "active" : "ink" });
      body += lead(x, noteY + 10, x, top - 4, "is-soft");
    });
    const cap = captionPart(scene, baseY + 76);
    body += cap.svg;
    return { body, height: Math.max(334, baseY + 84 + cap.height) };
  }

  function paintFlow(scene, id) {
    const steps = list(scene.steps);
    if (!steps.length) return null;
    const items = steps.map((raw) => (typeof raw === "string" ? { label: raw } : raw));
    const active = new Set(toInts(scene.active));
    const done = new Set(toInts(scene.done));
    const n = items.length;
    const step = Math.min(148, 490 / n);
    const w = Math.min(136, step * 0.84);
    const d = 44;
    const h = 34;
    const x0 = 270 - ((n - 1) * step) / 2;
    const y0 = 166;
    const rise = step * 0.28;
    const dy = (n - 1) * rise;
    const L = x0 - w / 2 - 22;
    const R = x0 + (n - 1) * step + w / 2 + 22;
    const backL = y0 - d / 2 - 10;
    const frontL = y0 + d / 2 + 10;
    const frontR = frontL + dy;
    const depth = 16;
    let body = "";
    body += shadow(270, frontR + depth + 12, (R - L) / 2 + 6, 15);
    body += `<path class="iso-slab-r" d="M${P(R, backL + dy)}L${P(R, frontR)}L${P(R, frontR + depth)}L${P(R, backL + dy + depth)}Z"/>`;
    body += `<path class="iso-slab-f" d="M${P(L, frontL)}L${P(R, frontR)}L${P(R, frontR + depth)}L${P(L, frontL + depth)}Z"/>`;
    body += `<path class="iso-slab-t" d="M${P(L, backL)}L${P(R, backL + dy)}L${P(R, frontR)}L${P(L, frontL)}Z"/>`;
    body += `<text class="iso-slab-label" x="${F(L + 18)}" y="${F(frontL + depth - 6)}">LUỒNG CHẠY</text>`;
    items.forEach((_, i) => {
      body += `<text class="iso-index" x="${F(x0 + i * step)}" y="${F(y0 + i * rise + d / 2 + 9)}" text-anchor="middle">${i + 1}</text>`;
    });
    for (let i = 0; i < n - 1; i += 1) {
      const ax = x0 + i * step + w / 2 + 4;
      const ay = y0 + i * rise - h / 2 - 6;
      const bx = x0 + (i + 1) * step - w / 2 - 8;
      const by = y0 + (i + 1) * rise - h / 2 - 6;
      const mk = done.has(i) ? `${id}-ad` : `${id}-a`;
      body += `<path class="iso-edge${done.has(i) ? " is-done" : ""}" d="M${P(ax, ay)}Q${P((ax + bx) / 2, Math.min(ay, by) - 20)} ${P(bx, by)}" marker-end="url(#${mk})"/>`;
    }
    items.forEach((item, i) => {
      const x = x0 + i * step;
      const y = y0 + i * rise;
      const isActive = active.has(i);
      const isDone = done.has(i) && !isActive;
      const label = String(item.label || `bước ${i + 1}`);
      body += block(id, x, y, w, d, h, {
        topText: label,
        topSize: label.length > 10 ? 12 : label.length > 8 ? 13 : label.length > 6 ? 14 : 15,
        cut: 14,
        value: item.sub ? cut(item.sub, 9) : null,
        size: 11,
        tone: isActive ? "active" : isDone ? "done" : "",
        lift: isActive ? 6 : 0,
        tip: tip(`bước ${i + 1}: ${label}`, [
          item.sub || "",
          isActive ? "đang chạy" : isDone ? "đã xong" : ""
        ])
      });
    });
    const cap = captionPart(scene, frontR + depth + 50);
    body += cap.svg;
    return { body, height: Math.max(330, frontR + depth + 58 + cap.height) };
  }

  const PAINTERS = {
    array: paintArray,
    list: paintList,
    stack: paintStack,
    queue: paintQueue,
    tree: (scene, id) => paintGraphLike(scene, id, "tree"),
    graph: (scene, id) => paintGraphLike(scene, id, "graph"),
    memory: paintMemory,
    recursion: paintRecursion,
    complexity: paintComplexity,
    flow: paintFlow
  };

  function render(scene) {
    if (!scene || !canRender(scene.kind)) return "";
    const painter = PAINTERS[scene.kind];
    if (!painter) return "";
    const id = `cs${++seq}`;
    enterSeq = 0;
    const art = painter(scene, id);
    if (!art) return "";
    const height = Math.max(240, Math.round(art.height));
    const label = scene.title || `Mô phỏng ${scene.kind}`;
    const vbW = W / CAM.zoom;
    const vbH = height / CAM.zoom;
    const vbX = (W - vbW) / 2;
    const vbY = (height - vbH) / 2;
    const addrOn = LAYERS.addr;
    return `<div class="cpp-iso is-fresh${addrOn ? "" : " hide-addr"}" data-h="${height}" style="--yaw:${CAM.yaw}deg">
      <div class="iso-tools" role="group" aria-label="Camera sân khấu">
        <button type="button" data-iso-cam="in" title="Phóng to" aria-label="Phóng to">+</button>
        <button type="button" data-iso-cam="out" title="Thu nhỏ" aria-label="Thu nhỏ">−</button>
        <button type="button" data-iso-cam="fit" title="Vừa khung (nhấp đúp)" aria-label="Thu vừa khung">⤢</button>
        <button type="button" data-iso-cam="addr" class="${addrOn ? "is-on" : ""}" aria-pressed="${addrOn}" title="Ẩn/hiện địa chỉ và chỉ số" aria-label="Ẩn hoặc hiện địa chỉ và chỉ số">ĐC</button>
      </div>
      <div class="iso-callout" role="tooltip" hidden></div>
      <svg class="cpp-iso-svg" viewBox="${F(vbX)} ${F(vbY)} ${F(vbW)} ${F(vbH)}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(label)}">
        ${defs(id)}${art.body}
      </svg>
    </div>`;
  }

  /* ---------- camera, chú thích và tương tác ---------- */
  let drag = null;
  let hovered = null;
  let pinned = null;

  function hostFrom(node) {
    return node && node.closest ? node.closest(".cpp-iso") : null;
  }
  function blockFrom(node) {
    const el = node && node.closest ? node.closest(".iso-block") : null;
    return el && el.closest(".cpp-iso") ? el : null;
  }
  function applyCam(host) {
    const svg = host.querySelector(".cpp-iso-svg");
    if (!svg) return;
    const h = Number(host.dataset.h) || 300;
    const vw = W / CAM.zoom;
    const vh = h / CAM.zoom;
    svg.setAttribute("viewBox", `${F((W - vw) / 2)} ${F((h - vh) / 2)} ${F(vw)} ${F(vh)}`);
    host.style.setProperty("--yaw", `${CAM.yaw}deg`);
  }
  function zoomBy(host, factor) {
    CAM.zoom = clamp(Number((CAM.zoom * factor).toFixed(3)), Z_MIN, Z_MAX);
    applyCam(host);
    saveCam(CAM);
  }
  function resetCam(host) {
    CAM.zoom = 1;
    CAM.yaw = 0;
    applyCam(host);
    saveCam(CAM);
  }
  function toggleAddr() {
    LAYERS.addr = !LAYERS.addr;
    saveLayers(LAYERS);
    document.querySelectorAll(".cpp-iso").forEach((el) => el.classList.toggle("hide-addr", !LAYERS.addr));
    document.querySelectorAll('[data-iso-cam="addr"]').forEach((btn) => {
      btn.classList.toggle("is-on", LAYERS.addr);
      btn.setAttribute("aria-pressed", String(LAYERS.addr));
    });
  }
  function readTip(blockEl) {
    try { return JSON.parse(blockEl.getAttribute("data-tip") || "null"); } catch (err) { return null; }
  }
  function hideCallout(host) {
    const callout = host && host.querySelector(".iso-callout");
    if (!callout) return;
    callout.hidden = true;
    callout.textContent = "";
  }
  function placeCallout(host, blockEl) {
    const callout = host.querySelector(".iso-callout");
    const data = readTip(blockEl);
    if (!callout || !data) return;
    callout.textContent = "";
    const head = document.createElement("b");
    head.textContent = data.title;
    callout.appendChild(head);
    (data.lines || []).forEach((line) => {
      const row = document.createElement("span");
      row.textContent = line;
      callout.appendChild(row);
    });
    const foot = document.createElement("i");
    foot.textContent = pinned === blockEl ? "Esc để bỏ ghim" : "Nhấp để ghim chú thích";
    callout.appendChild(foot);
    callout.hidden = false;
    const hr = host.getBoundingClientRect();
    const br = blockEl.getBoundingClientRect();
    const cw = callout.offsetWidth;
    const ch = callout.offsetHeight;
    let left = br.left - hr.left + br.width / 2 - cw / 2;
    let top = br.top - hr.top - ch - 10;
    if (top < 4) top = br.bottom - hr.top + 10;
    left = clamp(left, 6, Math.max(6, hr.width - cw - 6));
    top = clamp(top, 4, Math.max(4, hr.height - ch - 4));
    callout.style.left = `${left}px`;
    callout.style.top = `${top}px`;
  }
  function refresh(host) {
    if (!host) return;
    if (pinned && !pinned.isConnected) pinned = null;
    if (hovered && !hovered.isConnected) hovered = null;
    const target = hovered || pinned;
    if (target && target.closest(".cpp-iso") === host) placeCallout(host, target);
    else hideCallout(host);
  }
  function pinBlock(blockEl) {
    const host = blockEl.closest(".cpp-iso");
    if (pinned && !pinned.isConnected) pinned = null;
    if (pinned === blockEl) {
      pinned.classList.remove("is-pinned");
      pinned = null;
      hideCallout(host);
      return;
    }
    if (pinned) pinned.classList.remove("is-pinned");
    pinned = blockEl;
    pinned.classList.add("is-pinned");
    hovered = null;
    placeCallout(host, blockEl);
  }
  function clearPin() {
    if (!pinned) return;
    const host = pinned.closest(".cpp-iso");
    pinned.classList.remove("is-pinned");
    pinned = null;
    refresh(host);
  }

  document.addEventListener("click", (event) => {
    const tool = event.target.closest ? event.target.closest("[data-iso-cam]") : null;
    if (tool) {
      const host = tool.closest(".cpp-iso");
      if (!host) return;
      event.preventDefault();
      const act = tool.dataset.isoCam;
      if (act === "in") zoomBy(host, 1.18);
      else if (act === "out") zoomBy(host, 1 / 1.18);
      else if (act === "fit") resetCam(host);
      else if (act === "addr") toggleAddr();
      return;
    }
    const host = hostFrom(event.target);
    if (!host || host.dataset.dragged === "1" || event.detail > 1) return;
    const blockEl = blockFrom(event.target);
    if (blockEl) { pinBlock(blockEl); return; }
    if (pinned || hovered) {
      if (pinned) pinned.classList.remove("is-pinned");
      pinned = null;
      hovered = null;
      hideCallout(host);
    }
  });

  document.addEventListener("pointerover", (event) => {
    const blockEl = blockFrom(event.target);
    if (!blockEl) return;
    hovered = blockEl;
    refresh(blockEl.closest(".cpp-iso"));
  });
  document.addEventListener("pointerout", (event) => {
    const blockEl = blockFrom(event.target);
    if (!blockEl) return;
    if (event.relatedTarget && blockEl.contains(event.relatedTarget)) return;
    if (hovered === blockEl) hovered = null;
    refresh(blockEl.closest(".cpp-iso"));
  });
  document.addEventListener("focusin", (event) => {
    const blockEl = blockFrom(event.target);
    if (!blockEl) return;
    hovered = blockEl;
    placeCallout(blockEl.closest(".cpp-iso"), blockEl);
  });
  document.addEventListener("focusout", (event) => {
    const blockEl = blockFrom(event.target);
    if (!blockEl) return;
    if (hovered === blockEl) hovered = null;
    refresh(blockEl.closest(".cpp-iso"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && pinned) { clearPin(); return; }
    const blockEl = blockFrom(event.target);
    if (!blockEl) return;
    if (event.key === "Enter" || event.code === "Space") {
      event.preventDefault();
      event.stopPropagation();
      pinBlock(blockEl);
    }
  }, true);

  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (event.target.closest && event.target.closest(".iso-tools")) return;
    const host = hostFrom(event.target);
    if (!host) return;
    drag = { host, x: event.clientX, yaw: CAM.yaw, moved: false };
  });
  document.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < 4) return;
    drag.moved = true;
    CAM.yaw = Math.round(clamp(drag.yaw + dx * 0.14, -YAW_MAX, YAW_MAX) * 10) / 10;
    drag.host.style.setProperty("--yaw", `${CAM.yaw}deg`);
    drag.host.classList.add("is-yawing");
  });
  function endDrag() {
    if (!drag) return;
    const host = drag.host;
    host.classList.remove("is-yawing");
    if (drag.moved) {
      host.dataset.dragged = "1";
      setTimeout(() => { delete host.dataset.dragged; }, 320);
      saveCam(CAM);
    }
    drag = null;
  }
  document.addEventListener("pointerup", endDrag);
  document.addEventListener("pointercancel", endDrag);
  document.addEventListener("dblclick", (event) => {
    const host = hostFrom(event.target);
    if (!host || (event.target.closest && event.target.closest(".iso-tools"))) return;
    event.preventDefault();
    resetCam(host);
  });
  document.addEventListener("wheel", (event) => {
    if (!event.ctrlKey && !event.metaKey) return;
    const host = hostFrom(event.target);
    if (!host) return;
    event.preventDefault();
    zoomBy(host, event.deltaY < 0 ? 1.12 : 1 / 1.12);
  }, { passive: false });

  return { on, toggle, canRender, render, kinds: Array.from(KINDS) };
})();
