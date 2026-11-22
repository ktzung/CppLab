/* CppLab — Cấu trúc dữ liệu & Giải thuật · bài 1–10 */
(function () {
  "use strict";
  const L = window.CPPLAB.lessons;
  const S = {
    flow(steps, active, done) { return { kind: "flow", steps, active: active || [], done: done || [] }; },
    vars(items) { return { kind: "vars", items }; },
    arr(values, active, extra) { return Object.assign({ kind: "array", values, active: active || [] }, extra || {}); },
    list(nodes, active, extra) {
      if (typeof active === "string") return { kind: "list", nodes, active: [], head: active, caption: extra || "" };
      return Object.assign({ kind: "list", nodes, active: active || [] }, extra || {});
    },
    stack(items, active, top, extra) {
      if (typeof extra === "string") extra = { caption: extra };
      return Object.assign({ kind: "stack", items, active: active || [], top }, extra || {});
    },
    queue(items, front, rear, active, extra) {
      if (typeof extra === "string") extra = { caption: extra };
      return Object.assign({ kind: "queue", items, front, rear, active: active || [] }, extra || {});
    },
    tree(nodes, edges, caption) { return { kind: "tree", nodes, edges, caption }; },
    graph(nodes, edges, caption) { return { kind: "graph", nodes, edges, caption }; },
    table(headers, rows, activeRow, caption) { return { kind: "table", headers, rows, activeRow, caption }; },
    rec(frames, caption) { return { kind: "recursion", frames, caption }; },
    big(rows, caption) { return { kind: "complexity", rows, caption }; }
  };

  L.complexity = {
    id: "complexity",
    track: "dsa",
    module: "dsa-foundation",
    title: "Đo chi phí thuật toán",
    shortTitle: "Độ phức tạp",
    subtitle: "Không đếm giây, đếm số phép làm theo kích thước dữ liệu.",
    blurb: "Một vòng lặp cộng mảng là O(n). Nhìn bảng tăng trưởng để thấy vì sao O(n²) nhanh chóng trở nên đắt.",
    level: "Cơ bản",
    duration: "15 phút",
    tags: ["Big-O", "O(n)", "O(n²)", "độ phức tạp"],
    learn: [
      "Big-O mô tả xu hướng khi n lớn",
      "Một vòng lặp duyệt mảng thường là O(n)",
      "Hai vòng lặp lồng nhau thường là O(n²)",
      "Hằng số và số hạng nhỏ bị bỏ qua"
    ],
    code: `#include <iostream>
using namespace std;

int sumArray(int a[], int n) {
  int s = 0;
  for (int i = 0; i < n; i++)
    s += a[i];
  return s;
}

int main() {
  int a[5] = {1, 2, 3, 4, 5};
  cout << sumArray(a, 5);
  return 0;
}`,
    file: "complexity.cpp",
    life: {
      icon: "bulb",
      title: "Thời gian xếp hàng",
      text: "Một người tính tiền cho 100 khách mất khoảng 100 bước. Nếu mỗi khách lại phải chờ cả hàng được soát lại, chi phí bùng lên theo bình phương. Big-O giúp nhìn thấy điều đó trước khi chạy."
    },
    steps: [
      {
        short: "Gọi hàm",
        type: "BẮT ĐẦU",
        title: "sumArray(a, 5)",
        body: "n = 5 là kích thước dữ liệu. Câu hỏi của Big-O: khi n tăng, số phép tính tăng nhanh đến mức nào?",
        line: 13,
        mark: [13],
        watch: [{ name: "n", value: "5", type: "int" }],
        output: "",
        visual: S.big([
          { label: "n", text: "5 phần tử", value: "5" },
          { label: "vòng lặp", text: "chạy 5 lần", value: "O(n)" }
        ], "Bắt đầu với n = 5"),
        changes: ["Gọi sumArray với n = 5."]
      },
      {
        short: "Một phép mỗi phần tử",
        type: "LẶP",
        title: "i chạy từ 0 tới 4",
        body: "Mỗi lần lặp cộng đúng một phần tử. Số phép cộng tỉ lệ thuận với n, nên đây là O(n).",
        line: 6,
        mark: [6, 7],
        watch: [{ name: "i", value: "0..4", type: "int" }, { name: "s", value: "15", type: "int" }],
        output: "",
        visual: S.arr([1, 2, 3, 4, 5], [0, 1, 2, 3, 4], { caption: "Mỗi phần tử được cộng đúng một lần" }),
        changes: ["Thực hiện n phép cộng.", "s = 15."]
      },
      {
        short: "Tăng trưởng",
        type: "PHÂN TÍCH",
        title: "n gấp đôi, phép tính gấp đôi",
        body: "Với O(n), n = 10 cần khoảng 10 phép, n = 100 cần khoảng 100 phép. Đường tăng là tuyến tính.",
        line: 6,
        mark: [6],
        watch: [{ name: "n", value: "100", type: "int" }, { name: "phép", value: "≈ 100", type: "bước" }],
        output: "",
        visual: S.big([
          { label: "n = 10", text: "khoảng 10 bước", value: "O(n)" },
          { label: "n = 100", text: "khoảng 100 bước", value: "O(n)" },
          { label: "n = 1000", text: "khoảng 1000 bước", value: "O(n)", active: true }
        ], "Tuyến tính: kích thước tăng bao nhiêu, chi phí tăng bấy nhiêu")
      },
      {
        short: "So với O(n²)",
        type: "SO SÁNH",
        title: "Vòng lặp lồng nhau đắt hơn nhiều",
        body: "Nếu với mỗi phần tử lại duyệt cả mảng, số phép là n × n = n². Ở n = 1000, O(n²) cần khoảng một triệu bước thay vì một nghìn.",
        line: 6,
        mark: [6],
        watch: [{ name: "O(n)", value: "1.000", type: "bước" }, { name: "O(n²)", value: "1.000.000", type: "bước" }],
        output: "",
        visual: S.big([
          { label: "O(1)", text: "hằng số", value: "1" },
          { label: "O(log n)", text: "chia đôi", value: "~10" },
          { label: "O(n)", text: "một vòng", value: "1.000", active: true },
          { label: "O(n²)", text: "hai vòng lồng", value: "1.000.000" }
        ], "Cùng n = 1000, chi phí khác nhau rất xa")
      },
      {
        short: "Kết luận",
        type: "KẾT THÚC",
        title: "Chọn thuật toán trước khi tối ưu code",
        body: "sumArray là O(n): không thể nhanh hơn đáng kể nếu phải đọc mọi phần tử. Khi dữ liệu lớn, chọn cấu trúc và thuật toán đúng quan trọng hơn vi chỉnh từng dòng.",
        line: 13,
        mark: [13],
        watch: [{ name: "kết luận", value: "O(n)", type: "Big-O" }],
        output: "15",
        tone: "final",
        visual: S.big([
          { label: "sumArray", text: "duyệt một lần", value: "O(n)", active: true },
          { label: "bộ nhớ thêm", text: "vài biến", value: "O(1)" }
        ], "Một vòng lặp, một vài biến phụ")
      }
    ]
  };

  L["dynamic-array"] = {
    id: "dynamic-array",
    track: "dsa",
    module: "dsa-foundation",
    title: "Mảng động với vector",
    shortTitle: "Mảng động",
    subtitle: "Mảng tự mở rộng khi bạn thêm phần tử, nhưng việc mở rộng có chi phí.",
    blurb: "Theo dõi push_back, size và capacity để hiểu khi nào vector cấp phát lại vùng nhớ.",
    level: "Cơ bản",
    duration: "15 phút",
    tags: ["vector", "push_back", "size", "capacity"],
    learn: [
      "vector quản lý mảng động",
      "size là số phần tử thực",
      "capacity là sức chứa hiện tại",
      "Khi đầy, vector cấp vùng lớn hơn và copy dữ liệu"
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> v;
  v.push_back(10);
  v.push_back(20);
  v.push_back(30);
  cout << v.size() << " " << v.capacity();
  return 0;
}`,
    file: "vector-basics.cpp",
    life: {
      icon: "bulb",
      title: "Ghế trong rạp",
      text: "Bạn đặt một hàng ghế. Khi hết chỗ, không thể nới chiếc ghế cuối; phải thuê hàng lớn hơn, chuyển mọi người sang, rồi trả hàng cũ. vector làm đúng như vậy khi capacity đầy."
    },
    steps: [
      {
        short: "Vector rỗng",
        type: "KHỞI TẠO",
        title: "size = 0, capacity = 0",
        body: "Một vector mới chưa có vùng nhớ nào. size là số phần tử; capacity là số phần tử có thể chứa trước khi phải cấp lại.",
        line: 6,
        mark: [6],
        watch: [{ name: "v.size()", value: "0", type: "size_t" }, { name: "v.capacity()", value: "0", type: "size_t" }],
        output: "",
        visual: S.table(["Thao tác", "size", "capacity"], [["khởi tạo", "0", "0"]], 0, "Chưa có vùng nhớ"),
        changes: ["Tạo vector rỗng."]
      },
      {
        short: "Thêm 10",
        type: "PUSH_BACK",
        title: "size = 1, capacity = 1",
        body: "push_back(10) cấp một ô và đặt 10 vào. Vector thường cấp đúng 1 ô cho lần đầu.",
        line: 7,
        mark: [7],
        watch: [{ name: "v", value: "[10]", type: "vector<int>" }, { name: "size", value: "1", type: "size_t" }, { name: "capacity", value: "1", type: "size_t" }],
        output: "",
        visual: S.arr([10], [0], { caption: "size = 1 · capacity = 1" }),
        changes: ["Cấp 1 ô.", "Thêm 10."]
      },
      {
        short: "Thêm 20",
        type: "CẤP LẠI",
        title: "Đầy thì nhân đôi capacity",
        body: "Thêm 20 vượt capacity 1. Vector cấp vùng mới thường gấp đôi (2 ô), copy 10 sang, rồi thêm 20.",
        line: 8,
        mark: [8],
        watch: [{ name: "v", value: "[10, 20]", type: "vector<int>" }, { name: "size", value: "2", type: "size_t" }, { name: "capacity", value: "2", type: "size_t", changed: true }],
        output: "",
        visual: S.arr([10, 20], [0, 1], { caption: "capacity tăng lên 2 · có copy dữ liệu cũ" }),
        note: "Chi phí cấp lại là O(size). Vì capacity tăng theo cấp số nhân, chi phí trung bình mỗi push_back vẫn là O(1) khấu hao.",
        changes: ["Cấp vùng 2 ô.", "Copy 10 sang.", "Thêm 20."]
      },
      {
        short: "Thêm 30",
        type: "CẤP LẠI",
        title: "Capacity thành 4",
        body: "Thêm 30 lại vượt capacity 2. Vector cấp 4 ô, copy [10, 20], rồi ghi 30. size = 3 nhưng capacity = 4.",
        line: 9,
        mark: [9],
        watch: [{ name: "v", value: "[10, 20, 30]", type: "vector<int>" }, { name: "size", value: "3", type: "size_t" }, { name: "capacity", value: "4", type: "size_t", changed: true }],
        output: "",
        visual: S.arr([10, 20, 30], [0, 1, 2], { caption: "size = 3 · capacity = 4 · còn 1 chỗ trống" }),
        changes: ["Cấp vùng 4 ô.", "Copy 2 phần tử cũ.", "Thêm 30."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In 3 4",
        body: "Chương trình in <code>3 4</code>: ba phần tử thực, bốn chỗ đã cấp. Dùng <code>v.reserve(n)</code> nếu biết trước số lượng để giảm số lần cấp lại.",
        line: 10,
        mark: [10],
        watch: [{ name: "size", value: "3", type: "size_t" }, { name: "capacity", value: "4", type: "size_t" }],
        output: "3 4",
        tone: "final",
        visual: S.table(["size", "capacity", "phần tử"], [["3", "4", "10 20 30"]], 0, "Vector sau ba lần push_back"),
        changes: ["stdout nhận 3 4."]
      }
    ]
  };

  L["binary-search"] = {
    id: "binary-search",
    track: "dsa",
    module: "dsa-foundation",
    title: "Tìm kiếm nhị phân",
    shortTitle: "Binary search",
    subtitle: "Mỗi bước loại bỏ một nửa dữ liệu — nhưng chỉ trên mảng đã sắp xếp.",
    blurb: "Tìm 11 trong mảng tăng dần bằng cách so sánh với phần tử giữa và thu hẹp khoảng [lo, hi].",
    level: "Cơ bản",
    duration: "16 phút",
    tags: ["binary search", "O(log n)", "lo hi", "mảng đã sắp xếp"],
    learn: [
      "Binary search cần dữ liệu đã sắp xếp",
      "So sánh target với a[mid]",
      "Bỏ nửa trái hoặc nửa phải",
      "Số bước tỉ lệ log₂(n)"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int a[7] = {1, 3, 5, 7, 9, 11, 13};
  int target = 11;
  int lo = 0, hi = 6;
  while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] == target) { cout << mid; break; }
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return 0;
}`,
    file: "binary-search.cpp",
    life: {
      icon: "bulb",
      title: "Dò từ điển",
      text: "Bạn mở từ điển ở giữa. Nếu từ cần tìm đứng sau trang đó, bỏ nửa đầu; nếu trước, bỏ nửa sau. Mỗi lần mở, số trang cần xem giảm một nửa."
    },
    steps: [
      {
        short: "Khoảng ban đầu",
        type: "KHỞI TẠO",
        title: "lo = 0, hi = 6",
        body: "Cả mảng nằm trong khoảng tìm kiếm. target = 11. Mảng đã tăng dần nên có thể dùng binary search.",
        line: 7,
        mark: [7],
        watch: [{ name: "lo", value: "0", type: "int" }, { name: "hi", value: "6", type: "int" }, { name: "target", value: "11", type: "int" }],
        output: "",
        visual: S.arr([1, 3, 5, 7, 9, 11, 13], [0, 1, 2, 3, 4, 5, 6], { window: [0, 6], pointers: [{ label: "lo", index: 0 }, { label: "hi", index: 6 }], caption: "Khoảng tìm kiếm 0..6" }),
        changes: ["lo = 0, hi = 6."]
      },
      {
        short: "Lần 1",
        type: "CHIA ĐÔI",
        title: "mid = 3, a[3] = 7",
        body: "mid = (0 + 6) / 2 = 3. Vì 7 &lt; 11, target nằm bên phải. Bỏ nửa trái bằng <code>lo = mid + 1 = 4</code>.",
        line: 9,
        mark: [9, 11],
        watch: [{ name: "mid", value: "3", type: "int" }, { name: "a[mid]", value: "7", type: "int" }, { name: "lo", value: "4", type: "int", changed: true }],
        output: "",
        visual: S.arr([1, 3, 5, 7, 9, 11, 13], [3], { window: [4, 6], pointers: [{ label: "lo", index: 4 }, { label: "hi", index: 6 }], caption: "Bỏ nửa trái, còn 9 11 13" }),
        changes: ["Tính mid = 3.", "So sánh 7 < 11.", "lo = 4."]
      },
      {
        short: "Lần 2",
        type: "CHIA ĐÔI",
        title: "mid = 5, a[5] = 11",
        body: "Khoảng còn 4..6, mid = 5. a[5] đúng bằng 11 nên dừng và in chỉ số 5.",
        line: 10,
        mark: [9, 10],
        watch: [{ name: "mid", value: "5", type: "int" }, { name: "a[mid]", value: "11", type: "int", changed: true }],
        output: "",
        tone: "good",
        visual: S.arr([1, 3, 5, 7, 9, 11, 13], [5], { window: [4, 6], sorted: [5], pointers: [{ label: "mid", index: 5 }], caption: "Tìm thấy 11 tại chỉ số 5" }),
        changes: ["Tính mid = 5.", "a[5] == target.", "In 5 và break."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Chỉ 2 lần so sánh",
        body: "Với 7 phần tử, binary search chỉ cần 2 bước thay vì duyệt cả mảng. Với n phần tử, số bước khoảng log₂(n).",
        line: 10,
        mark: [10],
        watch: [{ name: "kết quả", value: "5", type: "chỉ số" }],
        output: "5",
        tone: "final",
        visual: S.big([
          { label: "n = 7", text: "tối đa 3 bước", value: "~log₂ 7" },
          { label: "n = 1.000", text: "tối đa 10 bước", value: "~log₂ n", active: true },
          { label: "n = 1.000.000", text: "tối đa 20 bước", value: "~log₂ n" }
        ], "Mỗi bước giảm một nửa phạm vi")
      }
    ]
  };

  L["recursion-backtracking"] = {
    id: "recursion-backtracking",
    track: "dsa",
    module: "dsa-foundation",
    title: "Quay lui: sinh tập con",
    shortTitle: "Quay lui",
    subtitle: "Thử một lựa chọn, đi tiếp, rồi lùi lại để thử lựa chọn khác.",
    blurb: "Sinh mọi tập con của {1,2,3} bằng cách quyết định chọn hoặc không chọn từng phần tử, rồi hoàn tác lựa chọn.",
    level: "Trung cấp",
    duration: "20 phút",
    tags: ["backtracking", "quay lui", "tập con", "đệ quy"],
    learn: [
      "Backtracking là đệ quy có thử và hoàn tác",
      "Mỗi phần tử có hai lựa chọn: chọn hoặc bỏ",
      "pop_back hoàn tác trạng thái",
      "Cây quyết định có 2ⁿ lá"
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

void gen(int i, vector<int>& cur) {
  if (i == 3) {
    for (int x : cur) cout << x;
    cout << endl;
    return;
  }
  gen(i + 1, cur);
  cur.push_back(i + 1);
  gen(i + 1, cur);
  cur.pop_back();
}

int main() {
  vector<int> cur;
  gen(0, cur);
  return 0;
}`,
    file: "subsets.cpp",
    life: {
      icon: "bulb",
      title: "Chọn món",
      text: "Trước mỗi món, bạn quyết định lấy hay không. Nếu lấy, ghi vào đĩa rồi đi tiếp; khi quay về nhánh trước, bạn bỏ món vừa lấy khỏi đĩa để thử lựa chọn khác."
    },
    steps: [
      {
        short: "Bắt đầu",
        type: "GỌI",
        title: "gen(0, [])",
        body: "i = 0 nghĩa là đang xét phần tử 1. Tập hiện tại rỗng. Mỗi lời gọi sẽ thử hai nhánh: bỏ hoặc chọn.",
        line: 19,
        mark: [19],
        watch: [{ name: "i", value: "0", type: "int" }, { name: "cur", value: "[]", type: "vector<int>" }],
        output: "",
        visual: S.rec([{ fn: "gen(0)", note: "cur = [] · xét số 1", active: true }], "Bắt đầu cây quyết định"),
        changes: ["Gọi gen(0) với tập rỗng."]
      },
      {
        short: "Nhánh bỏ 1",
        type: "KHÔNG CHỌN",
        title: "Đi tiếp mà không thêm 1",
        body: "Lời gọi đầu tiên <code>gen(i + 1, cur)</code> không push gì. Đây là nhánh không chọn 1; tập vẫn rỗng và xét số 2.",
        line: 11,
        mark: [11],
        watch: [{ name: "i", value: "1", type: "int" }, { name: "cur", value: "[]", type: "vector<int>" }],
        output: "",
        visual: S.rec([
          { fn: "gen(0)", note: "bỏ 1" },
          { fn: "gen(1)", note: "cur = [] · xét số 2", active: true }
        ], "Nhánh trái: không chọn 1"),
        changes: ["Không thêm 1.", "Xét số 2."]
      },
      {
        short: "Đi hết một nhánh",
        type: "LÁ",
        title: "i = 3: in tập hiện tại",
        body: "Khi i = 3, đã quyết định xong cả ba số. Vòng lặp in các phần tử trong cur; nếu cur rỗng thì in dòng trống, tượng trưng tập con rỗng.",
        line: 7,
        mark: [6, 7, 8],
        watch: [{ name: "i", value: "3", type: "int" }, { name: "cur", value: "[]", type: "vector<int>" }],
        output: "∅",
        visual: S.flow([
          { label: "gen(0)", sub: "bỏ 1" },
          { label: "gen(1)", sub: "bỏ 2" },
          { label: "gen(2)", sub: "bỏ 3" },
          { label: "in ∅", sub: "quay lui", active: true }
        ], [3], [0, 1, 2]),
        changes: ["In tập rỗng.", "Chuẩn bị quay lui."]
      },
      {
        short: "Chọn 3",
        type: "CHỌN",
        title: "push 3 rồi thử tiếp",
        body: "Sau khi quay lui về i = 2, chương trình push 3 vào cur rồi gọi gen(3). Nhánh này in {3}, sau đó pop 3 để trả trạng thái.",
        line: 12,
        mark: [12, 13, 14],
        watch: [{ name: "i", value: "2", type: "int" }, { name: "cur", value: "[3]", type: "vector<int>" }],
        output: "∅\n3",
        visual: S.rec([
          { fn: "gen(1)", note: "bỏ 2" },
          { fn: "gen(2)", note: "chọn 3" },
          { fn: "gen(3)", note: "in {3}", active: true }
        ], "Chọn rồi in, sau đó pop_back"),
        changes: ["push_back(3).", "In {3}.", "pop_back()."]
      },
      {
        short: "Nhánh chọn 1",
        type: "CHỌN",
        title: "Các tập còn lại",
        body: "Sau khi xong nhánh bỏ 1, chương trình push 1 và lặp lại cây con. Kết quả cuối cùng gồm: ∅, 3, 2, 23, 1, 13, 12, 123.",
        line: 12,
        mark: [12, 13, 14],
        watch: [{ name: "cur", value: "[1, 2, 3]", type: "vector<int>" }, { name: "số tập", value: "8", type: "2³" }],
        output: "∅\n3\n2\n23\n1\n13\n12\n123",
        tone: "final",
        visual: S.tree([
          { id: "r", label: "{}", x: 380, y: 30 },
          { id: "a", label: "bỏ 1", x: 220, y: 105 },
          { id: "b", label: "chọn 1", x: 540, y: 105 },
          { id: "c", label: "∅", x: 120, y: 190, state: "done" },
          { id: "d", label: "3", x: 300, y: 190, state: "done" },
          { id: "e", label: "2", x: 460, y: 190, state: "done" },
          { id: "f", label: "23", x: 640, y: 190, state: "done" }
        ], [["r", "a"], ["r", "b"], ["a", "c"], ["a", "d"], ["b", "e"], ["b", "f"]], "Cây quyết định 2³ = 8 tập con")
      }
    ]
  };

  L["linked-list"] = {
    id: "linked-list",
    track: "dsa",
    module: "dsa-linear",
    title: "Danh sách liên kết đơn",
    shortTitle: "Linked list",
    subtitle: "Các node nối với nhau bằng con trỏ, không nằm liền nhau trong bộ nhớ.",
    blurb: "Tạo ba node 10 → 20 → 30, nối bằng next và duyệt từ head tới nullptr.",
    level: "Cơ bản",
    duration: "17 phút",
    tags: ["linked list", "node", "head", "next"],
    learn: [
      "Mỗi node chứa value và next",
      "head là điểm vào danh sách",
      "next = nullptr đánh dấu kết thúc",
      "Duyệt bằng p = p->next"
    ],
    code: `#include <iostream>
using namespace std;

struct Node {
  int value;
  Node* next;
};

int main() {
  Node* head = new Node{10, nullptr};
  head->next = new Node{20, nullptr};
  head->next->next = new Node{30, nullptr};
  for (Node* p = head; p; p = p->next)
    cout << p->value << " ";
  return 0;
}`,
    file: "linked-list.cpp",
    life: {
      icon: "bulb",
      title: "Manh mối",
      text: "Mỗi node như một mẩu giấy ghi số và địa chỉ của mẩu tiếp theo. Bạn chỉ cần giữ mẩu đầu tiên; từ đó lần theo manh mối để tới cuối."
    },
    steps: [
      {
        short: "Node đầu",
        type: "TẠO NODE",
        title: "head trỏ tới node 10",
        body: "head lưu địa chỉ node đầu tiên. Node này có value = 10 và next = nullptr vì chưa nối gì.",
        line: 10,
        mark: [10],
        watch: [{ name: "head", value: "→ 10", type: "Node*" }, { name: "head->next", value: "nullptr", type: "Node*" }],
        output: "",
        visual: S.list([{ id: "n1", value: "10", addr: "0x101", state: "active" }], "n1", "head → 10 → nullptr"),
        changes: ["Cấp node 10.", "head trỏ tới n1.", "next = nullptr."]
      },
      {
        short: "Nối node 20",
        type: "NỐI",
        title: "10 → 20",
        body: "Tạo node 20 và gán vào <code>head-&gt;next</code>. Từ node 10 giờ có thể đi tiếp tới 20.",
        line: 11,
        mark: [11],
        watch: [{ name: "head->next->value", value: "20", type: "int" }],
        output: "",
        visual: S.list([
          { id: "n1", value: "10", addr: "0x101" },
          { id: "n2", value: "20", addr: "0x205", state: "active" }
        ], "n1", "10 → 20 → nullptr"),
        changes: ["Cấp node 20.", "n1.next trỏ tới n2."]
      },
      {
        short: "Nối node 30",
        type: "NỐI",
        title: "10 → 20 → 30",
        body: "Đi qua hai con trỏ <code>head-&gt;next-&gt;next</code> để tới node cuối và gắn node 30. Chuỗi hoàn chỉnh kết thúc bằng nullptr.",
        line: 12,
        mark: [12],
        watch: [{ name: "head", value: "→ 10", type: "Node*" }, { name: "cuối", value: "30 → nullptr", type: "Node*" }],
        output: "",
        visual: S.list([
          { id: "n1", value: "10", addr: "0x101" },
          { id: "n2", value: "20", addr: "0x205" },
          { id: "n3", value: "30", addr: "0x309", state: "active" }
        ], "n1", "10 → 20 → 30 → nullptr"),
        changes: ["Cấp node 30.", "n2.next trỏ tới n3."]
      },
      {
        short: "Duyệt",
        type: "LẶP",
        title: "p chạy theo next",
        body: "p bắt đầu ở head. Mỗi vòng in value rồi gán <code>p = p-&gt;next</code>. Khi p bằng nullptr, điều kiện <code>p</code> sai và vòng lặp dừng.",
        line: 13,
        mark: [13, 14],
        watch: [{ name: "p", value: "→ 10", type: "Node*" }, { name: "p->value", value: "10", type: "int" }],
        output: "10 ",
        visual: S.list([
          { id: "n1", value: "10", addr: "0x101", state: "active" },
          { id: "n2", value: "20", addr: "0x205" },
          { id: "n3", value: "30", addr: "0x309" }
        ], "n1", "p đang ở node 10"),
        changes: ["In 10.", "p sang node 20."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In 10 20 30",
        body: "Sau node 30, p = nullptr và vòng lặp dừng. Danh sách liên kết không cho truy cập ngẫu nhiên như mảng; muốn tới vị trí k phải đi qua k node.",
        line: 14,
        mark: [14],
        watch: [{ name: "p", value: "nullptr", type: "Node*" }],
        output: "10 20 30 ",
        tone: "final",
        visual: S.list([
          { id: "n1", value: "10", addr: "0x101", state: "done" },
          { id: "n2", value: "20", addr: "0x205", state: "done" },
          { id: "n3", value: "30", addr: "0x309", state: "done" }
        ], "n1", "Đã duyệt hết danh sách"),
        changes: ["stdout nhận 10 20 30.", "p = nullptr, dừng."]
      }
    ]
  };

  L["doubly-list"] = {
    id: "doubly-list",
    track: "dsa",
    module: "dsa-linear",
    title: "Danh sách liên kết đôi",
    shortTitle: "Danh sách đôi",
    subtitle: "Mỗi node có hai mũi tên: prev và next.",
    blurb: "Nối ba node theo cả hai chiều, duyệt xuôi rồi ngược để thấy lợi thế của prev.",
    level: "Trung cấp",
    duration: "16 phút",
    tags: ["doubly linked list", "prev", "next", "duyệt ngược"],
    learn: [
      "Node có prev và next",
      "Đi xuôi bằng next, đi ngược bằng prev",
      "Node đầu có prev = nullptr",
      "Thêm/xóa cần cập nhật cả hai chiều"
    ],
    code: `#include <iostream>
using namespace std;

struct Node {
  int value;
  Node* prev;
  Node* next;
};

int main() {
  Node* a = new Node{1, nullptr, nullptr};
  Node* b = new Node{2, a, nullptr};
  a->next = b;
  Node* c = new Node{3, b, nullptr};
  b->next = c;
  for (Node* p = a; p; p = p->next) cout << p->value << " ";
  for (Node* p = c; p; p = p->prev) cout << p->value << " ";
  return 0;
}`,
    file: "doubly-list.cpp",
    life: {
      icon: "bulb",
      title: "Đường hai chiều",
      text: "Mỗi con phố có biển chỉ dẫn cả hai đầu. Đi từ A tới C được, mà từ C quay về A cũng được mà không cần quay lại từ đầu."
    },
    steps: [
      {
        short: "Node 1",
        type: "TẠO NODE",
        title: "a có prev = next = nullptr",
        body: "Node đầu tiên chưa nối với ai, nên cả hai con trỏ đều rỗng. a là điểm bắt đầu khi đi xuôi và cũng là điểm kết thúc khi đi ngược.",
        line: 11,
        mark: [10],
        watch: [{ name: "a->value", value: "1", type: "int" }, { name: "a->prev", value: "nullptr", type: "Node*" }],
        output: "",
        visual: S.list([{ id: "a", value: "1", addr: "0x101", state: "active" }], "a", "a ↔ nullptr"),
        changes: ["Cấp node 1.", "prev = next = nullptr."]
      },
      {
        short: "Nối 2",
        type: "NỐI",
        title: "1 ↔ 2",
        body: "Tạo b với prev = a. Sau đó gán <code>a-&gt;next = b</code>. Giờ hai node chỉ vào nhau ở cả hai chiều.",
        line: 12,
        mark: [12, 13],
        watch: [{ name: "b->prev", value: "→ a", type: "Node*" }, { name: "a->next", value: "→ b", type: "Node*" }],
        output: "",
        visual: S.list([
          { id: "a", value: "1", addr: "0x101" },
          { id: "b", value: "2", addr: "0x205", state: "active" }
        ], "a", "1 ↔ 2"),
        changes: ["b.prev trỏ a.", "a.next trỏ b."]
      },
      {
        short: "Nối 3",
        type: "NỐI",
        title: "1 ↔ 2 ↔ 3",
        body: "Tương tự, c.prev = b và b.next = c. Chuỗi hai chiều hoàn chỉnh: đi từ a tới c bằng next, từ c về a bằng prev.",
        line: 14,
        mark: [14, 15],
        watch: [{ name: "c->prev", value: "→ b", type: "Node*" }, { name: "b->next", value: "→ c", type: "Node*" }],
        output: "",
        visual: S.list([
          { id: "a", value: "1", addr: "0x101" },
          { id: "b", value: "2", addr: "0x205" },
          { id: "c", value: "3", addr: "0x309", state: "active" }
        ], "a", "1 ↔ 2 ↔ 3"),
        changes: ["c.prev trỏ b.", "b.next trỏ c."]
      },
      {
        short: "Duyệt xuôi",
        type: "DUYỆT",
        title: "a → b → c",
        body: "Vòng lặp đầu đi theo next từ a, in 1 2 3. Đây giống danh sách đơn.",
        line: 16,
        mark: [15],
        watch: [{ name: "p", value: "→ c", type: "Node*" }],
        output: "1 2 3 ",
        visual: S.list([
          { id: "a", value: "1", addr: "0x101", state: "done" },
          { id: "b", value: "2", addr: "0x205", state: "done" },
          { id: "c", value: "3", addr: "0x309", state: "active" }
        ], "a", "Duyệt xuôi bằng next"),
        changes: ["stdout nhận 1 2 3."]
      },
      {
        short: "Duyệt ngược",
        type: "DUYỆT",
        title: "c → b → a",
        body: "Vòng lặp thứ hai bắt đầu từ c và đi theo prev, in 3 2 1. Danh sách đơn không làm được điều này nếu không có thêm cấu trúc phụ.",
        line: 17,
        mark: [16],
        watch: [{ name: "p", value: "→ a", type: "Node*" }],
        output: "1 2 3 3 2 1 ",
        tone: "final",
        visual: S.list([
          { id: "c", value: "3", addr: "0x309", state: "active" },
          { id: "b", value: "2", addr: "0x205", state: "done" },
          { id: "a", value: "1", addr: "0x101", state: "done" }
        ], "c", "Duyệt ngược bằng prev"),
        changes: ["stdout nhận 3 2 1.", "Kết thúc khi p = nullptr."]
      }
    ]
  };

  L.stack = {
    id: "stack",
    track: "dsa",
    module: "dsa-linear",
    title: "Ngăn xếp",
    shortTitle: "Stack",
    subtitle: "Vào sau, ra trước — LIFO.",
    blurb: "Push 3, 7, 5 rồi pop để thấy phần tử vào sau cùng được lấy ra đầu tiên.",
    level: "Cơ bản",
    duration: "12 phút",
    tags: ["stack", "LIFO", "push", "pop", "top"],
    learn: [
      "Stack chỉ cho phép thêm/xóa ở đỉnh",
      "push đưa phần tử lên đỉnh",
      "pop lấy phần tử trên cùng",
      "top xem nhưng không lấy"
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> st;
  st.push_back(3);
  st.push_back(7);
  st.push_back(5);
  cout << st.back() << endl;
  st.pop_back();
  cout << st.back();
  return 0;
}`,
    file: "stack.cpp",
    life: {
      icon: "bulb",
      title: "Chồng đĩa",
      text: "Bạn chỉ có thể đặt đĩa lên trên cùng và lấy đĩa trên cùng. Muốn lấy đĩa dưới, phải bỏ các đĩa phía trên trước."
    },
    steps: [
      {
        short: "Push 3",
        type: "PUSH",
        title: "Đỉnh là 3",
        body: "Stack rỗng, push 3 đặt 3 ở đáy và đồng thời là đỉnh.",
        line: 7,
        mark: [7],
        watch: [{ name: "top", value: "3", type: "int" }, { name: "size", value: "1", type: "int" }],
        output: "",
        visual: S.stack(["3"], [0], 0, "Đỉnh = 3"),
        changes: ["Push 3.", "Top = 3."]
      },
      {
        short: "Push 7",
        type: "PUSH",
        title: "Đỉnh là 7",
        body: "push 7 đặt 7 lên trên 3. Đỉnh đổi thành 7, còn 3 nằm dưới.",
        line: 8,
        mark: [8],
        watch: [{ name: "top", value: "7", type: "int" }, { name: "size", value: "2", type: "int" }],
        output: "",
        visual: S.stack(["3", "7"], [1], 1, "Đỉnh = 7"),
        changes: ["Push 7.", "Top = 7."]
      },
      {
        short: "Push 5",
        type: "PUSH",
        title: "Đỉnh là 5",
        body: "push 5 lên trên cùng. Thứ tự từ đáy lên: 3, 7, 5.",
        line: 9,
        mark: [9],
        watch: [{ name: "top", value: "5", type: "int" }, { name: "size", value: "3", type: "int" }],
        output: "",
        visual: S.stack(["3", "7", "5"], [2], 2, "Đỉnh = 5"),
        changes: ["Push 5.", "Top = 5."]
      },
      {
        short: "Xem đỉnh",
        type: "TOP",
        title: "back() = 5",
        body: "<code>st.back()</code> đọc phần tử trên cùng mà không lấy ra. Chương trình in 5.",
        line: 10,
        mark: [10],
        watch: [{ name: "st.back()", value: "5", type: "int" }],
        output: "5",
        visual: S.stack(["3", "7", "5"], [2], 2, "Top = 5, chưa lấy ra"),
        changes: ["stdout nhận 5."]
      },
      {
        short: "Pop",
        type: "POP",
        title: "Lấy 5, đỉnh còn 7",
        body: "<code>pop_back()</code> lấy 5 ra. Phần tử lộ ra dưới nó là 7 và trở thành đỉnh mới.",
        line: 11,
        mark: [11],
        watch: [{ name: "top", value: "7", type: "int", changed: true }, { name: "size", value: "2", type: "int" }],
        output: "5",
        visual: S.stack(["3", "7"], [1], 1, "Sau pop: đỉnh = 7"),
        changes: ["Pop 5.", "Top = 7."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In 7",
        body: "Chương trình in 5 rồi 7. Stack đảo ngược thứ tự so với lúc đưa vào — đó là LIFO.",
        line: 12,
        mark: [12],
        watch: [{ name: "st.back()", value: "7", type: "int" }],
        output: "5\n7",
        tone: "final",
        visual: S.stack(["3", "7"], [1], 1, "LIFO: vào 3,7,5 — ra 5,7"),
        changes: ["stdout nhận 7."]
      }
    ]
  };

  L.queue = {
    id: "queue",
    track: "dsa",
    module: "dsa-linear",
    title: "Hàng đợi",
    shortTitle: "Queue",
    subtitle: "Vào trước, ra trước — FIFO.",
    blurb: "Enqueue 10, 20, 30 rồi dequeue để thấy phần tử đến trước được phục vụ trước.",
    level: "Cơ bản",
    duration: "12 phút",
    tags: ["queue", "FIFO", "enqueue", "dequeue", "front"],
    learn: [
      "Queue thêm ở rear và lấy ở front",
      "FIFO: vào trước ra trước",
      "front xem phần tử đầu hàng",
      "pop lấy phần tử đầu hàng"
    ],
    code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
  queue<int> q;
  q.push(10);
  q.push(20);
  q.push(30);
  cout << q.front() << endl;
  q.pop();
  cout << q.front();
  return 0;
}`,
    file: "queue.cpp",
    life: {
      icon: "bulb",
      title: "Hàng mua vé",
      text: "Người đến trước đứng đầu hàng và được phục vụ trước. Người mới chỉ được nối vào cuối hàng, không được chen lên đầu."
    },
    steps: [
      {
        short: "Enqueue 10",
        type: "PUSH",
        title: "Hàng có 10",
        body: "q rỗng. push(10) đặt 10 vào cuối hàng; vì là phần tử duy nhất nên nó cũng là đầu hàng.",
        line: 7,
        mark: [7],
        watch: [{ name: "front", value: "10", type: "int" }, { name: "rear", value: "10", type: "int" }],
        output: "",
        visual: S.queue(["10"], 0, 0, [0], "front = rear = 10"),
        changes: ["Enqueue 10.", "front = rear = 10."]
      },
      {
        short: "Enqueue 20",
        type: "PUSH",
        title: "20 vào cuối",
        body: "push(20) nối 20 sau 10. front vẫn là 10, rear chuyển sang 20.",
        line: 8,
        mark: [8],
        watch: [{ name: "front", value: "10", type: "int" }, { name: "rear", value: "20", type: "int" }],
        output: "",
        visual: S.queue(["10", "20"], 0, 1, [1], "front = 10 · rear = 20"),
        changes: ["Enqueue 20.", "rear = 20."]
      },
      {
        short: "Enqueue 30",
        type: "PUSH",
        title: "30 vào cuối",
        body: "push(30) nối 30 vào cuối. Hàng hiện tại: 10, 20, 30; front vẫn là 10.",
        line: 9,
        mark: [9],
        watch: [{ name: "front", value: "10", type: "int" }, { name: "rear", value: "30", type: "int" }],
        output: "",
        visual: S.queue(["10", "20", "30"], 0, 2, [2], "front = 10 · rear = 30"),
        changes: ["Enqueue 30.", "rear = 30."]
      },
      {
        short: "Xem front",
        type: "FRONT",
        title: "front() = 10",
        body: "<code>q.front()</code> xem người đầu hàng mà không lấy ra. Chương trình in 10.",
        line: 10,
        mark: [10],
        watch: [{ name: "q.front()", value: "10", type: "int" }],
        output: "10",
        visual: S.queue(["10", "20", "30"], 0, 2, [0], "front = 10, chưa lấy ra"),
        changes: ["stdout nhận 10."]
      },
      {
        short: "Dequeue",
        type: "POP",
        title: "Lấy 10, front thành 20",
        body: "<code>q.pop()</code> lấy phần tử đầu hàng. 20 trở thành front, 30 vẫn ở rear.",
        line: 11,
        mark: [11],
        watch: [{ name: "front", value: "20", type: "int", changed: true }, { name: "rear", value: "30", type: "int" }],
        output: "10",
        visual: S.queue(["20", "30"], 0, 1, [0], "Sau dequeue: front = 20"),
        changes: ["Dequeue 10.", "front = 20."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In 20",
        body: "Chương trình in 10 rồi 20. Queue giữ đúng thứ tự đến: 10, 20, 30 — khác hoàn toàn stack.",
        line: 12,
        mark: [12],
        watch: [{ name: "q.front()", value: "20", type: "int" }],
        output: "10\n20",
        tone: "final",
        visual: S.queue(["20", "30"], 0, 1, [0, 1], "FIFO: vào 10,20,30 — ra 10,20"),
        changes: ["stdout nhận 20."]
      }
    ]
  };

  L["binary-tree"] = {
    id: "binary-tree",
    track: "dsa",
    module: "dsa-trees",
    title: "Cây nhị phân và duyệt trước",
    shortTitle: "Cây nhị phân",
    subtitle: "Mỗi node có tối đa hai con: trái và phải.",
    blurb: "Dựng cây 8 với hai con 3 và 10, rồi duyệt preorder để in gốc trước, con trái sau, con phải cuối.",
    level: "Cơ bản",
    duration: "15 phút",
    tags: ["binary tree", "preorder", "root", "đệ quy"],
    learn: [
      "Node cây có left và right",
      "Root là node gốc",
      "Preorder: gốc → trái → phải",
      "Cây rỗng là nullptr"
    ],
    code: `#include <iostream>
using namespace std;

struct Node { int value; Node* left; Node* right; };

void preorder(Node* root) {
  if (!root) return;
  cout << root->value << " ";
  preorder(root->left);
  preorder(root->right);
}

int main() {
  Node* root = new Node{8, nullptr, nullptr};
  root->left = new Node{3, nullptr, nullptr};
  root->right = new Node{10, nullptr, nullptr};
  preorder(root);
  return 0;
}`,
    file: "binary-tree.cpp",
    life: {
      icon: "bulb",
      title: "Cây gia phả",
      text: "Mỗi người có tối đa hai nhánh con. Duyệt preorder là kể tên người gốc trước, rồi kể hết nhánh trái, cuối cùng mới sang nhánh phải."
    },
    steps: [
      {
        short: "Gốc 8",
        type: "TẠO CÂY",
        title: "root = 8",
        body: "Node gốc chứa 8, chưa có con. Mọi thao tác trên cây bắt đầu từ root.",
        line: 14,
        mark: [14],
        watch: [{ name: "root->value", value: "8", type: "int" }],
        output: "",
        visual: S.tree([
          { id: "r", label: "8", x: 380, y: 40, state: "active" }
        ], [], "Cây mới có gốc 8"),
        changes: ["Tạo node 8.", "root trỏ tới node 8."]
      },
      {
        short: "Thêm con",
        type: "TẠO CÂY",
        title: "3 bên trái, 10 bên phải",
        body: "Gán root->left = 3 và root->right = 10. Cây có ba node, đúng cấu trúc nhị phân.",
        line: 15,
        mark: [15, 16],
        watch: [{ name: "root->left", value: "→ 3", type: "Node*" }, { name: "root->right", value: "→ 10", type: "Node*" }],
        output: "",
        visual: S.tree([
          { id: "r", label: "8", x: 380, y: 40, state: "active" },
          { id: "l", label: "3", x: 240, y: 135, state: "new" },
          { id: "rr", label: "10", x: 520, y: 135, state: "new" }
        ], [["r", "l"], ["r", "rr"]], "8 có con trái 3, con phải 10"),
        changes: ["Thêm node 3 bên trái.", "Thêm node 10 bên phải."]
      },
      {
        short: "Gốc trước",
        type: "DUYỆT",
        title: "In 8",
        body: "preorder in root trước tiên. Sau đó gọi đệ quy sang trái, rồi sang phải.",
        line: 8,
        mark: [8, 9, 10],
        watch: [{ name: "root->value", value: "8", type: "int" }],
        output: "8 ",
        visual: S.tree([
          { id: "r", label: "8", x: 380, y: 40, state: "active" },
          { id: "l", label: "3", x: 240, y: 135 },
          { id: "rr", label: "10", x: 520, y: 135 }
        ], [["r", "l"], ["r", "rr"]], "Bước 1: gốc 8"),
        changes: ["In 8.", "Đi sang cây con trái."]
      },
      {
        short: "Trái",
        type: "DUYỆT",
        title: "In 3",
        body: "Cây con trái là node 3, không có con nên sau khi in 3, hai lời gọi left/right gặp nullptr và quay về ngay.",
        line: 8,
        mark: [8, 9, 10],
        watch: [{ name: "root->value", value: "3", type: "int" }],
        output: "8 3 ",
        visual: S.tree([
          { id: "r", label: "8", x: 380, y: 40, state: "done" },
          { id: "l", label: "3", x: 240, y: 135, state: "active" },
          { id: "rr", label: "10", x: 520, y: 135 }
        ], [["r", "l"], ["r", "rr"]], "Bước 2: cây con trái 3"),
        changes: ["In 3.", "Quay về gốc, sang phải."]
      },
      {
        short: "Phải",
        type: "DUYỆT",
        title: "In 10",
        body: "Sau khi xong nhánh trái, preorder mới sang nhánh phải và in 10. Kết quả preorder: 8 3 10.",
        line: 8,
        mark: [8],
        watch: [{ name: "root->value", value: "10", type: "int" }],
        output: "8 3 10 ",
        tone: "final",
        visual: S.tree([
          { id: "r", label: "8", x: 380, y: 40, state: "done" },
          { id: "l", label: "3", x: 240, y: 135, state: "done" },
          { id: "rr", label: "10", x: 520, y: 135, state: "active" }
        ], [["r", "l"], ["r", "rr"]], "Preorder: gốc → trái → phải"),
        changes: ["In 10.", "Kết thúc duyệt."]
      }
    ]
  };

  L.bst = {
    id: "bst",
    track: "dsa",
    module: "dsa-trees",
    title: "Cây tìm kiếm nhị phân",
    shortTitle: "BST",
    subtitle: "Nhỏ hơn sang trái, lớn hơn sang phải.",
    blurb: "Chèn 8, 3, 10, 1, 6 vào BST và thấy mỗi bước chỉ đi theo một nhánh.",
    level: "Trung cấp",
    duration: "18 phút",
    tags: ["BST", "insert", "search", "tính chất"],
    learn: [
      "Cây con trái nhỏ hơn node",
      "Cây con phải lớn hơn node",
      "Chèn đi theo so sánh",
      "Tìm kiếm nhanh trung bình O(log n)"
    ],
    code: `#include <iostream>
using namespace std;

struct Node { int value; Node* left; Node* right; };

Node* insert(Node* root, int x) {
  if (!root) return new Node{x, nullptr, nullptr};
  if (x < root->value) root->left = insert(root->left, x);
  else root->right = insert(root->right, x);
  return root;
}

int main() {
  Node* root = nullptr;
  for (int x : {8, 3, 10, 1, 6}) root = insert(root, x);
  cout << root->left->value;
  return 0;
}`,
    file: "bst.cpp",
    life: {
      icon: "bulb",
      title: "Cây quyết định",
      text: "Mỗi node là một câu hỏi: nhỏ hơn thì rẽ trái, lớn hơn thì rẽ phải. Cây càng cân bằng, số câu hỏi cần trả lời càng ít."
    },
    steps: [
      {
        short: "Chèn 8",
        type: "INSERT",
        title: "Cây rỗng, 8 thành gốc",
        body: "root = nullptr nên insert tạo node 8 và trả về làm gốc.",
        line: 14,
        mark: [14, 15],
        watch: [{ name: "root", value: "→ 8", type: "Node*" }],
        output: "",
        visual: S.tree([{ id: "r", label: "8", x: 380, y: 40, state: "active" }], [], "8 là gốc"),
        changes: ["Tạo node 8.", "root = 8."]
      },
      {
        short: "Chèn 3",
        type: "INSERT",
        title: "3 < 8 nên sang trái",
        body: "So sánh 3 với 8: nhỏ hơn, đi sang trái. Cây con trái rỗng nên 3 thành con trái của 8.",
        line: 15,
        mark: [15],
        watch: [{ name: "x", value: "3", type: "int" }, { name: "hướng", value: "trái", type: "nhánh" }],
        output: "",
        visual: S.tree([
          { id: "r", label: "8", x: 380, y: 40, state: "done" },
          { id: "l", label: "3", x: 240, y: 135, state: "active" }
        ], [["r", "l"]], "3 nằm bên trái 8"),
        changes: ["3 < 8.", "Chèn 3 làm con trái."]
      },
      {
        short: "Chèn 10",
        type: "INSERT",
        title: "10 > 8 nên sang phải",
        body: "10 lớn hơn 8, đi sang phải. Cây con phải rỗng nên 10 thành con phải.",
        line: 15,
        mark: [15],
        watch: [{ name: "x", value: "10", type: "int" }, { name: "hướng", value: "phải", type: "nhánh" }],
        output: "",
        visual: S.tree([
          { id: "r", label: "8", x: 380, y: 40, state: "done" },
          { id: "l", label: "3", x: 240, y: 135 },
          { id: "rr", label: "10", x: 520, y: 135, state: "active" }
        ], [["r", "l"], ["r", "rr"]], "10 nằm bên phải 8"),
        changes: ["10 > 8.", "Chèn 10 làm con phải."]
      },
      {
        short: "Chèn 1 và 6",
        type: "INSERT",
        title: "Đi sâu theo so sánh",
        body: "1 < 8 → trái, 1 < 3 → trái, thành con trái của 3. 6 < 8 → trái, 6 > 3 → phải, thành con phải của 3.",
        line: 15,
        mark: [15],
        watch: [{ name: "x", value: "1, 6", type: "int" }, { name: "root->left", value: "3", type: "Node*" }],
        output: "",
        visual: S.tree([
          { id: "r", label: "8", x: 380, y: 40 },
          { id: "l", label: "3", x: 240, y: 125 },
          { id: "rr", label: "10", x: 520, y: 125 },
          { id: "ll", label: "1", x: 150, y: 215, state: "active" },
          { id: "lr", label: "6", x: 320, y: 215, state: "active" }
        ], [["r", "l"], ["r", "rr"], ["l", "ll"], ["l", "lr"]], "Cây sau khi chèn đủ 5 khóa"),
        note: "Thứ tự chèn ảnh hưởng hình dạng cây. Nếu chèn dãy tăng dần, cây có thể lệch thành một đường và mất lợi thế O(log n).",
        changes: ["Chèn 1 bên trái 3.", "Chèn 6 bên phải 3."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "root->left = 3",
        body: "Chương trình in 3. Tìm một khóa trong BST cũng đi theo so sánh như lúc chèn, mỗi bước bỏ được một nửa cây nếu cây cân bằng.",
        line: 16,
        mark: [17],
        watch: [{ name: "root->left->value", value: "3", type: "int" }],
        output: "3",
        tone: "final",
        visual: S.tree([
          { id: "r", label: "8", x: 380, y: 40, state: "done" },
          { id: "l", label: "3", x: 240, y: 125, state: "active" },
          { id: "rr", label: "10", x: 520, y: 125 },
          { id: "ll", label: "1", x: 150, y: 215 },
          { id: "lr", label: "6", x: 320, y: 215 }
        ], [["r", "l"], ["r", "rr"], ["l", "ll"], ["l", "lr"]], "In con trái của gốc"),
        changes: ["stdout nhận 3."]
      }
    ]
  };
})();
