console.log("javaScript dando certo");

const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const ConSenha = document.getElementById("ConSenha");
const Celular = document.getElementById("Celular");
const CPF = document.getElementById("CPF");
const RG = document.getElementById("RG");
const msgError = document.getElementsByClassName("msgError");

const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};

const checkNome = () => {
  const nomeRegex = /^[A-Za-zÁ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

/* ---------- FUNÇÃO PARA VERIFICAR IGUALDADE DAS SENHAS --------------- */
function checkPasswordMatch() {
  return senha.value === ConSenha.value ? true : false;
}
/* --------------------------------------------------------------------- */

const checkEmail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};

function maskPhoneNumber(event) {
  let celular = event.target.value;

  if (/[A-Za-zÁ-ÿ]/.test(celular)) {
    createDisplayMsgError("O celular deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }
  celular = celular.replace(/\D/g, "");

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
}

function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(senha)) {
    return "A senha deve ter pelo menos um caracter especial!";
  }
  if (!/\d/.test(senha)) {
    return "A senha deve ter pelo menos um numero!";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}

function maskCPF(event) {
  let CPF = event.target.value;

  if (/[A-Za-zÁ-ÿ]/.test(CPF)) {
    createDisplayMsgError("O CPF precisa ter apenas numeros");
  } else {
    createDisplayMsgError("");
  }
  CPF = CPF.replace(/\D/g, "");

  if (CPF.length > 11) {
    CPF = CPF.substring(0, 11);
  }

  if (CPF.length > 3) {
    CPF = `${CPF.substring(0, 3)}.${CPF.substring(3)}`;
  } else if (CPF.length > 0) {
    CPF = `${CPF}`;
  }

  if (CPF.length > 7) {
    CPF = `${CPF.substring(0, 7)}.${CPF.substring(7)}`;
  } else if (CPF.length > 0) {
    CPF = `${CPF}`;
  }

  if (CPF.length > 11) {
    CPF = `${CPF.substring(0, 11)}-${CPF.substring(11)}`;
  } else if (CPF.length > 0) {
    CPF = `${CPF}`;
  }

  event.target.value = CPF;
}

function maskRG(event) {
  let RG = event.target.value;

  if (/[A-Za-zÁ-ÿ]/.test(RG)) {
    createDisplayMsgError("O RG precisa ter apenas numeros");
  } else {
    createDisplayMsgError("");
  }
  RG = RG.replace(/\D/g, "");

  if (RG.length > 9) {
    RG = RG.substring(0, 9);
  }

  if (RG.length > 2) {
    RG = `${RG.substring(0, 2)}.${RG.substring(2)}`;
  } else if (RG.length > 0) {
    RG = `${RG}`;
  }

  if (RG.length > 6) {
    RG = `${RG.substring(0, 6)}.${RG.substring(6)}`;
  } else if (RG.length > 0) {
    RG = `${RG}`;
  }

  if (RG.length > 10) {
    RG = `${RG.substring(0, 10)}-${RG.substring(10)}`;
  } else if (RG.length > 0) {
    RG = `${RG}`;
  }

  event.target.value = RG;
}

const rainFunction = () => {
  let rain = document.createElement("span");
  let cont_rain = document.getElementsByClassName("container_rain");
  let left = Math.floor(Math.random() * (310 - 65) + 65);
  let duration = Math.random() * 5;

  rain.classList.add("rain");
  cont_rain[0].appendChild(rain);
  rain.style.left = left + "px";
  rain.style.animationDuration = 1 + duration;

  setTimeout(() => {
    cont_rain[0].removeChild(rain);
  }, 1500);
};

setInterval(() => {
  rainFunction();
}, 250);

/* ------------- FUNÇÃO PARA VERIFICAR E ENVIAR DADOS ------------------ */
function fetchDatas(event) {
  event.preventDefault();

  if (!checkNome) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  if (Celular.value && /[A-Za-zÀ-ÿ]/.test(Celular.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }

  const formData = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    celular: Celular.value,
    cpf: CPF.value,
    rg: RG.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2));
}
/* --------------------------------------------------------------------- */

// formulario.addEventListener("submit", fetchDatas);

nome.addEventListener("input", () => {
  if (nome.value && !checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter numeros ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

email.addEventListener("input", () => {
  if (email.value && !checkEmail(email.value)) {
    createDisplayMsgError("O email digitado não e valido!");
  } else {
    createDisplayMsgError("");
  }
});

senha.addEventListener("input", () => {
  if (senha.value && checkPasswordStrength(senha.value)) {
    createDisplayMsgError(checkPasswordStrength(senha.value));
  } else {
    createDisplayMsgError("");
  }
});

Celular.addEventListener("input", maskPhoneNumber);

CPF.addEventListener("input", maskCPF);

RG.addEventListener("input", maskRG);
