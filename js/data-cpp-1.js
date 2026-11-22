/* CppLab — Nhập môn C/C++ · phần 1 (bài 01–10) */
(function () {
  "use strict";
  const L = window.CPPLAB.lessons;
  const S = {
    flow(steps, active, done) { return { kind: "flow", steps, active: active || [], done: done || [] }; },
    vars(items) { return { kind: "vars", items }; },
    arr(values, active, extra) { return Object.assign({ kind: "array", values, active: active || [] }, extra || {}); },
    mem(stack, heap, pointers) { return { kind: "memory", stack, heap: heap || [], pointers: pointers || [] }; },
    list(nodes, active, extra) { return Object.assign({ kind: "list", nodes, active: active || [] }, extra || {}); },
    stack(items, active, top, extra) { return Object.assign({ kind: "stack", items, active: active || [], top }, extra || {}); },
    queue(items, front, rear, active, extra) { return Object.assign({ kind: "queue", items, front, rear, active: active || [] }, extra || {}); },
    tree(nodes, edges, caption) { return { kind: "tree", nodes, edges, caption }; },
    graph(nodes, edges, caption) { return { kind: "graph", nodes, edges, caption }; },
    table(headers, rows, activeRow, caption) { return { kind: "table", headers, rows, activeRow, caption }; },
    rec(frames, caption) { return { kind: "recursion", frames, caption }; },
    big(rows, caption) { return { kind: "complexity", rows, caption }; }
  };

  L.hello = {
    id: "hello",
    track: "cpp",
    module: "cpp-start",
    title: "Chương trình C++ đầu tiên",
    shortTitle: "Hello, C++",
    subtitle: "Một chương trình C++ gồm những phần nào, và máy tính chạy nó ra sao?",
    blurb: "Đọc từng dòng của chương trình Hello World để thấy preprocessor, hàm main và luồng xuất dữ liệu phối hợp với nhau.",
    level: "Nhập môn",
    duration: "12 phút",
    tags: ["hello world", "main", "cout", "preprocessor"],
    learn: [
      "Cấu trúc tối thiểu của một chương trình C++",
      "Vai trò của #include và using namespace std",
      "Hàm main là điểm bắt đầu thực thi",
      "cout và endl đưa dữ liệu ra màn hình"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, C++!" << endl;
  return 0;
}`,
    file: "hello.cpp",
    life: {
      icon: "bulb",
      title: "Một buổi biểu diễn",
      text: "Chương trình giống một buổi diễn: #include chuẩn bị đạo cụ, main là lúc mở màn, cout là lời chào đầu tiên và return 0 là cúi chào kết thúc."
    },
    visual: {
      kind: "flow",
      steps: [
        { label: "Nạp thư viện", sub: "iostream" },
        { label: "Vào main", sub: "điểm bắt đầu" },
        { label: "Xuất câu chào", sub: "cout" },
        { label: "Kết thúc", sub: "return 0" }
      ],
      active: [0]
    },
    steps: [
      {
        short: "Nạp thư viện",
        type: "KHỞI ĐỘNG",
        title: "Chuẩn bị công cụ trước khi diễn",
        body: "Dòng <code>#include &lt;iostream&gt;</code> nhờ bộ tiền xử lý chèn thư viện nhập xuất vào chương trình. Nhờ đó ta mới dùng được <code>cout</code> để ghi ra màn hình.",
        line: 1,
        mark: [1],
        watch: [{ name: "iostream", value: "đã nạp", type: "thư viện" }],
        output: "",
        visual: { kind: "flow", steps: [
          { label: "iostream", sub: "được chèn" },
          { label: "main", sub: "chờ chạy" },
          { label: "cout", sub: "sẵn sàng" },
          { label: "return", sub: "chờ" }
        ], active: [0] },
        note: "Dòng bắt đầu bằng # được xử lý trước khi chương trình biên dịch phần còn lại.",
        changes: ["Bộ tiền xử lý mở thư viện iostream.", "Các khai báo cout, endl trở nên khả dụng."]
      },
      {
        short: "Khai báo namespace",
        type: "KHỞI ĐỘNG",
        title: "Nói rõ ta dùng không gian tên std",
        body: "<code>using namespace std;</code> cho phép viết <code>cout</code> thay vì <code>std::cout</code>. Đây là cách viết gọn cho người mới; trong dự án lớn nên hạn chế đặt toàn bộ namespace vào phạm vi toàn cục.",
        line: 2,
        mark: [2],
        watch: [{ name: "std", value: "đang mở", type: "namespace" }],
        output: "",
        visual: { kind: "vars", items: [
          { name: "cout", type: "ostream", value: "std::cout", note: "đã rút gọn tên" },
          { name: "endl", type: "manipulator", value: "std::endl", note: "xuống dòng + flush" }
        ] },
        note: "Không có dòng này, mỗi lần dùng cout bạn phải viết std::cout.",
        changes: ["Tên trong namespace std được tìm thấy không cần tiền tố."]
      },
      {
        short: "Vào main",
        type: "THỰC THI",
        title: "Máy tính bắt đầu từ main",
        body: "Hàm <code>main</code> là cửa vào của chương trình. Khi chạy file, hệ điều hành gọi main, và câu lệnh đầu tiên bên trong thân hàm được thực hiện.",
        line: 4,
        mark: [4],
        watch: [{ name: "main", value: "đang chạy", type: "int()" }],
        output: "",
        visual: { kind: "flow", steps: [
          { label: "Nạp thư viện", sub: "xong" },
          { label: "Vào main", sub: "đang chạy" },
          { label: "Xuất câu chào", sub: "chờ" },
          { label: "Kết thúc", sub: "chờ" }
        ], active: [1], done: [0] },
        note: "Tên hàm phải là main; đổi thành Main hay start, chương trình không còn điểm vào chuẩn.",
        changes: ["Con trỏ thực thi đi vào thân hàm main."]
      },
      {
        short: "Xuất câu chào",
        type: "XUẤT DỮ LIỆU",
        title: "cout đẩy chuỗi ra stdout",
        body: "Toán tử <code>&lt;&lt;</code> gửi chuỗi <code>\"Hello, C++!\"</code> vào luồng <code>cout</code>, rồi <code>endl</code> thêm ký tự xuống dòng và đẩy bộ đệm ra ngoài. Kết quả xuất hiện trên màn hình.",
        line: 5,
        mark: [5],
        watch: [
          { name: "cout", value: "màn hình", type: "ostream" },
          { name: "endl", value: "\\n + flush", type: "manipulator", changed: true }
        ],
        output: "Hello, C++!",
        visual: { kind: "flow", steps: [
          { label: "Nạp thư viện", sub: "xong" },
          { label: "Vào main", sub: "xong" },
          { label: "Xuất câu chào", sub: "đang gửi" },
          { label: "Kết thúc", sub: "chờ" }
        ], active: [2], done: [0, 1] },
        note: "endl khác '\\n' ở chỗ nó còn flush bộ đệm; với output lớn, dùng '\\n' thường nhanh hơn.",
        changes: ["stdout nhận chuỗi Hello, C++!.", "Con trỏ xuống dòng nhờ endl."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Trả mã 0 cho hệ điều hành",
        body: "<code>return 0;</code> báo chương trình kết thúc thành công. Giá trị khác 0 thường mang nghĩa có lỗi. Sau dấu đóng ngoặc nhọn, chương trình kết thúc.",
        line: 6,
        mark: [6],
        watch: [{ name: "exit code", value: "0", type: "int", changed: true }],
        output: "Hello, C++!",
        visual: { kind: "flow", steps: [
          { label: "Nạp thư viện", sub: "xong" },
          { label: "Vào main", sub: "xong" },
          { label: "Xuất câu chào", sub: "xong" },
          { label: "Kết thúc", sub: "mã 0" }
        ], active: [3], done: [0, 1, 2] },
        tone: "final",
        note: "Thiếu return trong main hiện đại thường vẫn biên dịch được, nhưng viết rõ ràng giúp người đọc biết chương trình thành công.",
        changes: ["Tiến trình kết thúc với mã thoát 0.", "Tài nguyên của chương trình được giải phóng."]
      }
    ],
    practiceId: "cpp-hello-trace"
  };
  L.variables = {
    id: "variables",
    track: "cpp",
    module: "cpp-start",
    title: "Biến và kiểu dữ liệu",
    shortTitle: "Biến & kiểu",
    subtitle: "Mỗi biến là một chiếc hộp có tên, có kiểu và có một giá trị bên trong.",
    blurb: "Khai báo int, double, char, bool và xem cách C++ cấp phát, gán rồi đọc lại từng giá trị.",
    level: "Nhập môn",
    duration: "14 phút",
    tags: ["int", "double", "char", "bool", "khai báo"],
    learn: [
      "Khai báo biến gồm kiểu, tên và giá trị ban đầu",
      "Bốn kiểu dữ liệu cơ bản thường dùng",
      "Kiểu quyết định cách dữ liệu được lưu và in ra",
      "bool in ra 1/0 theo mặc định"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int age = 19;
  double gpa = 3.25;
  char grade = 'A';
  bool passed = true;
  cout << age << " " << gpa << " " << grade << " " << passed;
  return 0;
}`,
    file: "variables.cpp",
    life: {
      icon: "bulb",
      title: "Hộp có nhãn",
      text: "Biến giống hộp đựng đồ có nhãn: hộp 'age' chỉ đựng số nguyên, hộp 'gpa' đựng số thực, còn hộp 'passed' chỉ trả lời đúng hoặc sai."
    },
    steps: [
      {
        short: "Khai báo int",
        type: "KHAI BÁO",
        title: "Một ô nhớ tên age",
        body: "Dòng <code>int age = 19;</code> xin một vùng nhớ đủ chứa số nguyên, đặt tên là <code>age</code> và gán ngay giá trị 19.",
        line: 5,
        mark: [5],
        watch: [{ name: "age", value: "19", type: "int" }],
        output: "",
        visual: S.vars([{ name: "age", type: "int", value: "19", addr: "0x7ffd01", note: "số nguyên" }]),
        changes: ["Cấp phát 4 byte cho age.", "Gán age = 19."]
      },
      {
        short: "Khai báo double",
        type: "KHAI BÁO",
        title: "Số thực cần kiểu riêng",
        body: "<code>double gpa = 3.25;</code> lưu được phần thập phân. Nếu dùng <code>int</code>, giá trị 3.25 sẽ bị cắt thành 3.",
        line: 6,
        mark: [6],
        watch: [
          { name: "age", value: "19", type: "int" },
          { name: "gpa", value: "3.25", type: "double", changed: true }
        ],
        output: "",
        visual: S.vars([
          { name: "age", type: "int", value: "19", addr: "0x7ffd01" },
          { name: "gpa", type: "double", value: "3.25", addr: "0x7ffd05", note: "có phần thập phân", changed: true }
        ]),
        note: "double thường chiếm 8 byte; int thường 4 byte. Kích thước chính xác phụ thuộc nền tảng.",
        changes: ["Cấp phát vùng nhớ cho gpa.", "Lưu 3.25 dưới dạng số thực."]
      },
      {
        short: "char và bool",
        type: "KHAI BÁO",
        title: "Ký tự và đúng/sai",
        body: "<code>char</code> lưu một ký tự trong dấu nháy đơn. <code>bool</code> chỉ nhận <code>true</code> hoặc <code>false</code>, nhưng khi in ra mặc định thành 1 hoặc 0.",
        line: 7,
        mark: [7, 8],
        watch: [
          { name: "grade", value: "'A'", type: "char" },
          { name: "passed", value: "true", type: "bool", changed: true }
        ],
        output: "",
        visual: S.vars([
          { name: "grade", type: "char", value: "'A'", addr: "0x7ffd0d", note: "một ký tự" },
          { name: "passed", type: "bool", value: "true", addr: "0x7ffd0e", note: "1 byte", changed: true }
        ]),
        note: "Dùng nháy đơn cho char ('A'), nháy kép cho chuỗi (\"A\").",
        changes: ["grade nhận ký tự A.", "passed nhận giá trị đúng."]
      },
      {
        short: "In các biến",
        type: "XUẤT DỮ LIỆU",
        title: "cout đọc giá trị, không đọc tên",
        body: "Chuỗi <code>\" \"</code> chỉ là khoảng trắng phân cách. Các biến được thay bằng giá trị hiện tại: 19, 3.25, A và 1.",
        line: 9,
        mark: [9],
        watch: [
          { name: "age", value: "19", type: "int" },
          { name: "gpa", value: "3.25", type: "double" },
          { name: "grade", value: "A", type: "char" },
          { name: "passed", value: "1", type: "bool", changed: true }
        ],
        output: "19 3.25 A 1",
        visual: S.vars([
          { name: "age", type: "int", value: "19" },
          { name: "gpa", type: "double", value: "3.25" },
          { name: "grade", type: "char", value: "A" },
          { name: "passed", type: "bool", value: "1", changed: true }
        ]),
        changes: ["stdout nhận bốn giá trị cách nhau bởi khoảng trắng."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Các hộp được trả lại",
        body: "Khi main kết thúc, các biến cục bộ không còn cần thiết. Vùng nhớ của chúng được thu hồi khi hàm kết thúc.",
        line: 10,
        mark: [10],
        watch: [{ name: "age", value: "19", type: "int" }],
        output: "19 3.25 A 1",
        tone: "final",
        visual: S.mem([
          { name: "age", value: "19", addr: "0x7ffd01", active: true },
          { name: "gpa", value: "3.25", addr: "0x7ffd05" },
          { name: "grade", value: "'A'", addr: "0x7ffd0d" },
          { name: "passed", value: "1", addr: "0x7ffd0e" }
        ]),
        note: "Biến cục bộ sống trong phạm vi hàm. Hàm xong, vòng đời của chúng kết thúc.",
        changes: ["main trả mã 0.", "Stack frame của main được giải phóng."]
      }
    ]
  };

  L["input-output"] = {
    id: "input-output",
    track: "cpp",
    module: "cpp-start",
    title: "Nhập và xuất dữ liệu",
    shortTitle: "cin & cout",
    subtitle: "Đưa dữ liệu từ bàn phím vào biến và in kết quả ra màn hình.",
    blurb: "Theo dõi một chương trình hỏi số nguyên, tính bình phương và in kết quả qua cin, cout.",
    level: "Nhập môn",
    duration: "13 phút",
    tags: ["cin", "cout", "nhập", "xuất"],
    learn: [
      "Dùng cout để xuất và cin để nhập",
      "Chuỗi nhắc người dùng không nằm trong biến",
      "cin đọc theo kiểu của biến",
      "Kiểm tra trạng thái nhập khi dữ liệu sai định dạng"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int n;
  cout << "Nhap n: ";
  cin >> n;
  cout << "Binh phuong: " << n * n;
  return 0;
}`,
    file: "input_output.cpp",
    life: {
      icon: "bulb",
      title: "Phiếu đặt hàng",
      text: "cout là màn hình quầy ghi câu hỏi; cin là khe nhận phiếu. Bạn chỉ nhận đúng loại phiếu mà biểu mẫu yêu cầu."
    },
    steps: [
      {
        short: "Tạo biến",
        type: "KHAI BÁO",
        title: "Cái hộp n chưa có gì",
        body: "<code>int n;</code> tạo biến nhưng không gán giá trị. Đọc một biến chưa khởi tạo là hành vi không xác định, nên phải nhập hoặc gán trước khi dùng.",
        line: 5,
        mark: [5],
        watch: [{ name: "n", value: "chưa gán", type: "int" }],
        output: "",
        visual: S.vars([{ name: "n", type: "int", value: "?", addr: "0x7ffd01", note: "chưa khởi tạo" }]),
        note: "Với biến cục bộ, giá trị ban đầu không được C++ tự đặt về 0.",
        changes: ["Cấp phát ô nhớ cho n.", "Chưa ghi giá trị vào ô nhớ."]
      },
      {
        short: "In lời nhắc",
        type: "XUẤT DỮ LIỆU",
        title: "Nói cho người dùng biết cần nhập gì",
        body: "Dòng <code>cout &lt;&lt; \"Nhap n: \";</code> in lời nhắc. Không có dòng này chương trình vẫn chạy, nhưng người dùng sẽ ngồi chờ mà không biết phải làm gì.",
        line: 6,
        mark: [6],
        watch: [{ name: "stdout", value: "Nhap n: ", type: "ostream", changed: true }],
        output: "Nhap n: ",
        visual: S.flow([
          { label: "Hỏi", sub: "In lời nhắc" },
          { label: "Chờ", sub: "cin" },
          { label: "Tính", sub: "n * n" },
          { label: "In", sub: "kết quả" }
        ], [0]),
        changes: ["stdout nhận chuỗi Nhap n: ."]
      },
      {
        short: "Đọc bằng cin",
        type: "NHẬP DỮ LIỆU",
        title: "Chương trình dừng chờ bàn phím",
        body: "<code>cin &gt;&gt; n;</code> đọc ký tự số, bỏ qua khoảng trắng đầu và dừng ở khoảng trắng tiếp theo. Giả sử người dùng gõ 7 rồi Enter.",
        line: 7,
        mark: [7],
        watch: [{ name: "n", value: "7", type: "int", changed: true }],
        output: "Nhap n: 7",
        visual: S.vars([{ name: "n", type: "int", value: "7", addr: "0x7ffd01", changed: true, note: "vừa nhận từ cin" }]),
        note: "Nếu nhập chữ vào biến int, cin chuyển sang trạng thái lỗi và các lần đọc sau có thể thất bại.",
        changes: ["n nhận giá trị 7.", "Con trỏ đọc đi qua ký tự 7."]
      },
      {
        short: "Tính và in",
        type: "THỰC THI",
        title: "Biểu thức được tính trước khi in",
        body: "Trong <code>cout &lt;&lt; \"Binh phuong: \" &lt;&lt; n * n;</code>, C++ tính <code>n * n</code> rồi gửi kết quả vào luồng xuất. Chuỗi và số được nối liên tiếp.",
        line: 8,
        mark: [8],
        watch: [{ name: "n", value: "7", type: "int" }, { name: "n * n", value: "49", type: "int", changed: true }],
        output: "Nhap n: 7\nBinh phuong: 49",
        visual: S.flow([
          { label: "Hỏi", sub: "xong" },
          { label: "Chờ", sub: "xong" },
          { label: "Tính", sub: "7 × 7 = 49" },
          { label: "In", sub: "đang in" }
        ], [2, 3], [0, 1]),
        changes: ["Tính 49 từ n.", "stdout nhận thêm Binh phuong: 49."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Trả lại quyền điều khiển",
        body: "Chương trình kết thúc sau khi in xong. Dữ liệu trong bộ đệm cout được đẩy ra trước khi tiến trình thoát.",
        line: 9,
        mark: [9],
        watch: [{ name: "exit code", value: "0", type: "int" }],
        output: "Nhap n: 7\nBinh phuong: 49",
        tone: "final",
        visual: S.flow([
          { label: "Hỏi", sub: "xong" },
          { label: "Chờ", sub: "xong" },
          { label: "Tính", sub: "xong" },
          { label: "In", sub: "xong" }
        ], [], [0, 1, 2, 3]),
        changes: ["main trả 0.", "Bộ đệm xuất được flush."]
      }
    ]
  };

  L.operators = {
    id: "operators",
    track: "cpp",
    module: "cpp-start",
    title: "Toán tử và biểu thức",
    shortTitle: "Toán tử",
    subtitle: "Cùng một phép chia, kết quả phụ thuộc kiểu dữ liệu của toán hạng.",
    blurb: "So sánh phép cộng, chia nguyên, chia lấy dư và chia số thực để hiểu C++ xử lý kiểu như thế nào.",
    level: "Nhập môn",
    duration: "14 phút",
    tags: ["toán tử", "chia nguyên", "modulo", "ưu tiên"],
    learn: [
      "Toán tử số học cơ bản và thứ tự ưu tiên",
      "Chia nguyên khác chia số thực",
      "Toán tử % chỉ dùng với số nguyên",
      "Ép kiểu để tránh mất phần thập phân"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int a = 7, b = 3;
  cout << a + b << endl;
  cout << a / b << endl;
  cout << a % b << endl;
  double x = 7.0 / 3;
  cout << x;
  return 0;
}`,
    file: "operators.cpp",
    life: {
      icon: "bulb",
      title: "Chia kẹo",
      text: "7 viên kẹo chia 3 bạn: mỗi bạn 2 viên, còn dư 1 viên. Phép chia nguyên cho thương, phép % cho phần dư — đúng như chia kẹo trong đời thường."
    },
    steps: [
      {
        short: "Hai toán hạng",
        type: "KHAI BÁO",
        title: "a và b đều là số nguyên",
        body: "Cả <code>a</code> và <code>b</code> đều có kiểu <code>int</code>. Kiểu của toán hạng sẽ quyết định phép chia bên dưới là chia nguyên hay chia thực.",
        line: 5,
        mark: [5],
        watch: [{ name: "a", value: "7", type: "int" }, { name: "b", value: "3", type: "int" }],
        output: "",
        visual: S.vars([
          { name: "a", type: "int", value: "7", addr: "0x7ffd01" },
          { name: "b", type: "int", value: "3", addr: "0x7ffd05" }
        ]),
        changes: ["a = 7, b = 3."]
      },
      {
        short: "Cộng",
        type: "TÍNH TOÁN",
        title: "7 + 3 = 10",
        body: "Phép cộng hai số nguyên cho số nguyên. Kết quả 10 được gửi thẳng vào cout.",
        line: 6,
        mark: [6],
        watch: [{ name: "a + b", value: "10", type: "int", changed: true }],
        output: "10",
        visual: S.vars([
          { name: "a", type: "int", value: "7" },
          { name: "b", type: "int", value: "3" },
          { name: "a + b", type: "int", value: "10", changed: true }
        ]),
        changes: ["Biểu thức a + b cho 10.", "stdout nhận 10 và xuống dòng."]
      },
      {
        short: "Chia nguyên",
        type: "TÍNH TOÁN",
        title: "7 / 3 không phải 2.333",
        body: "Vì hai toán hạng là <code>int</code>, C++ thực hiện chia nguyên: phần thập phân bị bỏ, kết quả là 2. Đây là lỗi rất thường gặp khi tính điểm trung bình.",
        line: 7,
        mark: [7],
        watch: [{ name: "a / b", value: "2", type: "int", changed: true }],
        output: "10\n2",
        visual: S.vars([
          { name: "a / b", type: "int", value: "2", note: "phần thập phân bị bỏ", changed: true },
          { name: "7.0 / 3", type: "double", value: "2.333...", note: "nếu có số thực" }
        ]),
        note: "Muốn chia thực, ít nhất một toán hạng phải là double hoặc float.",
        changes: ["Thương nguyên là 2.", "stdout nhận 2."]
      },
      {
        short: "Chia lấy dư",
        type: "TÍNH TOÁN",
        title: "% trả về phần còn dư",
        body: "<code>a % b</code> tính phần dư của phép chia nguyên: 7 chia 3 được 2 dư 1. Toán tử % không dùng được với double.",
        line: 8,
        mark: [8],
        watch: [{ name: "a % b", value: "1", type: "int", changed: true }],
        output: "10\n2\n1",
        visual: S.table(["Biểu thức", "Kiểu", "Kết quả"], [
          ["a + b", "int", "10"],
          ["a / b", "int", "2"],
          ["a % b", "int", "1"]
        ], 2),
        changes: ["Phần dư là 1.", "stdout nhận 1."]
      },
      {
        short: "Chia số thực",
        type: "TÍNH TOÁN",
        title: "7.0 / 3 mới cho phần thập phân",
        body: "<code>7.0</code> là số thực nên phép chia được thực hiện trên kiểu <code>double</code>. Kết quả 2.333... được in với độ chính xác mặc định của cout.",
        line: 9,
        mark: [9, 10],
        watch: [{ name: "x", value: "2.33333", type: "double", changed: true }],
        output: "10\n2\n1\n2.33333",
        visual: S.vars([
          { name: "x", type: "double", value: "2.33333", note: "7.0 / 3", changed: true }
        ]),
        note: "cout mặc định in khoảng 6 chữ số có nghĩa. Dùng fixed và setprecision để kiểm soát số chữ số thập phân.",
        changes: ["x = 7.0 / 3 ≈ 2.33333.", "stdout nhận giá trị x."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Kiểu dữ liệu quyết định kết quả",
        body: "Cùng là phép chia, <code>int / int</code> và <code>double / int</code> cho hai kết quả khác nhau. Hãy kiểm tra kiểu trước khi tin vào con số.",
        line: 11,
        mark: [11],
        output: "10\n2\n1\n2.33333",
        tone: "final",
        watch: [{ name: "exit code", value: "0", type: "int" }],
        visual: S.table(["Phép chia", "Kiểu", "Kết quả"], [
          ["7 / 3", "int / int", "2"],
          ["7.0 / 3", "double / int", "2.33333"]
        ], 1),
        changes: ["Chương trình kết thúc."]
      }
    ]
  };

  L.conditions = {
    id: "conditions",
    track: "cpp",
    module: "cpp-control",
    title: "Rẽ nhánh với if / else",
    shortTitle: "Điều kiện",
    subtitle: "Dạy chương trình chọn một trong nhiều con đường dựa trên dữ liệu.",
    blurb: "Chạy một bảng xếp loại học lực và quan sát điều kiện nào được kiểm tra, nhánh nào bị bỏ qua.",
    level: "Cơ bản",
    duration: "15 phút",
    tags: ["if", "else", "điều kiện", "rẽ nhánh"],
    learn: [
      "Cấu trúc if / else if / else",
      "Điều kiện được kiểm tra từ trên xuống",
      "Chỉ một nhánh được thực thi",
      "Dùng else if để tránh kiểm tra thừa"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int score = 7;
  if (score >= 8) {
    cout << "Gioi";
  } else if (score >= 6.5) {
    cout << "Kha";
  } else {
    cout << "Can co gang";
  }
  return 0;
}`,
    file: "conditions.cpp",
    life: {
      icon: "bulb",
      title: "Cổng soát vé",
      text: "if giống các cổng soát vé nối tiếp: bạn đi vào cổng đầu tiên mà điều kiện đúng. Vé 7 điểm không qua cổng 'Giỏi', nhưng qua cổng 'Khá'."
    },
    steps: [
      {
        short: "Dữ liệu vào",
        type: "KHỞI TẠO",
        title: "score = 7",
        body: "Điểm được gán cứng là 7 để dễ theo dõi. Trong chương trình thật, giá trị này thường đến từ <code>cin</code> hoặc một phép tính.",
        line: 5,
        mark: [5],
        watch: [{ name: "score", value: "7", type: "int" }],
        output: "",
        visual: S.vars([{ name: "score", type: "int", value: "7", note: "điểm cần xếp loại" }])
      },
      {
        short: "Điều kiện 1",
        type: "KIỂM TRA",
        title: "7 >= 8 là sai",
        body: "Biểu thức <code>score &gt;= 8</code> cho <code>false</code>. Nhánh đầu tiên bị bỏ qua, chương trình chuyển sang <code>else if</code>.",
        line: 6,
        mark: [6],
        watch: [{ name: "score >= 8", value: "false", type: "bool", changed: true }],
        output: "",
        visual: S.flow([
          { label: "score >= 8", sub: "sai" },
          { label: "score >= 6.5", sub: "kiểm tra" },
          { label: "else", sub: "dự phòng" },
          { label: "In kết quả", sub: "chờ" }
        ], [1], [0]),
        note: "Toán tử >= so sánh lớn hơn hoặc bằng; = là gán, == mới là so sánh bằng.",
        changes: ["7 >= 8 trả false.", "Bỏ qua khối Gioi."]
      },
      {
        short: "Điều kiện 2",
        type: "KIỂM TRA",
        title: "7 >= 6.5 là đúng",
        body: "Điều kiện thứ hai đúng nên khối lệnh <code>cout &lt;&lt; \"Kha\";</code> được chọn. Khối <code>else</code> phía sau không được thực thi.",
        line: 8,
        mark: [8],
        watch: [{ name: "score >= 6.5", value: "true", type: "bool", changed: true }],
        output: "",
        visual: S.flow([
          { label: "score >= 8", sub: "sai" },
          { label: "score >= 6.5", sub: "đúng" },
          { label: "In Kha", sub: "được chọn" },
          { label: "else", sub: "bỏ qua" }
        ], [1, 2], [0]),
        changes: ["Điều kiện thứ hai đúng.", "Nhánh Kha được chọn."]
      },
      {
        short: "In nhánh",
        type: "XUẤT DỮ LIỆU",
        title: "Chỉ một nhánh chạy",
        body: "Chương trình in <code>Kha</code>. Dù score thay đổi, tối đa một trong ba nhánh được thực thi.",
        line: 9,
        mark: [9],
        watch: [{ name: "score", value: "7", type: "int" }, { name: "ketqua", value: "Kha", type: "string", changed: true }],
        output: "Kha",
        visual: S.flow([
          { label: "score >= 8", sub: "sai" },
          { label: "score >= 6.5", sub: "đúng" },
          { label: "In Kha", sub: "xong" },
          { label: "else", sub: "bỏ qua" }
        ], [2], [0, 1]),
        changes: ["stdout nhận Kha."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Bảng xếp loại hoàn tất",
        body: "Sau khối if, chương trình tiếp tục từ sau dấu đóng ngoặc. Có thể thử đổi score thành 9 hoặc 5 để thấy nhánh khác.",
        line: 13,
        mark: [13],
        output: "Kha",
        tone: "final",
        watch: [{ name: "exit code", value: "0", type: "int" }],
        visual: S.table(["score", "Nhánh"], [
          ["≥ 8", "Gioi"],
          ["6.5 – 7.9", "Kha"],
          ["< 6.5", "Can co gang"]
        ], 1, "score = 7 rơi vào nhánh Kha."),
        changes: ["Chương trình kết thúc."]
      }
    ]
  };
  L.loops = {
    id: "loops",
    track: "cpp",
    module: "cpp-control",
    title: "Vòng lặp for",
    shortTitle: "Vòng lặp",
    subtitle: "Lặp lại một khối lệnh với biến đếm thay đổi sau mỗi vòng.",
    blurb: "Chạy vòng for tính bình phương từ 1 đến 5 và xem điều kiện dừng hoạt động ở đâu.",
    level: "Cơ bản",
    duration: "15 phút",
    tags: ["for", "vòng lặp", "biến đếm", "điều kiện dừng"],
    learn: [
      "Ba phần của vòng for: khởi tạo, điều kiện, cập nhật",
      "Thân vòng lặp chạy khi điều kiện còn đúng",
      "Biến đếm thay đổi sau mỗi vòng",
      "Điều kiện sai thì thoát vòng"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  for (int i = 1; i <= 5; i++) {
    cout << i * i << " ";
  }
  return 0;
}`,
    file: "loops.cpp",
    life: {
      icon: "bulb",
      title: "Chạy 5 vòng sân",
      text: "for giống huấn luyện viên: bắt đầu ở vòng 1, kiểm tra còn trong 5 vòng không, chạy xong thì tăng số vòng. Đủ 5 vòng thì dừng."
    },
    steps: [
      {
        short: "Khởi tạo",
        type: "KHỞI TẠO",
        title: "i bắt đầu từ 1",
        body: "Phần đầu tiên <code>int i = 1</code> chỉ chạy một lần. Sau đó chương trình kiểm tra <code>i &lt;= 5</code>, đúng nên đi vào thân vòng lặp.",
        line: 5,
        mark: [5],
        watch: [{ name: "i", value: "1", type: "int" }],
        output: "",
        visual: S.vars([{ name: "i", type: "int", value: "1", note: "vòng đầu tiên" }])
      },
      {
        short: "Vòng 1",
        type: "LẶP",
        title: "In 1² = 1",
        body: "Thân vòng lặp in <code>i * i</code> kèm khoảng trắng. Hết thân, phần cập nhật <code>i++</code> tăng i lên 2.",
        line: 6,
        mark: [6],
        watch: [{ name: "i", value: "1", type: "int" }, { name: "i * i", value: "1", type: "int" }],
        output: "1 ",
        visual: S.vars([
          { name: "i", type: "int", value: "1" },
          { name: "i * i", type: "int", value: "1", changed: true }
        ]),
        changes: ["In 1.", "i tăng lên 2."]
      },
      {
        short: "Vòng 3",
        type: "LẶP",
        title: "i = 3, in 9",
        body: "Mỗi vòng đều kiểm tra lại điều kiện. Với i = 3, điều kiện vẫn đúng; in 9 rồi tăng i thành 4.",
        line: 6,
        mark: [6],
        watch: [{ name: "i", value: "3", type: "int" }, { name: "i * i", value: "9", type: "int" }],
        output: "1 4 9 ",
        visual: S.arr([1, 4, 9], [2], [0, 1], { label: "output", caption: "Ba giá trị đã được in." }),
        changes: ["In 9.", "i tăng lên 4."]
      },
      {
        short: "Vòng cuối",
        type: "LẶP",
        title: "i = 5, in 25",
        body: "i = 5 vẫn thỏa <code>i &lt;= 5</code>. Sau khi in 25, i tăng lên 6. Lần kiểm tra tiếp theo thất bại nên vòng lặp kết thúc.",
        line: 6,
        mark: [6],
        watch: [{ name: "i", value: "5", type: "int" }, { name: "i * i", value: "25", type: "int" }],
        output: "1 4 9 16 25 ",
        visual: S.arr([1, 4, 9, 16, 25], [4], [0, 1, 2, 3], { label: "output" }),
        note: "Điều kiện dùng <= để bao gồm 5. Nếu dùng < 5, giá trị 25 sẽ không được in.",
        changes: ["In 25.", "i tăng lên 6."]
      },
      {
        short: "Thoát vòng",
        type: "KẾT THÚC",
        title: "6 <= 5 sai, vòng dừng",
        body: "Chương trình quay lại kiểm tra điều kiện, nhận false và đi tiếp sau vòng for. Tổng cộng thân lặp chạy đúng 5 lần.",
        line: 8,
        mark: [8],
        watch: [{ name: "i", value: "6", type: "int" }, { name: "điều kiện", value: "false", type: "bool", changed: true }],
        output: "1 4 9 16 25 ",
        tone: "final",
        visual: S.table(["Lần", "i", "In"], [
          ["1", "1", "1"],
          ["2", "2", "4"],
          ["3", "3", "9"],
          ["4", "4", "16"],
          ["5", "5", "25"]
        ], 4, "i = 6 thì điều kiện sai và vòng lặp dừng."),
        changes: ["Điều kiện false.", "Thoát vòng, return 0."]
      }
    ]
  };

  L.functions = {
    id: "functions",
    track: "cpp",
    module: "cpp-control",
    title: "Hàm và lời gọi hàm",
    shortTitle: "Hàm",
    subtitle: "Chia chương trình thành những khối nhỏ có tên, nhận đầu vào và trả kết quả.",
    blurb: "Gọi hàm square, theo dõi stack frame và thấy giá trị được truyền vào rồi trả về như thế nào.",
    level: "Cơ bản",
    duration: "16 phút",
    tags: ["hàm", "return", "tham số", "stack frame"],
    learn: [
      "Khai báo hàm với kiểu trả về, tên và tham số",
      "Gọi hàm và truyền đối số",
      "Theo dõi stack frame khi hàm chạy",
      "Giá trị trả về được gán cho biến gọi"
    ],
    code: `#include <iostream>
using namespace std;

int square(int x) {
  return x * x;
}

int main() {
  int a = 4;
  int b = square(a);
  cout << b;
  return 0;
}`,
    file: "functions.cpp",
    life: {
      icon: "bulb",
      title: "Máy tính bỏ túi",
      text: "Hàm giống một chiếc máy nhỏ: bỏ 4 vào, máy nhận tham số x = 4, xử lý bên trong rồi trả ra 16."
    },
    steps: [
      {
        short: "Biến đầu vào",
        type: "KHỞI TẠO",
        title: "a = 4 trong main",
        body: "main là hàm đang chạy. Biến <code>a</code> nằm trong stack frame của main và sẵn sàng được truyền vào hàm square.",
        line: 9,
        mark: [9],
        watch: [{ name: "a", value: "4", type: "int" }],
        output: "",
        visual: S.mem([
          { name: "a", value: "4", addr: "0x7ffd01", active: true },
          { name: "b", value: "?", addr: "0x7ffd05" }
        ], [], [], )
      },
      {
        short: "Gọi hàm",
        type: "GỌI HÀM",
        title: "square nhận bản sao của a",
        body: "Khi gọi <code>square(a)</code>, giá trị 4 được truyền vào tham số <code>x</code>. C++ tạo một stack frame mới cho square; thay đổi x không làm đổi a.",
        line: 10,
        mark: [10],
        watch: [{ name: "a", value: "4", type: "int" }, { name: "x", value: "4", type: "int", changed: true }],
        output: "",
        visual: S.rec([
          { fn: "square(x = 4)", note: "đang chạy", active: true },
          { fn: "main()", note: "chờ kết quả" }
        ], "Frame của square nằm trên frame của main."),
        note: "Truyền tham trị (pass by value) sao chép giá trị. Muốn sửa biến gốc, cần tham chiếu hoặc con trỏ.",
        changes: ["Tạo frame cho square.", "x nhận bản sao giá trị 4."]
      },
      {
        short: "Tính bên trong",
        type: "THỰC THI",
        title: "return x * x",
        body: "Trong square, <code>x * x</code> cho 16. Lệnh <code>return</code> đóng frame của square và gửi 16 về nơi gọi.",
        line: 5,
        mark: [5],
        watch: [{ name: "x", value: "4", type: "int" }, { name: "return", value: "16", type: "int", changed: true }],
        output: "",
        visual: S.rec([
          { fn: "square(x = 4) → 16", note: "sắp trả về", active: true },
          { fn: "main()", note: "nhận 16" }
        ]),
        changes: ["Tính 16.", "Chuẩn bị đóng frame square."]
      },
      {
        short: "Nhận kết quả",
        type: "GÁN",
        title: "b = 16",
        body: "Giá trị trả về được gán cho <code>b</code>. Frame square đã biến mất; main tiếp tục chạy với b = 16.",
        line: 10,
        mark: [10],
        watch: [{ name: "b", value: "16", type: "int", changed: true }],
        output: "",
        visual: S.mem([
          { name: "a", value: "4", addr: "0x7ffd01" },
          { name: "b", value: "16", addr: "0x7ffd05", active: true }
        ]),
        changes: ["b nhận 16.", "Frame square bị thu hồi."]
      },
      {
        short: "In kết quả",
        type: "XUẤT DỮ LIỆU",
        title: "main in 16",
        body: "cout trong main đọc b và in ra 16. Hàm square không tự in gì; nó chỉ trả giá trị.",
        line: 11,
        mark: [11],
        watch: [{ name: "b", value: "16", type: "int" }],
        output: "16",
        visual: S.vars([
          { name: "a", type: "int", value: "4" },
          { name: "b", type: "int", value: "16", changed: true }
        ]),
        changes: ["stdout nhận 16."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Chương trình trả 0",
        body: "Sau khi main kết thúc, toàn bộ stack frame bị thu hồi. Giá trị trả về của square đã được dùng xong.",
        line: 12,
        mark: [12],
        output: "16",
        tone: "final",
        watch: [{ name: "exit code", value: "0", type: "int" }],
        visual: S.flow([
          { label: "main", sub: "a = 4" },
          { label: "square", sub: "x = 4" },
          { label: "return", sub: "16" },
          { label: "cout", sub: "16" }
        ], [], [0, 1, 2, 3]),
        changes: ["main trả 0."]
      }
    ]
  };

  L.scope = {
    id: "scope",
    track: "cpp",
    module: "cpp-control",
    title: "Phạm vi và che khuất biến",
    shortTitle: "Phạm vi",
    subtitle: "Một cái tên có thể trỏ tới hai biến khác nhau trong hai khối lệnh.",
    blurb: "Theo dõi biến x ngoài và trong khối, cùng biến total toàn cục, để hiểu vòng đời và phạm vi.",
    level: "Cơ bản",
    duration: "15 phút",
    tags: ["scope", "block", "shadowing", "biến toàn cục"],
    learn: [
      "Biến cục bộ sống trong khối khai báo",
      "Khối trong có thể che khuất biến ngoài",
      "Biến toàn cục nhìn thấy trong mọi hàm",
      "Hạn chế biến toàn cục để dễ kiểm soát"
    ],
    code: `#include <iostream>
using namespace std;

int total = 0;

int main() {
  int x = 5;
  {
    int x = 10;
    total += x;
  }
  total += x;
  cout << total;
  return 0;
}`,
    file: "scope.cpp",
    life: {
      icon: "bulb",
      title: "Hai người cùng tên",
      text: "Trong lớp có hai bạn tên An: khi ở trong phòng của lớp 10A, 'An' là bạn An lớp 10A. Ra ngoài hành lang, 'An' lại là người khác. Phạm vi quyết định bạn đang nói về ai."
    },
    steps: [
      {
        short: "Biến ngoài",
        type: "KHAI BÁO",
        title: "x = 5 trong main",
        body: "Biến <code>total</code> toàn cục bằng 0. Biến <code>x</code> cục bộ trong main bằng 5 và chỉ sống trong thân main.",
        line: 7,
        mark: [4, 7],
        watch: [
          { name: "total", value: "0", type: "int" },
          { name: "x (main)", value: "5", type: "int" }
        ],
        output: "",
        visual: S.vars([
          { name: "total", type: "int", value: "0", note: "toàn cục" },
          { name: "x", type: "int", value: "5", note: "cục bộ trong main" }
        ])
      },
      {
        short: "Biến trong khối",
        type: "CHE KHUẤT",
        title: "x = 10 thuộc khối trong",
        body: "Dấu ngoặc nhọn mở một khối mới. <code>int x = 10;</code> tạo biến khác tên x, che khuất x = 5 của main trong phạm vi khối này.",
        line: 9,
        mark: [9],
        watch: [{ name: "x (khối)", value: "10", type: "int", changed: true }],
        output: "",
        visual: S.mem([
          { name: "total", value: "0", addr: "0x6010" },
          { name: "x (main)", value: "5", addr: "0x7ffd01" },
          { name: "x (khối)", value: "10", addr: "0x7ffd05", active: true }
        ], [], [], ),
        note: "Đây là shadowing: cùng tên nhưng là hai ô nhớ hoàn toàn khác nhau.",
        changes: ["Tạo x mới trong khối.", "x ngoài bị che khuất tạm thời."]
      },
      {
        short: "Cộng total",
        type: "THỰC THI",
        title: "total = 0 + 10",
        body: "<code>total += x;</code> dùng x của khối trong, nên total nhận 10. Biến total toàn cục nên thay đổi vẫn còn sau khi khối kết thúc.",
        line: 10,
        mark: [10],
        watch: [{ name: "x", value: "10", type: "int" }, { name: "total", value: "10", type: "int", changed: true }],
        output: "",
        visual: S.vars([
          { name: "total", type: "int", value: "10", changed: true, note: "toàn cục" },
          { name: "x (khối)", type: "int", value: "10" }
        ]),
        changes: ["total tăng từ 0 lên 10."]
      },
      {
        short: "Ra khỏi khối",
        type: "PHẠM VI",
        title: "x = 10 biến mất",
        body: "Đóng khối, biến x bên trong bị thu hồi. Từ đây, tên x lại trỏ về biến 5 của main. <code>total += x</code> cộng thêm 5.",
        line: 12,
        mark: [12],
        watch: [{ name: "x (main)", value: "5", type: "int" }, { name: "total", value: "15", type: "int", changed: true }],
        output: "",
        visual: S.mem([
          { name: "total", value: "15", addr: "0x6010", active: true },
          { name: "x (main)", value: "5", addr: "0x7ffd01" }
        ]),
        note: "Dùng cùng tên cho hai ý nghĩa khác nhau rất dễ gây nhầm; nên đặt tên rõ ràng.",
        changes: ["x trong khối bị thu hồi.", "total tăng lên 15."]
      },
      {
        short: "In kết quả",
        type: "XUẤT DỮ LIỆU",
        title: "total = 15",
        body: "cout đọc total toàn cục và in 15. Nếu total là biến cục bộ trong khối, nó đã không còn để đọc ở đây.",
        line: 13,
        mark: [13],
        watch: [{ name: "total", value: "15", type: "int" }],
        output: "15",
        visual: S.vars([{ name: "total", type: "int", value: "15", changed: true, note: "toàn cục" }]),
        changes: ["stdout nhận 15."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Hai vòng đời khác nhau",
        body: "Biến trong khối chết ngay khi khối đóng; biến main sống tới cuối main; biến toàn cục sống tới cuối chương trình.",
        line: 14,
        mark: [14],
        output: "15",
        tone: "final",
        visual: S.table(["Biến", "Phạm vi", "Vòng đời"], [
          ["x (khối)", "trong { }", "kết thúc khi đóng khối"],
          ["x (main)", "thân main", "kết thúc khi main xong"],
          ["total", "toàn chương trình", "kết thúc khi tiến trình dừng"]
        ], 1),
        changes: ["Chương trình kết thúc."]
      }
    ]
  };

  L.arrays = {
    id: "arrays",
    track: "cpp",
    module: "cpp-data",
    title: "Mảng một chiều",
    shortTitle: "Mảng",
    subtitle: "Nhiều giá trị cùng kiểu, xếp liên tiếp và truy cập bằng chỉ số.",
    blurb: "Duyệt mảng 5 phần tử bằng vòng for, cộng dồn và quan sát từng ô được đọc.",
    level: "Cơ bản",
    duration: "16 phút",
    tags: ["array", "chỉ số", "duyệt mảng", "tổng"],
    learn: [
      "Khai báo và khởi tạo mảng",
      "Chỉ số mảng bắt đầu từ 0",
      "Duyệt mảng bằng vòng for",
      "Truy cập ngoài biên là lỗi nguy hiểm"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int a[5] = {4, 8, 2, 9, 1};
  int sum = 0;
  for (int i = 0; i < 5; i++) {
    sum += a[i];
  }
  cout << sum;
  return 0;
}`,
    file: "arrays.cpp",
    life: {
      icon: "bulb",
      title: "Dãy tủ có số",
      text: "Mảng giống một dãy tủ liền nhau được đánh số từ 0. Muốn lấy đồ ở tủ thứ ba, bạn mở tủ số 2 — không phải tủ số 3."
    },
    steps: [
      {
        short: "Khởi tạo mảng",
        type: "KHỞI TẠO",
        title: "Năm ô nhớ liên tiếp",
        body: "Mảng <code>a</code> có 5 phần tử kiểu int, nằm liên tiếp trong bộ nhớ. Chỉ số hợp lệ là 0 đến 4.",
        line: 5,
        mark: [5],
        watch: [{ name: "a", value: "[4, 8, 2, 9, 1]", type: "int[5]" }],
        output: "",
        visual: S.arr([4, 8, 2, 9, 1], [], [], { label: "a", caption: "a[0] = 4, ..., a[4] = 1." }),
        note: "Kích thước mảng cố định 5. Chỉ số 5 không thuộc mảng.",
        changes: ["Cấp phát 5 ô int liên tiếp.", "Gán lần lượt các giá trị."]
      },
      {
        short: "Biến tổng",
        type: "KHỞI TẠO",
        title: "sum bắt đầu từ 0",
        body: "<code>int sum = 0;</code> tạo biến tích lũy. Nếu quên khởi tạo, sum chứa rác và tổng sẽ sai.",
        line: 6,
        mark: [6],
        watch: [{ name: "sum", value: "0", type: "int" }],
        output: "",
        visual: S.vars([{ name: "sum", type: "int", value: "0", note: "biến tích lũy" }])
      },
      {
        short: "Đọc a[0]",
        type: "LẶP",
        title: "sum = 0 + 4",
        body: "i = 0, điều kiện đúng. <code>a[0]</code> là 4, sum thành 4. Sau đó i tăng lên 1.",
        line: 8,
        mark: [8],
        watch: [{ name: "i", value: "0", type: "int" }, { name: "a[i]", value: "4", type: "int" }, { name: "sum", value: "4", type: "int", changed: true }],
        output: "",
        visual: S.arr([4, 8, 2, 9, 1], [0], [], { label: "a", pointers: [{ label: "i", index: 0 }], note: "đang đọc a[0]" }),
        changes: ["sum = 4.", "i tăng lên 1."]
      },
      {
        short: "Cộng dồn",
        type: "LẶP",
        title: "Đi qua từng ô",
        body: "Vòng lặp lần lượt cộng 8, 2, 9, 1. Sau khi xử lý a[1], sum = 12; tiếp tục đến hết mảng.",
        line: 8,
        mark: [8],
        watch: [{ name: "i", value: "1", type: "int" }, { name: "a[i]", value: "8", type: "int" }, { name: "sum", value: "12", type: "int", changed: true }],
        output: "",
        visual: S.arr([4, 8, 2, 9, 1], [1], [0], { label: "a", pointers: [{ label: "i", index: 1 }], note: "đã cộng 4 + 8" }),
        changes: ["sum = 12.", "Tiếp tục các ô còn lại."]
      },
      {
        short: "Đọc ô cuối",
        type: "LẶP",
        title: "a[4] = 1",
        body: "i = 4 là chỉ số hợp lệ cuối cùng. Cộng 1 vào sum được 24. Sau đó i = 5 làm điều kiện sai và vòng lặp dừng.",
        line: 8,
        mark: [8],
        watch: [{ name: "i", value: "4", type: "int" }, { name: "a[i]", value: "1", type: "int" }, { name: "sum", value: "24", type: "int", changed: true }],
        output: "",
        visual: S.arr([4, 8, 2, 9, 1], [4], [0, 1, 2, 3], { label: "a", pointers: [{ label: "i", index: 4 }], note: "ô cuối cùng" }),
        note: "Điều kiện i < 5 giữ chỉ số trong 0..4. Dùng i <= 5 sẽ đọc a[5] ngoài biên.",
        changes: ["sum = 24.", "i = 5, thoát vòng."]
      },
      {
        short: "In tổng",
        type: "KẾT THÚC",
        title: "Tổng là 24",
        body: "cout in sum. Vòng lặp đã đi qua đúng 5 phần tử, không bỏ sót và không vượt biên.",
        line: 10,
        mark: [10],
        watch: [{ name: "sum", value: "24", type: "int" }],
        output: "24",
        tone: "final",
        visual: S.arr([4, 8, 2, 9, 1], [], [0, 1, 2, 3, 4], { label: "a", caption: "Đã cộng toàn bộ mảng: 4+8+2+9+1 = 24." }),
        changes: ["stdout nhận 24."]
      }
    ]
  };

  L.strings = {
    id: "strings",
    track: "cpp",
    module: "cpp-data",
    title: "Chuỗi với std::string",
    shortTitle: "Chuỗi",
    subtitle: "Chuỗi là dãy ký tự, có độ dài, chỉ số và phép nối.",
    blurb: "Xem std::string lưu các ký tự, trả về length, truy cập theo chỉ số và nối thêm bằng +=.",
    level: "Cơ bản",
    duration: "14 phút",
    tags: ["string", "length", "chỉ số", "nối chuỗi"],
    learn: [
      "Khai báo string và khởi tạo bằng chuỗi",
      "length() trả số ký tự",
      "Chỉ số chuỗi cũng bắt đầu từ 0",
      "Phép += nối thêm nội dung"
    ],
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
  string name = "CppLab";
  cout << name.length() << endl;
  cout << name[0] << endl;
  name += "!";
  cout << name;
  return 0;
}`,
    file: "strings.cpp",
    life: {
      icon: "bulb",
      title: "Đoàn tàu ký tự",
      text: "string giống đoàn tàu gồm các toa là ký tự. length là số toa, [0] là toa đầu, còn += là nối thêm toa mới vào cuối."
    },
    steps: [
      {
        short: "Tạo chuỗi",
        type: "KHỞI TẠO",
        title: "Sáu ký tự liên tiếp",
        body: "<code>string name = \"CppLab\";</code> tạo chuỗi gồm C, p, p, L, a, b. std::string tự quản lý bộ nhớ và độ dài.",
        line: 6,
        mark: [6],
        watch: [{ name: "name", value: "\"CppLab\"", type: "string" }],
        output: "",
        visual: S.arr(["C", "p", "p", "L", "a", "b"], [], [], { label: "name", caption: "Chuỗi 6 ký tự, chỉ số 0..5." }),
        changes: ["Cấp phát vùng nhớ cho chuỗi.", "Sao chép 6 ký tự vào."]
      },
      {
        short: "Độ dài",
        type: "TRUY VẤN",
        title: "length() = 6",
        body: "<code>name.length()</code> trả 6, không tính ký tự kết thúc chuỗi. cout in 6 rồi endl xuống dòng.",
        line: 7,
        mark: [7],
        watch: [{ name: "name.length()", value: "6", type: "size_t", changed: true }],
        output: "6",
        visual: S.vars([
          { name: "name", type: "string", value: "\"CppLab\"" },
          { name: "length", type: "size_t", value: "6", changed: true }
        ]),
        changes: ["stdout nhận 6."]
      },
      {
        short: "Ký tự đầu",
        type: "TRUY CẬP",
        title: "name[0] là 'C'",
        body: "Chỉ số 0 trả ký tự đầu tiên. Muốn lấy 'L' ở vị trí thứ tư, dùng <code>name[3]</code>.",
        line: 8,
        mark: [8],
        watch: [{ name: "name[0]", value: "'C'", type: "char", changed: true }],
        output: "6\nC",
        visual: S.arr(["C", "p", "p", "L", "a", "b"], [0], [], { label: "name", pointers: [{ label: "0", index: 0 }] }),
        note: "Truy cập name[6] là ngoài biên. Kiểm tra chỉ số trước khi đọc.",
        changes: ["Đọc ký tự C.", "stdout nhận C."]
      },
      {
        short: "Nối chuỗi",
        type: "BIẾN ĐỔI",
        title: "name += \"!\"",
        body: "Phép <code>+=</code> nối thêm dấu chấm than, chuỗi dài thành 7 ký tự. Vùng nhớ có thể được cấp phát lại nếu cần.",
        line: 9,
        mark: [9],
        watch: [{ name: "name", value: "\"CppLab!\"", type: "string", changed: true }],
        output: "6\nC",
        visual: S.arr(["C", "p", "p", "L", "a", "b", "!"], [6], [0, 1, 2, 3, 4, 5], { label: "name", caption: "Ký tự mới được thêm vào cuối." }),
        changes: ["name dài 7 ký tự.", "Ký tự cuối là !."]
      },
      {
        short: "In chuỗi",
        type: "KẾT THÚC",
        title: "CppLab!",
        body: "cout in toàn bộ chuỗi, không cần vòng lặp. std::string biết cách ghi các ký tự của nó ra luồng.",
        line: 10,
        mark: [10],
        watch: [{ name: "name", value: "\"CppLab!\"", type: "string" }],
        output: "6\nC\nCppLab!",
        tone: "final",
        visual: S.arr(["C", "p", "p", "L", "a", "b", "!"], [], [0, 1, 2, 3, 4, 5, 6], { label: "name", caption: "Toàn bộ chuỗi được in." }),
        changes: ["stdout nhận CppLab!."]
      }
    ]
  };
})();
