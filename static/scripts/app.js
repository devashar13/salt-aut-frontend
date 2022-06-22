// submit form to backend using axios

const BASE_URL = "https://jsonplaceholder.typicode.com";
const BACKEND_URL = "https://guarded-taiga-90409.herokuapp.com"
const submitForm = (e) => {
  console.log("submitForm");

  e.preventDefault();
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("number").value;
  const password = document.getElementById("password").value;

  const url = `${BACKEND_URL}/api/auth/register`;
  const method = "POST";
  const resp = axios({
    method: "POST",
    url: url,
    data: {
      email: email,
      name: name,
      phone: phone,
      password: password,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      const el = document.getElementById("error");
        el.innerHTML += `<div class="alert alert-success" role="alert">
          User Registration Successful!!
      </div>`;
      setTimeout(function () {
        window.location.href = "https://127.0.0.1:5500/login.html";
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      const el = document.getElementById("error");
        el.innerHTML += `<div class="alert alert-danger" role="alert">
          ${error.response.data.message.email[0]}
      </div>`;
      setTimeout(function () {
        el.innerHTML = ""
      },3000);
    });
};


const resetPassword = (e) => {
  e.preventDefault();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const uidb64 = urlParams.get("uidb64")
  const token = urlParams.get("token")
  const password = document.getElementById("password").value;
  console.log(uidb64,token,password)
  const resp = axios({
    method: "PATCH",
    url:  `${BACKEND_URL}/api/auth/password-reset-complete`,
    data: {
      password:password,
      token:token,
      uidb64:uidb64
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      const el = document.getElementById("error");
        el.innerHTML += `<div class="alert alert-success" role="alert">
          PASSWORD CHANGED!!
      </div>`;
      setTimeout(function () {
        window.location.href = "https://127.0.0.1:5500/login.html";
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      setTimeout(function () {
        
      },3000);
    });
};



const login = (e) => {
  console.log("login");
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const url = `${BACKEND_URL}/api/auth/login/`;
  const method = "POST";
  axios({
    method: "POST",
    url: url,
    data: {
      email: email,
      password: password,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      const access = response.data.access;
      const refresh = response.data.refresh;
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      window.location.href = "https://127.0.0.1:5500/index.html";
    })
    .catch((error) => {
      console.log(error);
      const el = document.getElementById("error");
        el.innerHTML += `<div class="alert alert-danger" role="alert">
          ${error.response.data.detail}
      </div>`;
      setTimeout(function () {
        el.innerHTML = ""
      },3000);
    });
};

const checkToken = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token != null) {
    window.location.href = "https://127.0.0.1:5500/index.html";
  }
};
const checkIndexToken = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token == null) {
    window.location.href = "https://127.0.0.1:5500/login.html";
  }
};
const logout = () => {
  const token = localStorage.getItem("token");
  const refresh = localStorage.getItem("refresh");
  const url = `${BACKEND_URL}/api/auth/logout`;

  axios({
    method: "POST",
    url: url,
    data: {
      token: token,
      refresh: refresh,
    },
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      window.location.href = "http://127.0.0.1:5500/login.html";
    })
    .catch((error) => {
      console.log(error);
      document.getElementsByClassName(
        "error"
      ).html += `<div class="alert alert-error" role="alert">${error.response.data.message.email}</div>`;
    });
};

const sendMail = (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const redirect_url = "http://127.0.0.1:5500/reset.html"

  const url = `${BACKEND_URL}/api/auth/request-reset-email/`;
  const method = "POST";
  const resp = axios({
    method: "POST",
    url: url,
    data: {
      email: email,
      redirect_url:redirect_url
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      const el = document.getElementById("error");
        el.innerHTML += `<div class="alert alert-success" role="alert">
          EMAIL SENT!!
      </div>`;
      setTimeout(function () {
        window.location.href = "http://127.0.0.1:5500/login.html";
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      const el = document.getElementById("error");
        el.innerHTML += `<div class="alert alert-danger" role="alert">
          ${error.response.data.message.email[0]}
      </div>`;
      setTimeout(function () {
        el.innerHTML = ""
      },3000);
    });
};

