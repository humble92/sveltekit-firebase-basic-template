<script context="module">
  import { goto } from "$app/navigation";
  import { auth } from "$lib/firebase/initFirebase";
  import { isEmpty, isValidEmail } from "$lib/helpers/validation";
  import { 
    AuthErrorCodes,
    createUserWithEmailAndPassword,
  } from 'firebase/auth';
</script>

<script>
  let txtEmail = "";
  let txtPassword = "";
  let isLoading = false;
  let hasError = false;
  let errorDisplay = "none";
  $: errorDisplay = hasError? "block": "none";

  $: emailIsValid = !isEmpty(txtEmail) && isValidEmail(txtEmail);
  $: passwordIsValid = !isEmpty(txtPassword);
  $: formIsValid = emailIsValid && passwordIsValid;

  // Create new account using email/password
  const createAccount = async () => {
    isLoading = true;
    hasError = false;
    try {
      await createUserWithEmailAndPassword(auth, txtEmail, txtPassword)
      goto('/myinfo');
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
      <h1 class="text-5xl font-bold">Sign up now!</h1>
      <p class="py-6">Welcome</p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form>
        <div class="card-body">
          <div class="form-control">
            <label for="email" class="label">
              <span class="label-text">Email</span>
            </label>
            <input id="email" type="email" placeholder="email" class="input input-bordered" on:focus={hasError = false} bind:value="{txtEmail}" />
          </div>
          <div class="form-control">
            <label for="password" class="label">
              <span class="label-text">Password</span>
            </label>
            <input id="password" type="password" placeholder="password" class="input input-bordered" on:focus={hasError = false} bind:value="{txtPassword}" />
            <label for="Forgot password?" class="label">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div id="divLoginError" class="group" style="display:{errorDisplay}">
            <div id="lblLoginErrorMessage" class="errorlabel">Error message</div>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" on:click={createAccount} disabled={isLoading || !formIsValid}>Register</button>
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