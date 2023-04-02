import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


// TODO Replace with actual view
const registerTemplate = (onRegister) => html`
        <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onRegister}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    // TODO Change user objects {email, password}, based on requirements
    async function onRegister({email, password, ['re-password']: repass}, form) {
        // Validation for empty fields
        if (email == '' || password == '' || repass == '') {
            return alert('All fields are required!');
        }

        // Validation for equal password to repass
        if (password != repass) {
            return alert("Passwords don't match!");
        }

        await register(email, password, repass);
        form.reset();
        // TODO Use redirect location from requirements
        ctx.page.redirect('/');
    }
}