var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
export class Categories {
    constructor(id, name, thumb) {
        this.id = id;
        this.name = name;
        this.thumb = thumb;
    }
    static async getCat(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const categories = data.map((item) => new Categories(item.id, item.name, item.thumb));
        return categories;
    }
    static async getCategoryById(url, id) {
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
    static async addCat(url, name, thumb) {
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
    static async updateCat(url, id, name, thumb) {
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
    static async deleteCat(url, id) {
        const response = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    }
}
__decorate([
    ValidateInput,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], Categories, "addCat", null);
function ValidateInput(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const nameInput = document.querySelector("#catName");
        const nameInputValue = nameInput.value;
        if (!nameInputValue) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return false;
        }
        return originalMethod.apply(this, args);
    };
}
