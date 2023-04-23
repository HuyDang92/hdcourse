import { Categories } from "../module/categories.js";

const getCategories = async () => {
    try {
        // Call api
        const [categories] = await Promise.all([Categories.getCat(`http://localhost:3000/api/categories`)]);
        // HTML element dom
        const table = document.getElementById("categories_list") as HTMLElement;
        let str: string = "";
        categories.forEach((item: any) => {
            str += ` <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.name}</td>
                        <td class="event_fuct" style="display: flex;">
                            <div class="update_item" style="cursor: pointer; margin-right: 1rem;" data-id-cat="${item.id}">
                                <span title="Sửa" class="material-symbols-outlined">edit</span>
                            </div>
                            <div class="remove_item" style="cursor: pointer;" data-id-cat="${item.id}">
                                <span title="Xóa" class="material-symbols-outlined">delete</span>
                            </div>
                        </td>
                    </tr>`;
        });
        table.insertAdjacentHTML("beforeend", str);
        // xóa danh mục
        table.addEventListener("click", async (e) => {
            e.preventDefault();
            if (e.target instanceof HTMLElement) {
                const removeItemCat = e.target.closest(".remove_item") as HTMLElement;
                const idCat = removeItemCat.dataset.idCat;
                if (confirm("Bạn chắc chắn muốn xóa 1 danh mục ?")) {
                    const id = Number(idCat);
                    await deleteCat(id);
                    const parentRemove_cat = removeItemCat.parentElement;
                    if (parentRemove_cat) {
                        parentRemove_cat.parentElement?.remove();
                    }
                    return;
                }
            }
        });
        // Sửa danh mục
        table.addEventListener("click", async (e) => {
            if (e.target instanceof HTMLElement) {
                const updateItemCat = e.target.closest(".update_item") as HTMLElement;
                const idCat = updateItemCat.dataset.idCat;
                if (updateItemCat) {
                    const id = Number(idCat);
                    const form = document.getElementById("addCategoryForm") as HTMLFormElement;
                    const btn = document.getElementById("btnSubmit") as HTMLElement;
                    const btnUD = document.getElementById("btnSubmitUD") as HTMLElement;

                    form.style.display = "block";
                    btn.style.display = "none";
                    btnUD.style.display = "block";
                    form.scrollIntoView({ behavior: "smooth" });
                    updateItem(id);
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
};
const addItem = async () => {
    const btnSubmit = document.getElementById("btnSubmit") as HTMLElement;
    const form = document.getElementById("addCategoryForm") as HTMLFormElement;

    btnSubmit.addEventListener("click", async (e) => {
        const name = document.querySelector("#catName") as HTMLInputElement;
        Categories.addCat(`http://localhost:3000/api/categories`, name.value, "").then(() => {
            alert("Thêm danh mục thành công");
            location.reload();
        });
    });
};
let eventSubmit: any = null;
const updateItem = async (id: number) => {
    const table = document.getElementById("addCategoryForm") as HTMLElement;
    const btnUD = document.getElementById("btnSubmitUD") as HTMLElement;

    const name = document.querySelector("#catName") as HTMLInputElement;
    const title = document.getElementById("title_form_cat") as HTMLElement;
    const data = await Categories.getCategoryById<number>(`http://localhost:3000/api/categories`, id);
    name.value = String(data?.name);
    title.innerHTML = "Sửa danh mục";
    if (eventSubmit) {
        table.removeEventListener("click", eventSubmit);
    }
    eventSubmit = (event: Event) => {
        event.preventDefault();
        Categories.updateCat(`http://localhost:3000/api/categories`, id, name.value, "").then(() => {
            alert("Sửa thành công");
            location.reload();
        });
    };
    form.addEventListener("submit", function (event) {
        // Ngăn chặn sự kiện submit mặc định của form
        event.preventDefault();
    });
    btnUD.addEventListener("click", eventSubmit);
};
const deleteCat = async (id: number) => {
    Categories.deleteCat(`http://localhost:3000/api/categories`, id);
};
getCategories();
// Event
const form = document.getElementById("addCategoryForm") as HTMLFormElement;
const btnAdd = document.getElementById("btnAddCat") as HTMLElement;
const btnUD = document.getElementById("btnSubmitUD") as HTMLElement;

// Sự kiện click hiện ra form thêm danh mục
btnAdd.addEventListener("click", () => {
    if (form.style.display == "block") {
        location.reload();
    } else {
        form.style.display = "block";
        btnUD.style.display = "none";
        addItem();
    }
    form.scrollIntoView({ behavior: "smooth" });
});
// Sự kiện submit form thêm danh mục
