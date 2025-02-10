linkedin profile url ==> user schema

student gaurdian details
resume link
login activity

student session book=> 3 possible ia, 2 mentors,

/api/v1/auth/register
/api/v1/student/profile-setup

Student onboarding
post > /student/profile-setup
Request: stdCode, current courses
Response: true false

get > /student/get-mentors couses
Request: course
Response: mentors list [name, slots]

post> /student/session-request
Request: mentorId, courseId, studentID slot, title, description, joinee's emails
Response: true false

mentors based on courses

get > /student/get-past-session  
get > /student/get-present-session
get > /student/get-future-session

Mentor onboarding

post> /mentor/profile-setup
Request: mentorId, current courses
Response: true false

post> /mentor/get-requested-sessions
Request: mentorId
Response: requested sessions details

get> /mentor/get-past-session
get> /mentor/get-present-session  
get> /mentor/get-future-session

get mentors by course

admin get get all users | pending users
create slot

Dashboard
Book sessions > get > tit

session details > title times instructors status course_short
route

Courses Schema
courseId
courseName
category

Routes
/course/get-all-courses
/course/get-courses
Request: category
Response: course list

/admin/pending-users-list  
/admin/users-approval
        Request: userId, status, role
Response: true false

/student/profile-setup
        Request: studentCode, currentCourses, skills
        Response: true false
/student/profile-book-session
        Request: studentId, mentorId, courseId, title, description, joinee's emails[], startTime, endTime
        Response: true false

/student/upcoming-session -> logic correction
/student/past-session

/mentor/profile-setup
        Request: mentorId, currentCourses, skills
        Response: true false
/mentor/get-past-session -> logic correction
/mentor/create-slot
        Request: mentorId, slots
        Response: true false










