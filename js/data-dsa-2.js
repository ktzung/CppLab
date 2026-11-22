/* CppLab — Cấu trúc dữ liệu & Giải thuật · bài 11–20 */
(function () {
  "use strict";
  const L = window.CPPLAB.lessons;
  const S = {
    flow(steps, active, done) { return { kind: "flow", steps, active: active || [], done: done || [] }; },
    vars(items) { return { kind: "vars", items }; },
    arr(values, active, extra) { return Object.assign({ kind: "array", values, active: active || [] }, extra || {}); },
    table(headers, rows, activeRow, caption) { return { kind: "table", headers, rows, activeRow, caption }; },
    tree(nodes, edges, caption) { return { kind: "tree", nodes, edges, caption }; },
    graph(nodes, edges, caption) { return { kind: "graph", nodes, edges, caption }; },
    big(rows, caption) { return { kind: "complexity", rows, caption }; }
  };

  L.heap = {
    id: "heap",
    track: "dsa",
    module: "dsa-trees",
    title: "Heap và hàng đợi ưu tiên",
    shortTitle: "Heap",
    subtitle: "Cây nhị phân gần đầy, phần tử lớn nhất luôn ở gốc.",
    blurb: "Push 12 vào max-heap [10, 5, 8] và xem sift-up đưa nó lên gốc qua hai lần đổi chỗ.",
    level: "Trung cấp",
    duration: "18 phút",
    tags: ["heap", "max-heap", "sift-up", "priority queue"],
    learn: [
      "Heap lưu trong mảng, không cần con trỏ",
      "Cha của i là (i - 1) / 2",
      "Max-heap: cha luôn lớn hơn hoặc bằng con",
      "Push thêm ở cuối rồi sift-up"
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

void siftUp(vector<int>& h, int i) {
  while (i > 0) {
    int parent = (i - 1) / 2;
    if (h[parent] >= h[i]) break;
    swap(h[parent], h[i]);
    i = parent;
  }
}

int main() {
  vector<int> h = {10, 5, 8};
  h.push_back(12);
  siftUp(h, 3);
  cout << h[0];
  return 0;
}`,
    file: "heap.cpp",
    life: {
      icon: "bulb",
      title: "Bảng xếp hạng",
      text: "Trong một bảng đấu, người mạnh nhất luôn được đặt ở vị trí trung tâm. Khi có người mới mạnh hơn, họ leo dần lên bằng cách so với người ngay trên mình."
    },
    steps: [
      {
        short: "Heap ban đầu",
        type: "KHỞI TẠO",
        title: "[10, 5, 8]",
        body: "Mảng này là max-heap: 10 ở gốc, hai con 5 và 8 đều nhỏ hơn. Vị trí 0 là gốc; 1 và 2 là con của 0.",
        line: 15,
        mark: [15],
        watch: [{ name: "h", value: "[10, 5, 8]", type: "vector<int>" }, { name: "h[0]", value: "10", type: "int" }],
        output: "",
        visual: S.tree([
          { id: "n0", label: "10", x: 380, y: 45, state: "active" },
          { id: "n1", label: "5", x: 250, y: 145 },
          { id: "n2", label: "8", x: 510, y: 145 }
        ], [["n0", "n1"], ["n0", "n2"]], "Max-heap: gốc 10"),
        changes: ["Tạo mảng heap 3 phần tử.", "10 là gốc."]
      },
      {
        short: "Push 12",
        type: "PUSH",
        title: "12 nằm tạm ở cuối",
        body: "<code>push_back(12)</code> đặt 12 vào chỉ số 3, là con trái của 5. Cây vẫn gần đầy nhưng tính chất heap bị vi phạm vì 12 &gt; 5.",
        line: 16,
        mark: [16],
        watch: [{ name: "h", value: "[10, 5, 8, 12]", type: "vector<int>" }, { name: "i", value: "3", type: "int" }],
        output: "",
        visual: S.tree([
          { id: "n0", label: "10", x: 380, y: 45 },
          { id: "n1", label: "5", x: 250, y: 135 },
          { id: "n2", label: "8", x: 510, y: 135 },
          { id: "n3", label: "12", x: 175, y: 225, state: "active" }
        ], [["n0", "n1"], ["n0", "n2"], ["n1", "n3"]], "12 mới ở cuối, chưa đúng vị trí"),
        changes: ["Thêm 12 ở chỉ số 3.", "Heap tạm vi phạm."]
      },
      {
        short: "Sift-up lần 1",
        type: "SIFT-UP",
        title: "So 12 với cha 5",
        body: "parent của 3 là (3 - 1) / 2 = 1. Vì 12 &gt; 5, đổi chỗ. 12 lên chỉ số 1, 5 xuống chỉ số 3.",
        line: 7,
        mark: [7, 8, 9],
        watch: [{ name: "i", value: "3", type: "int" }, { name: "parent", value: "1", type: "int" }, { name: "h", value: "[10, 12, 8, 5]", type: "vector<int>", changed: true }],
        output: "",
        visual: S.tree([
          { id: "n0", label: "10", x: 380, y: 45 },
          { id: "n1", label: "12", x: 250, y: 135, state: "active" },
          { id: "n2", label: "8", x: 510, y: 135 },
          { id: "n3", label: "5", x: 175, y: 225, state: "done" }
        ], [["n0", "n1"], ["n0", "n2"], ["n1", "n3"]], "Swap 12 ↔ 5"),
        changes: ["parent = 1.", "12 > 5 nên swap.", "i = 1."]
      },
      {
        short: "Sift-up lần 2",
        type: "SIFT-UP",
        title: "So 12 với gốc 10",
        body: "parent của 1 là 0. 12 &gt; 10 nên đổi chỗ lần nữa. 12 lên gốc, 10 xuống chỉ số 1.",
        line: 7,
        mark: [7, 8, 9, 10],
        watch: [{ name: "i", value: "1", type: "int" }, { name: "parent", value: "0", type: "int" }, { name: "h", value: "[12, 10, 8, 5]", type: "vector<int>", changed: true }],
        output: "",
        visual: S.tree([
          { id: "n0", label: "12", x: 380, y: 45, state: "active" },
          { id: "n1", label: "10", x: 250, y: 135 },
          { id: "n2", label: "8", x: 510, y: 135 },
          { id: "n3", label: "5", x: 175, y: 225 }
        ], [["n0", "n1"], ["n0", "n2"], ["n1", "n3"]], "12 thành gốc mới"),
        changes: ["parent = 0.", "12 > 10 nên swap.", "i = 0, dừng."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "h[0] = 12",
        body: "Chương trình in 12. Push vào heap tốn O(log n) vì chiều cao cây. Lấy phần tử lớn nhất cũng là O(log n) nhờ sift-down.",
        line: 18,
        mark: [18],
        watch: [{ name: "h[0]", value: "12", type: "int" }],
        output: "12",
        tone: "final",
        visual: S.table(["Chỉ số", "0", "1", "2", "3"], [["Giá trị", "12", "10", "8", "5"]], 0, "Mảng sau khi sift-up"),
        changes: ["stdout nhận 12."]
      }
    ]
  };

  L["hash-table"] = {
    id: "hash-table",
    track: "dsa",
    module: "dsa-trees",
    title: "Bảng băm và xử lý va chạm",
    shortTitle: "Hash table",
    subtitle: "Biến khóa thành chỉ số, và xâu chuỗi khi nhiều khóa rơi cùng ô.",
    blurb: "Băm các khóa theo modulo 5, thấy 12, 7, 17, 22 cùng rơi vào bucket 2 và được lưu thành danh sách.",
    level: "Trung cấp",
    duration: "18 phút",
    tags: ["hash", "bucket", "collision", "chaining"],
    learn: [
      "Hash đưa khóa về một chỉ số",
      "Modulo thường dùng để giới hạn bucket",
      "Va chạm xảy ra khi hai khóa cùng bucket",
      "Chaining lưu nhiều giá trị trong một bucket"
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<vector<int>> table(5);
  int keys[5] = {12, 7, 17, 22, 3};
  for (int k : keys) table[k % 5].push_back(k);
  int find = 17;
  int bucket = find % 5;
  for (int x : table[bucket])
    if (x == find) { cout << bucket; break; }
  return 0;
}`,
    file: "hash-table.cpp",
    life: {
      icon: "bulb",
      title: "Tủ nhiều ngăn",
      text: "Bạn quyết định ngăn tủ bằng số cuối của mã hồ sơ. Nhiều hồ sơ có thể cùng số cuối nên ngăn đó chứa một chồng hồ sơ; muốn tìm thì lục trong chồng đó."
    },
    steps: [
      {
        short: "Tạo bảng",
        type: "KHỞI TẠO",
        title: "5 bucket rỗng",
        body: "table có 5 bucket, mỗi bucket là một vector. Khóa sẽ được băm bằng <code>k % 5</code> để chọn bucket.",
        line: 6,
        mark: [6],
        watch: [{ name: "table.size()", value: "5", type: "size_t" }],
        output: "",
        visual: S.table(["bucket", "giá trị"], [
          ["0", "∅"], ["1", "∅"], ["2", "∅"], ["3", "∅"], ["4", "∅"]
        ], -1, "Bảng băm rỗng"),
        changes: ["Tạo 5 bucket."]
      },
      {
        short: "Băm 12",
        type: "CHÈN",
        title: "12 % 5 = 2",
        body: "12 chia 5 dư 2 nên vào bucket 2. Bucket này chưa có gì.",
        line: 8,
        mark: [8],
        watch: [{ name: "k", value: "12", type: "int" }, { name: "k % 5", value: "2", type: "int" }],
        output: "",
        visual: S.table(["bucket", "giá trị"], [
          ["0", "∅"], ["1", "∅"], ["2", "12"], ["3", "∅"], ["4", "∅"]
        ], 2, "12 vào bucket 2"),
        changes: ["12 % 5 = 2.", "Thêm 12 vào bucket 2."]
      },
      {
        short: "Va chạm",
        type: "VA CHẠM",
        title: "7 cũng vào bucket 2",
        body: "7 % 5 = 2, trùng bucket với 12. Đây là collision. Chaining nối 7 sau 12: bucket 2 = [12, 7].",
        line: 8,
        mark: [8],
        watch: [{ name: "7 % 5", value: "2", type: "int" }, { name: "bucket 2", value: "[12, 7]", type: "vector<int>", changed: true }],
        output: "",
        tone: "warn",
        visual: S.table(["bucket", "giá trị"], [
          ["0", "∅"], ["1", "∅"], ["2", "12 → 7"], ["3", "∅"], ["4", "∅"]
        ], 2, "Va chạm: 12 và 7 cùng bucket 2"),
        changes: ["7 % 5 = 2.", "Nối 7 vào sau 12."]
      },
      {
        short: "Chèn tiếp",
        type: "CHÈN",
        title: "17 và 22 lại vào bucket 2",
        body: "17 % 5 = 2, 22 % 5 = 2. Bucket 2 thành [12, 7, 17, 22]. 3 % 5 = 3 nên 3 vào bucket 3.",
        line: 8,
        mark: [8],
        watch: [{ name: "bucket 2", value: "[12, 7, 17, 22]", type: "vector<int>" }, { name: "bucket 3", value: "[3]", type: "vector<int>" }],
        output: "",
        visual: S.table(["bucket", "giá trị"], [
          ["0", "∅"], ["1", "∅"], ["2", "12 → 7 → 17 → 22"], ["3", "3"], ["4", "∅"]
        ], 2, "Bucket 2 chứa 4 khóa"),
        note: "Nếu nhiều khóa dồn vào một bucket, tìm kiếm trong bucket trở thành duyệt danh sách O(số phần tử). Hàm băm tốt giúp phân bố đều hơn.",
        changes: ["Chèn 17, 22 vào bucket 2.", "Chèn 3 vào bucket 3."]
      },
      {
        short: "Tìm 17",
        type: "TÌM",
        title: "Lục bucket 2",
        body: "find = 17, bucket = 2. Vòng lặp duyệt 12, 7, 17; gặp 17 thì in 2 và break.",
        line: 11,
        mark: [10, 11, 12],
        watch: [{ name: "bucket", value: "2", type: "int" }, { name: "x", value: "17", type: "int", changed: true }],
        output: "2",
        tone: "final",
        visual: S.table(["bucket", "giá trị"], [
          ["0", "∅"], ["1", "∅"], ["2", "12 → 7 → 17 → 22"], ["3", "3"], ["4", "∅"]
        ], 2, "Tìm thấy 17 trong bucket 2"),
        changes: ["Tính bucket = 2.", "So 12, 7 rồi 17.", "In 2, break."]
      }
    ]
  };

  L["graph-representation"] = {
    id: "graph-representation",
    track: "dsa",
    module: "dsa-graphs",
    title: "Biểu diễn đồ thị",
    shortTitle: "Đồ thị",
    subtitle: "Tập đỉnh và tập cạnh, lưu bằng danh sách kề.",
    blurb: "Dựng đồ thị 5 đỉnh bằng vector<vector<int>> và đọc danh sách hàng xóm của từng đỉnh.",
    level: "Cơ bản",
    duration: "15 phút",
    tags: ["graph", "adjacency list", "đỉnh", "cạnh"],
    learn: [
      "Đồ thị gồm đỉnh và cạnh",
      "Danh sách kề lưu hàng xóm của từng đỉnh",
      "vector<vector<int>> tiết kiệm hơn ma trận khi thưa",
      "Cạnh vô hướng được ghi ở cả hai đầu"
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<vector<int>> adj(5);
  adj[0] = {1, 2};
  adj[1] = {0, 3};
  adj[2] = {0, 4};
  adj[3] = {1, 4};
  adj[4] = {2, 3};
  for (int v : adj[0]) cout << v << " ";
  return 0;
}`,
    file: "graph-list.cpp",
    life: {
      icon: "bulb",
      title: "Danh bạ bạn bè",
      text: "Mỗi người giữ danh sách những người quen trực tiếp. Không cần kẻ bảng cho mọi cặp; chỉ ghi những mối quan hệ thật sự tồn tại."
    },
    steps: [
      {
        short: "5 đỉnh rỗng",
        type: "KHỞI TẠO",
        title: "adj có 5 danh sách",
        body: "adj là vector gồm 5 vector con, mỗi vector là danh sách kề của một đỉnh. Ban đầu tất cả rỗng.",
        line: 6,
        mark: [6],
        watch: [{ name: "adj.size()", value: "5", type: "size_t" }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80 },
          { id: "1", label: "1", x: 390, y: 60 },
          { id: "2", label: "2", x: 270, y: 230 },
          { id: "3", label: "3", x: 620, y: 110 },
          { id: "4", label: "4", x: 510, y: 245 }
        ], [], "5 đỉnh, chưa có cạnh"),
        changes: ["Tạo 5 danh sách kề rỗng."]
      },
      {
        short: "Cạnh của 0",
        type: "THÊM CẠNH",
        title: "0 nối với 1 và 2",
        body: "<code>adj[0] = {1, 2}</code> nghĩa là đỉnh 0 có hai hàng xóm trực tiếp: 1 và 2.",
        line: 7,
        mark: [7],
        watch: [{ name: "adj[0]", value: "[1, 2]", type: "vector<int>" }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80, state: "active" },
          { id: "1", label: "1", x: 390, y: 60 },
          { id: "2", label: "2", x: 270, y: 230 },
          { id: "3", label: "3", x: 620, y: 110 },
          { id: "4", label: "4", x: 510, y: 245 }
        ], [
          { from: "0", to: "1" }, { from: "0", to: "2" }
        ], "0 kề 1 và 2"),
        changes: ["Thêm cạnh 0–1.", "Thêm cạnh 0–2."]
      },
      {
        short: "Cạnh của 1, 2",
        type: "THÊM CẠNH",
        title: "Đồ thị vô hướng",
        body: "adj[1] = {0, 3} nhắc lại 0 vì cạnh 0–1 không có hướng. adj[2] = {0, 4} tương tự. Mỗi cạnh xuất hiện ở cả hai đầu.",
        line: 8,
        mark: [8, 9],
        watch: [{ name: "adj[1]", value: "[0, 3]", type: "vector<int>" }, { name: "adj[2]", value: "[0, 4]", type: "vector<int>" }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80 },
          { id: "1", label: "1", x: 390, y: 60, state: "active" },
          { id: "2", label: "2", x: 270, y: 230, state: "active" },
          { id: "3", label: "3", x: 620, y: 110 },
          { id: "4", label: "4", x: 510, y: 245 }
        ], [
          { from: "0", to: "1" }, { from: "0", to: "2" },
          { from: "1", to: "3" }, { from: "2", to: "4" }
        ], "Thêm các cạnh nối tiếp"),
        changes: ["adj[1] = {0, 3}.", "adj[2] = {0, 4}."]
      },
      {
        short: "Hoàn tất",
        type: "THÊM CẠNH",
        title: "Thêm 3–4",
        body: "adj[3] = {1, 4}, adj[4] = {2, 3}. Đồ thị có 5 đỉnh và 5 cạnh, tạo thành một vòng 0–1–3–4–2–0.",
        line: 10,
        mark: [10, 11],
        watch: [{ name: "adj[3]", value: "[1, 4]", type: "vector<int>" }, { name: "adj[4]", value: "[2, 3]", type: "vector<int>" }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80 },
          { id: "1", label: "1", x: 390, y: 60 },
          { id: "2", label: "2", x: 270, y: 230 },
          { id: "3", label: "3", x: 620, y: 110, state: "active" },
          { id: "4", label: "4", x: 510, y: 245, state: "active" }
        ], [
          { from: "0", to: "1" }, { from: "0", to: "2" },
          { from: "1", to: "3" }, { from: "2", to: "4" },
          { from: "3", to: "4" }
        ], "Đồ thị 5 đỉnh, 5 cạnh"),
        changes: ["adj[3] = {1, 4}.", "adj[4] = {2, 3}."]
      },
      {
        short: "Đọc hàng xóm",
        type: "KẾT THÚC",
        title: "In adj[0]: 1 2",
        body: "Chương trình in hàng xóm của 0. Danh sách kề cho biết ngay các đỉnh kề, nhưng muốn kiểm tra hai đỉnh bất kỳ có cạnh hay không thì phải tìm trong danh sách.",
        line: 12,
        mark: [12],
        watch: [{ name: "adj[0]", value: "[1, 2]", type: "vector<int>" }],
        output: "1 2 ",
        tone: "final",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80, state: "active" },
          { id: "1", label: "1", x: 390, y: 60, state: "done" },
          { id: "2", label: "2", x: 270, y: 230, state: "done" },
          { id: "3", label: "3", x: 620, y: 110 },
          { id: "4", label: "4", x: 510, y: 245 }
        ], [
          { from: "0", to: "1", state: "active" }, { from: "0", to: "2", state: "active" },
          { from: "1", to: "3" }, { from: "2", to: "4" },
          { from: "3", to: "4" }
        ], "Hàng xóm của 0"),
        changes: ["stdout nhận 1 2."]
      }
    ]
  };

  L["bfs-dfs"] = {
    id: "bfs-dfs",
    track: "dsa",
    module: "dsa-graphs",
    title: "BFS và DFS",
    shortTitle: "BFS / DFS",
    subtitle: "BFS lan theo từng lớp; DFS đi sâu hết một nhánh rồi mới quay lại.",
    blurb: "Chạy BFS từ đỉnh 0, dùng hàng đợi và mảng seen để thăm mỗi đỉnh đúng một lần.",
    level: "Trung cấp",
    duration: "18 phút",
    tags: ["BFS", "DFS", "queue", "visited"],
    learn: [
      "BFS dùng queue, DFS dùng stack/đệ quy",
      "seen tránh thăm lặp",
      "BFS cho khoảng cách theo số cạnh",
      "Thứ tự thăm phụ thuộc danh sách kề"
    ],
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
  vector<vector<int>> adj = {{1,2},{0,3},{0,4},{1,4},{2,3}};
  vector<bool> seen(5, false);
  queue<int> q;
  q.push(0); seen[0] = true;
  while (!q.empty()) {
    int u = q.front(); q.pop();
    cout << u << " ";
    for (int v : adj[u])
      if (!seen[v]) { seen[v] = true; q.push(v); }
  }
  return 0;
}`,
    file: "bfs.cpp",
    life: {
      icon: "bulb",
      title: "Lan truyền tin",
      text: "BFS giống thả một tin vào nhóm bạn: tất cả bạn trực tiếp biết trước, rồi bạn của bạn biết sau. DFS giống đi sâu theo một chuỗi quen biết tới tận cùng rồi mới quay lại."
    },
    steps: [
      {
        short: "Khởi động",
        type: "KHỞI TẠO",
        title: "Đưa 0 vào hàng đợi",
        body: "seen[0] = true để không xếp 0 lại lần nữa. Hàng đợi chỉ chứa 0. BFS sẽ lấy đỉnh ở đầu hàng đợi mỗi vòng.",
        line: 10,
        mark: [10],
        watch: [{ name: "queue", value: "[0]", type: "queue<int>" }, { name: "seen[0]", value: "true", type: "bool" }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80, state: "active" },
          { id: "1", label: "1", x: 390, y: 60 },
          { id: "2", label: "2", x: 270, y: 230 },
          { id: "3", label: "3", x: 620, y: 110 },
          { id: "4", label: "4", x: 510, y: 245 }
        ], [
          { from: "0", to: "1" }, { from: "0", to: "2" },
          { from: "1", to: "3" }, { from: "2", to: "4" },
          { from: "3", to: "4" }
        ], "Queue: [0]"),
        changes: ["Push 0.", "Đánh dấu seen[0]."]
      },
      {
        short: "Thăm 0",
        type: "BFS",
        title: "Xếp 1 và 2 vào hàng",
        body: "Lấy 0 ra, in 0. Hàng xóm 1 và 2 chưa thăm nên được đánh dấu và xếp vào cuối hàng đợi.",
        line: 12,
        mark: [12, 13, 14, 15],
        watch: [{ name: "u", value: "0", type: "int" }, { name: "queue", value: "[1, 2]", type: "queue<int>" }],
        output: "0 ",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80, state: "done" },
          { id: "1", label: "1", x: 390, y: 60, state: "active" },
          { id: "2", label: "2", x: 270, y: 230, state: "active" },
          { id: "3", label: "3", x: 620, y: 110 },
          { id: "4", label: "4", x: 510, y: 245 }
        ], [
          { from: "0", to: "1", state: "active" }, { from: "0", to: "2", state: "active" },
          { from: "1", to: "3" }, { from: "2", to: "4" },
          { from: "3", to: "4" }
        ], "Lớp 1: 1 và 2 vào queue"),
        changes: ["In 0.", "Queue = [1, 2]."]
      },
      {
        short: "Thăm 1",
        type: "BFS",
        title: "Xếp 3 vào hàng",
        body: "Lấy 1, in 1. Hàng xóm của 1 là 0 (đã thăm) và 3 (chưa), nên chỉ xếp 3 vào hàng.",
        line: 14,
        mark: [14, 15],
        watch: [{ name: "u", value: "1", type: "int" }, { name: "queue", value: "[2, 3]", type: "queue<int>" }],
        output: "0 1 ",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80, state: "done" },
          { id: "1", label: "1", x: 390, y: 60, state: "done" },
          { id: "2", label: "2", x: 270, y: 230, state: "active" },
          { id: "3", label: "3", x: 620, y: 110, state: "active" },
          { id: "4", label: "4", x: 510, y: 245 }
        ], [
          { from: "0", to: "1" }, { from: "0", to: "2", state: "active" },
          { from: "1", to: "3", state: "active" }, { from: "2", to: "4" },
          { from: "3", to: "4" }
        ], "Queue: [2, 3]"),
        changes: ["In 1.", "Queue = [2, 3]."]
      },
      {
        short: "Thăm 2",
        type: "BFS",
        title: "Xếp 4 vào hàng",
        body: "Lấy 2, in 2. 0 đã thăm; 4 chưa nên được xếp vào hàng. Queue còn [3, 4].",
        line: 14,
        mark: [14, 15],
        watch: [{ name: "u", value: "2", type: "int" }, { name: "queue", value: "[3, 4]", type: "queue<int>" }],
        output: "0 1 2 ",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80, state: "done" },
          { id: "1", label: "1", x: 390, y: 60, state: "done" },
          { id: "2", label: "2", x: 270, y: 230, state: "done" },
          { id: "3", label: "3", x: 620, y: 110, state: "active" },
          { id: "4", label: "4", x: 510, y: 245, state: "active" }
        ], [
          { from: "0", to: "1" }, { from: "0", to: "2" },
          { from: "1", to: "3", state: "active" }, { from: "2", to: "4", state: "active" },
          { from: "3", to: "4" }
        ], "Queue: [3, 4]"),
        changes: ["In 2.", "Queue = [3, 4]."]
      },
      {
        short: "Thăm 3, 4",
        type: "KẾT THÚC",
        title: "Thứ tự BFS: 0 1 2 3 4",
        body: "3 và 4 lần lượt được lấy ra; hàng xóm của chúng đều đã thăm. Hàng đợi rỗng thì dừng. BFS cho thứ tự theo lớp khoảng cách.",
        line: 11,
        mark: [11, 13],
        watch: [{ name: "queue", value: "[]", type: "queue<int>" }, { name: "thứ tự", value: "0 1 2 3 4", type: "BFS" }],
        output: "0 1 2 3 4 ",
        tone: "final",
        visual: S.graph([
          { id: "0", label: "0", x: 150, y: 80, state: "done" },
          { id: "1", label: "1", x: 390, y: 60, state: "done" },
          { id: "2", label: "2", x: 270, y: 230, state: "done" },
          { id: "3", label: "3", x: 620, y: 110, state: "done" },
          { id: "4", label: "4", x: 510, y: 245, state: "done" }
        ], [
          { from: "0", to: "1", state: "done" }, { from: "0", to: "2", state: "done" },
          { from: "1", to: "3", state: "done" }, { from: "2", to: "4", state: "done" },
          { from: "3", to: "4" }
        ], "BFS duyệt hết các lớp"),
        changes: ["In 3, 4.", "Queue rỗng, dừng."]
      }
    ]
  };

  L["shortest-path"] = {
    id: "shortest-path",
    track: "dsa",
    module: "dsa-graphs",
    title: "Đường đi ngắn nhất với Dijkstra",
    shortTitle: "Dijkstra",
    subtitle: "Luôn mở rộng đỉnh có khoảng cách tạm thời nhỏ nhất.",
    blurb: "Tính đường ngắn nhất từ 0 tới 3 trên đồ thị có trọng số, thấy đường 0→2→1→3 rẻ hơn 0→1→3.",
    level: "Nâng cao",
    duration: "22 phút",
    tags: ["Dijkstra", "shortest path", "priority queue", "trọng số"],
    learn: [
      "dist lưu chi phí tốt nhất tạm thời",
      "Chọn đỉnh có dist nhỏ nhất để mở rộng",
      "Cập nhật dist nếu tìm đường rẻ hơn",
      "Dijkstra cần trọng số không âm"
    ],
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
  vector<vector<pair<int,int>>> g(5);
  g[0] = {{1,4},{2,1}};
  g[2] = {{1,2},{3,5}};
  g[1] = {{3,1}};
  vector<int> dist(5, 1e9);
  dist[0] = 0;
  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
  pq.push({0,0});
  while (!pq.empty()) {
    auto [d,u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [v,w] : g[u])
      if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push({dist[v], v}); }
  }
  cout << dist[3];
  return 0;
}`,
    file: "dijkstra.cpp",
    life: {
      icon: "bulb",
      title: "Bản đồ giao thông",
      text: "Bạn đang tìm đường rẻ nhất về nhà. Mỗi ngã rẽ có phí cầu đường. Dijkstra luôn xét điểm đến tạm thời rẻ nhất trước, giống việc luôn đi theo hướng đang có tổng phí thấp nhất."
    },
    steps: [
      {
        short: "Khởi tạo dist",
        type: "KHỞI TẠO",
        title: "dist[0] = 0, còn lại vô cực",
        body: "Chưa biết đường tới đỉnh nào khác, nên dist = ∞ (1e9). Riêng 0 có chi phí 0 vì đang đứng tại đó.",
        line: 12,
        mark: [11, 12],
        watch: [{ name: "dist", value: "[0, ∞, ∞, ∞, ∞]", type: "vector<int>" }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 140, y: 80, state: "active" },
          { id: "1", label: "1", x: 430, y: 70 },
          { id: "2", label: "2", x: 270, y: 230 },
          { id: "3", label: "3", x: 630, y: 120 }
        ], [
          { from: "0", to: "1", weight: 4 }, { from: "0", to: "2", weight: 1 },
          { from: "2", to: "1", weight: 2 }, { from: "1", to: "3", weight: 1 },
          { from: "2", to: "3", weight: 5 }
        ], "dist[0] = 0, các đỉnh khác ∞"),
        changes: ["dist[0] = 0.", "Các dist khác = 1e9."]
      },
      {
        short: "Mở rộng 0",
        type: "RELAX",
        title: "0 → 2 rẻ hơn 0 → 1",
        body: "Từ 0: tới 1 chi phí 4, tới 2 chi phí 1. Cả hai đều cập nhật dist. Hàng đợi ưu tiên sẽ lấy 2 trước vì dist nhỏ hơn.",
        line: 19,
        mark: [18, 19],
        watch: [{ name: "dist[1]", value: "4", type: "int", changed: true }, { name: "dist[2]", value: "1", type: "int", changed: true }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 140, y: 80, state: "done" },
          { id: "1", label: "1 · 4", x: 430, y: 70 },
          { id: "2", label: "2 · 1", x: 270, y: 230, state: "active" },
          { id: "3", label: "3 · ∞", x: 630, y: 120 }
        ], [
          { from: "0", to: "1", weight: 4, state: "active" }, { from: "0", to: "2", weight: 1, state: "active" },
          { from: "2", to: "1", weight: 2 }, { from: "1", to: "3", weight: 1 },
          { from: "2", to: "3", weight: 5 }
        ], "dist: 0=0, 1=4, 2=1"),
        changes: ["dist[1] = 4.", "dist[2] = 1.", "Queue ưu tiên chứa 2 trước."]
      },
      {
        short: "Mở rộng 2",
        type: "RELAX",
        title: "0 → 2 → 1 rẻ hơn",
        body: "Từ 2 tới 1 chi phí 2, tổng 0 + 1 + 2 = 3 &lt; 4 nên dist[1] giảm còn 3. Tới 3 tổng 1 + 5 = 6, tạm cập nhật 6.",
        line: 19,
        mark: [18, 19],
        watch: [{ name: "dist[1]", value: "3", type: "int", changed: true }, { name: "dist[3]", value: "6", type: "int", changed: true }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 140, y: 80, state: "done" },
          { id: "1", label: "1 · 3", x: 430, y: 70, state: "active" },
          { id: "2", label: "2 · 1", x: 270, y: 230, state: "done" },
          { id: "3", label: "3 · 6", x: 630, y: 120 }
        ], [
          { from: "0", to: "1", weight: 4 }, { from: "0", to: "2", weight: 1, state: "done" },
          { from: "2", to: "1", weight: 2, state: "active" }, { from: "1", to: "3", weight: 1 },
          { from: "2", to: "3", weight: 5, state: "active" }
        ], "dist: 1=3, 3=6"),
        changes: ["dist[1] = 3.", "dist[3] = 6."]
      },
      {
        short: "Mở rộng 1",
        type: "RELAX",
        title: "1 → 3 tổng 4",
        body: "Từ 1 tới 3 chi phí 1, tổng 3 + 1 = 4 &lt; 6. dist[3] giảm còn 4. Đây là đường 0→2→1→3.",
        line: 19,
        mark: [18, 19],
        watch: [{ name: "dist[3]", value: "4", type: "int", changed: true }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 140, y: 80, state: "done" },
          { id: "1", label: "1 · 3", x: 430, y: 70, state: "done" },
          { id: "2", label: "2 · 1", x: 270, y: 230, state: "done" },
          { id: "3", label: "3 · 4", x: 630, y: 120, state: "active" }
        ], [
          { from: "0", to: "1", weight: 4 }, { from: "0", to: "2", weight: 1, state: "done" },
          { from: "2", to: "1", weight: 2, state: "done" }, { from: "1", to: "3", weight: 1, state: "active" },
          { from: "2", to: "3", weight: 5 }
        ], "Tìm được đường rẻ hơn tới 3"),
        changes: ["dist[3] = 4.", "Đường tốt nhất: 0→2→1→3."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "dist[3] = 4",
        body: "Chương trình in 4. Khi mọi cạnh không âm, mỗi đỉnh được chốt một lần với khoảng cách nhỏ nhất. Với cạnh âm cần thuật toán khác như Bellman-Ford.",
        line: 21,
        mark: [21],
        watch: [{ name: "dist[3]", value: "4", type: "int" }],
        output: "4",
        tone: "final",
        visual: S.table(["Đỉnh", "dist"], [["0", "0"], ["1", "3"], ["2", "1"], ["3", "4"]], 3, "Khoảng cách ngắn nhất từ 0"),
        changes: ["stdout nhận 4."]
      }
    ]
  };

  L.topological = {
    id: "topological",
    track: "dsa",
    module: "dsa-graphs",
    title: "Sắp xếp tô-pô",
    shortTitle: "Topo sort",
    subtitle: "Xếp việc theo thứ tự phụ thuộc, ví dụ môn học trước môn sau.",
    blurb: "Dùng bậc vào và hàng đợi để xếp 0 trước 1, 2 trước 3, thấy thứ tự hợp lệ 0 1 2 3.",
    level: "Trung cấp",
    duration: "17 phút",
    tags: ["topological sort", "DAG", "indegree", "Kahn"],
    learn: [
      "Topo sort chỉ áp dụng cho DAG",
      "indegree là số cạnh đi vào đỉnh",
      "Bắt đầu từ đỉnh indegree 0",
      "Mỗi cạnh bị xóa làm giảm indegree"
    ],
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
  vector<vector<int>> adj = {{1,2},{3},{3},{}};
  vector<int> indeg = {0,1,1,2};
  queue<int> q;
  for (int i = 0; i < 4; i++) if (indeg[i] == 0) q.push(i);
  while (!q.empty()) {
    int u = q.front(); q.pop();
    cout << u << " ";
    for (int v : adj[u])
      if (--indeg[v] == 0) q.push(v);
  }
  return 0;
}`,
    file: "topological.cpp",
    life: {
      icon: "bulb",
      title: "Môn học tiên quyết",
      text: "Bạn không thể học Giải tích 2 trước Giải tích 1. Topo sort là cách xếp các môn thành một dãy sao cho mọi môn tiên quyết đều đứng trước môn phụ thuộc."
    },
    steps: [
      {
        short: "Bậc vào",
        type: "KHỞI TẠO",
        title: "indeg = {0,1,1,2}",
        body: "Đỉnh 0 không có cạnh vào nên indegree 0. Đỉnh 3 có hai cạnh vào từ 1 và 2 nên indegree 2. Chỉ 0 được xếp vào hàng ban đầu.",
        line: 8,
        mark: [8, 10],
        watch: [{ name: "indeg", value: "{0,1,1,2}", type: "vector<int>" }, { name: "queue", value: "[0]", type: "queue<int>" }],
        output: "",
        visual: S.graph([
          { id: "0", label: "0", x: 380, y: 50, state: "active" },
          { id: "1", label: "1", x: 240, y: 160 },
          { id: "2", label: "2", x: 520, y: 160 },
          { id: "3", label: "3", x: 380, y: 260 }
        ], [
          { from: "0", to: "1" }, { from: "0", to: "2" },
          { from: "1", to: "3" }, { from: "2", to: "3" }
        ], "Queue ban đầu: [0] · indeg 3 = 2"),
        changes: ["indeg = {0,1,1,2}.", "Queue = [0]."]
      },
      {
        short: "Lấy 0",
        type: "KHAN",
        title: "Xếp 0, giảm indegree của 1 và 2",
        body: "Lấy 0 ra, in 0. Xóa cạnh 0→1 và 0→2, mỗi indegree giảm còn 0 nên 1 và 2 vào hàng.",
        line: 13,
        mark: [12, 13, 14, 15],
        watch: [{ name: "u", value: "0", type: "int" }, { name: "queue", value: "[1, 2]", type: "queue<int>" }, { name: "indeg[3]", value: "2", type: "int" }],
        output: "0 ",
        visual: S.graph([
          { id: "0", label: "0", x: 380, y: 50, state: "done" },
          { id: "1", label: "1", x: 240, y: 160, state: "active" },
          { id: "2", label: "2", x: 520, y: 160, state: "active" },
          { id: "3", label: "3", x: 380, y: 260 }
        ], [
          { from: "0", to: "1", state: "done" }, { from: "0", to: "2", state: "done" },
          { from: "1", to: "3" }, { from: "2", to: "3" }
        ], "Queue: [1, 2]"),
        changes: ["In 0.", "indeg[1] = 0, indeg[2] = 0.", "Queue = [1, 2]."]
      },
      {
        short: "Lấy 1",
        type: "KHAN",
        title: "indegree của 3 giảm còn 1",
        body: "Lấy 1, in 1. Xóa cạnh 1→3, indegree của 3 giảm từ 2 còn 1 nên chưa vào hàng.",
        line: 15,
        mark: [14, 15],
        watch: [{ name: "u", value: "1", type: "int" }, { name: "indeg[3]", value: "1", type: "int", changed: true }, { name: "queue", value: "[2]", type: "queue<int>" }],
        output: "0 1 ",
        visual: S.graph([
          { id: "0", label: "0", x: 380, y: 50, state: "done" },
          { id: "1", label: "1", x: 240, y: 160, state: "done" },
          { id: "2", label: "2", x: 520, y: 160, state: "active" },
          { id: "3", label: "3 · 1", x: 380, y: 260 }
        ], [
          { from: "0", to: "1" }, { from: "0", to: "2" },
          { from: "1", to: "3", state: "done" }, { from: "2", to: "3" }
        ], "Queue: [2] · indeg 3 = 1"),
        changes: ["In 1.", "indeg[3] = 1."]
      },
      {
        short: "Lấy 2",
        type: "KHAN",
        title: "3 vào hàng",
        body: "Lấy 2, in 2. Xóa cạnh 2→3, indegree của 3 còn 0 nên 3 được xếp vào hàng.",
        line: 15,
        mark: [14, 15],
        watch: [{ name: "u", value: "2", type: "int" }, { name: "indeg[3]", value: "0", type: "int", changed: true }, { name: "queue", value: "[3]", type: "queue<int>" }],
        output: "0 1 2 ",
        visual: S.graph([
          { id: "0", label: "0", x: 380, y: 50, state: "done" },
          { id: "1", label: "1", x: 240, y: 160, state: "done" },
          { id: "2", label: "2", x: 520, y: 160, state: "done" },
          { id: "3", label: "3 · 0", x: 380, y: 260, state: "active" }
        ], [
          { from: "0", to: "1" }, { from: "0", to: "2" },
          { from: "1", to: "3" }, { from: "2", to: "3", state: "done" }
        ], "Queue: [3]"),
        changes: ["In 2.", "indeg[3] = 0.", "Queue = [3]."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Thứ tự 0 1 2 3",
        body: "Lấy 3, in 3. Hàng đợi rỗng. Một thứ tự topo hợp lệ là 0 1 2 3; có thể có nhiều thứ tự hợp lệ khác nếu các đỉnh độc lập.",
        line: 13,
        mark: [13],
        watch: [{ name: "thứ tự", value: "0 1 2 3", type: "topo" }],
        output: "0 1 2 3 ",
        tone: "final",
        visual: S.flow([
          { label: "0", sub: "indeg 0" },
          { label: "1", sub: "sau 0" },
          { label: "2", sub: "sau 0" },
          { label: "3", sub: "sau 1,2", active: true }
        ], [3], [0, 1, 2]),
        changes: ["In 3.", "Queue rỗng, kết thúc."]
      }
    ]
  };

  L["sorting-nlogn"] = {
    id: "sorting-nlogn",
    track: "dsa",
    module: "dsa-algorithms",
    title: "Merge sort — chia để trị",
    shortTitle: "Merge sort",
    subtitle: "Chia đôi, sắp từng nửa, rồi trộn hai nửa đã sắp.",
    blurb: "Trộn hai nửa [1,5] và [2,4] thành [1,2,4,5], theo dõi hai con trỏ i và j.",
    level: "Trung cấp",
    duration: "18 phút",
    tags: ["merge sort", "divide and conquer", "O(n log n)", "trộn"],
    learn: [
      "Chia bài toán thành hai nửa",
      "Sắp từng nửa bằng đệ quy",
      "Trộn hai dãy đã sắp bằng hai con trỏ",
      "Tổng chi phí O(n log n)"
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& a, int l, int m, int r) {
  vector<int> L(a.begin()+l, a.begin()+m+1);
  vector<int> R(a.begin()+m+1, a.begin()+r+1);
  int i=0,j=0,k=l;
  while (i<L.size() && j<R.size())
    a[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
  while (i<L.size()) a[k++] = L[i++];
  while (j<R.size()) a[k++] = R[j++];
}

int main() {
  vector<int> a = {1, 5, 2, 4};
  merge(a, 0, 1, 3);
  for (int x : a) cout << x << " ";
  return 0;
}`,
    file: "merge-sort.cpp",
    life: {
      icon: "bulb",
      title: "Trộn hai chồng bài",
      text: "Hai chồng bài đã được xếp riêng. Bạn lật lá trên cùng của mỗi chồng, chọn lá nhỏ hơn bỏ vào chồng kết quả. Lặp lại đến khi một chồng hết."
    },
    steps: [
      {
        short: "Hai nửa",
        type: "CHIA",
        title: "[1,5] và [2,4]",
        body: "merge nhận mảng a, đoạn l=0, m=1, r=3. Nửa trái là a[0..1] = [1,5]; nửa phải là a[2..3] = [2,4]. Cả hai đã sắp.",
        line: 17,
        mark: [6, 7, 17],
        watch: [{ name: "L", value: "[1, 5]", type: "vector<int>" }, { name: "R", value: "[2, 4]", type: "vector<int>" }],
        output: "",
        visual: S.arr([1, 5, 2, 4], [], { window: [0, 1], pointers: [{ label: "L", index: 0 }, { label: "R", index: 2 }], caption: "Hai nửa đã sắp xếp" }),
        changes: ["Copy nửa trái.", "Copy nửa phải.", "i = j = 0, k = 0."]
      },
      {
        short: "Chọn 1",
        type: "TRỘN",
        title: "1 ≤ 2 nên lấy 1",
        body: "So L[0] = 1 với R[0] = 2. 1 nhỏ hơn nên ghi 1 vào a[0]; i tăng lên 1, j giữ 0.",
        line: 10,
        mark: [10],
        watch: [{ name: "i", value: "0", type: "int" }, { name: "j", value: "0", type: "int" }, { name: "a[0]", value: "1", type: "int" }],
        output: "",
        visual: S.arr([1, 5, 2, 4], [0], { window: [0, 1], sorted: [0], pointers: [{ label: "i", index: 1 }, { label: "j", index: 2 }], caption: "Ghi 1 vào kết quả" }),
        changes: ["a[0] = 1.", "i = 1, k = 1."]
      },
      {
        short: "Chọn 2",
        type: "TRỘN",
        title: "5 > 2 nên lấy 2",
        body: "L[1] = 5, R[0] = 2. 2 nhỏ hơn nên ghi 2 vào a[1]; j tăng lên 1.",
        line: 10,
        mark: [10],
        watch: [{ name: "i", value: "1", type: "int" }, { name: "j", value: "1", type: "int" }, { name: "a[1]", value: "2", type: "int" }],
        output: "",
        visual: S.arr([1, 2, 2, 4], [1], { window: [0, 1], sorted: [0, 1], pointers: [{ label: "i", index: 1 }, { label: "j", index: 3 }], caption: "Ghi 2 vào kết quả" }),
        changes: ["a[1] = 2.", "j = 1, k = 2."]
      },
      {
        short: "Chọn 4",
        type: "TRỘN",
        title: "5 > 4 nên lấy 4",
        body: "L[1] = 5, R[1] = 4. 4 nhỏ hơn nên ghi 4 vào a[2]. Nửa phải đã hết, còn lại chép nốt 5.",
        line: 10,
        mark: [10, 11],
        watch: [{ name: "j", value: "1", type: "int" }, { name: "a[2]", value: "4", type: "int" }],
        output: "",
        visual: S.arr([1, 2, 4, 4], [2], { window: [0, 1], sorted: [0, 1, 2], pointers: [{ label: "i", index: 1 }, { label: "j", index: 3 }], caption: "Ghi 4, nửa phải cạn" }),
        changes: ["a[2] = 4.", "j = 2, nửa phải hết."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Chép nốt 5",
        body: "Vòng while thứ hai chép phần còn lại của L: a[3] = 5. Mảng thành [1,2,4,5] và chương trình in ra.",
        line: 11,
        mark: [11, 18],
        watch: [{ name: "a", value: "[1, 2, 4, 5]", type: "vector<int>" }],
        output: "1 2 4 5 ",
        tone: "final",
        visual: S.arr([1, 2, 4, 5], [], { sorted: [0, 1, 2, 3], caption: "Trộn hoàn tất" }),
        changes: ["a[3] = 5.", "stdout nhận 1 2 4 5."]
      }
    ]
  };

  L.greedy = {
    id: "greedy",
    track: "dsa",
    module: "dsa-algorithms",
    title: "Tham lam: đổi tiền",
    shortTitle: "Tham lam",
    subtitle: "Mỗi bước chọn đồng tiền lớn nhất có thể — nhanh, nhưng không phải lúc nào cũng tối ưu.",
    blurb: "Đổi 63 bằng các đồng 25, 10, 5, 1; thấy greedy cho 2×25 + 1×10 + 0×5 + 3×1.",
    level: "Cơ bản",
    duration: "14 phút",
    tags: ["greedy", "tham lam", "đổi tiền", "tối ưu"],
    learn: [
      "Greedy chọn lựa chọn tốt nhất trước mắt",
      "Không quay lại sửa lựa chọn cũ",
      "Đúng với hệ tiền chuẩn như 25/10/5/1",
      "Không đảm bảo tối ưu với mọi hệ tiền"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int coins[4] = {25, 10, 5, 1};
  int amount = 63;
  for (int c : coins) {
    int n = amount / c;
    amount = amount % c;
    cout << c << "x" << n << " ";
  }
  return 0;
}`,
    file: "greedy-coins.cpp",
    life: {
      icon: "bulb",
      title: "Trả tiền thừa",
      text: "Khi trả 63 nghìn, bạn đưa tờ lớn nhất có thể trước, rồi tiếp tục với số còn lại. Cách này nhanh và đúng với tiền Việt, nhưng có những bộ tiền khác khiến nó không tối ưu."
    },
    steps: [
      {
        short: "Bắt đầu",
        type: "KHỞI TẠO",
        title: "amount = 63",
        body: "Các đồng tiền được xét từ lớn tới nhỏ: 25, 10, 5, 1. Mục tiêu là dùng ít đồng nhất trong hệ tiền này.",
        line: 6,
        mark: [5, 6],
        watch: [{ name: "amount", value: "63", type: "int" }],
        output: "",
        visual: S.vars([{ name: "amount", type: "int", value: "63" }, { name: "coins", type: "int[4]", value: "{25,10,5,1}" }]),
        changes: ["amount = 63.", "Xét coin 25 trước."]
      },
      {
        short: "Đồng 25",
        type: "THAM LAM",
        title: "2 đồng 25, còn 13",
        body: "63 / 25 = 2, dư 13. Lấy hai đồng 25 là lựa chọn tốt nhất trước mắt vì không thể dùng ba đồng 25.",
        line: 8,
        mark: [8, 9, 10],
        watch: [{ name: "c", value: "25", type: "int" }, { name: "n", value: "2", type: "int" }, { name: "amount", value: "13", type: "int", changed: true }],
        output: "25x2 ",
        visual: S.table(["coin", "số lượng", "còn lại"], [["25", "2", "13"]], 0, "Đã dùng 2 đồng 25"),
        changes: ["n = 2.", "amount = 13.", "stdout nhận 25x2."]
      },
      {
        short: "Đồng 10",
        type: "THAM LAM",
        title: "1 đồng 10, còn 3",
        body: "13 / 10 = 1, dư 3. Tiếp tục với 10 vì đây là đồng lớn nhất còn dùng được.",
        line: 8,
        mark: [8, 9, 10],
        watch: [{ name: "c", value: "10", type: "int" }, { name: "n", value: "1", type: "int" }, { name: "amount", value: "3", type: "int", changed: true }],
        output: "25x2 10x1 ",
        visual: S.table(["coin", "số lượng", "còn lại"], [["25", "2", "13"], ["10", "1", "3"]], 1, "Đã dùng 2×25 và 1×10"),
        changes: ["n = 1.", "amount = 3."]
      },
      {
        short: "Đồng 5",
        type: "THAM LAM",
        title: "0 đồng 5, còn 3",
        body: "3 / 5 = 0. Không dùng được đồng 5 nên bỏ qua, số tiền vẫn 3. Greedy không quay lại thay đổi các đồng đã chọn.",
        line: 8,
        mark: [8, 9],
        watch: [{ name: "c", value: "5", type: "int" }, { name: "n", value: "0", type: "int" }, { name: "amount", value: "3", type: "int" }],
        output: "25x2 10x1 5x0 ",
        visual: S.table(["coin", "số lượng", "còn lại"], [["25", "2", "13"], ["10", "1", "3"], ["5", "0", "3"]], 2, "Bỏ qua đồng 5"),
        changes: ["n = 0 cho đồng 5.", "amount vẫn 3."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "3 đồng 1",
        body: "3 / 1 = 3, dư 0. Tổng cộng 2 + 1 + 0 + 3 = 6 đồng. Với hệ 25/10/5/1, đây là số đồng tối thiểu.",
        line: 8,
        mark: [8, 9, 10],
        watch: [{ name: "n", value: "3", type: "int" }, { name: "amount", value: "0", type: "int", changed: true }],
        output: "25x2 10x1 5x0 1x3 ",
        tone: "final",
        visual: S.table(["coin", "số lượng", "còn lại"], [["25", "2", "13"], ["10", "1", "3"], ["5", "0", "3"], ["1", "3", "0"]], 3, "Tổng 6 đồng"),
        changes: ["Dùng 3 đồng 1.", "amount = 0.", "Kết thúc vòng lặp."]
      }
    ]
  };

  L["dynamic-programming"] = {
    id: "dynamic-programming",
    track: "dsa",
    module: "dsa-algorithms",
    title: "Quy hoạch động",
    shortTitle: "Quy hoạch động",
    subtitle: "Lưu lại kết quả đã tính để không tính lại lần nữa.",
    blurb: "Tính Fibonacci bằng bảng f[0..n]: mỗi số chỉ cộng hai số trước, đưa chi phí từ O(2ⁿ) xuống O(n).",
    level: "Nâng cao",
    duration: "20 phút",
    tags: ["dynamic programming", "DP", "memoization", "Fibonacci"],
    learn: [
      "Bài toán lớn dựa trên bài toán con",
      "Lưu kết quả vào bảng",
      "Điền bảng từ nhỏ tới lớn",
      "Tránh tính lặp bằng đệ quy thuần"
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n = 50;
  vector<long long> f(n + 1);
  f[0] = 0; f[1] = 1;
  for (int i = 2; i <= n; i++)
    f[i] = f[i-1] + f[i-2];
  cout << f[10];
  return 0;
}`,
    file: "fibonacci-dp.cpp",
    life: {
      icon: "bulb",
      title: "Bảng đã tính",
      text: "Nếu đã tính lương tháng trước, bạn không tính lại từ đầu mỗi lần cần dùng. Ghi kết quả ra bảng rồi tra lại là ý tưởng cốt lõi của quy hoạch động."
    },
    steps: [
      {
        short: "Bảng và cơ sở",
        type: "KHỞI TẠO",
        title: "f[0] = 0, f[1] = 1",
        body: "Cấp bảng n + 1 phần tử. Hai giá trị cơ sở được điền trước; mọi số Fibonacci sau đó suy ra từ hai số liền trước.",
        line: 8,
        mark: [7, 8],
        watch: [{ name: "f[0]", value: "0", type: "long long" }, { name: "f[1]", value: "1", type: "long long" }],
        output: "",
        visual: S.table(["i", "0", "1", "2", "3", "4", "5"], [["f[i]", "0", "1", "?", "?", "?", "?"]], 0, "Hai ô cơ sở đã có"),
        changes: ["Cấp bảng f[0..50].", "Điền f[0], f[1]."]
      },
      {
        short: "i = 2",
        type: "ĐIỀN BẢNG",
        title: "f[2] = 1 + 0 = 1",
        body: "f[2] = f[1] + f[0] = 1 + 0 = 1. Kết quả được ghi vào bảng, không cần gọi đệ quy.",
        line: 10,
        mark: [10],
        watch: [{ name: "i", value: "2", type: "int" }, { name: "f[2]", value: "1", type: "long long", changed: true }],
        output: "",
        visual: S.table(["i", "0", "1", "2", "3", "4", "5"], [["f[i]", "0", "1", "1", "?", "?", "?"]], 2, "Điền f[2]"),
        changes: ["f[2] = 1."]
      },
      {
        short: "i = 3, 4",
        type: "ĐIỀN BẢNG",
        title: "f[3] = 2, f[4] = 3",
        body: "Mỗi bước dùng hai ô ngay trước. f[3] = 1 + 1 = 2; f[4] = 2 + 1 = 3.",
        line: 10,
        mark: [10],
        watch: [{ name: "f[3]", value: "2", type: "long long" }, { name: "f[4]", value: "3", type: "long long" }],
        output: "",
        visual: S.table(["i", "0", "1", "2", "3", "4", "5"], [["f[i]", "0", "1", "1", "2", "3", "?"]], 4, "Bảng mở rộng"),
        changes: ["f[3] = 2.", "f[4] = 3."]
      },
      {
        short: "Điền tới 10",
        type: "ĐIỀN BẢNG",
        title: "f[10] = 55",
        body: "Tiếp tục tới i = 10: dãy là 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55. Mỗi ô chỉ được tính một lần.",
        line: 10,
        mark: [9, 10],
        watch: [{ name: "f[10]", value: "55", type: "long long", changed: true }],
        output: "",
        visual: S.table(["i", "6", "7", "8", "9", "10"], [["f[i]", "8", "13", "21", "34", "55"]], 4, "f[10] = 55"),
        changes: ["Điền f[5..10].", "f[10] = 55."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In 55",
        body: "Chương trình in 55. Đệ quy Fibonacci thuần có thể gọi lại cùng bài toán con rất nhiều lần; bảng DP biến nó thành O(n) thời gian và O(n) bộ nhớ.",
        line: 11,
        mark: [11],
        watch: [{ name: "f[10]", value: "55", type: "long long" }],
        output: "55",
        tone: "final",
        visual: S.big([
          { label: "đệ quy thuần", text: "gọi lặp rất nhiều", value: "O(2ⁿ)" },
          { label: "có bảng DP", text: "mỗi ô một lần", value: "O(n)", active: true },
          { label: "bộ nhớ", text: "bảng n + 1 ô", value: "O(n)" }
        ], "Đổi thời gian lấy bộ nhớ"),
        changes: ["stdout nhận 55."]
      }
    ]
  };

  L["dsa-project"] = {
    id: "dsa-project",
    track: "dsa",
    module: "dsa-algorithms",
    title: "Dự án cuối khóa: phân tích điểm số",
    shortTitle: "Dự án DSA",
    subtitle: "Ghép vector, sort và binary search thành một quy trình hoàn chỉnh.",
    blurb: "Sắp xếp điểm, lấy min/max và kiểm tra một mức điểm bằng binary_search — mỗi bước dùng một cấu trúc đã học.",
    level: "Tổng hợp",
    duration: "22 phút",
    tags: ["dự án", "sort", "binary search", "vector"],
    learn: [
      "Chọn cấu trúc phù hợp cho từng bước",
      "Sắp xếp mở đường cho tìm kiếm nhị phân",
      "front/back cho min/max sau khi sort",
      "Tổ hợp thuật toán nhỏ thành quy trình lớn"
    ],
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
  vector<int> scores = {7, 9, 5, 8, 10};
  sort(scores.begin(), scores.end());
  int target = 8;
  bool found = binary_search(scores.begin(), scores.end(), target);
  cout << scores.front() << " " << scores.back() << " " << found;
  return 0;
}`,
    file: "dsa-project.cpp",
    life: {
      icon: "bulb",
      title: "Bảng điểm đã sắp",
      text: "Muốn biết điểm thấp nhất, cao nhất và có ai được 8 không, bạn xếp bảng điểm trước. Sau khi xếp, hai đầu bảng cho min/max và việc dò một mức điểm nhanh hơn nhiều."
    },
    steps: [
      {
        short: "Dữ liệu",
        type: "KHỞI TẠO",
        title: "5 điểm chưa sắp",
        body: "scores = {7, 9, 5, 8, 10}. vector phù hợp vì cần duyệt và sắp xếp; kích thước nhỏ nhưng cách làm sẽ đúng với dữ liệu lớn.",
        line: 7,
        mark: [7],
        watch: [{ name: "scores", value: "{7, 9, 5, 8, 10}", type: "vector<int>" }],
        output: "",
        visual: S.arr([7, 9, 5, 8, 10], [], { caption: "Chưa sắp xếp" }),
        changes: ["Nạp 5 điểm."]
      },
      {
        short: "Sắp xếp",
        type: "SORT",
        title: "sort tăng dần",
        body: "<code>sort</code> với begin/end sắp cả vector tăng dần, chi phí O(n log n). Đây là bước chuẩn bị cho binary search.",
        line: 8,
        mark: [8],
        watch: [{ name: "scores", value: "{5, 7, 8, 9, 10}", type: "vector<int>", changed: true }],
        output: "",
        visual: S.arr([5, 7, 8, 9, 10], [], { sorted: [0, 1, 2, 3, 4], caption: "Đã sắp xếp tăng dần" }),
        changes: ["sort toàn bộ vector.", "Mảng thành 5,7,8,9,10."]
      },
      {
        short: "Min và max",
        type: "TRUY CẬP",
        title: "front = 5, back = 10",
        body: "Sau khi sắp xếp, phần tử đầu là nhỏ nhất, phần tử cuối là lớn nhất. Không cần quét lại toàn bộ để tìm min/max.",
        line: 11,
        mark: [11],
        watch: [{ name: "scores.front()", value: "5", type: "int" }, { name: "scores.back()", value: "10", type: "int" }],
        output: "",
        visual: S.arr([5, 7, 8, 9, 10], [0, 4], { sorted: [0, 1, 2, 3, 4], pointers: [{ label: "min", index: 0 }, { label: "max", index: 4 }], caption: "Hai đầu của mảng đã sắp" }),
        changes: ["min = 5.", "max = 10."]
      },
      {
        short: "Tìm 8",
        type: "BINARY SEARCH",
        title: "binary_search trả true",
        body: "binary_search chỉ hoạt động đúng trên dãy đã sắp. Nó so sánh với phần tử giữa và thu hẹp phạm vi, chi phí O(log n).",
        line: 10,
        mark: [9, 10],
        watch: [{ name: "target", value: "8", type: "int" }, { name: "found", value: "true", type: "bool", changed: true }],
        output: "",
        visual: S.arr([5, 7, 8, 9, 10], [2], { sorted: [2], pointers: [{ label: "mid = 8", index: 2 }], caption: "Tìm thấy 8 ở giữa" }),
        changes: ["target = 8.", "binary_search trả true."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In 5 10 1",
        body: "cout in 5, 10 và 1 (true hiển thị thành 1). Quy trình gọn: vector chứa dữ liệu → sort chuẩn bị → binary_search trả lời nhanh.",
        line: 11,
        mark: [11],
        watch: [{ name: "kết quả", value: "5 10 1", type: "stdout" }],
        output: "5 10 1",
        tone: "final",
        visual: S.flow([
          { label: "vector", sub: "lưu điểm" },
          { label: "sort", sub: "O(n log n)" },
          { label: "front/back", sub: "min/max" },
          { label: "binary_search", sub: "O(log n)", active: true }
        ], [3], [0, 1, 2]),
        changes: ["stdout nhận 5 10 1."]
      }
    ]
  };
})();
