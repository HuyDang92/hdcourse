import { Users } from "../module/users.js";
const getUsers = async () => {
    try {
        // Call api
        const [users] = await Promise.all([Users.getUser(`http://localhost:3000/api/users`)]);
        // HTML element dom
        const table = document.getElementById("users_list");
        let str = "";
        users.forEach((item) => {
            str += ` <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.fullname}</td>
                        <td>${item.email}</td>
                        <td>${item.phone}</td>
                        <td class="event_fuct" style="display: flex;">
                            
                            <div class="remove_item" style="cursor: pointer;" data-id-cat="${item.id}">
                                <span title="Xóa" class="material-symbols-outlined">delete</span>
                            </div>
                        </td>
                    </tr>`;
        });
        table.insertAdjacentHTML("beforeend", str);
        // xóa danh mục
        table.addEventListener("click", async (e) => {
            var _a;
            e.preventDefault();
            if (e.target instanceof HTMLElement) {
                const removeItemCat = e.target.closest(".remove_item");
                const idCat = removeItemCat.dataset.idCat;
                if (confirm("Bạn chắc chắn muốn xóa 1 danh mục ?")) {
                    const id = Number(idCat);
                    // await deleteCat(id);
                    const parentRemove_cat = removeItemCat.parentElement;
                    if (parentRemove_cat) {
                        (_a = parentRemove_cat.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
                    }
                    return;
                }
            }
        });
    }
    catch (error) {
        console.error(error);
    }
};
getUsers();
