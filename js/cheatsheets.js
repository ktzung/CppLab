/* CppLab — cheatsheets */
(function () {
  "use strict";
  window.CPPLAB.cheatsheets = [
    {
      id: "cpp-basics",
      track: "cpp",
      title: "Khung chương trình C++",
      subtitle: "Phần tối thiểu để một file .cpp chạy được",
      icon: "code",
      tone: "blue",
      items: [
        { label: "Khung cơ bản", code: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello";
  return 0;
}`, note: "main là điểm bắt đầu; return 0 báo chạy thành công." },
        { label: "Nhập xuất", code: `int x;
cin >> x;
cout << "x = " << x << endl;`, note: ">> nhập vào biến; << xuất ra luồng." },
        { label: "Biên dịch nhanh", code: `g++ -std=c++17 main.cpp -o main
./main`, note: "Đặt tên file .cpp và chạy từ terminal." }
      ]
    },
    {
      id: "cpp-types",
      track: "cpp",
      title: "Biến và kiểu dữ liệu",
      subtitle: "Chọn kiểu đúng để không mất dữ liệu",
      icon: "book",
      tone: "coral",
      items: [
        { label: "Kiểu cơ bản", code: `int count = 42;
double gpa = 3.65;
char grade = 'A';
bool ok = true;`, note: "int cho số nguyên, double cho số thực, char cho một ký tự, bool cho đúng/sai." },
        { label: "Chuỗi", code: `#include <string>
string name = "An";
cout << name.size();`, note: "std::string cần thêm thư viện string." },
        { label: "Ép kiểu", code: `int a = 7, b = 2;
double x = a / b;        // 3.0
double y = double(a) / b; // 3.5`, note: "Chia hai int là chia nguyên; ép một vế sang double để chia thực." }
      ]
    },
    {
      id: "cpp-control",
      track: "cpp",
      title: "Điều khiển luồng",
      subtitle: "Rẽ nhánh, lặp và duyệt dãy",
      icon: "code",
      tone: "violet",
      items: [
        { label: "if / else", code: `if (score >= 5) {
  cout << "Dat";
} else {
  cout << "Chua dat";
}`, note: "Điều kiện trong ngoặc tròn; khối lệnh trong ngoặc nhọn." },
        { label: "for", code: `for (int i = 0; i < n; i++) {
  cout << i << " ";
}`, note: "i = 0, 1, ..., n-1. Kiểm tra điều kiện trước mỗi vòng." },
        { label: "while", code: `int i = 0;
while (i < n) {
  cout << i++;
}`, note: "Dùng khi số vòng lặp chưa biết trước; nhớ thay đổi biến điều kiện." },
        { label: "Range for", code: `for (int x : a) {
  cout << x << " ";
}`, note: "Duyệt từng phần tử của mảng/vector, không cần chỉ số." }
      ]
    },
    {
      id: "cpp-functions",
      track: "cpp",
      title: "Hàm và phạm vi",
      subtitle: "Chia chương trình thành các khối nhỏ",
      icon: "code",
      tone: "blue",
      items: [
        { label: "Khai báo hàm", code: `int add(int a, int b) {
  return a + b;
}

cout << add(2, 3);`, note: "Kiểu trả về đứng trước tên hàm; tham số là bản sao khi truyền theo giá trị." },
        { label: "Truyền tham chiếu", code: `void bump(int& x) {
  x++;
}

int n = 5;
bump(n); // n = 6`, note: "Dấu & giúp hàm sửa trực tiếp biến của nơi gọi." },
        { label: "Phạm vi", code: `int x = 1;
{
  int x = 2; // che khuất x ngoài
}
cout << x; // 1`, note: "Biến cục bộ chỉ sống trong khối khai báo." }
      ]
    },
    {
      id: "cpp-memory",
      track: "cpp",
      title: "Con trỏ, tham chiếu và bộ nhớ",
      subtitle: "Địa chỉ, dereference và new/delete",
      icon: "memory",
      tone: "violet",
      items: [
        { label: "Con trỏ", code: `int a = 42;
int* p = &a;
cout << *p;  // 42
*p = 50;     // a = 50`, note: "& lấy địa chỉ; * truy cập giá trị tại địa chỉ." },
        { label: "Cấp phát động", code: `int* p = new int(7);
cout << *p;
delete p;
p = nullptr;`, note: "new cấp trên heap; delete trả lại. Sau delete không được dereference." },
        { label: "Tham chiếu", code: `int a = 5;
int& r = a;
r = 9; // a = 9`, note: "Tham chiếu là bí danh, phải khởi tạo ngay và không đổi mục tiêu." }
      ]
    },
    {
      id: "cpp-struct-files",
      track: "cpp",
      title: "struct và tệp",
      subtitle: "Gom dữ liệu và lưu ra đĩa",
      icon: "book",
      tone: "coral",
      items: [
        { label: "struct", code: `struct Student {
  string name;
  double gpa;
};

Student s = {"An", 3.6};
cout << s.name;`, note: "Truy cập trường bằng dấu chấm; đừng quên ; sau }." },
        { label: "Ghi tệp", code: `ofstream out("data.txt");
out << "An 3.6" << endl;
out.close();`, note: "Kiểm tra out.is_open() trước khi ghi trong chương trình thật." },
        { label: "Đọc tệp", code: `ifstream in("data.txt");
string name;
double gpa;
in >> name >> gpa;`, note: "Đóng tệp ghi trước khi mở đọc để dữ liệu đã ra đĩa." }
      ]
    },
    {
      id: "cpp-stl",
      track: "cpp",
      title: "STL dùng thường xuyên",
      subtitle: "vector, pair, sort và tìm kiếm",
      icon: "lab",
      tone: "lime",
      items: [
        { label: "vector", code: `vector<int> v = {3, 1, 2};
v.push_back(4);
cout << v.size();
for (int x : v) cout << x << " ";`, note: "Mảng động tự mở rộng; size là số phần tử thực." },
        { label: "sort", code: `#include <algorithm>
sort(v.begin(), v.end());`, note: "Sắp tăng dần mặc định, chi phí O(n log n)." },
        { label: "binary_search", code: `bool found = binary_search(
  v.begin(), v.end(), 4);`, note: "Chỉ dùng trên dãy đã sắp xếp; trả bool, không trả chỉ số." },
        { label: "pair", code: `pair<int,int> p = {3, 8};
cout << p.first << " " << p.second;`, note: "Thường dùng cho cạnh có trọng số: {đỉnh, chi phí}." }
      ]
    },
    {
      id: "dsa-complexity",
      track: "dsa",
      title: "Big-O thường gặp",
      subtitle: "Nhìn chi phí trước khi tối ưu code",
      icon: "lab",
      tone: "lime",
      items: [
        { label: "Bảng nhanh", code: `O(1)      truy cập mảng
O(log n)  binary search
O(n)      duyệt một lần
O(n log n) sort / merge sort
O(n^2)    hai vòng lồng nhau`, note: "Khi n lớn, khác biệt giữa các mức tăng trưởng rất lớn." },
        { label: "Đếm vòng lặp", code: `for (int i = 0; i < n; i++)
  sum += a[i];`, note: "Một vòng lặp n bước là O(n); hai vòng lồng nhau thường O(n²)." },
        { label: "Bộ nhớ", code: `vector<int> f(n + 1);`, note: "Cấu trúc phụ n phần tử tốn O(n) bộ nhớ." }
      ]
    },
    {
      id: "dsa-linear",
      track: "dsa",
      title: "Cấu trúc tuyến tính",
      subtitle: "Node, stack và queue",
      icon: "memory",
      tone: "blue",
      items: [
        { label: "Node liên kết", code: `struct Node {
  int value;
  Node* next;
};`, note: "Danh sách đơn nối theo next; node cuối có next = nullptr." },
        { label: "Stack", code: `stack<int> st;
st.push(3);
st.pop();
cout << st.top();`, note: "LIFO: vào sau ra trước." },
        { label: "Queue", code: `queue<int> q;
q.push(3);
q.pop();
cout << q.front();`, note: "FIFO: vào trước ra trước." },
        { label: "Duyệt danh sách", code: `for (Node* p = head; p; p = p->next)
  cout << p->value << " ";`, note: "Điều kiện p tương đương p != nullptr." }
      ]
    },
    {
      id: "dsa-trees",
      track: "dsa",
      title: "Cây, BST và heap",
      subtitle: "Tìm nhanh trong dữ liệu có thứ tự",
      icon: "tree",
      tone: "violet",
      items: [
        { label: "Node cây", code: `struct Node {
  int value;
  Node* left;
  Node* right;
};`, note: "Cây rỗng là nullptr; duyệt bằng đệ quy là tự nhiên nhất." },
        { label: "Preorder", code: `void preorder(Node* root) {
  if (!root) return;
  cout << root->value;
  preorder(root->left);
  preorder(root->right);
}`, note: "Gốc → trái → phải. Inorder của BST cho dãy tăng dần." },
        { label: "BST insert", code: `if (x < root->value)
  root->left = insert(root->left, x);
else
  root->right = insert(root->right, x);`, note: "Nhỏ hơn sang trái, lớn hơn sang phải." },
        { label: "Heap", code: `parent = (i - 1) / 2;
left  = 2 * i + 1;
right = 2 * i + 2;`, note: "Max-heap: cha lớn hơn con; push dùng sift-up, pop dùng sift-down." }
      ]
    },
    {
      id: "dsa-graphs",
      track: "dsa",
      title: "Đồ thị",
      subtitle: "Danh sách kề, BFS và đường đi ngắn nhất",
      icon: "tree",
      tone: "coral",
      items: [
        { label: "Danh sách kề", code: `vector<vector<int>> adj(n);
adj[u].push_back(v);
adj[v].push_back(u); // vô hướng`, note: "Mỗi vector con lưu hàng xóm của một đỉnh." },
        { label: "BFS", code: `queue<int> q;
q.push(start); seen[start] = true;
while (!q.empty()) {
  int u = q.front(); q.pop();
  for (int v : adj[u])
    if (!seen[v]) {
      seen[v] = true; q.push(v);
    }
}`, note: "BFS thăm theo lớp; dùng được để tìm đường ít cạnh nhất." },
        { label: "Dijkstra", code: `dist[start] = 0;
pq.push({0, start});
while (!pq.empty()) {
  auto [d,u] = pq.top(); pq.pop();
  if (d > dist[u]) continue;
  for (auto [v,w] : g[u])
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      pq.push({dist[v], v});
    }
}`, note: "Cần trọng số không âm; luôn mở rộng đỉnh có dist nhỏ nhất." },
        { label: "Topo sort", code: `for (int i = 0; i < n; i++)
  if (indeg[i] == 0) q.push(i);

while (!q.empty()) {
  int u = q.front(); q.pop();
  for (int v : adj[u])
    if (--indeg[v] == 0) q.push(v);
}`, note: "Chỉ áp dụng cho DAG; nếu còn đỉnh chưa xử lý thì có chu trình." }
      ]
    },
    {
      id: "dsa-algos",
      track: "dsa",
      title: "Chiến lược giải thuật",
      subtitle: "Chia để trị, tham lam và quy hoạch động",
      icon: "lab",
      tone: "lime",
      items: [
        { label: "Merge sort", code: `while (i < L.size() && j < R.size())
  a[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
while (i < L.size()) a[k++] = L[i++];
while (j < R.size()) a[k++] = R[j++];`, note: "Trộn hai nửa đã sắp; tổng chi phí O(n log n)." },
        { label: "Quy hoạch động", code: `f[0] = 0; f[1] = 1;
for (int i = 2; i <= n; i++)
  f[i] = f[i-1] + f[i-2];`, note: "Lưu kết quả bài toán con để tránh tính lặp." },
        { label: "Tham lam", code: `for (int c : coins) {
  int take = amount / c;
  amount %= c;
}`, note: "Chọn tốt nhất trước mắt; chỉ tối ưu khi bài toán có tính chất phù hợp." },
        { label: "Quay lui", code: `cur.push_back(x);
tryNext();
cur.pop_back();`, note: "Thử lựa chọn, đi sâu, rồi hoàn tác để thử nhánh khác." }
      ]
    }
  ];
})();
