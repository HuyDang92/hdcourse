export class Courses {
    id: number;
    id_category: number;
    id_teacher: number;
    name: string;
    price: number;
    thumb: string;
    followers: number;
    views: number;
    des: string;
    benefit: string;
    hot: boolean;
    currentUpdate: Date;

    constructor(
        id: number,
        id_category: number,
        id_teacher: number,
        name: string,
        price: number,
        thumb: string,
        followers: number,
        views: number,
        des: string,
        benefit: string,
        hot: boolean,
        currentUpdate: Date
    ) {
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

    static async getCourses(url: string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const courses = data.map(
            (item: {
                id: number;
                id_category: number;
                id_teacher: number;
                name: string;
                price: number;
                thumb: string;
                followers: number;
                views: number;
                des: string;
                benefit: string;
                hot: boolean;
                currentUpdate: Date;
            }) =>
                new Courses(
                    item.id,
                    item.id_category,
                    item.id_teacher,
                    item.name,
                    item.price,
                    item.thumb,
                    item.followers,
                    item.views,
                    item.des,
                    item.benefit,
                    item.hot,
                    new Date(item.currentUpdate)
                )
        );
        return courses;
    }
    static async getCourseById<T>(url: string, id: T): Promise<Courses | null> {
        try {
            const response = await fetch(`${url}/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const course = new Courses(
                data.id,
                data.id_category,
                data.id_teacher,
                data.name,
                data.price,
                data.thumb,
                data.followers,
                data.views,
                data.des,
                data.benefit,
                data.hot,
                new Date(data.currentUpdate)
            );
            return course;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async getCourseCate<T>(url: string, id: T): Promise<Courses[]> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const courses = data.map(
            (item: {
                id: number;
                id_category: number;
                id_teacher: number;
                name: string;
                price: number;
                thumb: string;
                followers: number;
                views: number;
                des: string;
                benefit: string;
                hot: boolean;
                currentUpdate: Date;
            }) =>
                new Courses(
                    item.id,
                    item.id_category,
                    item.id_teacher,
                    item.name,
                    item.price,
                    item.thumb,
                    item.followers,
                    item.views,
                    item.des,
                    item.benefit,
                    item.hot,
                    new Date(item.currentUpdate)
                )
        );
        return courses;
    }
    @ValidateInput
    static async addCourse<T>(url: string, data: T) {
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

    static async updateCourse<T>(url: string, id: number, data: T) {
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

    static async deleteCourse(url: string, id: number) {
        const response = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    }
}
export class CourseDetail {
    id: number;
    id_course: number;
    routes: string;
    totalTime: string;
    count: number;

    constructor(id: number, id_course: number, routes: string, totalTime: string, count: number) {
        this.id = id;
        this.id_course = id_course;
        this.routes = routes;
        this.totalTime = totalTime;
        this.count = count;
    }
    static async getCourseDetail<T>(url: string, id: T): Promise<CourseDetail[]> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const courseDetails = data.map(
            (item: { id: number; id_course: number; routes: string; totalTime: string; count: number }) =>
                new CourseDetail(item.id, item.id_course, item.routes, item.totalTime, item.count)
        );
        return courseDetails;
    }
}
function ValidateInput(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const name = document.getElementById("productName") as HTMLInputElement;
        const price = document.getElementById("price") as HTMLInputElement;
        const details = document.getElementById("details") as HTMLInputElement;
        const benefit = document.getElementById("benefit") as HTMLInputElement;
        if (!name.value || !price.value || !details.value || !benefit.value) {
            alert("Vui lòng nhập đủ thông tin!");
            return false;
        }
        return originalMethod.apply(this, args);
    };
}
