export class Teachers {
    id: number;
    name: string;
    avatar: string;
    introduce: string;
    subject: string;
    rating: number;
    flollowers: number;

    constructor(id: number, name: string, avatar: string, introduce: string, subject: string, rating: number, flollowers: number) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.introduce = introduce;
        this.subject = subject;
        this.rating = rating;
        this.flollowers = flollowers;
    }

    static async getTeachers(url: string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const teachers = data.map(
            (item: { id: number; name: string; avatar: string; introduce: string; subject: string; rating: number; flollowers: number }) =>
                new Teachers(item.id, item.name, item.avatar, item.introduce, item.subject, item.rating, item.flollowers)
        );
        return teachers;
    }
    static async getTeacherById(url: string, id: number): Promise<Teachers | null> {
        try {
            const response = await fetch(`${url}/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const teacher = new Teachers(data.id, data.name, data.avatar, data.introduce, data.subject, data.rating, data.flollowers);
            return teacher;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
