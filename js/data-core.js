/* CppLab — course skeleton and shared data */
window.CPPLAB = {
  version: "20261122",
  tracks: [
    {
      id: "cpp",
      name: "Nhập môn lập trình C/C++",
      short: "C++ Cơ bản",
      kicker: "LỘ TRÌNH 01",
      blurb: "Từ chương trình đầu tiên đến con trỏ, struct và một dự án nhỏ. Mỗi bài là một chương trình được chạy chậm lại để nhìn thấy từng dòng.",
      outcome: "Viết được chương trình C++ có hàm, mảng, con trỏ và tệp; biết debug thay vì đoán lỗi.",
      tone: "teal",
      modules: ["cpp-start", "cpp-control", "cpp-data", "cpp-struct", "cpp-apply"]
    },
    {
      id: "dsa",
      name: "Cấu trúc dữ liệu & Giải thuật",
      short: "CTDL & GT",
      kicker: "LỘ TRÌNH 02",
      blurb: "Mảng động, danh sách liên kết, ngăn xếp, hàng đợi, cây, đồ thị và các thuật toán nền tảng — tất cả được mô phỏng từng bước.",
      outcome: "Chọn đúng cấu trúc dữ liệu, phân tích độ phức tạp và cài đặt được các thuật toán cốt lõi bằng C++.",
      tone: "amber",
      modules: ["dsa-foundation", "dsa-linear", "dsa-trees", "dsa-graphs", "dsa-algorithms"]
    }
  ],
  modules: [
    {
      id: "cpp-start",
      track: "cpp",
      num: "01",
      title: "Bắt đầu",
      blurb: "Chương trình, biến, nhập xuất và biểu thức — đủ để máy tính bắt đầu nghe bạn.",
      lessons: ["hello", "variables", "input-output", "operators"]
    },
    {
      id: "cpp-control",
      track: "cpp",
      num: "02",
      title: "Điều khiển",
      blurb: "Rẽ nhánh, lặp, hàm và phạm vi: dạy chương trình ra quyết định.",
      lessons: ["conditions", "loops", "functions", "scope"]
    },
    {
      id: "cpp-data",
      track: "cpp",
      num: "03",
      title: "Dữ liệu & bộ nhớ",
      blurb: "Mảng, chuỗi, con trỏ, tham chiếu và vùng nhớ — nơi C++ trở nên thật sự C++.",
      lessons: ["arrays", "strings", "pointers", "references", "memory"]
    },
    {
      id: "cpp-struct",
      track: "cpp",
      num: "04",
      title: "Tổ chức chương trình",
      blurb: "Đóng gói dữ liệu, đọc ghi tệp, đệ quy và kỹ năng debug có hệ thống.",
      lessons: ["structs", "files", "recursion", "debugging"]
    },
    {
      id: "cpp-apply",
      track: "cpp",
      num: "05",
      title: "Áp dụng",
      blurb: "Sắp xếp, tìm kiếm và dự án quản lý sinh viên bằng những gì đã học.",
      lessons: ["sorting-basic", "searching", "mini-project"]
    },
    {
      id: "dsa-foundation",
      track: "dsa",
      num: "01",
      title: "Nền tảng",
      blurb: "Đo chi phí thuật toán, dùng mảng động, tìm kiếm nhị phân và quay lui.",
      lessons: ["complexity", "dynamic-array", "binary-search", "recursion-backtracking"]
    },
    {
      id: "dsa-linear",
      track: "dsa",
      num: "02",
      title: "Cấu trúc tuyến tính",
      blurb: "Danh sách liên kết, ngăn xếp và hàng đợi: thay đổi cách dữ liệu được nối với nhau.",
      lessons: ["linked-list", "doubly-list", "stack", "queue"]
    },
    {
      id: "dsa-trees",
      track: "dsa",
      num: "03",
      title: "Cây & bảng băm",
      blurb: "Cây nhị phân, BST, heap và hash table — tìm nhanh trong dữ liệu lớn.",
      lessons: ["binary-tree", "bst", "heap", "hash-table"]
    },
    {
      id: "dsa-graphs",
      track: "dsa",
      num: "04",
      title: "Đồ thị",
      blurb: "Biểu diễn đồ thị, BFS/DFS, đường đi ngắn nhất và sắp xếp tô-pô.",
      lessons: ["graph-representation", "bfs-dfs", "shortest-path", "topological"]
    },
    {
      id: "dsa-algorithms",
      track: "dsa",
      num: "05",
      title: "Giải thuật",
      blurb: "Chia để trị, tham lam, quy hoạch động và dự án tổng hợp cuối khóa.",
      lessons: ["sorting-nlogn", "greedy", "dynamic-programming", "dsa-project"]
    }
  ],
  lessons: {},
  practice: [],
  cheatsheets: [],
  meta: {
    autoplayMs: 7200,
    totalLessons: 40
  }
};
