import { getOwnTheaters } from "../api/data.js";
import { html } from "../lib.js";

const profileTemplate = (events, user) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${events.length > 0 ?
            html`${events.map(eventCardTemplate)}` : 
            html`<div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`}
    </div>
</section>`;

const eventCardTemplate = (ev) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${ev.imageUrl}>
        <h2>${ev.title}</h2>
        <h6>${ev.date}</h6>
        <a href="/details/${ev._id}" class="details-button">Details</a>
    </div>
</div>`

export async function showProfile(ctx){
    const user = ctx.user;
 
    const userId = ctx.user._id;
    const events = await getOwnTheaters(userId);

    ctx.render(profileTemplate(events, user))
}