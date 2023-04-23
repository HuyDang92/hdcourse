import { Users } from "./module/users.js";
// Sử dụng bcrypt trong code của bạn
const signUp = async () => {
    const fullname = document.querySelector("#fullname");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const repassword = document.querySelector("#repassword");
    if (fullname.value == "" || email.value == "" || password.value == "" || repassword.value == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    if (password.value != repassword.value) {
        alert("Mật khẩu xác nhận không đúng!");
        return;
    }
    const user = await Users.getUserById(`http://localhost:3000/api/users/email`, email.value);
    if (email.value === (user === null || user === void 0 ? void 0 : user.email)) {
        alert("Email đã được đăng ký");
        return;
    }
    else {
        const data = { fullname: fullname.value, email: email.value, password: password.value, avatar: "avt.img" };
        const mes = await Users.addUser(`http://localhost:3000/user/regisHandle`, data);
        if (mes.mes) {
            alert(mes.mes);
            location.reload(); //
        }
    }
};
const btnRegis = document.querySelector("#btnRegis");
if (btnRegis) {
    btnRegis.addEventListener("click", signUp);
}
// Đăng nhập
const signIn = async () => {
    const email = document.querySelector("#logInemail");
    const password = document.querySelector("#logInPassword");
    if (email.value == "" || password.value == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    const user = await Users.getUserById(`http://localhost:3000/api/users/email`, email.value);
    if (!user) {
        alert("Tài khoản hoặc mật khẩu không chính xác!");
    }
    else {
        const data = { email: email.value, password: password.value };
        const mes = await Users.addUser(`http://localhost:3000/user/loginHandle`, data);
        console.log(mes);
        if (mes.err) {
            alert(mes.err);
            return;
        }
        window.location.href = mes.mes; // Thay đổi URL của trang web
    }
};
const btnLogIn = document.querySelector("#btnLogIn");
if (btnLogIn) {
    btnLogIn.addEventListener("click", signIn);
}
// quên mật khẩu
const forgotPass = async () => {
    const email = document.querySelector("#emailForgot");
    if (email.value == "") {
        alert("Vui lòng nhập email!");
        return;
    }
    const data = { emailForgot: email.value };
    const mes = await Users.addUser(`http://localhost:3000/user/forgotPassHandle`, data);
    if (mes.err) {
        alert("Email không tồn tại!");
    }
    else {
        window.location.href = mes.susses; // Thay đổi URL của trang web
    }
};
const btnForgotPass = document.querySelector("#btnForgotPass");
if (btnForgotPass) {
    btnForgotPass.addEventListener("click", forgotPass);
}
// Đổi mật khẩu
const changePass = async () => {
    const newPassword = document.querySelector("#newPassword");
    const rePassword = document.querySelector("#rePassword");
    if (newPassword.value == "" || rePassword.value == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    if (newPassword.value != rePassword.value) {
        alert("Mật khẩu xác nhận không đúng!");
        return;
    }
    const data = { newPassword: newPassword.value };
    const mes = await Users.changePass(`http://localhost:3000/user/changePassHandle`, data);
    alert(mes.susses);
    window.location.href = "/user"; // Thay đổi URL của trang web
};
const btnChangePass = document.querySelector("#btnChangePass");
if (btnChangePass) {
    btnChangePass.addEventListener("click", changePass);
}
