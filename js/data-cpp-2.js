/* CppLab — Nhập môn C/C++ · phần 2 (bài 11–20) */
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

  L.pointers = {
    id: "pointers",
    track: "cpp",
    module: "cpp-data",
    title: "Con trỏ",
    shortTitle: "Con trỏ",
    subtitle: "Một biến không giữ dữ liệu, mà giữ địa chỉ của dữ liệu.",
    blurb: "Tạo con trỏ tới biến int, đọc địa chỉ, dereference và sửa giá trị gốc qua con trỏ.",
    level: "Trung cấp",
    duration: "18 phút",
    tags: ["pointer", "địa chỉ", "dereference", "&", "*"],
    learn: [
      "Con trỏ lưu địa chỉ của một biến",
      "& lấy địa chỉ, * truy cập giá trị tại địa chỉ",
      "Sửa *p là sửa biến gốc",
      "Con trỏ chưa trỏ tới đâu là con trỏ rác"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int a = 42;
  int* p = &a;
  cout << p << endl;
  cout << *p << endl;
  *p = 50;
  cout << a;
  return 0;
}`,
    file: "pointers.cpp",
    life: {
      icon: "bulb",
      title: "Địa chỉ nhà",
      text: "Biến a là một ngôi nhà chứa 42. Con trỏ p là tờ giấy ghi địa chỉ ngôi nhà. Dereference *p nghĩa là đi tới địa chỉ đó và mở cửa."
    },
    steps: [
      {
        short: "Biến gốc",
        type: "KHỞI TẠO",
        title: "a = 42 nằm ở một địa chỉ",
        body: "Mỗi biến có một vị trí trong bộ nhớ. Ví dụ minh họa a nằm tại <code>0x7ffd01</code>; địa chỉ thật do hệ điều hành quyết định.",
        line: 5,
        mark: [5],
        watch: [{ name: "a", value: "42", type: "int" }],
        output: "",
        visual: S.mem([{ name: "a", value: "42", addr: "0x7ffd01", active: true }], [], [], ),
        changes: ["Cấp phát ô nhớ cho a.", "Ghi 42 vào ô nhớ."]
      },
      {
        short: "Lấy địa chỉ",
        type: "CON TRỎ",
        title: "p giữ địa chỉ của a",
        body: "<code>&amp;a</code> lấy địa chỉ của a. Con trỏ <code>int* p</code> lưu địa chỉ đó, nên p trỏ tới a.",
        line: 6,
        mark: [6],
        watch: [{ name: "a", value: "42", type: "int" }, { name: "p", value: "0x7ffd01", type: "int*", changed: true }],
        output: "",
        visual: S.mem([
          { name: "a", value: "42", addr: "0x7ffd01", active: true },
          { name: "p", value: "0x7ffd01", addr: "0x7ffd09" }
        ], [], [{ name: "p", target: "a (0x7ffd01)" }]),
        note: "p có kiểu int* vì nó trỏ tới int. Kiểu con trỏ quyết định cách đọc vùng nhớ.",
        changes: ["p nhận địa chỉ của a.", "p trỏ tới a."]
      },
      {
        short: "Đọc địa chỉ",
        type: "XUẤT DỮ LIỆU",
        title: "In p ra địa chỉ",
        body: "cout in giá trị của p, tức địa chỉ, không phải 42. Địa chỉ có thể khác nhau mỗi lần chạy.",
        line: 7,
        mark: [7],
        watch: [{ name: "p", value: "0x7ffd01", type: "int*" }],
        output: "0x7ffd01",
        visual: S.vars([
          { name: "a", type: "int", value: "42", addr: "0x7ffd01" },
          { name: "p", type: "int*", value: "0x7ffd01", addr: "0x7ffd09", changed: true }
        ]),
        changes: ["stdout nhận địa chỉ của a."]
      },
      {
        short: "Dereference",
        type: "TRUY CẬP",
        title: "*p mở ô nhớ tại địa chỉ",
        body: "<code>*p</code> đi theo địa chỉ trong p và đọc int tại đó, nên nhận 42. Dấu * ở đây là toán tử dereference, không phải khai báo kiểu.",
        line: 8,
        mark: [8],
        watch: [{ name: "*p", value: "42", type: "int", changed: true }],
        output: "0x7ffd01\n42",
        visual: S.mem([
          { name: "a", value: "42", addr: "0x7ffd01", active: true },
          { name: "p", value: "0x7ffd01", addr: "0x7ffd09" }
        ], [], [{ name: "*p", target: "42" }]),
        changes: ["Đọc 42 qua p.", "stdout nhận 42."]
      },
      {
        short: "Ghi qua con trỏ",
        type: "BIẾN ĐỔI",
        title: "*p = 50 đổi luôn a",
        body: "Gán <code>*p = 50</code> ghi 50 vào ô nhớ mà p trỏ tới — chính là a. Không có bản sao nào ở đây.",
        line: 9,
        mark: [9],
        watch: [{ name: "a", value: "50", type: "int", changed: true }, { name: "*p", value: "50", type: "int" }],
        output: "0x7ffd01\n42",
        visual: S.mem([
          { name: "a", value: "50", addr: "0x7ffd01", active: true },
          { name: "p", value: "0x7ffd01", addr: "0x7ffd09" }
        ], [], [{ name: "*p", target: "50" }]),
        note: "Vì p trỏ tới a, thay đổi qua *p chính là thay đổi a.",
        changes: ["Ghi 50 vào địa chỉ của a.", "a trở thành 50."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "cout a in 50",
        body: "a đã bị sửa từ 42 thành 50. Con trỏ không copy dữ liệu; nó chia sẻ cùng một ô nhớ.",
        line: 10,
        mark: [10],
        watch: [{ name: "a", value: "50", type: "int" }],
        output: "0x7ffd01\n42\n50",
        tone: "final",
        visual: S.mem([
          { name: "a", value: "50", addr: "0x7ffd01", active: true },
          { name: "p", value: "0x7ffd01", addr: "0x7ffd09" }
        ], [], [{ name: "p", target: "a" }]),
        changes: ["stdout nhận 50."]
      }
    ]
  };

  L.references = {
    id: "references",
    track: "cpp",
    module: "cpp-data",
    title: "Tham chiếu",
    shortTitle: "Tham chiếu",
    subtitle: "Một tên khác của cùng một biến, không phải bản sao.",
    blurb: "Khai báo int& r = a, sửa r và thấy a đổi theo — con đường an toàn hơn con trỏ để làm việc với biến gốc.",
    level: "Trung cấp",
    duration: "14 phút",
    tags: ["reference", "alias", "&", "pass by reference"],
    learn: [
      "Tham chiếu là bí danh của biến đã tồn tại",
      "Tham chiếu phải được khởi tạo ngay",
      "Sửa tham chiếu là sửa biến gốc",
      "Tham chiếu thường dùng để truyền tham số"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int a = 5;
  int& r = a;
  r = 9;
  cout << a << " " << r;
  return 0;
}`,
    file: "references.cpp",
    life: {
      icon: "bulb",
      title: "Biệt danh",
      text: "a là tên khai sinh, r là biệt danh của cùng một người. Gọi bằng tên nào cũng là gọi cùng một người; đổi biệt danh không tạo ra người thứ hai."
    },
    steps: [
      {
        short: "Biến gốc",
        type: "KHỞI TẠO",
        title: "a = 5",
        body: "a là một biến int bình thường. Nó có địa chỉ và giá trị 5.",
        line: 5,
        mark: [5],
        watch: [{ name: "a", value: "5", type: "int" }],
        output: "",
        visual: S.vars([{ name: "a", type: "int", value: "5", addr: "0x7ffd01" }])
      },
      {
        short: "Tạo bí danh",
        type: "THAM CHIẾU",
        title: "r là tên khác của a",
        body: "<code>int&amp; r = a;</code> không cấp phát biến mới. r trỏ tới cùng ô nhớ với a; mọi phép đọc ghi qua r đều tác động lên a.",
        line: 6,
        mark: [6],
        watch: [{ name: "a", value: "5", type: "int" }, { name: "r", value: "5 (alias)", type: "int&", changed: true }],
        output: "",
        visual: S.mem([
          { name: "a", value: "5", addr: "0x7ffd01", active: true },
          { name: "r", value: "↔ a", addr: "0x7ffd01" }
        ], [], [{ name: "r", target: "cùng ô với a" }]),
        note: "Tham chiếu không thể để trống rồi gán sau như con trỏ; phải gắn với một biến ngay khi khai báo.",
        changes: ["r trở thành bí danh của a.", "Không có ô nhớ mới cho r."]
      },
      {
        short: "Ghi qua r",
        type: "BIẾN ĐỔI",
        title: "r = 9 kéo theo a",
        body: "Gán 9 cho r thực chất là gán 9 cho a. Cả hai tên cùng nhìn thấy một giá trị.",
        line: 7,
        mark: [7],
        watch: [{ name: "a", value: "9", type: "int", changed: true }, { name: "r", value: "9", type: "int&" }],
        output: "",
        visual: S.mem([
          { name: "a", value: "9", addr: "0x7ffd01", active: true },
          { name: "r", value: "↔ a", addr: "0x7ffd01" }
        ], [], [{ name: "r", target: "a = 9" }]),
        changes: ["a đổi thành 9.", "r đọc ra 9."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Hai tên, một giá trị",
        body: "Chương trình in <code>9 9</code>. Đây là nền tảng của truyền tham số bằng tham chiếu: hàm có thể sửa biến của nơi gọi.",
        line: 8,
        mark: [8],
        watch: [{ name: "a", value: "9", type: "int" }, { name: "r", value: "9", type: "int&" }],
        output: "9 9",
        tone: "final",
        visual: S.vars([
          { name: "a", type: "int", value: "9", note: "tên gốc" },
          { name: "r", type: "int&", value: "9", note: "bí danh của a" }
        ]),
        changes: ["stdout nhận 9 9."]
      }
    ]
  };

  L.memory = {
    id: "memory",
    track: "cpp",
    module: "cpp-data",
    title: "Cấp phát động và bộ nhớ",
    shortTitle: "new & delete",
    subtitle: "Xin ô nhớ từ heap, dùng xong phải trả lại.",
    blurb: "Theo dõi new int, ghi qua con trỏ, delete và đặt nullptr để tránh con trỏ treo.",
    level: "Trung cấp",
    duration: "18 phút",
    tags: ["new", "delete", "heap", "nullptr", "rò rỉ bộ nhớ"],
    learn: [
      "new cấp phát ô nhớ trên heap",
      "delete trả ô nhớ về hệ thống",
      "Sau delete, con trỏ không còn hợp lệ",
      "Đặt nullptr để đánh dấu không trỏ tới đâu"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int* p = new int(7);
  cout << *p;
  *p = 9;
  delete p;
  p = nullptr;
  return 0;
}`,
    file: "memory.cpp",
    life: {
      icon: "bulb",
      title: "Thuê kho",
      text: "new là ký hợp đồng thuê kho, delete là trả kho. Nếu không trả, kho bị chiếm mãi (rò rỉ). Nếu vẫn dùng chìa khóa sau khi trả kho, bạn đang mở một căn không còn thuộc về mình."
    },
    steps: [
      {
        short: "Cấp phát",
        type: "CẤP PHÁT",
        title: "new int(7) tạo ô trên heap",
        body: "<code>new int(7)</code> xin một ô int trên heap, khởi tạo 7 và trả địa chỉ. Con trỏ p giữ địa chỉ đó.",
        line: 5,
        mark: [5],
        watch: [{ name: "p", value: "0x55a0", type: "int*" }, { name: "*p", value: "7", type: "int" }],
        output: "",
        visual: S.mem(
          [{ name: "p", value: "0x55a0", addr: "0x7ffd01", active: true }],
          [{ name: "int", value: "7", addr: "0x55a0", active: true }],
          [{ name: "p", target: "heap 0x55a0" }]
        ),
        note: "Heap là vùng nhớ dùng cho dữ liệu sống lâu hơn phạm vi hàm. new có thể thất bại nếu hết bộ nhớ.",
        changes: ["Heap cấp một ô int.", "Ô nhớ nhận giá trị 7.", "p trỏ tới ô đó."]
      },
      {
        short: "Đọc trên heap",
        type: "TRUY CẬP",
        title: "*p = 7",
        body: "Dereference p đọc ô nhớ trên heap. Con trỏ nằm trên stack, nhưng dữ liệu nó trỏ tới nằm trên heap.",
        line: 6,
        mark: [6],
        watch: [{ name: "*p", value: "7", type: "int" }],
        output: "7",
        visual: S.mem(
          [{ name: "p", value: "0x55a0", addr: "0x7ffd01" }],
          [{ name: "int", value: "7", addr: "0x55a0", active: true }],
          [{ name: "*p", target: "7" }]
        ),
        changes: ["stdout nhận 7."]
      },
      {
        short: "Ghi trên heap",
        type: "BIẾN ĐỔI",
        title: "Đổi 7 thành 9",
        body: "Gán <code>*p = 9</code> sửa nội dung ô nhớ trên heap. Địa chỉ trong p không đổi, chỉ dữ liệu tại đó đổi.",
        line: 7,
        mark: [7],
        watch: [{ name: "*p", value: "9", type: "int", changed: true }],
        output: "7",
        visual: S.mem(
          [{ name: "p", value: "0x55a0", addr: "0x7ffd01" }],
          [{ name: "int", value: "9", addr: "0x55a0", active: true }],
          [{ name: "*p", target: "9" }]
        ),
        changes: ["Ô heap nhận 9."]
      },
      {
        short: "Trả bộ nhớ",
        type: "GIẢI PHÓNG",
        title: "delete p trả ô nhớ",
        body: "<code>delete p;</code> báo hệ thống rằng ô nhớ không còn dùng. Sau đó p vẫn giữ địa chỉ cũ nhưng không được dereference nữa — đó là con trỏ treo.",
        line: 8,
        mark: [8],
        watch: [{ name: "p", value: "0x55a0 (treo)", type: "int*", changed: true }, { name: "heap", value: "đã trả", type: "vùng nhớ" }],
        output: "7",
        visual: S.mem(
          [{ name: "p", value: "0x55a0", addr: "0x7ffd01" }],
          [],
          [{ name: "p", target: "địa chỉ không còn hợp lệ" }]
        ),
        note: "Không delete hai lần cùng một con trỏ; đó là double free, hành vi không xác định.",
        changes: ["Heap thu hồi ô nhớ.", "p trở thành con trỏ treo."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "Gán nullptr",
        body: "<code>p = nullptr;</code> xóa địa chỉ cũ, đánh dấu p không trỏ tới đâu. Kiểm tra <code>if (p)</code> trước khi dùng là thói quen tốt.",
        line: 9,
        mark: [9],
        watch: [{ name: "p", value: "nullptr", type: "int*", changed: true }],
        output: "7",
        tone: "final",
        visual: S.mem(
          [{ name: "p", value: "nullptr", addr: "0x7ffd01", active: true }],
          [],
          []
        ),
        changes: ["p = nullptr.", "Không còn con trỏ treo."]
      }
    ]
  };

  L.structs = {
    id: "structs",
    track: "cpp",
    module: "cpp-struct",
    title: "struct — gom dữ liệu có liên quan",
    shortTitle: "struct",
    subtitle: "Một kiểu dữ liệu do bạn tự định nghĩa, gồm nhiều trường.",
    blurb: "Tạo struct Student, khởi tạo, đọc và sửa từng trường để thấy dữ liệu được nhóm có ý nghĩa.",
    level: "Cơ bản",
    duration: "16 phút",
    tags: ["struct", "field", "object", "dữ liệu"],
    learn: [
      "Định nghĩa struct với nhiều trường",
      "Khởi tạo giá trị cho struct",
      "Truy cập trường bằng dấu chấm",
      "Cập nhật một trường không ảnh hưởng trường khác"
    ],
    code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
  string name;
  double gpa;
};

int main() {
  Student s = {"An", 3.6};
  cout << s.name << endl;
  s.gpa = 3.8;
  cout << s.gpa;
  return 0;
}`,
    file: "structs.cpp",
    life: {
      icon: "bulb",
      title: "Thẻ sinh viên",
      text: "Một thẻ sinh viên gom tên, mã số, ngành, điểm trong cùng một vật. struct cũng vậy: gom các trường liên quan thành một đơn vị."
    },
    steps: [
      {
        short: "Định nghĩa kiểu",
        type: "ĐỊNH NGHĨA",
        title: "Student có name và gpa",
        body: "struct định nghĩa một kiểu mới gồm hai trường: <code>name</code> kiểu string và <code>gpa</code> kiểu double. Bản thân định nghĩa chưa tạo biến.",
        line: 5,
        mark: [5, 6, 7],
        watch: [{ name: "Student", value: "kiểu mới", type: "struct" }],
        output: "",
        visual: S.table(["Trường", "Kiểu", "Ý nghĩa"], [
          ["name", "string", "họ tên"],
          ["gpa", "double", "điểm trung bình"]
        ], 0),
        note: "Đừng quên dấu chấm phẩy sau dấu đóng ngoặc của struct.",
        changes: ["Định nghĩa kiểu Student.", "Chưa cấp phát biến nào."]
      },
      {
        short: "Tạo đối tượng",
        type: "KHỞI TẠO",
        title: "s = {\"An\", 3.6}",
        body: "Biến <code>s</code> có kiểu Student, chứa cả name và gpa trong một khối. Các giá trị được gán lần lượt theo thứ tự trường.",
        line: 11,
        mark: [11],
        watch: [{ name: "s.name", value: "\"An\"", type: "string" }, { name: "s.gpa", value: "3.6", type: "double" }],
        output: "",
        visual: S.vars([
          { name: "s.name", type: "string", value: "\"An\"" },
          { name: "s.gpa", type: "double", value: "3.6" }
        ]),
        changes: ["Tạo đối tượng Student.", "name = An, gpa = 3.6."]
      },
      {
        short: "Đọc trường",
        type: "TRUY CẬP",
        title: "s.name in ra An",
        body: "Dấu chấm truy cập đúng trường bên trong struct. <code>s.name</code> là string; <code>s.gpa</code> là double.",
        line: 12,
        mark: [12],
        watch: [{ name: "s.name", value: "An", type: "string" }],
        output: "An",
        visual: S.table(["Đối tượng", "name", "gpa"], [["s", "An", "3.6"]], 0),
        changes: ["stdout nhận An."]
      },
      {
        short: "Sửa trường",
        type: "BIẾN ĐỔI",
        title: "gpa đổi thành 3.8",
        body: "Gán <code>s.gpa = 3.8</code> chỉ sửa trường gpa. name vẫn là An. Mỗi trường là một ô dữ liệu riêng trong struct.",
        line: 13,
        mark: [13],
        watch: [{ name: "s.name", value: "An", type: "string" }, { name: "s.gpa", value: "3.8", type: "double", changed: true }],
        output: "An",
        visual: S.vars([
          { name: "s.name", type: "string", value: "\"An\"" },
          { name: "s.gpa", type: "double", value: "3.8", changed: true }
        ]),
        changes: ["gpa cập nhật 3.8.", "name không đổi."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In gpa mới",
        body: "Chương trình in 3.8. Struct giúp truyền cả một bản ghi qua hàm, mảng hoặc tệp một cách gọn gàng.",
        line: 14,
        mark: [14],
        watch: [{ name: "s.gpa", value: "3.8", type: "double" }],
        output: "An\n3.8",
        tone: "final",
        visual: S.table(["name", "gpa"], [["An", "3.8"]], 0, "Bản ghi Student sau khi cập nhật."),
        changes: ["stdout nhận 3.8."]
      }
    ]
  };

  L.files = {
    id: "files",
    track: "cpp",
    module: "cpp-struct",
    title: "Đọc và ghi tệp",
    shortTitle: "Tệp",
    subtitle: "Lưu dữ liệu ra ngoài chương trình và đọc lại ở lần chạy sau.",
    blurb: "Dùng ofstream ghi một dòng, đóng tệp, rồi ifstream đọc lại — kèm kiểm tra mở tệp thành công.",
    level: "Trung cấp",
    duration: "17 phút",
    tags: ["fstream", "ofstream", "ifstream", "tệp"],
    learn: [
      "Mở tệp để ghi bằng ofstream",
      "Đóng tệp sau khi ghi",
      "Mở tệp để đọc bằng ifstream",
      "Kiểm tra is_open trước khi dùng tệp"
    ],
    code: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
  ofstream out("data.txt");
  out << "An 3.6" << endl;
  out.close();

  ifstream in("data.txt");
  string name;
  double gpa;
  in >> name >> gpa;
  cout << name << " " << gpa;
  return 0;
}`,
    file: "files.cpp",
    life: {
      icon: "bulb",
      title: "Sổ ghi chép",
      text: "Ghi tệp giống viết vào sổ: mở sổ, viết, đóng sổ. Đọc tệp là mở lại sổ và đọc dòng đã ghi. Nếu không đóng, người khác có thể không thấy nội dung mới."
    },
    steps: [
      {
        short: "Mở để ghi",
        type: "MỞ TỆP",
        title: "ofstream tạo data.txt",
        body: "<code>ofstream out(\"data.txt\");</code> mở tệp để ghi, tạo mới nếu chưa có. Nên kiểm tra <code>out.is_open()</code> trước khi ghi.",
        line: 7,
        mark: [7],
        watch: [{ name: "out", value: "data.txt", type: "ofstream" }],
        output: "",
        visual: S.flow([
          { label: "Mở tệp", sub: "ofstream" },
          { label: "Ghi", sub: "An 3.6" },
          { label: "Đóng", sub: "close" },
          { label: "Đọc lại", sub: "ifstream" }
        ], [0]),
        changes: ["Tạo/mở data.txt để ghi.", "Con trỏ ghi ở đầu tệp."]
      },
      {
        short: "Ghi dữ liệu",
        type: "GHI TỆP",
        title: "Ghi một dòng",
        body: "<code>out &lt;&lt; \"An 3.6\" &lt;&lt; endl;</code> ghi chuỗi và xuống dòng vào tệp. Dấu cách phân tách name và gpa khi đọc lại.",
        line: 8,
        mark: [8],
        watch: [{ name: "out", value: "đã ghi 1 dòng", type: "ofstream" }, { name: "tệp", value: "An 3.6", type: "text" }],
        output: "",
        visual: S.table(["Dòng", "Nội dung"], [["1", "An 3.6"]], 0),
        changes: ["data.txt chứa An 3.6."]
      },
      {
        short: "Đóng tệp",
        type: "ĐÓNG TỆP",
        title: "close() đẩy dữ liệu ra đĩa",
        body: "<code>out.close()</code> kết thúc phiên ghi và đảm bảo bộ đệm được đẩy ra. Mở lại để đọc ngay sau đó sẽ thấy dữ liệu.",
        line: 9,
        mark: [9],
        watch: [{ name: "out", value: "đã đóng", type: "ofstream" }],
        output: "",
        visual: S.flow([
          { label: "Mở tệp", sub: "xong" },
          { label: "Ghi", sub: "xong" },
          { label: "Đóng", sub: "đang đóng" },
          { label: "Đọc lại", sub: "chờ" }
        ], [2], [0, 1]),
        changes: ["Bộ đệm ghi được flush.", "Tệp sẵn sàng để đọc."]
      },
      {
        short: "Mở để đọc",
        type: "MỞ TỆP",
        title: "ifstream đọc data.txt",
        body: "<code>ifstream in(\"data.txt\");</code> mở tệp để đọc. Nếu tệp không tồn tại hoặc không có quyền, in sẽ không mở được và các lần đọc thất bại.",
        line: 11,
        mark: [11],
        watch: [{ name: "in", value: "data.txt", type: "ifstream" }],
        output: "",
        visual: S.flow([
          { label: "Mở tệp", sub: "xong" },
          { label: "Ghi", sub: "xong" },
          { label: "Đóng", sub: "xong" },
          { label: "Đọc lại", sub: "đang mở" }
        ], [3], [0, 1, 2]),
        changes: ["data.txt được mở để đọc."]
      },
      {
        short: "Đọc dữ liệu",
        type: "ĐỌC TỆP",
        title: "in >> name >> gpa",
        body: "Toán tử nhập trên ifstream đọc lần lượt name = An và gpa = 3.6. Nó bỏ qua khoảng trắng giữa hai giá trị.",
        line: 14,
        mark: [14],
        watch: [{ name: "name", value: "An", type: "string" }, { name: "gpa", value: "3.6", type: "double" }],
        output: "",
        visual: S.vars([
          { name: "name", type: "string", value: "\"An\"", changed: true },
          { name: "gpa", type: "double", value: "3.6", changed: true }
        ]),
        changes: ["name nhận An.", "gpa nhận 3.6."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In lại dữ liệu",
        body: "cout in <code>An 3.6</code>. Dữ liệu đã đi một vòng: bộ nhớ → tệp → bộ nhớ. Đây là nền tảng để lưu dữ liệu giữa các lần chạy.",
        line: 15,
        mark: [15],
        watch: [{ name: "name", value: "An", type: "string" }, { name: "gpa", value: "3.6", type: "double" }],
        output: "An 3.6",
        tone: "final",
        visual: S.table(["name", "gpa"], [["An", "3.6"]], 0),
        changes: ["stdout nhận An 3.6."]
      }
    ]
  };
})();

/* CppLab — Nhập môn C/C++ · bài 16–20 */
(function () {
  "use strict";
  const L = window.CPPLAB.lessons;
  const S = {
    flow(steps, active, done) { return { kind: "flow", steps, active: active || [], done: done || [] }; },
    vars(items) { return { kind: "vars", items }; },
    arr(values, active, extra) { return Object.assign({ kind: "array", values, active: active || [] }, extra || {}); },
    mem(stack, heap, pointers) { return { kind: "memory", stack, heap: heap || [], pointers: pointers || [] }; },
    rec(frames, caption) { return { kind: "recursion", frames, caption }; },
    table(headers, rows, activeRow, caption) { return { kind: "table", headers, rows, activeRow, caption }; }
  };

  L.recursion = {
    id: "recursion",
    track: "cpp",
    module: "cpp-struct",
    title: "Đệ quy",
    shortTitle: "Đệ quy",
    subtitle: "Hàm gọi lại chính nó, với bài toán nhỏ hơn mỗi lần.",
    blurb: "Theo dõi factorial(4) đi xuống tới trường hợp cơ sở rồi quay lên, nhân dần để ra 24.",
    level: "Trung cấp",
    duration: "16 phút",
    tags: ["đệ quy", "base case", "call stack", "factorial"],
    learn: [
      "Đệ quy cần một trường hợp cơ sở",
      "Mỗi lời gọi thu nhỏ bài toán",
      "Call stack giữ các lời gọi đang chờ",
      "Kết quả được trả ngược từ dưới lên"
    ],
    code: `#include <iostream>
using namespace std;

int factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

int main() {
  cout << factorial(4);
  return 0;
}`,
    file: "recursion.cpp",
    life: {
      icon: "bulb",
      title: "Búp bê Nga",
      text: "Muốn mở búp bê lớn nhất, bạn mở nó ra và gặp búp bê nhỏ hơn, lặp lại tới búp bê nhỏ nhất. Sau đó xếp ngược trở lại — đó là đi xuống rồi quay lên của đệ quy."
    },
    steps: [
      {
        short: "Gọi đầu tiên",
        type: "LỜI GỌI",
        title: "factorial(4)",
        body: "main gọi factorial(4). n = 4, chưa phải trường hợp cơ sở nên cần tính <code>4 * factorial(3)</code>.",
        line: 10,
        mark: [10],
        watch: [{ name: "n", value: "4", type: "int" }],
        output: "",
        visual: S.rec([{ fn: "factorial(4)", note: "n = 4 · chờ 4 × ?", active: true }], "Call stack mới có một khung."),
        changes: ["Push khung factorial(4).", "Cần kết quả factorial(3)."]
      },
      {
        short: "Đi xuống",
        type: "ĐỆ QUY",
        title: "factorial(3) được gọi",
        body: "Dòng 6 gọi factorial(3). Khung cũ vẫn nằm trong call stack, chờ kết quả của khung mới.",
        line: 6,
        mark: [6],
        watch: [{ name: "n", value: "3", type: "int" }],
        output: "",
        visual: S.rec([
          { fn: "factorial(4)", note: "chờ 4 × ?" },
          { fn: "factorial(3)", note: "n = 3 · chờ 3 × ?", active: true }
        ], "Đi xuống: khung 3 nằm trên khung 4."),
        changes: ["Push factorial(3).", "factorial(4) tạm dừng."]
      },
      {
        short: "Đi xuống nữa",
        type: "ĐỆ QUY",
        title: "factorial(2) và factorial(1)",
        body: "Tiếp tục gọi factorial(2), rồi factorial(1). Khi n = 1, điều kiện <code>n &lt;= 1</code> đúng.",
        line: 6,
        mark: [6],
        watch: [{ name: "n", value: "1", type: "int" }],
        output: "",
        visual: S.rec([
          { fn: "factorial(4)", note: "chờ 4 × ?" },
          { fn: "factorial(3)", note: "chờ 3 × ?" },
          { fn: "factorial(2)", note: "chờ 2 × ?" },
          { fn: "factorial(1)", note: "n = 1 · cơ sở", active: true }
        ], "Stack sâu dần cho tới khi gặp trường hợp cơ sở."),
        changes: ["Push factorial(2).", "Push factorial(1)."]
      },
      {
        short: "Trường hợp cơ sở",
        type: "DỪNG",
        title: "factorial(1) trả 1",
        body: "Khung factorial(1) trả 1 mà không gọi thêm. Đây là điểm dừng, nếu thiếu nó đệ quy sẽ chạy mãi.",
        line: 5,
        mark: [5],
        watch: [{ name: "return", value: "1", type: "int" }],
        output: "",
        visual: S.rec([
          { fn: "factorial(4)", note: "chờ 4 × ?" },
          { fn: "factorial(3)", note: "chờ 3 × ?" },
          { fn: "factorial(2)", note: "chờ 2 × ?" },
          { fn: "factorial(1)", note: "trả 1 ✓", active: true }
        ], "Khung trên cùng trả về và được pop."),
        changes: ["factorial(1) trả 1.", "Pop khung factorial(1)."]
      },
      {
        short: "Quay lên",
        type: "TRẢ VỀ",
        title: "2 × 1 = 2, rồi 3 × 2 = 6",
        body: "factorial(2) nhận 1 và trả 2. factorial(3) nhận 2 và trả 6. Các phép nhân được thực hiện theo thứ tự ngược với lúc gọi.",
        line: 6,
        mark: [6],
        watch: [{ name: "factorial(2)", value: "2", type: "int" }, { name: "factorial(3)", value: "6", type: "int" }],
        output: "",
        visual: S.rec([
          { fn: "factorial(4)", note: "chờ 4 × 6" },
          { fn: "factorial(3)", note: "trả 6 ✓" },
          { fn: "factorial(2)", note: "trả 2 ✓" }
        ], "Quay lên: từng khung hoàn tất và biến mất."),
        changes: ["factorial(2) = 2.", "factorial(3) = 6."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "4 × 6 = 24",
        body: "Khung factorial(4) nhận 6 và trả 24. main in 24. Toàn bộ call stack đã được giải phóng.",
        line: 10,
        mark: [10],
        watch: [{ name: "factorial(4)", value: "24", type: "int" }],
        output: "24",
        tone: "final",
        visual: S.rec([{ fn: "main", note: "nhận 24", active: true }], "Stack trở về main."),
        changes: ["factorial(4) = 24.", "stdout nhận 24."]
      }
    ]
  };

  L.debugging = {
    id: "debugging",
    track: "cpp",
    module: "cpp-struct",
    title: "Debug: đọc lỗi thay vì đoán",
    shortTitle: "Debug",
    subtitle: "Ba lỗi rất thường gặp: lệch biên, chia nguyên và không kiểm tra dữ liệu.",
    blurb: "Soi một đoạn tính điểm trung bình có hai lỗi tiềm ẩn, quan sát biên mảng và kiểu chia, rồi sửa đúng.",
    level: "Trung cấp",
    duration: "18 phút",
    tags: ["debug", "off-by-one", "integer division", "biên mảng"],
    learn: [
      "Điều kiện vòng lặp phải khớp kích thước mảng",
      "Chia hai số nguyên cho kết quả nguyên",
      "Dùng 3.0 hoặc ép kiểu để chia thực",
      "In giá trị trung gian để tìm lỗi"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int a[3] = {4, 6, 8};
  int sum = 0;
  for (int i = 0; i <= 3; i++) {
    sum += a[i];
  }
  double avg = sum / 3;
  cout << avg;
  return 0;
}`,
    file: "debugging.cpp",
    life: {
      icon: "bulb",
      title: "Kiểm tra hành lý",
      text: "Một vali chỉ có ba ngăn, đánh số 0, 1, 2. Đòi mở ngăn số 3 là mở vào khoảng không. Debug là đếm lại ngăn và kiểm tra đơn vị trước khi kết luận."
    },
    steps: [
      {
        short: "Dữ liệu",
        type: "KHỞI TẠO",
        title: "Mảng có 3 phần tử",
        body: "a có chỉ số hợp lệ 0, 1, 2. Phần tử thứ ba nằm ở a[2], không phải a[3].",
        line: 5,
        mark: [5],
        watch: [{ name: "a", value: "{4, 6, 8}", type: "int[3]" }],
        output: "",
        visual: S.arr([4, 6, 8], [], { pointers: [{ label: "a[0]", index: 0 }], caption: "Chỉ số hợp lệ: 0..2" }),
        changes: ["Cấp mảng 3 int.", "Gán 4, 6, 8."]
      },
      {
        short: "Cộng đúng",
        type: "LẶP",
        title: "i = 0, 1, 2 cộng đủ 18",
        body: "Ba lần lặp đầu cộng 4 + 6 + 8 = 18. Nếu dừng ở đây, chương trình đã đúng phần tính tổng.",
        line: 8,
        mark: [8],
        watch: [{ name: "i", value: "2", type: "int" }, { name: "sum", value: "18", type: "int" }],
        output: "",
        visual: S.arr([4, 6, 8], [0, 1, 2], { sorted: [], pointers: [{ label: "i", index: 2 }], caption: "Đã cộng cả ba phần tử" }),
        changes: ["sum = 18 sau i = 2."]
      },
      {
        short: "Lệch biên",
        type: "CẢNH BÁO",
        title: "i = 3 vượt khỏi mảng",
        body: "Điều kiện <code>i &lt;= 3</code> cho phép i = 3. Nhưng a[3] không tồn tại; đọc nó là hành vi không xác định, có thể ra rác hoặc crash.",
        line: 7,
        mark: [7],
        watch: [{ name: "i", value: "3", type: "int" }, { name: "a[3]", value: "không hợp lệ", type: "int" }],
        output: "",
        tone: "warn",
        visual: S.arr([4, 6, 8], [], { pointers: [{ label: "i (ngoài biên)", index: 3 }], caption: "Ô a[3] không thuộc mảng" }),
        note: "Sửa: dùng <code>i &lt; 3</code> hoặc tốt hơn là <code>i &lt; n</code> với n là kích thước mảng.",
        changes: ["Phát hiện lỗi off-by-one.", "Cần đổi điều kiện thành i < 3."]
      },
      {
        short: "Chia nguyên",
        type: "CẢNH BÁO",
        title: "sum / 3 là phép chia nguyên",
        body: "sum và 3 đều là int, nên 18 / 3 = 6 (int), sau đó mới gán vào double thành 6.0. Nếu tổng không chia hết, phần thập phân bị mất.",
        line: 10,
        mark: [10],
        watch: [{ name: "sum", value: "18", type: "int" }, { name: "avg", value: "6.0", type: "double" }],
        output: "",
        tone: "warn",
        visual: S.vars([
          { name: "sum", type: "int", value: "18" },
          { name: "3", type: "int", value: "3" },
          { name: "avg", type: "double", value: "6.0", changed: true }
        ]),
        note: "Sửa: <code>sum / 3.0</code> hoặc <code>double(sum) / 3</code> để phép chia diễn ra trên số thực.",
        changes: ["Phát hiện integer division.", "Kết quả bị cắt phần lẻ."]
      },
      {
        short: "Sau khi sửa",
        type: "KẾT THÚC",
        title: "Sửa biên và kiểu chia",
        body: "Với <code>i &lt; 3</code> và <code>sum / 3.0</code>, chương trình tính đúng 18 / 3.0 = 6.0 và in 6. Luôn kiểm tra biên và kiểu trước khi tin vào kết quả.",
        line: 11,
        mark: [11],
        watch: [{ name: "sum", value: "18", type: "int" }, { name: "avg", value: "6.0", type: "double" }],
        output: "6",
        tone: "final",
        visual: S.arr([4, 6, 8], [0, 1, 2], { pointers: [{ label: "i", index: 2 }], caption: "Chỉ duyệt 0..2 · chia bằng 3.0" }),
        changes: ["Điều kiện đúng: i < 3.", "Chia thực: / 3.0.", "stdout nhận 6."]
      }
    ]
  };

  L["sorting-basic"] = {
    id: "sorting-basic",
    track: "cpp",
    module: "cpp-apply",
    title: "Sắp xếp nổi bọt",
    shortTitle: "Bubble sort",
    subtitle: "So sánh từng cặp kề nhau và đổi chỗ — phần lớn nhất nổi dần về cuối.",
    blurb: "Chạy bubble sort trên 5 số, theo dõi từng cặp so sánh, các lần swap và vùng đã sắp xếp.",
    level: "Cơ bản",
    duration: "16 phút",
    tags: ["sắp xếp", "bubble sort", "swap", "O(n²)"],
    learn: [
      "So sánh hai phần tử kề nhau",
      "Đổi chỗ khi sai thứ tự",
      "Sau mỗi lượt, phần lớn nhất về cuối",
      "Số lượt giảm dần vì đuôi đã sorted"
    ],
    code: `#include <iostream>
#include <utility>
using namespace std;

void bubble(int a[], int n) {
  for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - 1 - i; j++)
      if (a[j] > a[j + 1])
        swap(a[j], a[j + 1]);
}

int main() {
  int a[5] = {5, 1, 4, 2, 8};
  bubble(a, 5);
  for (int x : a) cout << x << " ";
  return 0;
}`,
    file: "bubble-sort.cpp",
    life: {
      icon: "bulb",
      title: "Xếp hàng theo chiều cao",
      text: "Đi từ đầu hàng, ai cao hơn người bên phải thì đổi chỗ. Sau một lượt, người cao nhất chắc chắn đứng cuối. Lặp lại đến khi cả hàng có thứ tự."
    },
    steps: [
      {
        short: "Ban đầu",
        type: "KHỞI TẠO",
        title: "Mảng chưa có thứ tự",
        body: "a = {5, 1, 4, 2, 8}. Bubble sort bắt đầu từ cặp (0,1) và đi sang phải.",
        line: 13,
        mark: [13],
        watch: [{ name: "a", value: "{5, 1, 4, 2, 8}", type: "int[5]" }],
        output: "",
        visual: S.arr([5, 1, 4, 2, 8], [], { caption: "Chưa sắp xếp" }),
        changes: ["Nạp mảng 5 phần tử."]
      },
      {
        short: "Đổi 5 và 1",
        type: "SO SÁNH",
        title: "5 > 1 nên swap",
        body: "Cặp đầu tiên là 5 và 1. Vì 5 &gt; 1, hai phần tử đổi chỗ. Mảng thành {1, 5, 4, 2, 8}.",
        line: 8,
        mark: [8, 9],
        watch: [{ name: "a[0]", value: "5", type: "int" }, { name: "a[1]", value: "1", type: "int" }],
        output: "",
        visual: S.arr([1, 5, 4, 2, 8], [0, 1], { compare: [0, 1], caption: "Swap 5 ↔ 1" }),
        changes: ["So sánh a[0] > a[1].", "Đổi chỗ 5 và 1."]
      },
      {
        short: "Đổi 5 và 4",
        type: "SO SÁNH",
        title: "Tiếp tục đẩy 5 sang phải",
        body: "5 > 4 nên swap. Sau đó 5 > 2, tiếp tục swap. 5 đang nổi về cuối.",
        line: 8,
        mark: [8, 9],
        watch: [{ name: "a[1]", value: "5", type: "int" }, { name: "a[2]", value: "4", type: "int" }],
        output: "",
        visual: S.arr([1, 4, 2, 5, 8], [2, 3], { compare: [2, 3], caption: "5 tiếp tục được đẩy sang phải" }),
        changes: ["Swap 5 ↔ 4.", "Swap 5 ↔ 2.", "5 tới gần cuối."]
      },
      {
        short: "Hết lượt 1",
        type: "LƯỢT",
        title: "8 đã ở cuối",
        body: "Kết thúc lượt đầu, phần tử lớn nhất 8 nằm ở vị trí cuối. Lượt sau chỉ cần xét 4 phần tử đầu.",
        line: 7,
        mark: [7],
        watch: [{ name: "i", value: "0", type: "int" }, { name: "sorted", value: "[8]", type: "vùng" }],
        output: "",
        visual: S.arr([1, 4, 2, 5, 8], [], { sorted: [4], caption: "Đuôi đã sorted: 8" }),
        changes: ["Lượt 0 hoàn tất.", "8 cố định ở cuối."]
      },
      {
        short: "Các lượt sau",
        type: "LƯỢT",
        title: "Vùng sorted lớn dần",
        body: "Lượt 2 đưa 5 về đúng chỗ, lượt 3 đưa 4, lượt 4 đưa 2. Mảng dần thành {1, 2, 4, 5, 8}.",
        line: 7,
        mark: [7],
        watch: [{ name: "i", value: "3", type: "int" }, { name: "sorted", value: "[5, 8]", type: "vùng" }],
        output: "",
        visual: S.arr([1, 2, 4, 5, 8], [], { sorted: [2, 3, 4], caption: "Đuôi sorted: 4, 5, 8" }),
        changes: ["Các lượt sau hoàn tất.", "Vùng sorted mở rộng từ phải."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In mảng đã sắp xếp",
        body: "Vòng lặp cuối in từng phần tử: 1 2 4 5 8. Bubble sort dễ hiểu nhưng tốn O(n²) phép so sánh.",
        line: 15,
        mark: [15],
        watch: [{ name: "i", value: "hoàn tất", type: "int" }],
        output: "1 2 4 5 8 ",
        tone: "final",
        visual: S.arr([1, 2, 4, 5, 8], [], { sorted: [0, 1, 2, 3, 4], caption: "Đã sắp xếp tăng dần" }),
        changes: ["stdout nhận 1 2 4 5 8."]
      }
    ]
  };

  L.searching = {
    id: "searching",
    track: "cpp",
    module: "cpp-apply",
    title: "Tìm kiếm tuần tự",
    shortTitle: "Tìm kiếm",
    subtitle: "Đi từng phần tử cho tới khi gặp giá trị cần tìm.",
    blurb: "Tìm target = 9 trong mảng 6 phần tử, theo dõi từng lần so sánh và dừng ngay khi tìm thấy.",
    level: "Cơ bản",
    duration: "13 phút",
    tags: ["tìm kiếm", "linear search", "break", "chỉ số"],
    learn: [
      "Duyệt lần lượt từ đầu mảng",
      "So sánh từng phần tử với target",
      "Dừng sớm bằng break khi tìm thấy",
      "Không tìm thấy thì cần xử lý riêng"
    ],
    code: `#include <iostream>
using namespace std;

int main() {
  int a[6] = {3, 7, 1, 9, 4, 6};
  int target = 9;
  for (int i = 0; i < 6; i++) {
    if (a[i] == target) {
      cout << i;
      break;
    }
  }
  return 0;
}`,
    file: "linear-search.cpp",
    life: {
      icon: "bulb",
      title: "Tìm tên trong danh sách",
      text: "Bạn chạy ngón tay từ trên xuống danh sách giấy, so từng dòng với cái tên cần tìm. Gặp đúng thì dừng; hết danh sách mà không thấy thì kết luận không có."
    },
    steps: [
      {
        short: "Chuẩn bị",
        type: "KHỞI TẠO",
        title: "target = 9",
        body: "Mảng có 6 phần tử và target cần tìm là 9. Chưa biết 9 nằm ở đâu.",
        line: 6,
        mark: [6],
        watch: [{ name: "target", value: "9", type: "int" }, { name: "a", value: "{3,7,1,9,4,6}", type: "int[6]" }],
        output: "",
        visual: S.arr([3, 7, 1, 9, 4, 6], [], { pointers: [{ label: "target = 9", index: 3 }], caption: "Cần tìm 9" }),
        changes: ["Nạp mảng.", "target = 9."]
      },
      {
        short: "i = 0",
        type: "SO SÁNH",
        title: "3 ≠ 9",
        body: "So sánh a[0] = 3 với 9: không bằng. Tăng i lên 1.",
        line: 8,
        mark: [8],
        watch: [{ name: "i", value: "0", type: "int" }, { name: "a[i]", value: "3", type: "int" }],
        output: "",
        visual: S.arr([3, 7, 1, 9, 4, 6], [0], { pointers: [{ label: "i", index: 0 }], caption: "a[0] = 3" }),
        changes: ["So sánh 3 với 9.", "Không khớp, sang i = 1."]
      },
      {
        short: "i = 1, 2",
        type: "SO SÁNH",
        title: "7 và 1 đều không khớp",
        body: "a[1] = 7, a[2] = 1, đều khác 9. Vòng lặp tiếp tục sang phải.",
        line: 8,
        mark: [8],
        watch: [{ name: "i", value: "2", type: "int" }, { name: "a[i]", value: "1", type: "int" }],
        output: "",
        visual: S.arr([3, 7, 1, 9, 4, 6], [1, 2], { pointers: [{ label: "i", index: 2 }], caption: "Đã kiểm tra 3, 7, 1" }),
        changes: ["So sánh 7 với 9.", "So sánh 1 với 9.", "Sang i = 3."]
      },
      {
        short: "Tìm thấy",
        type: "KHỚP",
        title: "a[3] = 9",
        body: "Tại i = 3, a[3] bằng target. Đây là lần so sánh thứ tư và là vị trí cần trả về.",
        line: 8,
        mark: [8, 9],
        watch: [{ name: "i", value: "3", type: "int" }, { name: "a[i]", value: "9", type: "int", changed: true }],
        output: "",
        tone: "good",
        visual: S.arr([3, 7, 1, 9, 4, 6], [3], { sorted: [3], pointers: [{ label: "i", index: 3 }], caption: "Tìm thấy 9 tại chỉ số 3" }),
        changes: ["a[3] == target.", "Chuẩn bị in chỉ số."]
      },
      {
        short: "Dừng và in",
        type: "KẾT THÚC",
        title: "In 3 rồi break",
        body: "<code>cout &lt;&lt; i;</code> in 3. <code>break</code> thoát vòng lặp ngay, không cần kiểm tra các phần tử còn lại.",
        line: 10,
        mark: [10],
        watch: [{ name: "i", value: "3", type: "int" }],
        output: "3",
        tone: "final",
        visual: S.arr([3, 7, 1, 9, 4, 6], [3], { sorted: [3], pointers: [{ label: "i", index: 3 }], caption: "Dừng tại chỉ số 3" }),
        note: "Nếu mảng không chứa target, vòng lặp kết thúc mà không in gì. Trong chương trình thật nên in thông báo \"không tìm thấy\".",
        changes: ["stdout nhận 3.", "Thoát vòng lặp."]
      }
    ]
  };

  L["mini-project"] = {
    id: "mini-project",
    track: "cpp",
    module: "cpp-apply",
    title: "Dự án nhỏ: tính GPA trung bình",
    shortTitle: "Dự án GPA",
    subtitle: "Ghép struct, mảng và vòng lặp thành một chương trình có ích.",
    blurb: "Lưu danh sách sinh viên trong mảng struct, cộng điểm bằng vòng lặp và tính GPA trung bình của lớp.",
    level: "Tổng hợp",
    duration: "20 phút",
    tags: ["dự án", "struct", "mảng", "tính toán"],
    learn: [
      "Kết hợp struct với mảng",
      "Duyệt mảng đối tượng",
      "Cộng dồn và tính trung bình",
      "Tách dữ liệu khỏi cách tính"
    ],
    code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
  string name;
  double gpa;
};

int main() {
  Student list[3] = {{"An", 3.6}, {"Binh", 3.2}, {"Chi", 3.9}};
  double sum = 0;
  for (int i = 0; i < 3; i++)
    sum += list[i].gpa;
  cout << "GPA trung binh: " << sum / 3;
  return 0;
}`,
    file: "gpa-project.cpp",
    life: {
      icon: "bulb",
      title: "Bảng điểm của lớp",
      text: "Mỗi dòng là một sinh viên với tên và điểm. Muốn tính trung bình lớp, bạn cộng cột điểm rồi chia cho số dòng — chính là vòng lặp cộng dồn trong chương trình."
    },
    steps: [
      {
        short: "Dữ liệu lớp",
        type: "KHỞI TẠO",
        title: "Mảng 3 Student",
        body: "Mỗi phần tử của list là một Student gồm name và gpa. Ba bản ghi được khởi tạo ngay trong ngoặc nhọn.",
        line: 11,
        mark: [11],
        watch: [{ name: "list[0]", value: "An, 3.6", type: "Student" }, { name: "list[1]", value: "Binh, 3.2", type: "Student" }, { name: "list[2]", value: "Chi, 3.9", type: "Student" }],
        output: "",
        visual: S.table(["Chỉ số", "name", "gpa"], [
          ["0", "An", "3.6"],
          ["1", "Binh", "3.2"],
          ["2", "Chi", "3.9"]
        ], 0, "Danh sách 3 sinh viên"),
        changes: ["Tạo mảng list 3 phần tử.", "Gán tên và GPA."]
      },
      {
        short: "Bắt đầu cộng",
        type: "LẶP",
        title: "sum = 0 + 3.6",
        body: "Biến sum bắt đầu từ 0. Lần lặp i = 0 cộng GPA của An là 3.6.",
        line: 14,
        mark: [14],
        watch: [{ name: "i", value: "0", type: "int" }, { name: "sum", value: "3.6", type: "double", changed: true }],
        output: "",
        visual: S.table(["i", "name", "gpa", "sum"], [["0", "An", "3.6", "3.6"]], 0, "Đang xử lý An"),
        changes: ["sum = 3.6."]
      },
      {
        short: "Cộng tiếp",
        type: "LẶP",
        title: "Thêm 3.2 và 3.9",
        body: "i = 1 cộng 3.2 → 6.8. i = 2 cộng 3.9 → 10.7. Vòng lặp dừng khi i = 3.",
        line: 14,
        mark: [14],
        watch: [{ name: "i", value: "2", type: "int" }, { name: "sum", value: "10.7", type: "double" }],
        output: "",
        visual: S.table(["i", "name", "gpa", "sum"], [
          ["0", "An", "3.6", "3.6"],
          ["1", "Binh", "3.2", "6.8"],
          ["2", "Chi", "3.9", "10.7"]
        ], 2, "Cộng dồn hoàn tất"),
        changes: ["sum = 6.8 sau Binh.", "sum = 10.7 sau Chi."]
      },
      {
        short: "Tính trung bình",
        type: "TÍNH TOÁN",
        title: "10.7 / 3",
        body: "sum là double nên phép chia 10.7 / 3 cho kết quả thực, khoảng 3.56667. Không bị cắt thành 3.",
        line: 15,
        mark: [15],
        watch: [{ name: "sum", value: "10.7", type: "double" }, { name: "sum / 3", value: "3.56667", type: "double", changed: true }],
        output: "",
        visual: S.vars([
          { name: "sum", type: "double", value: "10.7" },
          { name: "count", type: "int", value: "3" },
          { name: "avg", type: "double", value: "3.56667", changed: true }
        ]),
        changes: ["Tính trung bình 3.56667."]
      },
      {
        short: "Kết thúc",
        type: "KẾT THÚC",
        title: "In kết quả",
        body: "Chương trình in <code>GPA trung binh: 3.56667</code>. Muốn mở rộng: nhập dữ liệu từ bàn phím, lưu tệp, hoặc tìm sinh viên GPA cao nhất.",
        line: 15,
        mark: [15],
        watch: [{ name: "avg", value: "3.56667", type: "double" }],
        output: "GPA trung binh: 3.56667",
        tone: "final",
        visual: S.table(["name", "gpa"], [["An", "3.6"], ["Binh", "3.2"], ["Chi", "3.9"]], -1, "GPA trung bình lớp: 3.56667"),
        changes: ["stdout nhận GPA trung bình."]
      }
    ]
  };
})();
