// import module từ config.js
import { getData, removeData, updateInfo, changePW } from "././config.js";

const email_user = localStorage.getItem("email_user");
const admin = localStorage.getItem("admin_mode");
// element
const form = document.querySelector("#formInfo");
const avt = document.querySelector(".profile");
const cardTitle = document.querySelector(".card-title");
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const phoneNumberInput = document.querySelector("#phoneNumber");
const avatarInput = document.querySelector("#avatar");
const city = document.querySelector("#city");
const district = document.querySelector("#district");
const village = document.querySelector("#village");
const detailAddress = document.querySelector("#detail_address");

const formchangePassword = document.querySelector("#changePassword");
const oldPassword = document.querySelector("#oldPassword");
const newPassword = document.querySelector("#newPassword");
const rePassword = document.querySelector("#rePassword");

const informationUser = async () => {
    const data = await getData("users");
    const users = data.val();
    if (email_user) {
        const user = Object.values(users).find((user) => user.email === email_user);
        avt.src = `../${user.avatar}`;
        cardTitle.innerHTML = user.name;
        fullNameInput.value = user.name;
        emailInput.value = user.email;
        phoneNumberInput.value = user.sdt;
        editInfo(user.id_user);
        changePassword(user.id_user, user.password);
    } else if (admin) {
        const user = Object.values(users).find((user) => user.email === admin);
        avt.src = `../${user.avatar}`;
        cardTitle.innerHTML = user.name;
        fullNameInput.value = user.name;
        emailInput.value = user.email;
        phoneNumberInput.value = user.sdt;
        editInfo(user.id_user);
        changePassword(user.id_user, user.password);
    }
};

const editInfo = (id) => {
    form.addEventListener("submit", (event) => {
        const email = emailInput.value;
        const phone = phoneNumberInput.value;
        const name = fullNameInput.value;
        event.preventDefault();
        console.log(id, email, phone, name);
        updateInfo(id, email, phone, name);
    });
};
const changePassword = (id, password) => {
    formchangePassword.addEventListener("submit", (event) => {
        event.preventDefault();
        if (oldPassword.value != password) {
            alert("Sai mật khẩu! Vui lòng kiểm tra lại");
        } else if (newPassword.value != rePassword.value) {
            alert("Mật khẩu mới không trùng khớp!");
        } else {
            changePW(id, newPassword.value);
        }
    });
};

informationUser();
