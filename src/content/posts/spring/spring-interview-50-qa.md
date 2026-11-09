---
title: "Master Cheat Sheet: Trọn Bộ 50 Câu Hỏi Phỏng Vấn Java Spring Framework"
published: 2026-10-19
description: "Tra cứu nhanh toàn bộ 50 câu hỏi phỏng vấn Java Spring Framework với kịch bản trả lời 45 giây ghi điểm, công thức 3 bước chuẩn và liên kết tham chiếu đến từng bài học chuyên sâu tương ứng trong series."
image: "../images/both-list.avif"
tags:
  - Spring
  - SpringBoot
  - Java
  - Backend
  - Interview
category: "Java Spring"
draft: false
pinned: false
author: "An Phước"
comment: true
series: "Java Fresher: Spring Framework"
seriesOrder: 8
---

Đây là bộ cheat sheet tổng hợp **toàn bộ 50 câu hỏi** từ video [[JSFW] 50 câu hỏi phỏng vấn Java Spring](https://www.youtube.com/watch?v=LPiIG-3pfs0) với kịch bản trả lời ghi điểm theo công thức chuẩn.

> [!TIP]
> **Công thức trả lời ăn điểm (45 giây):**
> 1. **Định nghĩa cốt lõi (15s)** — "X là gì, dùng để làm gì?"
> 2. **Bản chất công nghệ bên dưới (15s)** — "Nó hoạt động thế nào bên trong?"
> 3. **Cạm bẫy / Best Practice thực tế (15s)** — "Khi nào hay bị nhầm? Cách làm đúng là gì?"

---

## Nhóm 1: Spring Core — Câu 1 đến 13

👉 Bài học chuyên sâu: [Spring Core & IoC/DI](./spring-core-ioc-di)

---

**Câu 1** — Spring Framework là gì? [[00:41]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=41)

> Spring là Java framework mã nguồn mở thiết kế theo dạng module với thành phần cốt lõi là **IoC Container** chuyên tạo lập, quản lý vòng đời và kết nối các phụ thuộc giữa đối tượng. Xung quanh đó là các module chuyên biệt: Spring MVC, Spring Data, Spring Security, giúp giảm coupling và tăng khả năng kiểm thử.

---

**Câu 2** — Spring giải quyết những vấn đề cốt lõi nào? [[02:41]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=161)

> Hai bài toán lớn nhất: **Boilerplate Code** (code lặp như mở/đóng JDBC connection, commit/rollback thủ công) và **Tight Coupling** (class tự new phụ thuộc bên trong). Nhờ DI, `@Transactional` khai báo và lớp trừu tượng thống nhất, lập trình viên tập trung vào logic nghiệp vụ và dễ mock khi test.

---

**Câu 3** — Inversion of Control (IoC) là gì? [[04:37]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=277)

> IoC là nguyên lý thiết kế trong đó quyền **khởi tạo và gắn kết đối tượng** được chuyển từ code ứng dụng sang Spring Container. Class chỉ khai báo những gì cần, Container quyết định thời điểm tạo và tiêm phụ thuộc. Lưu ý: **IoC là nguyên lý, DI là kỹ thuật** Spring dùng để hiện thực hóa nguyên lý đó.

---

**Câu 4** — Dependency Injection là gì? Có mấy cách? Cái nào tốt nhất? [[06:40]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=400)

> DI là kỹ thuật Container cung cấp dependency cho đối tượng thay vì để đối tượng tự khởi tạo. Có 3 cách: **Constructor Injection** (best practice), **Setter Injection** (cho optional dependency), **Field Injection** (tránh trong production). Constructor Injection tốt nhất vì: cho phép `final` (bất biến), Unit Test không cần Spring, phát hiện Code Smell nếu quá nhiều tham số.

---

**Câu 5** — Spring Bean là gì? `new ArrayList()` có phải Bean không? [[08:35]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=515)

> Bean là đối tượng được **tạo ra, cấu hình và quản lý hoàn toàn bởi Spring IoC Container**. `new ArrayList()` **không phải Bean** — Spring không quản lý và không inject phụ thuộc cho nó. Container còn bọc Proxy bên ngoài Bean để xử lý `@Transactional`, `@Async`, `@Cacheable`.

---

**Câu 6** — `BeanFactory` và `ApplicationContext` khác nhau thế nào? [[10:31]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=631)

> `BeanFactory` là container cơ bản, khởi tạo Bean theo cơ chế **Lazy** (chỉ tạo khi gọi). `ApplicationContext` kế thừa và bổ sung Event Publishing, MessageSource, Environment/Profile, mặc định khởi tạo sẵn Singleton Bean ngay khi start để **phát hiện lỗi cấu hình sớm**. Thực tế 100% dự án dùng `ApplicationContext`.

---

**Câu 7** — Bean Scope phổ biến? Singleton có Thread-Safe không? [[12:22]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=742)

> Scope chính: **Singleton** (1 instance/ApplicationContext), **Prototype** (tạo mới mỗi lần), và trong Web: `request`, `session`. Singleton **KHÔNG tự động thread-safe** — nhiều thread dùng chung 1 object, nếu lưu state request vào biến instance thì các thread ghi đè nhau. Bean Singleton phải **stateless** — chỉ giữ dependency cố định. Inject Prototype vào Singleton cần dùng `ObjectProvider` để lấy instance mới mỗi lần.

---

**Câu 8** — Vòng đời Spring Bean theo thứ tự nào? [[14:11]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=851)

> 8 bước: Constructor → DI → Aware Callbacks → BPP pre-init → `@PostConstruct` → BPP post-init (AOP Proxy) → Ready → `@PreDestroy`. Khi dùng Field Injection, lúc Constructor chạy (Bước 1) thì field chưa được inject (vẫn null) — gọi dependency trong constructor gây NPE. `@PostConstruct` (Bước 5) an toàn vì DI đã hoàn thành. Bean Prototype không được gọi `@PreDestroy`.

---

**Câu 9** — `@Component`, `@Service`, `@Repository`, `@Controller` khác nhau ở đâu? [[16:17]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=977)

> Cả 4 đều là Stereotype Annotations (đều chứa `@Component` bên trong) giúp Component Scanning nhận diện. Sự khác biệt: `@Service` mang ngữ nghĩa Business Logic; `@Repository` bật **Exception Translation** (chuyển lỗi DB-specific thành `DataAccessException` chuẩn Spring); `@Controller` giúp Spring MVC ánh xạ HTTP request. `@Component` cho Bean không thuộc 3 tầng kia.

---

**Câu 10** — Component Scanning hoạt động ra sao? [[18:26]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=1106)

> Spring tự quét package chỉ định để tìm class gắn Stereotype Annotation và đăng ký Bean. `@SpringBootApplication` mặc định quét từ package chứa class `main` trở xuống. Phải đặt class `main` ở **root package** hoặc cấu hình `scanBasePackages` để không bị `NoSuchBeanDefinitionException`.

---

**Câu 11** — Tại sao Constructor Injection tốt hơn Field Injection? [[20:29]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=1229)

> 3 lý do: (1) Cho phép `final` — bất biến sau khi tạo, không ai gán null vô tình. (2) Unit Test dễ — `new Service(mockA, mockB)` bằng Java thuần, không cần Spring. (3) Code Smell detector — constructor nhiều tham số báo hiệu class vi phạm SRP, cần tách nhỏ.

---

**Câu 12** — `@Autowired` tìm Bean theo thứ tự nào? [[23:46]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=1426)

> Ưu tiên tìm theo **Type** trước: đúng 1 Bean → inject ngay; không có Bean → `NoSuchBeanDefinitionException`. Nhiều Bean cùng kiểu → kiểm tra `@Qualifier` (ưu tiên cao nhất) → xem `@Primary` → khớp tên biến → không khớp → `NoUniqueBeanDefinitionException`. Hoặc inject `List<Interface>` để lấy tất cả.

---

**Câu 13** — `@Primary` và `@Qualifier` dùng để làm gì? Ai ưu tiên hơn? [[25:46]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=1546)

> `@Primary` đặt ở phía **cung cấp (định nghĩa Bean)** — mặc định toàn cục. `@Qualifier` đặt tại **điểm inject** — chỉ đích danh Bean muốn dùng. **`@Qualifier` luôn thắng** vì là mệnh lệnh cụ thể và trực tiếp tại điểm sử dụng.

---

## Nhóm 2: Cấu Hình, AOP & Transaction — Câu 14 đến 21

👉 Bài học chuyên sâu: [Spring AOP & Transaction](./spring-aop-transactions)

---

**Câu 14** — `@Configuration` và `@Bean` khác nhau thế nào? [[27:41]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=1661)

> `@Configuration` đặt ở cấp **class** — "Xưởng sản xuất Bean". `@Bean` đặt trên **method** (factory method) — đối tượng trả về được đăng ký vào Container. `@Bean` bắt buộc khi đăng ký class từ thư viện bên thứ ba (như `RestTemplate`, `ObjectMapper`) hoặc cần logic khởi tạo phức tạp. Đặc biệt: `@Configuration` dùng **CGLIB Proxy** đảm bảo các `@Bean` method gọi chéo nhau vẫn trả về đúng 1 Singleton instance.

---

**Câu 15** — Externalized Configuration là gì? Thứ tự ưu tiên? [[29:41]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=1781)

> Cơ chế tách thông số phụ thuộc môi trường ra khỏi code, dùng chung 1 bản build `.jar` trên nhiều môi trường. Ưu tiên từ cao đến thấp: **CLI Arguments** > **Environment Variables** > **Config Files** (`application.yml`). Đọc giá trị đơn lẻ bằng `@Value`, gom nhóm type-safe bằng `@ConfigurationProperties`. Không commit secret lên Git.

---

**Câu 16** — Spring Profiles là gì? [[31:37]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=1897)

> Cho phép phân nhóm Bean (`@Profile("dev")`) hoặc file cấu hình riêng (`application-dev.yml`) cho từng môi trường. Kích hoạt qua `spring.profiles.active=prod`, biến môi trường `SPRING_PROFILES_ACTIVE=prod`, hoặc `@ActiveProfiles("test")` trong test. **Lưu ý:** Profile chỉ để phân tách cấu hình — secrets phải truyền qua biến môi trường hoặc Vault, không commit vào Git.

---

**Câu 17** — Spring AOP là gì? Hoạt động dựa trên cơ chế nào? [[33:36]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=2016)

> Giải quyết bài toán tách **Cross-cutting Concerns** (logging, security, transaction, caching) ra khỏi logic nghiệp vụ. Hoạt động bằng **Runtime Proxy**: lời gọi đi qua Proxy để thực thi logic phụ trợ rồi mới vào Bean thật. CGLIB (default từ Spring Boot 2.x) tạo class con kế thừa. Hạn chế: không can thiệp method `private`, `final` và **Self-Invocation** (lời gọi nội bộ `this.method()` bypass Proxy).

---

**Câu 18** — Phân biệt Aspect, Advice, Pointcut, Join Point? [[35:26]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=2126)

> **Join Point**: Điểm có thể chèn logic (mỗi lần gọi method của Bean). **Pointcut**: Biểu thức điều kiện lọc Join Point. **Advice**: Đoạn code thực thi tại Join Point (`@Before`, `@After`, `@Around`...). **Aspect**: Class gom chung Pointcut và Advice liên quan.

---

**Câu 19** — `@Transactional` hoạt động thế nào? Quy tắc rollback? [[37:18]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=2238)

> AOP Proxy thiết lập ranh giới giao dịch: mở transaction trước, `COMMIT` khi xong, `ROLLBACK` khi exception. **Mặc định chỉ rollback với Unchecked Exception (`RuntimeException`, `Error`)** — Checked Exception (như `IOException`) vẫn COMMIT! Fix: `rollbackFor = Exception.class`. Tránh: nuốt exception trong try-catch, gắn lên method `private`, giữ connection Pool lâu bằng gọi API ngoài.

---

**Câu 20** — Self-Invocation với `@Transactional` là gì? [[39:09]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=2349)

> Khi method không có `@Transactional` gọi trực tiếp method có `@Transactional` trong **cùng class** (qua `this`), lời gọi bypass Proxy → `@Transactional` vô nghĩa. Fix chuẩn: tách method cần transaction sang **Service Bean riêng** rồi inject — lời gọi đi qua Proxy bình thường. Hoặc dùng `TransactionTemplate`.

---

**Câu 21** — Transaction Propagation là gì? `REQUIRED` vs `REQUIRES_NEW`? [[41:14]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=2474)

> Quy định cách xử lý transaction khi được gọi từ ngữ cảnh đã có/chưa có transaction. **`REQUIRED` (mặc định)**: "Chung thuyền" — tham gia transaction cha nếu có, tạo mới nếu không có; cha lỗi → cả hai rollback. **`REQUIRES_NEW`**: "Tự ra khơi" — tạm treo transaction cha, mở transaction mới độc lập, commit ngay; cha rollback thì con vẫn bình an. Ứng dụng: Audit Log phải lưu cứng kể cả khi Order thất bại.

---

## Nhóm 3: Spring MVC, REST API & Validation — Câu 22 đến 30

👉 Bài học chuyên sâu: [Spring MVC & REST API](./spring-mvc-rest-api)

---

**Câu 22** — Luồng HTTP Request trong Spring MVC? [[43:24]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=2604)

> Request vào Tomcat → Filter Chain → **DispatcherServlet** → **HandlerMapping** (tìm Controller) → **HandlerAdapter** → **ArgumentResolver** (trích xuất params, chạy `@Valid`) → Controller method → **HttpMessageConverter** (Jackson serialize JSON) hoặc **ViewResolver** (template HTML) → Response về Client.

---

**Câu 23** — `DispatcherServlet` là gì? [[45:28]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=2728)

> Hiện thực **Front Controller Pattern** — cổng tiếp nhận duy nhất cho mọi HTTP request. Không xử lý nghiệp vụ mà điều phối: định tuyến Controller, kích hoạt Validation, chuyển lỗi cho `@ControllerAdvice`, đóng gói kết quả. Tự động cấu hình trong Spring Boot.

---

**Câu 24** — `@Controller` vs `@RestController`? [[47:29]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=2849)

> `@Controller`: giá trị String trả về là **tên View template** (Thymeleaf); muốn trả JSON phải thêm `@ResponseBody`. `@RestController` = `@Controller` + `@ResponseBody` — mọi return value tự động serialize thành JSON. Dùng `@RestController` cho REST API, `@Controller` khi cần render View.

---

**Câu 25** — Phân biệt `@RequestParam`, `@PathVariable`, `@RequestBody`? [[49:23]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=2963)

> **`@PathVariable`**: Trích từ URI path (`/orders/{id}`) — định danh tài nguyên. **`@RequestParam`**: Từ Query String (`?page=0&size=10`) — lọc, tìm kiếm, phân trang. **`@RequestBody`**: Map JSON body thành Java object qua Jackson — tạo mới/cập nhật dữ liệu phức tạp.

---

**Câu 26** — Chọn HTTP Method thế nào? Idempotent là gì? [[51:37]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=3097)

> GET (đọc), POST (tạo mới), PUT (thay thế toàn bộ), PATCH (cập nhật một phần), DELETE (xóa). **Idempotent** = gọi 1 lần hay nhiều lần với cùng input thì server state cuối cùng giống nhau. GET, PUT, DELETE là idempotent; POST không (mỗi lần tạo bản ghi mới). Với thanh toán quan trọng dùng `Idempotency-Key` header.

---

**Câu 27** — `ResponseEntity` dùng để làm gì? [[53:31]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=3211)

> Bao bọc toàn bộ HTTP Response — kiểm soát cả 3: **Status Code**, **Headers** và **Body**. Dùng khi cần `201 Created` + `Location` header (tạo tài nguyên), `204 No Content` (xóa), `404 Not Found` thay vì mặc định 200 mọi trường hợp.

---

**Câu 28** — Validation trong Spring Boot triển khai thế nào? [[55:26]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=3326)

> 3 bước: (1) Thêm `spring-boot-starter-validation`; (2) Gắn annotation ràng buộc (`@NotBlank`, `@Email`, `@Min`...) lên DTO, nhớ `@Valid` cho object lồng bên trong; (3) Đặt `@Valid` trước tham số tại Controller. Dữ liệu không hợp lệ → Spring tự ném `MethodArgumentNotValidException` trước khi vào hàm.

---

**Câu 29** — Phân biệt `@NotNull`, `@NotEmpty`, `@NotBlank`? [[57:29]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=3449)

> `@NotNull`: Chỉ chặn `null`. `@NotEmpty`: Chặn `null` và chuỗi/collection rỗng (áp dụng cho String, Collection, Map, Array), `"   "` vẫn lọt. `@NotBlank`: Mạnh nhất — chặn cả `null`, `""` và `"   "` (chỉ dùng cho String). Với text input người dùng → luôn dùng `@NotBlank`.

---

**Câu 30** — `@ControllerAdvice` và `@ExceptionHandler` phối hợp thế nào? [[59:23]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=3563)

> `@ExceptionHandler` định nghĩa hàm bắt Exception cụ thể chuyển thành HTTP Response. Kết hợp với `@ControllerAdvice`/`@RestControllerAdvice` → phạm vi **toàn cục cho tất cả Controller**. Lưu ý: chỉ bắt lỗi trong phạm vi DispatcherServlet (không bắt lỗi từ Filter) và không trả Stack Trace ra ngoài.

---

## Nhóm 4: Spring Boot — Câu 31 đến 36

👉 Bài học chuyên sâu: [Spring Boot Internals](./spring-boot-internals)

---

**Câu 31** — Spring Framework vs Spring Boot? [[01:01:44]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=3704)

> Spring Boot **không thay thế** mà xây dựng **trên nền** Spring Framework. Framework cung cấp IoC, DI, AOP, MVC, Transaction. Spring Boot là lớp tiện ích với 4 trụ cột: **Starter Dependencies**, **Auto-Configuration**, **Embedded Server** (Tomcat nhúng), **Actuator**.

---

**Câu 32** — Auto-Configuration là gì? Làm sao biết khi nào tạo Bean? [[01:03:40]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=3820)

> Tự động đăng ký Bean dựa trên điều kiện: `@ConditionalOnClass` (thư viện có trong classpath?), `@ConditionalOnProperty` (property được set?). Điểm quan trọng nhất: **Back-off với `@ConditionalOnMissingBean`** — nếu developer tự khai báo Bean, Spring Boot tự nhường và không tạo Bean mặc định nữa.

---

**Câu 33** — Starter Dependency là gì? Giải quyết vấn đề gì? [[01:05:30]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=3930)

> Gói quản lý phụ thuộc theo từng tính năng. Không chứa code nghiệp vụ — chỉ là file Maven/Gradle kéo theo thư viện liên quan. Giải quyết **Version Conflict** vì Spring Boot kiểm thử và khóa sẵn phiên bản tương thích qua BOM (Bill of Materials).

---

**Câu 34** — `@SpringBootApplication` gồm những annotation nào? [[01:07:29]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=4049)

> Tổng hợp 3 annotation: (1) `@SpringBootConfiguration` (= `@Configuration` — lớp cấu hình gốc); (2) `@EnableAutoConfiguration` (kích hoạt Auto-Config); (3) `@ComponentScan` (quét Bean từ package class `main` trở xuống). Class `main` phải ở **root package**!

---

**Câu 35** — Tại sao Embedded Server hữu ích? [[01:09:29]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=4169)

> Thay vì cài Tomcat riêng và deploy `.war`, server nhúng thẳng vào `.jar`. Chạy ngay bằng `java -jar`, đảm bảo **đồng nhất phiên bản** server giữa Dev và Production, đóng gói Docker dễ dàng — lý tưởng cho kiến trúc Microservices.

---

**Câu 36** — Actuator là gì? Bảo mật cần lưu ý gì? [[01:11:30]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=4290)

> Module cung cấp endpoint giám sát: `/health` cho K8s Probe, `/metrics` cho Prometheus/Grafana, `/loggers` đổi log level runtime. **Bảo mật:** `/env` lộ password/secrets, `/heapdump` dump RAM — chỉ mở endpoint cần thiết, bảo vệ bằng Spring Security, tốt nhất tách sang port nội bộ.

---

## Nhóm 5: Spring Data JPA — Câu 37 đến 41

👉 Bài học chuyên sâu: [Spring Data JPA & Hibernate](./spring-data-jpa-mastery)

---

**Câu 37** — JPA, Hibernate và Spring Data JPA khác nhau? [[01:13:29]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=4409)

> **JPA**: Bản đặc tả (interface, annotation), không có code thực thi. **Hibernate**: ORM Framework hiện thực JPA, sinh SQL, giao tiếp DB. **Spring Data JPA**: Tầng trừu tượng trên JPA/Hibernate, tự tạo Proxy cho Repository interface, có sẵn CRUD/phân trang.

---

**Câu 38** — `CrudRepository` vs `JpaRepository`? [[01:15:21]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=4521)

> `CrudRepository`: CRUD cơ bản. `PagingAndSortingRepository`: thêm phân trang và sắp xếp. `JpaRepository`: bao gồm tất cả + `flush`, `saveAndFlush`, `deleteAllInBatch`. Thực tế 99% dùng **`JpaRepository`**.

---

**Câu 39** — Derived Query Method hoạt động ra sao? [[01:17:31]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=4651)

> Khi startup, Spring Data parse tên method (cắt `findBy`, tách tên field và toán tử `And`, `GreaterThan`...) và sinh JPQL. Ưu điểm: phát hiện lỗi tên field ngay khi start. Không nên dùng khi điều kiện quá phức tạp — tên method dài khó đọc; dùng `@Query`, `Specification` hoặc QueryDSL thay thế.

---

**Câu 40** — N+1 Query là gì? Nguyên nhân và cách fix? [[01:19:12]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=4752)

> 1 query lấy N bản ghi cha, vòng lặp truy cập quan hệ con → Hibernate bắn thêm N query riêng lẻ = N+1. Với N = 10.000 → 10.001 queries/request → cạn Connection Pool, sập DB. Fix chuẩn: **`JOIN FETCH`** hoặc **`@EntityGraph`** (1 query), **DTO Projection** (chỉ lấy field cần), `@BatchSize`. **Không đổi sang EAGER** — EAGER với `findAll()` JPQL vẫn gây N+1!

---

**Câu 41** — Lazy vs Eager Fetching? Mặc định JPA là gì? [[01:21:09]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=4869)

> **Lazy**: Gán Proxy rỗng, query chạy khi gọi getter (ngoài Transaction → `LazyInitializationException`). **Eager**: Tải luôn khi lấy entity cha. Mặc định JPA: `@ManyToOne`, `@OneToOne` = **Eager**; `@OneToMany`, `@ManyToMany` = **Lazy**. Best Practice: **LAZY tất cả** (kể cả `@ManyToOne`) + `JOIN FETCH`/`@EntityGraph` theo nhu cầu.

---

## Nhóm 6: Testing, Security & Architecture — Câu 42 đến 50

👉 Bài học chuyên sâu: [Spring Security, Testing & Architecture](./spring-security-testing)

---

**Câu 42** — Khi nào `@SpringBootTest`, khi nào `@WebMvcTest`? [[01:23:18]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=4998)

> `@SpringBootTest`: Khởi tạo gần toàn bộ ApplicationContext (Controller → Service → DB) — **Integration Test** toàn diện nhưng chậm. `@WebMvcTest`: Chỉ load tầng Web MVC — **Controller Slice Test** nhanh, phải `@MockBean` cho Service tầng dưới. Chiến lược: nhiều `@WebMvcTest` + ít `@SpringBootTest` cho critical flow.

---

**Câu 43** — `MockMvc` là gì? Server thật có khởi động không? [[01:25:32]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=5132)

> MockMvc kiểm thử Spring MVC **không khởi động HTTP Server thật, không mở cổng mạng**. Request giả lập đi thẳng vào DispatcherServlet trong bộ nhớ — nhanh nhưng vẫn kiểm tra đầy đủ: URL mapping, Validation, JSON serialization, xử lý lỗi.

---

**Câu 44** — Authentication vs Authorization? Khi nào 401, khi nào 403? [[01:27:45]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=5265)

> **Authentication** ("Bạn là ai?"): Chưa đăng nhập / Token hết hạn / sai mật khẩu → **401 Unauthorized**. **Authorization** ("Bạn được phép làm gì?"): Đã đăng nhập nhưng thiếu quyền truy cập → **403 Forbidden**. 401 = chưa biết bạn là ai, 403 = biết bạn nhưng không cho vào.

---

**Câu 45** — Spring Security bảo vệ request thế nào? [[01:29:55]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=5395)

> Dựa trên **Servlet Filter** (`SecurityFilterChain`) chặn request **trước** `DispatcherServlet`. Luồng: Filter trích xuất token → `AuthenticationManager` xác thực → lưu `Authentication` vào `SecurityContextHolder` → Filter phân quyền kiểm tra. Vì Filter trước DispatcherServlet, lỗi 401/403 không vào `@ControllerAdvice`.

---

**Câu 46** — `UserDetailsService` là gì? [[01:32:06]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=5526)

> Interface với 1 method `loadUserByUsername(username)` — **chỉ truy vấn DB và trả `UserDetails`** (username, password hash, roles). **Không so sánh mật khẩu** — trách nhiệm đó của `DaoAuthenticationProvider` qua `passwordEncoder.matches()`. Không dùng `.equals()` vì BCrypt dùng Salt ngẫu nhiên.

---

**Câu 47** — Tại sao dùng BCrypt thay vì MD5/AES? [[01:34:11]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=5651)

> AES là mã hóa 2 chiều — lộ khóa bí mật là lộ hết. MD5/SHA-256 nhanh quá (hàng tỷ hash/giây) → dễ brute-force, dễ dùng Rainbow Table. BCrypt: (1) Salt ngẫu nhiên → cùng mật khẩu ra hash khác nhau, (2) Cost factor làm chậm ~100ms/hash → brute-force cần hàng triệu năm. Constant-time comparison chống Timing Attack.

---

**Câu 48** — Session vs JWT? JWT có an toàn hơn Session không? [[01:36:15]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=5775)

> **Session (Stateful)**: Server lưu session (DB/Redis), gửi SessionID qua Cookie — thu hồi tức thì. **JWT (Stateless)**: Thông tin ký trong Token — server không lưu gì, scale dễ, phù hợp Microservices. **JWT không mặc định an toàn hơn** — khó thu hồi trước hạn. Fix: Access Token ngắn (5-15 phút) + Refresh Token hoặc Blacklist.

---

**Câu 49** — Red Flags trong Spring Security là gì? [[01:38:28]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=5908)

> 5 Red Flags: (1) `csrf.disable()` khi dùng Cookie/Session. (2) `anyRequest().permitAll()` — mở toang toàn bộ. (3) `NoOpPasswordEncoder` hoặc hardcode secret trong code rồi commit Git. (4) Kế thừa `WebSecurityConfigurerAdapter` đã removed ở Spring Security 6. (5) Trả Stack Trace chi tiết ra response.

---

**Câu 50** — Kiến trúc phân tầng sạch trong Spring Boot? [[01:40:35]](https://www.youtube.com/watch?v=LPiIG-3pfs0&t=6035)

> 3 tầng chiều phụ thuộc một hướng: **Controller** (HTTP protocol, `@Valid`, `ResponseEntity`) → **Service** (Business Logic, `@Transactional`) → **Repository** (Data access). Bắt buộc tách **DTO** (hợp đồng API) khỏi **Entity** (mô hình DB): tránh lộ field nhạy cảm (`passwordHash`), tránh `LazyInitializationException` khi Jackson serialize, và tách biệt API contract khỏi DB schema.

---

> [!TIP]
> 🎯 **Nguồn video gốc:** [[JSFW] 50 câu hỏi phỏng vấn Java Spring](https://www.youtube.com/watch?v=LPiIG-3pfs0)
>
> 📚 **Ôn tập cùng NotebookLM:** [Mở NotebookLM Spring](https://notebooklm.google.com/notebook/a9fe3af1-7d07-45ee-a271-e790602c3939)
