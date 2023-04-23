export class Teachers {
    constructor(id, name, avatar, introduce, subject, rating, flollowers) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.introduce = introduce;
        this.subject = subject;
        this.rating = rating;
        this.flollowers = flollowers;
    }
    static async getTeachers(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const teachers = data.map((item) => new Teachers(item.id, item.name, item.avatar, item.introduce, item.subject, item.rating, item.flollowers));
        return teachers;
    }
    static async getTeacherById(url, id) {
        try {
            const response = await fetch(`${url}/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const teacher = new Teachers(data.id, data.name, data.avatar, data.introduce, data.subject, data.rating, data.flollowers);
            return teacher;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}
