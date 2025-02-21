const app = document.getElementById("app");
const users = [
    {
        email: "teste@teste.com",
        phone: "999999999",
        ref: 100,
        refBy: null
    },
    {
        email: "thus@thus.com",
        phone: "888888888",
        ref: 200,
        refBy: 100
    }
];

const getUser = (userData) => { 
    return users.find((user => {
        return user.email == userData.email && user.phone == userData.phone;
    }))
};

const formAction = () => {
    const form = document.getElementById("form");
    form.onsubmit = (event) => {   
        event.preventDefault();
        const formData = new FormData(form);
        const userData = {
            email: formData.get("email"),
            phone: formData.get("phone")
        }
    };

    const user = getUser(userData);
    if (user) {
        showInvite(user);
    } else { //o undefined cai direto no else

    }
}

const startApp = () => {
    const content = `<form id="form">
        <input type="email" name="email" id="email" placeholder="E-mail">
        <input type="text" name="phone" placeholder="Telefone">
        <button>Confirmar</button>
    </form>`;

    app.innerHTML = content;

    formAction();
};
startApp(); 