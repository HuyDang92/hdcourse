console.log("12345678");
import { Categories } from "./module/categories";
// import { Courses, CourseDetail } from "./../module/courses.js";
// import { Teachers } from "./../module/teachers.js";
console.log(Categories);
// const getCategories = async () => {
//     try {
//         // Call api
//         const [categories, courses] = await Promise.all([
//             Categories.getCat(`http://localhost:3000/api/categories`),
//             Courses.getCourses(`http://localhost:3000/api/courses`),
//         ]);
//         // HTML element dom
//         const listWrapper = document.getElementById("card_course") as HTMLElement;
//         let str: string = "";
//         categories.forEach((item: any) => {
//             console.log(item);
//         });
//         listWrapper.insertAdjacentHTML("beforeend", str);
//     } catch (error) {
//         console.error(error);
//     }
// };
// getCategories();
