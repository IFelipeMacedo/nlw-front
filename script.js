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
    },
    {
        email: "tost@tost.com",
        phone: "777777777",
        ref: 300,
        refBy: 200
    }
];

const getUser = (userData) => { 
    return users.find((user) => {
        return user.email == userData.email && user.phone == userData.phone;
    });
};

const getTotalSubscribers = (userData) => {
    const subs = users.filter((user) => {
        return user.refBy == userData.ref;
    });
    return subs.length;
}

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 4000),
        refBy: 100
    }
    users.push(newUser);
    return newUser;
};

const showInvite = (userData) => {
    app.innerHTML = `
        <input type="text" id="link" value="https://evento.com?ref=%${userData.ref}" disabled>
        <div id="status">
            <h4>${getTotalSubscribers(userData)}</h4>
            <p>Inscrições feitas</p>
        </div>
    `;
};
const formAction = () => {
    const form = document.getElementById("form");
    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const userData = {
            email: formData.get("email"),
            phone: formData.get("phone")
        };

        const user = getUser(userData);
        if (user) {
            showInvite(user);
        } else {
            const newUser = saveUser(userData);
            showInvite(newUser);
        }
    };
};

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
