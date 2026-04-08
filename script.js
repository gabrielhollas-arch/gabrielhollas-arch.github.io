// 1. CONFIGURAÇÃO DO BANCO DE DADOS
const supabaseUrl = "https://qpgjunpmyjnmyupnmiwy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwZ2p1bnBteWpubXl1cG5taXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIyMTMsImV4cCI6MjA4OTg0ODIxM30.l4QnaQFH1oW_SMKva7z-miIvXadVq41d33HFyy3d2E0";

// Inicia a conexão
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. FUNÇÃO PARA BUSCAR E DESENHAR OS PRODUTOS
async function carregarCatalogo() {
  // Faz um SELECT * FROM produtos na nuvem
  let { data: produtos, error } = await banco.from("produtos").select("*");

  if (error) {
    console.error("Erro ao buscar dados:", error);
    return;
  }

  let vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = ""; // Limpa a tela

  // Loop para desenhar cada produto na tela
  produtos.forEach((item) => {
    // Cria a máscara de moeda Brasileira
    let precoFormatado = Number(item.preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    let div = document.createElement("div");
    div.className = "card-produto";
    div.innerHTML = `
            <img src="${item.imagem_url}" width="150">
            <h3>${item.nome}</h3>
            <p class="preco-destaque">${precoFormatado}</p>
            <p>${item.categoria}</p>
        `;
    vitrine.appendChild(div);
  });
}

// Roda a função assim que o site abrir
carregarCatalogo();
