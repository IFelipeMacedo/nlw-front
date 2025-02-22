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
            <main>
                <h3>Inscrição confirmada!</h3>
                <p>
                    Convide mais pessoas e concorrra a prêmios! <br>
                    Compartilhe o link e acompanhe as incrições:
                </p>
                <div class="input-group">
                    <label for="link">
                        <img src="link.svg" alt="Link icon">
                    </label>
                    <input type="text" id="link" value="https://evento.com?ref=%${userData.ref}" disabled>
                </div>
            </main>
            <section class="stats">
                <h4>${getTotalSubscribers(userData)}</h4>
                <p>
                    Inscrições feitas
                </p>
            </section>
        </div>
    `;
    app.setAttribute("class", "page-invite");
    updateImageLinks();
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

const updateImageLinks = () => {
    document.querySelectorAll("img").forEach((img) => {
        const imgName = img.getAttribute("src").split("/").pop(); 
        img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${imgName}`;
    });
};


const startApp = () => {
    const content = `            <main>
                <section class="about">
                    <div class="section-header">
                        <h2>
                            Sobre o evento
                        </h2>
                        <span class="badge"> AO VIVO</span>
                    </div>
                    <p>
                        Um evento feito popr e para pessoas desenvolvedoras
                        apaixonadas por criar soluções inovadoras e
                        compartilhar conhecimento. Vamos mergulhar nas
                        tendências mais recentes em desenvolvimento
                        de software, arquitetura de sistemas e tecnologias
                        emergentes, com palestras, workshops e hackathons.
                        <br><br>
                        Dias 15 a 17 de março | Das 18 às 21h | Online &amp; Gratuito
                    </p>
                </section>
                <section class="registration">
                    <h2>Inscrição</h2>
                    <form id="form">
                        <div class="input-wrapper">
                            <div class="input-group">
                                <label for="email">
                                    <img src="mail.svg" alt="Email icon">
                                </label>
                                <input type="email" id="email" name="email" placeholder="E-mail">
                            </div>
                            <div class="input-group">
                                <label for="phone">
                                    <img src="phone.svg" alt="Phone icon">
                                </label>
                                <input type="text" id="phone" name="phone" placeholder="Telefone">
                            </div>
                        </div>
                        <button>
                            Confirmar
                            <img src="arrow.svg" alt="Arrow right">
                        </button>
                    </form>

                </section>
            </main>`;

    app.innerHTML = content;
    app.setAttribute("class", "page-start");
    updateImageLinks();
    formAction();
};

startApp();

document.getElementById("logo").onclick =  () => startApp();
