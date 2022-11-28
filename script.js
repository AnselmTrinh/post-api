// 1er formulaire
function postreq() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      readData(JSON.parse(this.response)["token"]);
    }
  };

  id = document.getElementById("login").value;
  pass = document.getElementById("password").value;

  xhttp.open("POST", "https://tst.quantiq.nc/devweb-cfa/api/index.php", true);

  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send("login=" + id + "&" + "passwd=" + pass);
}
// 2ème formulaire
function readData(token) {
  let httpRequest = new XMLHttpRequest();
  document.getElementById("token").value = token;
  httpRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let user = JSON.parse(this.response)[0];
      console.log(user);
      document.getElementById("nom").value = user.nom;
      document.getElementById("prenom").value = user.prenom;
      document.getElementById("email").value = user.email;
      console.log(token);
    }
  };
  httpRequest.open(
    "GET",
    "https://tst.quantiq.nc/devweb-cfa/api/index.php?service=user&action=request&token=" +
      token,
    true
  );
  httpRequest.send();
}
// 3ème fonction pour afficher les donnée pris
function postChange() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (JSON.parse(this.responseText)["result"]) {
        let result = JSON.parse(this.responseText);
        if (result.result === "YATTA  !!!!") {
          document.getElementById("nom").value = result.data.nom;
          document.getElementById("prenom").value = result.data.prenom;
          document.getElementById("email").value = result.data.email;
        }
        alert(result.result);
      }
    } else {
      console.log("out");
    }
  };
  xhttp.open("POST", "https://tst.quantiq.nc/devweb-cfa/api/index.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(
    "token=" +
      document.getElementById("token").value +
      "&" +
      "nom=" +
      document.getElementById("nom").value +
      "&" +
      "prenom=" +
      document.getElementById("prenom").value +
      "&" +
      "email=" +
      document.getElementById("email").value
  );
}
