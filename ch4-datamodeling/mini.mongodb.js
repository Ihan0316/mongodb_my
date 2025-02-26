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
// users 컬렉션 (고객 정보)
db.users.insertMany([
  { _id: ObjectId(), name: "김철수", email: "chulsoo@example.com" },
  { _id: ObjectId(), name: "이영희", email: "younghee@example.com" },
]);

// orders 컬렉션 (각 주문은 userId를 참조)
db.orders.insertMany([
  {
    _id: ObjectId(),
    orderId: "ORD001",
    userId: db.users.findOne({ name: "김철수" })._id,
    totalAmount: 150000,
  },
  {
    _id: ObjectId(),
    orderId: "ORD002",
    userId: db.users.findOne({ name: "이영희" })._id,
    totalAmount: 200000,
  },
]);
// posts 컬렉션과 comments 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
// posts 컬렉션 (게시글)
db.posts.insertOne({
  _id: ObjectId(),
  title: "MongoDB 튜토리얼",
  content: "몽고디비 참조 관계를 설명합니다.",
});

// comments 컬렉션 (댓글)
db.comments.insertMany([
  {
    _id: ObjectId(),
    postId: db.posts.findOne({ title: "MongoDB 튜토리얼" })._id,
    user: "홍길동",
    comment: "좋은 정보 감사합니다!",
  },
  {
    _id: ObjectId(),
    postId: db.posts.findOne({ title: "MongoDB 튜토리얼" })._id,
    user: "김영수",
    comment: "더 자세한 내용이 궁금합니다.",
  },
]);
// students 컬렉션과 courses 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
// students 컬렉션 (학생 정보)
db.students.insertMany([
  { _id: ObjectId(), name: "김민수", age: 20 },
  { _id: ObjectId(), name: "박지현", age: 22 },
]);

// courses 컬렉션 (강의 정보)
db.courses.insertMany([
  { _id: ObjectId(), title: "데이터베이스 개론" },
  { _id: ObjectId(), title: "웹 프로그래밍" },
]);

// student_courses 컬렉션 (다대다 관계를 관리)
db.student_courses.insertMany([
  {
    studentId: db.students.findOne({ name: "김민수" })._id,
    courseId: db.courses.findOne({ title: "데이터베이스 개론" })._id,
  },
  {
    studentId: db.students.findOne({ name: "박지현" })._id,
    courseId: db.courses.findOne({ title: "웹 프로그래밍" })._id,
  },
  {
    studentId: db.students.findOne({ name: "김민수" })._id,
    courseId: db.courses.findOne({ title: "웹 프로그래밍" })._id,
  },
]);
// employees 컬렉션과 departments 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
// departments 컬렉션 (부서 정보)
db.departments.insertMany([
  { _id: ObjectId(), name: "개발팀" },
  { _id: ObjectId(), name: "마케팅팀" },
]);

// employees 컬렉션 (직원 정보, 부서 ID 참조)
db.employees.insertMany([
  {
    _id: ObjectId(),
    name: "정우성",
    position: "백엔드 개발자",
    departmentId: db.departments.findOne({ name: "개발팀" })._id,
  },
  {
    _id: ObjectId(),
    name: "한지민",
    position: "디지털 마케터",
    departmentId: db.departments.findOne({ name: "마케팅팀" })._id,
  },
]);
// doctors 컬렉션과 patients 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
// doctors 컬렉션 (의사 정보)
db.doctors.insertMany([
  { _id: ObjectId(), name: "김의사", specialty: "내과" },
  { _id: ObjectId(), name: "박의사", specialty: "정형외과" },
]);

// patients 컬렉션 (환자 정보)
db.patients.insertMany([
  { _id: ObjectId(), name: "최환자", age: 45 },
  { _id: ObjectId(), name: "이환자", age: 30 },
]);

// doctor_patient 컬렉션 (N:M 관계 테이블)
db.doctor_patient.insertMany([
  {
    doctorId: db.doctors.findOne({ name: "김의사" })._id,
    patientId: db.patients.findOne({ name: "최환자" })._id,
  },
  {
    doctorId: db.doctors.findOne({ name: "박의사" })._id,
    patientId: db.patients.findOne({ name: "이환자" })._id,
  },
  {
    doctorId: db.doctors.findOne({ name: "김의사" })._id,
    patientId: db.patients.findOne({ name: "이환자" })._id,
  },
]);

