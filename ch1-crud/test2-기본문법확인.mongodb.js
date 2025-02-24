// MongoDB Capped Collection 사용 개념 및 예제

// 1. 기본 문법 및 개념
// createCollection(name, options)
// : MongoDB에서 새로운 컬렉션을 생성하는 메서드.
// Capped Collection: 저장 공간이 제한된(fixed - size) 컬렉션으로, 오래된 데이터가 자동으로 삭제됨.

//     옵션:
// capped: true → 컬렉션을 Capped Collection으로 설정.
//     size: <bytes> → 컬렉션의 최대 크기를 지정(바이트 단위).

// 2. 예제 코드

// 컬렉션 생성

// db.createCollection("cappedC",
// {capped: true, size: 10000 });
// cappedC라는 이름의 컬렉션을 생성.

// 최대 10,000바이트 크기의 공간을 유지.

// 데이터 삽입

// db.cappedC.insertOne({x: 1 });

// {x: 1 } 문서를 컬렉션에 삽입.

// 데이터 조회

// db.cappedC.find();

// 현재 컬렉션에 저장된 모든 문서 조회.

// 3. 예제 실행 결과
// json

// {"_id" : ObjectId("602d2149e773f2a3990b47f5"), "x" : 1 }

// _id 필드는 자동 생성되며, 문서 내용 {x: 1 }이 저장됨.

// 4. 실무 활용 사례
// 로그 데이터 저장

// 실시간 시스템에서 최근 N개의 로그만 유지하고 싶을 때.
// 예: 애플리케이션 이벤트 로그, 시스템 모니터링 로그.
// IoT 센서 데이터 관리

// 최신 센서 데이터를 지속적으로 유지하며, 오래된 데이터는 자동 삭제.
// 예: 온도, 습도 센서 데이터.
// 메시지 큐 시스템

// 고정 크기의 메시지 큐를 유지하며, 오래된 메시지는 자동 제거.
// 예: 실시간 알림 메시지 저장.

// 실제 예제 코드
db.createCollection("cappedC", { capped: true, size: 10000 });
db.cappedC.insertOne({ x: 1 });
db.cappedC.find();

// 반복문으로 1000개 추가시
// 오래된 데이터 삭제 후, 새로운 데이터 추가
// 1~655번까지 삭제 후 656번부터 추가됨
for (i = 0; i < 1000; i++) {
  db.cappedC.insertOne({ x: i });
}

db.cappedC.find();
db.cappedC.storageSize();
db.cappedC.stats();

// 일반 컬랙션에 반복문으로 데이터 1000개 추가
for (i = 0; i < 1000; i++) {
  db.testCollection.insertOne({ x: i });
}
db.testCollection.find();
