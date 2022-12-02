import { delTheaterById, getTheaterById } from "../api/data.js";
import { html } from "../lib.js";

const detailsTemplate = (theater, isOwner, onDelete) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theater.title}</h1>
            <div>
                <img src=${theater.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theater.description}</p>
            <h4>Date: ${theater.date}</h4>
            <h4>Author: ${theater.author}</h4>
            <div class="buttons">
                ${isOwner ? 
                    html`<a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                        <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`: 
                    html`<a class="btn-like" href="#">Like</a>`}
            </div>
            <p class="likes">Likes: 0</p>
        </div>
    </div>
</section>`;

export async function showDetails(ctx){
    const theaterId = ctx.params.id;
    const theater = await getTheaterById(theaterId);
    const user = ctx.user;
    const isOwner = user ? theater._ownerId === user._id : false;
    ctx.render(detailsTemplate(theater, isOwner, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this event?');

        if (choice){
            await delTheaterById(theaterId);
            ctx.page.redirect("/profile");
        }
    }
}