// 3. 계층형 데이터 구조
// categories 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.categories.insertMany([
  // 최상위 카테고리
  { _id: ObjectId(), name: "전자제품", parentId: null, order: 1 },
  { _id: ObjectId(), name: "가구", parentId: null, order: 2 },

  // "전자제품" 하위 카테고리
  {
    _id: ObjectId(),
    name: "스마트폰",
    parentId: db.categories.findOne({ name: "전자제품" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "노트북",
    parentId: db.categories.findOne({ name: "전자제품" })._id,
    order: 2,
  },

  // "가구" 하위 카테고리
  {
    _id: ObjectId(),
    name: "소파",
    parentId: db.categories.findOne({ name: "가구" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "침대",
    parentId: db.categories.findOne({ name: "가구" })._id,
    order: 2,
  },
]);
// comments 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.comments.insertMany([
  // 최상위 카테고리
  { _id: ObjectId(), name: "댓글", parentId: null, order: 1 },
  { _id: ObjectId(), name: "사용자", parentId: null, order: 2 },

  // "댓글" 하위 카테고리
  {
    _id: ObjectId(),
    name: "댓글1",
    parentId: db.comments.findOne({ name: "댓글" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "댓글2",
    parentId: db.comments.findOne({ name: "댓글" })._id,
    order: 2,
  },

  // "사용자" 하위 카테고리
  {
    _id: ObjectId(),
    name: "사용자1",
    parentId: db.comments.findOne({ name: "사용자" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "사용자2",
    parentId: db.comments.findOne({ name: "사용자" })._id,
    order: 2,
  },
]);
// company_structure 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.company_structure.insertMany([
  // 최상위 카테고리
  { _id: ObjectId(), name: "사원", parentId: null, order: 1 },
  { _id: ObjectId(), name: "직급", parentId: null, order: 2 },

  // "댓글" 하위 카테고리
  {
    _id: ObjectId(),
    name: "사원1",
    parentId: db.company_structure.findOne({ name: "사원" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "사원2",
    parentId: db.company_structure.findOne({ name: "사원" })._id,
    order: 2,
  },

  // "직급" 하위 카테고리
  {
    _id: ObjectId(),
    name: "직급1",
    parentId: db.company_structure.findOne({ name: "직급" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "직급2",
    parentId: db.company_structure.findOne({ name: "직급" })._id,
    order: 2,
  },
]);
// locations 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.locations.insertMany([
  // 최상위 카테고리
  { _id: ObjectId(), name: "위도", parentId: null, order: 1 },
  { _id: ObjectId(), name: "경도", parentId: null, order: 2 },

  // "위도" 하위 카테고리
  {
    _id: ObjectId(),
    name: "위도1",
    parentId: db.locations.findOne({ name: "위도" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "위도2",
    parentId: db.locations.findOne({ name: "위도" })._id,
    order: 2,
  },

  // "경도" 하위 카테고리
  {
    _id: ObjectId(),
    name: "경도1",
    parentId: db.locations.findOne({ name: "경도" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "경도2",
    parentId: db.locations.findOne({ name: "경도" })._id,
    order: 2,
  },
]);
// menus 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
db.menus.insertMany([
  // 최상위 카테고리
  { _id: ObjectId(), name: "메뉴", parentId: null, order: 1 },
  { _id: ObjectId(), name: "재료", parentId: null, order: 2 },

  // "메뉴" 하위 카테고리
  {
    _id: ObjectId(),
    name: "메뉴1",
    parentId: db.menus.findOne({ name: "메뉴" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "메뉴2",
    parentId: db.menus.findOne({ name: "메뉴" })._id,
    order: 2,
  },

  // "재료" 하위 카테고리
  {
    _id: ObjectId(),
    name: "재료1",
    parentId: db.menus.findOne({ name: "재료" })._id,
    order: 1,
  },
  {
    _id: ObjectId(),
    name: "재료2",
    parentId: db.menus.findOne({ name: "재료" })._id,
    order: 2,
  },
]);
