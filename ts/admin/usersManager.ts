import { Users } from "../module/users.js";

const getUsers = async () => {
    try {
        // Call api
        const [users] = await Promise.all([Users.getUser(`http://localhost:3000/api/users`)]);
        // HTML element dom
        const table = document.getElementById("users_list") as HTMLElement;
        let str: string = "";
        users.forEach((item: any) => {
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
            e.preventDefault();
            if (e.target instanceof HTMLElement) {
                const removeItemCat = e.target.closest(".remove_item") as HTMLElement;
                const idCat = removeItemCat.dataset.idCat;
                if (confirm("Bạn chắc chắn muốn xóa 1 danh mục ?")) {
                    const id = Number(idCat);
                    // await deleteCat(id);
                    const parentRemove_cat = removeItemCat.parentElement;
                    if (parentRemove_cat) {
                        parentRemove_cat.parentElement?.remove();
                    }
                    return;
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
};
getUsers();
