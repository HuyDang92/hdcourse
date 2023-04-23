import { Users } from "./module/users.js";

// Sử dụng bcrypt trong code của bạn
const signUp = async () => {
    const fullname = document.querySelector("#fullname") as HTMLInputElement;
    const email = document.querySelector("#email") as HTMLInputElement;
    const password = document.querySelector("#password") as HTMLInputElement;
    const repassword = document.querySelector("#repassword") as HTMLInputElement;

    if (fullname.value == "" || email.value == "" || password.value == "" || repassword.value == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    if (password.value != repassword.value) {
        alert("Mật khẩu xác nhận không đúng!");
        return;
    }
    const user = await Users.getUserById<string>(`http://localhost:3000/api/users/email`, email.value);
    if (email.value === user?.email) {
        alert("Email đã được đăng ký");
        return;
    } else {
        const data = { fullname: fullname.value, email: email.value, password: password.value, avatar: "avt.img" };
        const mes = await Users.addUser(`http://localhost:3000/user/regisHandle`, data);
        if (mes.mes) {
            alert(mes.mes);
            location.reload(); //
        }
    }
};
const btnRegis = document.querySelector("#btnRegis") as HTMLElement;
if (btnRegis) {
    btnRegis.addEventListener("click", signUp);
}
// Đăng nhập
const signIn = async () => {
    const email = document.querySelector("#logInemail") as HTMLInputElement;
    const password = document.querySelector("#logInPassword") as HTMLInputElement;

    if (email.value == "" || password.value == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    const user = await Users.getUserById<string>(`http://localhost:3000/api/users/email`, email.value);
    if (!user) {
        alert("Tài khoản hoặc mật khẩu không chính xác!");
    } else {
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
const btnLogIn = document.querySelector("#btnLogIn") as HTMLElement;
if (btnLogIn) {
    btnLogIn.addEventListener("click", signIn);
}
// quên mật khẩu
const forgotPass = async () => {
    const email = document.querySelector("#emailForgot") as HTMLInputElement;

    if (email.value == "") {
        alert("Vui lòng nhập email!");
        return;
    }
    const data = { emailForgot: email.value };
    const mes = await Users.addUser(`http://localhost:3000/user/forgotPassHandle`, data);
    if (mes.err) {
        alert("Email không tồn tại!");
    } else {
        window.location.href = mes.susses; // Thay đổi URL của trang web
    }
};
const btnForgotPass = document.querySelector("#btnForgotPass") as HTMLElement;
if (btnForgotPass) {
    btnForgotPass.addEventListener("click", forgotPass);
}
// Đổi mật khẩu
const changePass = async () => {
    const newPassword = document.querySelector("#newPassword") as HTMLInputElement;
    const rePassword = document.querySelector("#rePassword") as HTMLInputElement;

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
const btnChangePass = document.querySelector("#btnChangePass") as HTMLElement;
if (btnChangePass) {
    btnChangePass.addEventListener("click", changePass);
}
