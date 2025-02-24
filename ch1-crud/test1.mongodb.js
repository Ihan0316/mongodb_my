use("testDB"); // 기본 데이터 베이스는 test 그냥 사용, 생략시 test기본 디비 사용

// 테이블 생성
db.testCollection.insertOne({
  name: "조이한",
  age: 26,
  favoriteFood: ["라면", "김치찌개"],
  phone: "010-1234-5678",
});

// 테이블 조회
db.testCollection.find();

// 테이블 수정
db.testCollection.updateOne({ name: "조이한2" }, { $set: { age: 30 } });

// 테이블 삭제
db.testCollection.deleteOne({ name: "조이한2" });
