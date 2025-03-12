### **1. Authentication Endpoints**

#### **Login**

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticate a user (Admin, Teacher, or Student) and return a JWT token.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token",
    "role": "admin/teacher/student",
    "userId": "user_id"
  }
  ```

#### **Register**

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Register a new user (Admin, Teacher, or Student).
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "user@example.com",
    "password": "password123",
    "role": "admin/teacher/student"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "userId": "user_id"
  }
  ```

---

### **2. Admin Endpoints**

#### **Add Student**

- **URL:** `/api/admin/add-student`
- **Method:** `POST`
- **Description:** Add a new student.
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Student added successfully",
    "studentId": "student_id"
  }
  ```

#### **Add Teacher**

- **URL:** `/api/admin/add-teacher`
- **Method:** `POST`
- **Description:** Add a new teacher.
- **Request Body:**
  ```json
  {
    "name": "Mr. Smith",
    "email": "smith@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Teacher added successfully",
    "teacherId": "teacher_id"
  }
  ```

#### **Create Course**

- **URL:** `/api/admin/create-course`
- **Method:** `POST`
- **Description:** Create a new course.
- **Request Body:**
  ```json
  {
    "course_name": "Mathematics",
    "teacher_id": "teacher_id"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Course created successfully",
    "courseId": "course_id"
  }
  ```

#### **Assign Course to Teacher**

- **URL:** `/api/admin/assign-course`
- **Method:** `PUT`
- **Description:** Assign a course to a teacher.
- **Request Body:**
  ```json
  {
    "course_id": "course_id",
    "teacher_id": "teacher_id"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Course assigned successfully"
  }
  ```

#### **Generate Campus-Wide Reports**

- **URL:** `/api/admin/reports`
- **Method:** `GET`
- **Description:** Generate attendance reports for the entire campus.
- **Response:**
  ```json
  {
    "report": "campus_attendance_report.pdf"
  }
  ```

---

### **3. Teacher Endpoints**

#### **Get All Courses Assigned to Teacher**

- **URL:** `/api/teacher/courses`
- **Method:** `GET`
- **Description:** Fetch all courses assigned to the logged-in teacher.
- **Response:**
  ```json
  [
    {
      "_id": "course_id",
      "course_name": "Mathematics",
      "teacher_id": "teacher_id"
    }
  ]
  ```

#### **Mark Attendance**

- **URL:** `/api/teacher/mark-attendance`
- **Method:** `POST`
- **Description:** Mark attendance for a specific course.
- **Request Body:**
  ```json
  {
    "course_id": "course_id",
    "date": "2023-10-15",
    "attendance": [
      {
        "student_id": "student_id",
        "status": "Present/Absent"
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "message": "Attendance marked successfully"
  }
  ```

#### **View Attendance for a Course**

- **URL:** `/api/teacher/attendance/:courseId`
- **Method:** `GET`
- **Description:** Fetch attendance records for a specific course.
- **Response:**
  ```json
  [
    {
      "student_id": "student_id",
      "date": "2023-10-15",
      "status": "Present/Absent"
    }
  ]
  ```

#### **Generate Reports for a Course**

- **URL:** `/api/teacher/reports/:courseId`
- **Method:** `GET`
- **Description:** Generate attendance reports for a specific course.
- **Response:**
  ```json
  {
    "report": "course_attendance_report.pdf"
  }
  ```

---

### **4. Student Endpoints**

#### **View Attendance Records**

- **URL:** `/api/student/attendance/:studentId`
- **Method:** `GET`
- **Description:** Fetch attendance records for a specific student.
- **Response:**
  ```json
  [
    {
      "course_id": "course_id",
      "date": "2023-10-15",
      "status": "Present/Absent"
    }
  ]
  ```

#### **Receive Notifications**

- **URL:** `/api/student/notifications/:studentId`
- **Method:** `GET`
- **Description:** Fetch notifications for a specific student.
- **Response:**
  ```json
  [
    {
      "message": "Your attendance is below 75%",
      "date": "2023-10-15"
    }
  ]
  ```

#### ** Enroll a Student in a Course**

- **Request:**
  ```
  POST /api/student/enroll/:courseId
  ```
  - Replace `:courseId` with the actual course ID.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Enrolled successfully",
    "student": {
      "_id": "student_id",
      "name": "John Doe",
      "email": "john@example.com",
      "courses": ["course_id"]
    }
  }
  ```

#### ** Get All Courses Enrolled by a Student**

- **Request:**
  ```
  GET /api/student/courses
  ```
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Response:**
  ```json
  [
    {
      "_id": "course_id",
      "course_name": "Mathematics",
      "teacher_id": "teacher_id"
    },
    {
      "_id": "course_id_2",
      "course_name": "Physics",
      "teacher_id": "teacher_id_2"
    }
  ]
  ```

---

### **5. Utility Endpoints**

#### **Get All Students**

- **URL:** `/api/students`
- **Method:** `GET`
- **Description:** Fetch a list of all students.
- **Response:**
  ```json
  [
    {
      "_id": "student_id",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  ]
  ```

#### **Get All Teachers**

- **URL:** `/api/teachers`
- **Method:** `GET`
- **Description:** Fetch a list of all teachers.
- **Response:**
  ```json
  [
    {
      "_id": "teacher_id",
      "name": "Mr. Smith",
      "email": "smith@example.com"
    }
  ]
  ```

#### **Get All Courses**

- **URL:** `/api/courses`
- **Method:** `GET`
- **Description:** Fetch a list of all courses.
- **Response:**
  ```json
  [
    {
      "_id": "course_id",
      "course_name": "Mathematics",
      "teacher_id": "teacher_id"
    }
  ]
  ```

---

### **6. Scalability Considerations**

To ensure the project is scalable:

1. **Modular Codebase:**

   - Organize the backend into modules (e.g., `auth`, `admin`, `teacher`, `student`).
   - Use middleware for common tasks like authentication and validation.

2. **Database Indexing:**

   - Add indexes to frequently queried fields (e.g., `course_id`, `student_id`, `date`).

3. **Caching:**

   - Use caching (e.g., Redis) for frequently accessed data like course lists or attendance records.

4. **Load Balancing:**

   - Deploy the backend on multiple servers and use a load balancer to distribute traffic.

5. **Asynchronous Processing:**

   - Use message queues (e.g., RabbitMQ) for tasks like sending notifications or generating reports.

6. **API Versioning:**

   - Use versioning (e.g., `/api/v1/...`) to ensure backward compatibility when adding new features.

7. **Monitoring and Logging:**
   - Use tools like Prometheus and Grafana for monitoring.
   - Implement logging for debugging and auditing.
