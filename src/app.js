import {page} from "./lib.js";
import {render} from "./lib.js";
import { getUserData } from "./util.js";
import { showCreate } from "./views/createView.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginVeiw.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/registerView.js";



const mainRoot = document.getElementById("content");

page(decorateContext)
page("/", showHome);
page("/home", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/create", showCreate);
page("/details/:id", () => console.log("details"));
page("/edit/:id", () => console.log("edit"));
page("/profil", () => console.log("profil"));


updateNav();
page.start();


function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if (user){
        ctx.user = user;
    }
    next()
}

function renderMain(content){
    render(content, mainRoot)
}

