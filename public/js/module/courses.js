var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
export class Courses {
    constructor(id, id_category, id_teacher, name, price, thumb, followers, views, des, benefit, hot, currentUpdate) {
        this.id = id;
        this.id_category = id_category;
        this.id_teacher = id_teacher;
        this.name = name;
        this.price = price;
        this.thumb = thumb;
        this.followers = followers;
        this.views = views;
        this.des = des;
        this.benefit = benefit;
        this.hot = hot;
        this.currentUpdate = currentUpdate;
    }
    static async getCourses(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const courses = data.map((item) => new Courses(item.id, item.id_category, item.id_teacher, item.name, item.price, item.thumb, item.followers, item.views, item.des, item.benefit, item.hot, new Date(item.currentUpdate)));
        return courses;
    }
    static async getCourseById(url, id) {
        try {
            const response = await fetch(`${url}/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const course = new Courses(data.id, data.id_category, data.id_teacher, data.name, data.price, data.thumb, data.followers, data.views, data.des, data.benefit, data.hot, new Date(data.currentUpdate));
            return course;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    static async getCourseCate(url, id) {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const courses = data.map((item) => new Courses(item.id, item.id_category, item.id_teacher, item.name, item.price, item.thumb, item.followers, item.views, item.des, item.benefit, item.hot, new Date(item.currentUpdate)));
        return courses;
    }
    static async addCourse(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    }
    static async updateCourse(url, id, data) {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    }
    static async deleteCourse(url, id) {
        const response = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    }
}
__decorate([
    ValidateInput,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof T !== "undefined" && T) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], Courses, "addCourse", null);
export class CourseDetail {
    constructor(id, id_course, routes, totalTime, count) {
        this.id = id;
        this.id_course = id_course;
        this.routes = routes;
        this.totalTime = totalTime;
        this.count = count;
    }
    static async getCourseDetail(url, id) {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const courseDetails = data.map((item) => new CourseDetail(item.id, item.id_course, item.routes, item.totalTime, item.count));
        return courseDetails;
    }
}
function ValidateInput(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const name = document.getElementById("productName");
        const price = document.getElementById("price");
        const details = document.getElementById("details");
        const benefit = document.getElementById("benefit");
        if (!name.value || !price.value || !details.value || !benefit.value) {
            alert("Vui lòng nhập đủ thông tin!");
            return false;
        }
        return originalMethod.apply(this, args);
    };
}
