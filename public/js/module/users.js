export class Users {
    constructor(id, fullname, email, password, phone, avatar) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.avatar = avatar;
    }
    static async getUser(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const users = data.map((item) => new Users(item.id, item.fullname, item.email, item.password, item.phone, item.avatar));
        return users;
    }
    static async getUserById(url, id) {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return null;
        }
        try {
            const data = await response.json();
            if (!data) {
                console.error(`No user found with id: ${id}`);
                return null;
            }
            const user = new Users(data.id, data.fullname, data.email, data.password, data.phone, data.avatar);
            return user;
        }
        catch (error) {
            console.error(`Error parsing JSON: ${error}`);
            return null;
        }
    }
    static async addUser(url, data) {
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
        else {
            const responseData = await response.json();
            return responseData;
        }
    }
    static async updateUser(url, id, data) {
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
    static async changePass(url, data) {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        else {
            const responseData = await response.json();
            return responseData;
        }
    }
    static async deleteUser(url, id) {
        const response = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return "Xóa thành công";
    }
}
