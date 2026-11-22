/* CppLab — code and data-structure renderers */
window.CppRender = (function () {
  "use strict";

  const KEYWORDS = new Set([
    "alignas", "alignof", "and", "asm", "auto", "break", "case", "catch", "class", "const",
    "constexpr", "continue", "default", "delete", "do", "else", "enum", "explicit", "export",
    "extern", "false", "for", "friend", "goto", "if", "inline", "mutable", "namespace", "new",
    "noexcept", "not", "nullptr", "operator", "or", "private", "protected", "public", "register",
    "return", "sizeof", "static", "struct", "switch", "template", "this", "throw", "true", "try",
    "typedef", "typename", "union", "using", "virtual", "volatile", "while", "cin", "cout",
    "cerr", "endl", "std", "string", "vector", "pair", "queue", "stack", "priority_queue",
    "push_back", "pop_back", "size", "begin", "end", "sort", "swap", "max", "min", "abs"
  ]);
  const TYPES = new Set([
    "bool", "char", "double", "float", "int", "long", "short", "signed", "unsigned", "void",
    "size_t", "string", "vector", "pair", "Node", "Student", "Person", "TreeNode", "Edge"
  ]);

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function pad(n, width) {
    return String(n).padStart(width || 2, "0");
  }
  function list(value) {
    return Array.isArray(value) ? value : [];
  }

  function span(cls, text) {
    return `<span class="tok-${cls}">${esc(text)}</span>`;
  }

  function highlightLine(line) {
    let out = "";
    let i = 0;
    while (i < line.length) {
      if (line.startsWith("//", i)) {
        out += span("comment", line.slice(i));
        break;
      }
      const ch = line[i];
      if (ch === "#") {
        out += span("pre", line.slice(i));
        break;
      }
      if (ch === '"' || ch === "'") {
        const quote = ch;
        let j = i + 1;
        while (j < line.length) {
          if (line[j] === "\\") { j += 2; continue; }
          if (line[j] === quote) { j += 1; break; }
          j += 1;
        }
        out += span("str", line.slice(i, j));
        i = j;
        continue;
      }
      if (/[A-Za-z_]/.test(ch)) {
        let j = i + 1;
        while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j += 1;
        const word = line.slice(i, j);
        let rest = line.slice(j);
        const cls = TYPES.has(word) ? "type" : KEYWORDS.has(word) ? "key" : /^\s*\(/.test(rest) ? "fn" : "";
        out += cls ? span(cls, word) : esc(word);
        i = j;
        continue;
      }
      if (/[0-9]/.test(ch)) {
        let j = i + 1;
        while (j < line.length && /[0-9A-Fa-fxX.]/.test(line[j])) j += 1;
        out += span("num", line.slice(i, j));
        i = j;
        continue;
      }
      out += esc(ch);
      i += 1;
    }
    return out;
  }

  function codeHTML(code, activeLine, marks, opts) {
    const options = opts || {};
    const lines = String(code || "").replace(/\r\n/g, "\n").split("\n");
    const marked = new Set(list(marks));
    const active = Number(activeLine) || 0;
    return `<div class="code-lines${options.compact ? " is-compact" : ""}">
      ${lines.map((line, index) => {
        const n = index + 1;
        const cls = [
          "code-line",
          n === active ? "is-active" : "",
          marked.has(n) ? "is-mark" : ""
        ].filter(Boolean).join(" ");
        return `<div class="${cls}" data-code-line="${n}">
          <span class="code-ln">${pad(n)}</span>
          <code class="code-src">${highlightLine(line) || " "}</code>
        </div>`;
      }).join("")}
    </div>`;
  }

  function stateClass(state) {
    if (!state) return "";
    return ` is-${state}`;
  }

  function renderFlow(scene) {
    const steps = list(scene.steps);
    return `<div class="flow-scene">
      ${steps.map((raw, i) => {
        const item = typeof raw === "string" ? { label: raw } : raw;
        const active = list(scene.active).includes(i);
        const done = list(scene.done).includes(i) || i < (scene.active ? Math.min(...list(scene.active)) : -1);
        return `${i ? `<span class="flow-arrow${done ? " is-done" : ""}">→</span>` : ""}
          <div class="flow-step${active ? " is-active" : ""}${done && !active ? " is-done" : ""}">
            <b>${esc(item.label || "")}</b>
            ${item.sub ? `<span>${esc(item.sub)}</span>` : ""}
          </div>`;
      }).join("")}
    </div>`;
  }

  function renderVars(scene) {
    return `<div class="vars-scene">
      ${list(scene.items).map((v) => `
        <div class="var-card${v.changed ? " is-changed" : ""}">
          <div class="var-head"><span class="var-name">${esc(v.name)}</span><span class="var-type">${esc(v.type || "auto")}</span></div>
          <div class="var-value">${esc(v.value)}</div>
          ${v.addr ? `<div class="var-addr">${esc(v.addr)}</div>` : ""}
          ${v.note ? `<div class="var-note">${esc(v.note)}</div>` : ""}
        </div>`).join("")}
    </div>`;
  }

  function renderMemory(scene) {
    const stack = list(scene.stack);
    const heap = list(scene.heap);
    const pointers = list(scene.pointers);
    return `<div class="memory-scene">
      <div class="mem-column">
        <div class="mem-column-head"><span>STACK</span><small>biến cục bộ</small></div>
        <div class="mem-boxes">
          ${stack.map((v) => `<div class="mem-box${v.active ? " is-active" : ""}">
            <span class="mem-name">${esc(v.name)}</span>
            <span class="mem-value">${esc(v.value)}</span>
            <span class="mem-addr">${esc(v.addr || "0x7ffd")}</span>
          </div>`).join("")}
        </div>
      </div>
      <div class="mem-column">
        <div class="mem-column-head"><span>HEAP</span><small>cấp phát động</small></div>
        <div class="mem-boxes">
          ${heap.length ? heap.map((v) => `<div class="mem-box is-heap${v.active ? " is-active" : ""}">
            <span class="mem-name">${esc(v.name || "ô nhớ")}</span>
            <span class="mem-value">${esc(v.value)}</span>
            <span class="mem-addr">${esc(v.addr)}</span>
          </div>`).join("") : `<div class="mem-empty">chưa cấp phát</div>`}
        </div>
      </div>
      ${pointers.length ? `<div class="ptr-list">${pointers.map((p) => `<span class="ptr-chip">${esc(p.name || "ptr")} → ${esc(p.target)}</span>`).join("")}</div>` : ""}
    </div>`;
  }

  function renderArray(scene) {
    const values = list(scene.values);
    const active = new Set(list(scene.active));
    const sorted = new Set(list(scene.sorted));
    const windowSet = new Set(list(scene.window));
    const compare = new Set(list(scene.compare));
    const pointers = list(scene.pointers);
    const valueAt = (index) => {
      const pointersHere = pointers.filter((p) => Number(p.index) === index);
      return pointersHere.length ? `<span class="arr-ptr">${pointersHere.map((p) => esc(p.label)).join(" / ")}</span>` : "";
    };
    return `<div class="array-scene">
      <div class="arr-top">
        <span class="arr-label">${esc(scene.label || "a")}</span>
        ${scene.note ? `<span class="arr-note">${esc(scene.note)}</span>` : ""}
      </div>
      <div class="arr-row">
        ${values.map((v, i) => `<div class="arr-cell${active.has(i) ? " is-active" : ""}${sorted.has(i) ? " is-sorted" : ""}${windowSet.has(i) ? " is-window" : ""}${compare.has(i) ? " is-compare" : ""}">
          ${valueAt(i)}
          <span class="arr-value">${esc(v)}</span>
          <span class="arr-index">${i}</span>
        </div>`).join("")}
      </div>
      ${scene.caption ? `<div class="scene-caption">${esc(scene.caption)}</div>` : ""}
    </div>`;
  }

  function renderList(scene) {
    const nodes = list(scene.nodes);
    const active = new Set(list(scene.active));
    return `<div class="list-scene">
      ${scene.head ? `<div class="list-head-label">${esc(scene.headLabel || "head")} ↓</div>` : ""}
      <div class="list-row">
        ${nodes.map((raw, i) => {
          const node = typeof raw === "object" ? raw : { value: raw };
          const id = node.id || `n${i}`;
          return `<div class="list-node${active.has(id) || active.has(i) ? " is-active" : ""}${node.state ? stateClass(node.state) : ""}">
            <span class="list-value">${esc(node.value)}</span>
            ${node.addr ? `<span class="list-addr">${esc(node.addr)}</span>` : ""}
          </div>${i < nodes.length - 1 ? `<span class="list-arrow">→</span>` : `<span class="list-arrow is-null">→ NULL</span>`}`;
        }).join("")}
      </div>
      ${scene.caption ? `<div class="scene-caption">${esc(scene.caption)}</div>` : ""}
    </div>`;
  }

  function renderStack(scene) {
    const items = list(scene.items);
    const active = new Set(list(scene.active));
    const top = scene.top != null ? Number(scene.top) : items.length - 1;
    return `<div class="stack-scene">
      <div class="stack-rail">
        ${items.map((v, i) => `<div class="stack-item${active.has(i) ? " is-active" : ""}${i === top ? " is-top" : ""}">
          <span>${esc(v)}</span>${i === top ? `<b>top</b>` : ""}
        </div>`).reverse().join("")}
      </div>
      ${scene.caption ? `<div class="scene-caption">${esc(scene.caption)}</div>` : ""}
    </div>`;
  }

  function renderQueue(scene) {
    const items = list(scene.items);
    const active = new Set(list(scene.active));
    return `<div class="queue-scene">
      <div class="queue-row">
        ${items.map((v, i) => `<div class="queue-item${active.has(i) ? " is-active" : ""}${scene.front === i ? " is-front" : ""}${scene.rear === i ? " is-rear" : ""}">
          <span>${esc(v)}</span>
          <small>${scene.front === i ? "front" : scene.rear === i ? "rear" : i}</small>
        </div>`).join("")}
      </div>
      ${scene.caption ? `<div class="scene-caption">${esc(scene.caption)}</div>` : ""}
    </div>`;
  }

  function autoTreePositions(nodes) {
    const columns = 4;
    return nodes.map((n, i) => ({
      ...n,
      x: n.x != null ? n.x : 80 + (i % columns) * 180,
      y: n.y != null ? n.y : 54 + Math.floor(i / columns) * 82
    }));
  }

  function renderGraphSvg(scene, nodes, edges, opts) {
    const options = opts || {};
    const pad = 52;
    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    const box = nodes.length
      ? { x: Math.min(...xs) - pad, y: Math.min(...ys) - pad, w: Math.max(...xs) - Math.min(...xs) + pad * 2, h: Math.max(...ys) - Math.min(...ys) + pad * 2 }
      : { x: 0, y: 0, w: options.width || 760, h: options.height || 310 };
    const byId = {};
    nodes.forEach((n) => { byId[n.id] = n; });
    return `<svg class="graph-svg" viewBox="${box.x} ${box.y} ${box.w} ${box.h}" role="img" aria-label="${esc(scene.title || "Đồ thị")}">
      <defs>
        <marker id="arrow-${options.id || "g"}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
        </marker>
      </defs>
      ${edges.map((raw) => {
        const e = typeof raw === "object" ? raw : { from: raw[0], to: raw[1] };
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return "";
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const x1 = a.x + (dx / len) * 27;
        const y1 = a.y + (dy / len) * 27;
        const x2 = b.x - (dx / len) * 31;
        const y2 = b.y - (dy / len) * 31;
        return `<g class="graph-edge${e.state ? stateClass(e.state) : ""}">
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#arrow-${options.id || "g"})"/>
          ${e.weight != null ? `<text x="${(x1 + x2) / 2 + 7}" y="${(y1 + y2) / 2 - 7}">${esc(e.weight)}</text>` : ""}
        </g>`;
      }).join("")}
      ${nodes.map((n) => `<g class="graph-node${n.state ? stateClass(n.state) : ""}">
        <circle cx="${n.x}" cy="${n.y}" r="25"/>
        <text x="${n.x}" y="${n.y + 4}" text-anchor="middle">${esc(n.label != null ? n.label : n.id)}</text>
        ${n.badge ? `<text class="node-badge" x="${n.x + 22}" y="${n.y - 19}">${esc(n.badge)}</text>` : ""}
      </g>`).join("")}
    </svg>`;
  }

  function renderTree(scene) {
    const nodes = autoTreePositions(list(scene.nodes));
    const edges = list(scene.edges).map((raw) => {
      if (Array.isArray(raw)) return { from: raw[0], to: raw[1] };
      return raw;
    });
    return `<div class="tree-scene">${renderGraphSvg(scene, nodes, edges, { id: "tree", height: 300 })}</div>`;
  }

  function renderGraph(scene) {
    const nodes = list(scene.nodes).map((n, i) => ({
      ...n,
      x: n.x != null ? n.x : 70 + (i % 4) * 190,
      y: n.y != null ? n.y : 60 + Math.floor(i / 4) * 100
    }));
    return `<div class="graph-scene">${renderGraphSvg(scene, nodes, list(scene.edges), { id: "graph", height: 310 })}</div>`;
  }

  function renderTable(scene) {
    return `<div class="table-scene">
      <table>
        <thead><tr>${list(scene.headers).map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>${list(scene.rows).map((row, i) => `<tr class="${scene.activeRow === i ? "is-active" : ""}">
          ${list(row).map((cell) => `<td>${esc(cell)}</td>`).join("")}
        </tr>`).join("")}</tbody>
      </table>
      ${scene.caption ? `<div class="scene-caption">${esc(scene.caption)}</div>` : ""}
    </div>`;
  }

  function renderRecursion(scene) {
    const frames = list(scene.frames);
    return `<div class="recursion-scene">
      <div class="rec-label">CALL STACK</div>
      <div class="rec-stack">
        ${frames.map((f, i) => `<div class="rec-frame${f.active ? " is-active" : ""}" style="--depth:${i}">
          <span class="rec-fn">${esc(f.fn)}</span>
          <span class="rec-note">${esc(f.note || "đang chờ")}</span>
        </div>`).join("")}
      </div>
      ${scene.caption ? `<div class="scene-caption">${esc(scene.caption)}</div>` : ""}
    </div>`;
  }

  function renderComplexity(scene) {
    const rows = list(scene.rows);
    const max = Math.max(1, ...rows.map((r) => Number(r.value) || 0));
    return `<div class="complexity-scene">
      ${rows.map((r) => `<div class="complexity-row${r.active ? " is-active" : ""}">
        <div class="complexity-meta"><b>${esc(r.label)}</b><span>${esc(r.text || "")}</span></div>
        <div class="complexity-bar"><span style="width:${Math.max(3, (Number(r.value) || 0) / max * 100)}%"></span></div>
      </div>`).join("")}
      ${scene.caption ? `<div class="scene-caption">${esc(scene.caption)}</div>` : ""}
    </div>`;
  }

  function renderScene(scene, opts) {
    if (!scene) return `<div class="scene-empty">Chưa có mô phỏng cho bước này.</div>`;
    const options = opts || {};
    let body = "";
    switch (scene.kind) {
      case "flow": body = renderFlow(scene); break;
      case "vars": body = renderVars(scene); break;
      case "memory": body = renderMemory(scene); break;
      case "array": body = renderArray(scene); break;
      case "list": body = renderList(scene); break;
      case "stack": body = renderStack(scene); break;
      case "queue": body = renderQueue(scene); break;
      case "tree": body = renderTree(scene); break;
      case "graph": body = renderGraph(scene); break;
      case "table": body = renderTable(scene); break;
      case "recursion": body = renderRecursion(scene); break;
      case "complexity": body = renderComplexity(scene); break;
      default: body = renderVars({ items: [{ name: "scene", type: "unknown", value: scene.kind || "—" }] });
    }
    return `<div class="scene scene-${esc(scene.kind || "unknown")}${options.compact ? " is-compact" : ""}">
      ${scene.title ? `<div class="scene-title">${esc(scene.title)}</div>` : ""}
      <div class="scene-body">${body}</div>
    </div>`;
  }

  return {
    esc,
    pad,
    codeHTML,
    highlightLine,
    renderScene
  };
})();
