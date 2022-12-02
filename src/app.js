import {page} from "./lib.js";
import {render} from "./lib.js";
import { getUserData } from "./util.js";
import { showCreate } from "./views/createView.js";
import { showDetails } from "./views/detailsVeiw.js";
import { showEdit } from "./views/editView.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginVeiw.js";
import { updateNav } from "./views/nav.js";
import { showProfile } from "./views/profileView.js";
import { showRegister } from "./views/registerView.js";



const mainRoot = document.getElementById("content");

page(decorateContext)
page("/", showHome);
page("/home", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/create", showCreate);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);
page("/profile", showProfile);


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

