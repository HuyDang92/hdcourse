//
import { Users } from "../module/users.js";

const changePass = async () => {
    const oldPassword = document.querySelector("#oldPassword") as HTMLInputElement;
    const newPassword = document.querySelector("#newPassword") as HTMLInputElement;
    const rePassword = document.querySelector("#rePassword") as HTMLInputElement;

    if (newPassword.value != rePassword.value) {
        alert("Mật khẩu xác nhận không đúng!");
        return;
    }
    const data = { oldPassword: oldPassword.value, newPassword: newPassword.value };
    const mes = await Users.changePass(`http://localhost:3000/admin/changePass`, data);
    if (mes.err) {
        alert(mes.err);
        return;
    } else {
        alert(mes.susses);
        window.location.href = "/admin/profile"; // Thay đổi URL của trang web
    }
};
const btnSave = document.querySelector("#btnSave") as HTMLElement;
btnSave.addEventListener("click", changePass);
const changeInfo = async () => {
    const idUser = document.querySelector("#idUser") as HTMLInputElement;
    const fullname = document.querySelector("#fullName") as HTMLInputElement;
    const email = document.querySelector("#email") as HTMLInputElement;
    const phone = document.querySelector("#phoneNumber") as HTMLInputElement;
    const avt = document.querySelector("#avatar") as HTMLInputElement;

    const thumbFile = avt.files && avt.files.length > 0 ? avt.files[0] : "";
    if (thumbFile) {
        const formData = new FormData();
        formData.append("avt", thumbFile);
        await fetch("http://localhost:3000/admin/uploadAvt", {
            method: "POST",
            body: formData,
        });
        console.log("Đã upload ảnh thành công!");
    }

    const user = await Users.getUserById<number>(`http://localhost:3000/api/users`, Number(idUser.value));
    if (user) {
        const data = {
            fullname: fullname.value,
            email: email.value,
            password: user?.password,
            phone: phone.value,
            avatar: avt.files && avt.files.length > 0 ? avt.files[0].name : "avt.avif",
        };
        Users.updateUser(`http://localhost:3000/api/users`, Number(idUser.value), data).then(() => {
            alert("Lưu thành công");
            location.reload();
        });
    } else {
        console.log("Lỗi");
    }
};
const btnSaveInfo = document.querySelector("#btnSaveInfo") as HTMLElement;
btnSaveInfo.addEventListener("click", changeInfo);
