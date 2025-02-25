// ✅ 1. users 컬렉션에서 age 필드에 단일 인덱스 생성
db.users.createIndex({ age: 1 });

// ✅ 2. users 컬렉션에서 기존에 존재하는 모든 인덱스 조회
db.users.getIndexes();

// ✅ 3. users 컬렉션에서 city 필드의 단일 인덱스를 삭제
db.users.dropIndex({ city: 1 });
db.users.dropIndex({ age: 1 });

// ✅ 4. users 컬렉션에서 age와 city 필드에 대한 복합 인덱스 생성
db.users.createIndex({ age: 1, city: 1 });

// ✅ 5. users 컬렉션에서 email 필드를 기준으로 유니크 인덱스 생성
db.users.createIndex({ email: 1 }, { unique: true });

// ✅ 6. users 컬렉션에서 status 필드의 스파스 인덱스 생성
db.users.createIndex({ status: 1 }, { sparse: true });

// ✅ 7. users 컬렉션에서 age 필드에 대해 30세 이상만 포함하는 부분 인덱스 생성
db.users.createIndex(
  { age: 1 },
  { partialFilterExpression: { age: { $gte: 30 } } }
);

// ✅ 8. transactions 컬렉션에서 date 필드에 대한 백그라운드 인덱스 생성
db.transactions.createIndex({ date: 1 }, { background: true });

// ✅ 9. products 컬렉션에서 name과 category 필드를 포함하는 커버드 인덱스 생성
db.products.createIndex({ name: 1, category: 1 });

// ✅ 10. locations 컬렉션에서 coordinates 필드에 대한 지리 공간 인덱스 생성
db.locations.createIndex({ coordinates: "2dsphere" });

// ✅ 11. 특정 좌표(서울[37.5665, 126.9784])에서 반경 10km 내 위치 검색 ($center)
db.locations.find({
  coordinates: {
    $geoWithin: {
      $centerSphere: [[126.9784, 37.5665], 10 / 6378.1], // 10km를 지구 반지름(6378.1km)으로 나눔
    },
  },
});
// ✅ 12. 특정 지역의 사각형 범위 내 검색 ($box)
db.locations.find({
  coordinates: {
    $geoWithin: {
      $box: [
        [126.9, 37.5],
        [127.1, 37.7],
      ],
    },
  },
});

// ✅ 13. 다각형 영역 내 검색 ($polygon)
db.locations.find({
  coordinates: {
    $geoIntersects: {
      $geometry: {
        type: "Polygon",
        coordinates: [
          [
            [126.9, 37.5],
            [127.0, 37.6],
            [127.1, 37.5],
            [126.9, 37.5], // 시작점과 끝점이 같아야 함
          ],
        ],
      },
    },
  },
});

// ✅ 14. businesses 컬렉션에서 다중 위치 지점 데이터 저장 및 인덱스 생성
db.businesses.insertMany([
  {
    name: "Cafe A",
    branches: [{ type: "Point", coordinates: [126.9784, 37.5665] }],
  },
  {
    name: "Cafe B",
    branches: [{ type: "Point", coordinates: [129.1611, 35.1587] }],
  },
  {
    name: "Cafe C",
    branches: [{ type: "Point", coordinates: [127.0276, 37.4979] }],
  },
  {
    name: "Restaurant D",
    branches: [{ type: "Point", coordinates: [126.9335, 37.556] }],
  },
  {
    name: "Bar E",
    branches: [{ type: "Point", coordinates: [127.0396, 37.5013] }],
  },
  {
    name: "Bookstore F",
    branches: [{ type: "Point", coordinates: [126.9781, 37.57] }],
  },
  {
    name: "Gym G",
    branches: [{ type: "Point", coordinates: [127.0245, 37.5825] }],
  },
  {
    name: "Hotel H",
    branches: [{ type: "Point", coordinates: [129.0653, 35.1798] }],
  },
  {
    name: "Cinema I",
    branches: [{ type: "Point", coordinates: [127.115, 37.5133] }],
  },
  {
    name: "Supermarket J",
    branches: [{ type: "Point", coordinates: [126.8955, 37.5552] }],
  },
]);

db.businesses.createIndex({ "branches.coordinates": "2dsphere" });

// ✅ 15. 현재 위치에서 가장 가까운 장소 찾기 ($nearSphere)
db.businesses.find({
  "branches.coordinates": {
    $nearSphere: {
      $geometry: { type: "Point", coordinates: [126.9784, 37.5665] },
      $maxDistance: 10000,
    },
  },
});

// ✅ 16. places 컬렉션에서 GeoON 형식의 포인트 데이터 저장 및 인덱스 생성
db.places.insertMany([
  {
    name: "Place A",
    location: { type: "Point", coordinates: [126.9784, 37.5665] },
  },
  {
    name: "Place B",
    location: { type: "Point", coordinates: [129.1611, 35.1587] },
  },
  {
    name: "Place C",
    location: { type: "Point", coordinates: [127.0276, 37.4979] },
  },
  {
    name: "Place D",
    location: { type: "Point", coordinates: [126.9335, 37.556] },
  },
  {
    name: "Place E",
    location: { type: "Point", coordinates: [127.0396, 37.5013] },
  },
]);

// 특정 카테고리를 사용자에 추가
db.users.updateMany({}, { $set: { subscriptions: [] } });

// ✅ 17. 특정 카테고리(Technology)를 구독한 사용자 찾기
db.users.find({ subscriptions: "Technology" });

// ✅ 18. 특정 사용자가 특정 제품을 구매했는지 확인
db.users.updateMany({}, { $set: { product: [] } });
db.users.find({ name: "Alice", product: "product1" });

// ✅ 19. 최근에 가입한 사용자 찾기
db.users.find({ joinedAt: -1 }).limit(1);

// ✅ 20. 이메일 도메인별 사용자 수 계산
db.users.aggregate([
  {
    $group: {
      _id: { $arrayElemAt: [{ $split: ["$email", "@"] }, 1] },
      count: { $sum: 1 },
    },
  },
]);
