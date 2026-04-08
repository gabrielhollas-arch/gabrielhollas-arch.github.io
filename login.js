// Alterna entre texto escondido e visível
function mostrarSenha() {
  let inputSenha = document.getElementById("password");
  let btnOlho = document.getElementById("btn-olho");

  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    btnOlho.innerText = "🙈"; // Troca o emoji
  } else {
    inputSenha.type = "password";
    btnOlho.innerText = "👁️";
  }
}

const supabaseUrl = "https://qpgjunpmyjnmyupnmiwy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwZ2p1bnBteWpubXl1cG5taXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIyMTMsImV4cCI6MjA4OTg0ODIxM30.l4QnaQFH1oW_SMKva7z-miIvXadVq41d33HFyy3d2E0";
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

async function fazerLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("mensagem");
  const btn = document.getElementById("btn-entrar");

  // Efeito de carregamento (Feedback visual)
  btn.innerText = "Verificando...";
  btn.disabled = true;

  // Comando que tenta logar no Supabase
  const { data, error } = await banco.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    msg.innerText = "Acesso Negado: " + error.message;
    msg.style.color = "red";
    btn.innerText = "Entrar no Painel";
    btn.disabled = false; // Libera o botão novamente
  } else {
    msg.innerText = "Acesso concedido! Carregando painel...";
    msg.style.color = "green";
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);
  }
}

const inputSenha = document.getElementById("senha");

inputSenha.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fazerLogin();
  }
});

async function verificarUsuarioLogado() {
  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    window.location.href = "admin.html";
  }
}

// Executa assim que a página abre
verificarUsuarioLogado();
