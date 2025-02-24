// 0.
// user 컬랙션 생성
db.createCollection("user");

// user 컬렉션에 데이터 추가
db.user.insertOne({
  name: "Alice",
  age: 25,
  email: "test@test.com",
  hobbies: ["Reading", "Swimming"],
});

// 0-2.
// employee 컬랙션 생성
db.createCollection("employee");

// employee 컬렉션에 데이터 추가
db.employee.insertOne({
  name: "Alice",
  age: 38,
  department: "IT",
  skills: ["Java", "Spring", "Python"],
  email: "test@test.com",
});

// 1.
// capped collection 생성
db.createCollection("logs", { capped: true, size: 5000 });

// capped collection에 데이터 추가
for (let i = 1; i <= 1000; i++) {
  db.logs.insertOne({
    log: `log${i}`,
  });
}

// capped collection 조회
db.logs.find();

// 2.
// use를 사용해서 데이터베이스 선택
use("myDatabase");

// 3.
// students 컬랙션에 데이터 추가
db.students.insertOne({
  name: "Bob",
  age: 27,
});

// 4.
// students 컬랙션에서 모든 데이터 조회
db.students.find();

// 5.
// students 컬랙션에서 name이 John인 데이터 조회
db.students.find({ name: "John" });

// 6.
// students 컬랙션에서 name이 John인 데이터 수정
db.students.updateOne({ name: "John" }, { $set: { age: 23 } });

// 7.
// students 컬렉션에서 age가 20 이상인 문서의 status 필드를 "active"로 설정
db.students.updateMany({ age: { $gte: 20 } }, { $set: { status: "active" } });

// 8.
// students 컬렉션에서 name이 John인 문서 삭제
db.students.deleteOne({ name: "John" });

// 9.
// students 컬랙션에서 전체 삭제
db.students.drop();

// 10.
// students 컬렉션에서 age 기준으로 내림차순 정렬 후 3개만 출력
db.students.find().sort({ age: -1 }).limit(3);

// 11.
// students 컬렉션에서 name과 age만 조회(id 제외)
db.students.find({}, { name: 1, age: 1, _id: 0 });

// 12.
// employee 컬렉션에서 age가 30 이상인 문서 개수
db.employee.count({ age: { $gte: 30 } });

// 13.
// employee 컬랙션에서 email 필드가 존재하는 문서 조회
db.employee.find({ email: { $exists: true } });

// 14.
// employee 컬랙션에서 department가 HR 또는 IT인 문서 조회
db.employee.find({ department: { $in: ["HR", "IT"] } });

// 15.
// employee 컬랙션에서 age가 25 이상 35 이하인 문서 조회
db.employee.find({ age: { $gte: 25, $lte: 35 } });

// 16.
// employee 컬랙션에서 age가 30이거나 department가 Finance인 문서 조회
db.employee.find({ $or: [{ age: 30 }, { department: "Finance" }] });

// 17.
// employee 컬랙션에서 skills 배열에 "Python" 추가
db.employee.updateMany({}, { $push: { skills: "Python" } });

// 18.
// employee 컬랙션에서 skills 배열의 "Python"을 제거
db.employees.updateMany({}, { $pull: { skills: "Python" } });
