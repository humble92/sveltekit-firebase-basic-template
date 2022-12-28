<script context="module">
  import { auth } from "$lib/firebase/initFirebase";
  import { 
    AuthErrorCodes,
    signInWithEmailAndPassword,
    setPersistence, 
    browserSessionPersistence,
  } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { isEmpty, isValidEmail } from "$lib/helpers/validation";
  import { enhance } from '$app/forms';
</script>

<script>
  export let form;
  export let data;

  let txtEmail = "";
  let txtPassword = "";
  let isLoading = false;
  let hasError = false;
  let errorDisplay = "none";
  $: errorDisplay = hasError? "block": "none";

  $: emailIsValid = !isEmpty(txtEmail) && isValidEmail(txtEmail);
  $: passwordIsValid = !isEmpty(txtPassword);
  $: formIsValid = emailIsValid && passwordIsValid;

  // Login using email/password
  const loginEmailPassword = async () => {
    isLoading = true;
    hasError = false;
    try {
      
      // const user = await signInWithEmailAndPassword(auth, txtEmail, txtPassword);
      const res = await setPersistence(auth, browserSessionPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return signInWithEmailAndPassword(auth, txtEmail, txtPassword);
        });

      if (res.operationType === "signIn" && res.user.email) {
        goto("/myinfo");
      }
    }
    catch(error) {
      showLoginError(error)
    }
    finally {
      isLoading = false;
    }
  }
  
  const showLoginError = (error) => {
    hasError = true;
    divLoginError.style.display = 'block';
    console.log(`There was an error: ${error}`);
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
      lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`
    }
    else {
      lblLoginErrorMessage.innerHTML = `Error: ${error.message}`      
    }
  }  
</script>


<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">Welcome</p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form method="POST" use:enhance={({ form, data, action, cancel }) => {
        // `form` is the `<form>` element
        // `data` is its `FormData` object
        // `action` is the URL to which the form is posted
        // `cancel()` will prevent the submission
    
        return async ({ result, update }) => {
          goto('/myinfo');
          // `result` is an `ActionResult` object
          // `update` is a function which triggers the logic that would be triggered if this callback wasn't set
        };
      }}>
        <div class="card-body">
          <div class="form-control">
            <label for="email" class="label">
              <span class="label-text">Email</span>
            </label>
            <input id="email" name="email" type="email" placeholder="email" class="input input-bordered" on:focus={hasError = false} bind:value="{txtEmail}" />
          </div>
          <div class="form-control">
            <label for="password" class="label">
              <span class="label-text">Password</span>
            </label>
            <input id="password" name="password" type="password" placeholder="password" class="input input-bordered" on:focus={hasError = false} bind:value="{txtPassword}" />
            <label for="Forgot password?" class="label">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div id="divLoginError" class="group" style="display:{errorDisplay}">
            <div id="lblLoginErrorMessage" class="errorlabel">Error message</div>
          </div>
          {#if form?.success}
          <!-- this message is ephemeral; it exists because the page was rendered in
               response to a form submission. it will vanish if the user reloads -->
          <p>Successfully logged in! Welcome back, {data.user.email}</p>
          {/if}
          <div class="form-control mt-6">
            <button class="btn btn-primary" on:click|preventDefault={loginEmailPassword} disabled={isLoading || !formIsValid}>Login</button>
            <!-- When the following is used with form action, +page.server.js is invoked. -->
            <!-- <button class="btn btn-primary" disabled={isLoading || !formIsValid}>Login</button> -->
          </div>
        </div>
      </form>
  </div>
  </div>
</div>

<style>
  .errorlabel {
    font-size: 18px;
    padding: 10px;
    display: block;
    background: #fafafa;
    color: #a84949;
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    border-bottom: 1px solid #ff0000;
  }
</style>