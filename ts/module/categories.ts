export class Categories {
    id: number;
    name: string;
    thumb: string;

    constructor(id: number, name: string, thumb: string) {
        this.id = id;
        this.name = name;
        this.thumb = thumb;
    }

    static async getCat(url: string) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const categories = data.map((item: { id: number; name: string; thumb: string }) => new Categories(item.id, item.name, item.thumb));
        return categories;
    }
    static async getCategoryById<T>(url: string, id: T): Promise<Categories | null> {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return null;
        }
        const data = await response.json();
        if (!data) {
            console.error(`No category found with id: ${id}`);
            return null;
        }
        const category = new Categories(data.id, data.name, data.thumb);
        return category;
    }
    
    @ValidateInput
    static async addCat(url: string, name: string, thumb?: string) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, thumb }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    }
    static async updateCat(url: string, id: number, name: string, thumb?: string) {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, thumb }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    }
    static async deleteCat(url: string, id: number) {
        const response = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    }
}
function ValidateInput(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const nameInput = document.querySelector("#catName") as HTMLInputElement;
        const nameInputValue = nameInput.value;
        if (!nameInputValue) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return false;
        }
        return originalMethod.apply(this, args);
    };
}
