// 📌 기본 실습 문제
// 1. Embedded Document (Rich Document)
// users 컬렉션을 생성하고, name, age, address 필드를 가진 문서를 삽입하시오.
db.users.insertMany(
  {
    name: "Alice",
    age: 30,
    address: { city: "Seoul", zip: "12345" },
  },
  {
    name: "Bob",
    age: 25,
    address: { city: "Busan", zip: "67890" },
  }
);
// products 컬렉션에 name, price, manufacturer 필드를 가진 문서를 삽입하시오.
db.products.insertMany(
  {
    name: "MacBook Pro",
    price: 1000,
    manufacturer: "Apple Inc.",
  },
  {
    name: "Galaxy S25",
    price: 800,
    manufacturer: "Samsung",
  }
);
// orders 컬렉션에 주문 정보(orderId, userId, items)를 Embedded Document로 삽입하시오.
db.orders.insertMany(
  {
    orderId: "A001",
    userId: "user1",
    items: [
      { productId: "p001", quantity: 2 },
      { productId: "p002", quantity: 1 },
    ],
  },
  {
    orderId: "A002",
    userId: "user2",
    items: [
      { productId: "p003", quantity: 3 },
      { productId: "p004", quantity: 1 },
    ],
  }
);
// books 컬렉션에 title, author, details(페이지 수, 출판 연도 포함) 필드를 가진 문서를 삽입하시오.
db.books.insertMany(
  {
    title: "JavaScript",
    author: "Alice",
    details: { pages: 300, published: 2020 },
  },
  {
    title: "Python",
    author: "Bob",
    details: { pages: 400, published: 2021 },
  }
);
// reviews 컬렉션에 productId, userId, rating, comment를 Embedded Document로 저장하시오.
db.reviews.insertMany(
  {
    productId: "p001",
    userId: "user1",
    rating: 5,
    comment: "Good!",
  },
  {
    productId: "p002",
    userId: "user2",
    rating: 4,
    comment: "Nice!",
  }
);

// 2. Link 구조
// users 컬렉션과 orders 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
db.users.insertOne({
  _id: "user1",
  name: "Alice",
});
db.orders.insertOne({
  orderId: "A001",
  userId: "user1",
  items: [
    { productId: "p001", quantity: 2 },
    { productId: "p002", quantity: 1 },
  ],
});
// posts 컬렉션과 comments 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
db.posts.insertOne({
  title: "Hello, World!",
  content: "This is my first post.",
});
db.comments.insertOne({
  postId: "post1",
  userId: "user1",
  message: "Nice post!",
});
// students 컬렉션과 courses 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
db.students.insertOne({
  _id: "student1",
  name: "Alice",
});
db.courses.insertOne({
  courseId: "C001",
  studentId: "student1",
  courseName: "MongoDB",
});
// employees 컬렉션과 departments 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
db.employees.insertOne({
  _id: "emp1",
  name: "Alice",
});
db.departments.insertOne({
  departmentId: "D001",
  employeeId: "emp1",
  departmentName: "IT",
});
// doctors 컬렉션과 patients 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
db.doctors.insertOne({
  _id: "doc1",
  name: "Alice",
});
db.patients.insertOne({
  patientId: "P001",
  doctorId: "doc1",
  patientName: "Bob",
});

// 3. 계층형 데이터 구조
// categories 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.categories.insertOne({
  _id: "root",
  name: "Root",
  parentId: null,
});
// comments 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.comments.insertOne({
  _id: "comment1",
  message: "Hello, World!",
  parentId: null,
});
// company_structure 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.company_structure.insertOne({
  _id: "root",
  name: "Root",
  parentId: null,
});
// locations 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.locations.insertOne({
  _id: "root",
  name: "Root",
  parentId: null,
});
// menus 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.menus.insertOne({
  _id: "root",
  name: "Root",
  parentId: null,
});
