import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


// TODO Replace with actual view
const loginTemplate = (onLogin) => html`
<h1>Login Page</h1>
<form @submit=${onLogin}>
    <label>Email: <input type="text" name = "email"></label>
    <label>Password: <input type="password" name = "password"></label>
    <button>Login</button>
</form>>`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    // TODO Change user objects {email, password}, based on requirements
    async function onLogin({email, password}, form) {
        // Validation for empty fields
        if (email == '', password == '') {
            return alert('All fields are required!');
        }

        await login(email, password);
        form.reset();
        // TODO Use redirect location from requirements
        ctx.page.redirect('/');
    }
}