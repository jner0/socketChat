function handleCredentialResponse(response) {
  //Google Token: Id Token

  const body = { id_token: response.credential };

  fetch("http://localhost:8080/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then(({ resp }) => {
      //   console.log(token);
      localStorage.setItem("email", resp.usuario.correo);
      //   localStorage.setItem("token", token);
    })
    .catch(console.warn);
}

const button = document.getElementById("google_signout");
button.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
