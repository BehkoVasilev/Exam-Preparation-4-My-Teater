import { delTheaterById, getTheaterById } from "../api/data.js";
import { getLikes, getOwnLike, like } from "../api/likes.js";
import { html } from "../lib.js";

const detailsTemplate = (theater, likes, hasUser,canLike, isOwner, onDelete, onLike) => html`
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
            ${eventControl(theater, likes, hasUser,canLike, isOwner, onDelete, onLike)}
        </div>
    </div>
</section>`;

function eventControl(theater, likes, hasUser,canLike, isOwner, onDelete, onLike){
    if (hasUser == false){
        
           
    }

    if (canLike) {
        return html`
            <a @click=${onLike} class="btn-like" href="#">Like</a>
            <p class="likes">Likes: ${likes}</p>`;
    }

    if (isOwner){
        return html`
            <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
            <a class="btn-edit" href="/edit/${theater._id}">Edit</a>
            <p class="likes">Likes: ${likes}</p>`
    }
    return html`<p class="likes">Likes: ${likes}</p>`
}
export async function showDetails(ctx){
    const theaterId = ctx.params.id;

    const requests = [
        getTheaterById(theaterId),
        getLikes(theaterId)
    ]
    const hasUser = !!ctx.user;

    if (hasUser){
        requests.push(getOwnLike(theaterId, ctx.user._id))
    }
    const [theater, likes, hasLike] = await Promise.all(requests);
    debugger
    const isOwner = hasUser && ctx.user._id === theater._ownerId;
    const canLike = !isOwner && hasLike == 0;

    ctx.render(detailsTemplate(theater, likes, hasUser,canLike, isOwner, onDelete, onLike));

   
    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this event?');

        if (choice){
            await delTheaterById(theaterId);
            ctx.page.redirect("/profile");
        }
    }

    async function onLike(){
        await like(theaterId);
        ctx.page.redirect("/details/" + theaterId)

    }
}