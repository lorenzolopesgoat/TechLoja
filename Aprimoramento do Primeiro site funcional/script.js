let produtos = [];
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

async function carregarProdutos() {
    try {
        const res = await fetch('api/api_produtos.php');
        produtos = await res.json();
    } catch (e) {
        produtos = [
    {
        id: 1,
        nome: "Notebook Eco Pro",
        preco: 2899.90,
        categoria: "Notebooks",
        imagem: "https://www.bloomberglinea.com/resizer/v2/RCEFLO6VDFGT7H5FRDWSQRYRPQ.jpeg?auth=439e20532072ea985e78b4d627ef21edbd2cf96346f2cbfc2f844536339b618c&width=800&height=533&quality=80&smart=true"
    },
    {
        id: 2,
        nome: "Mouse Sem Fio",
        preco: 89.90,
        categoria: "Acessórios",
        imagem: "https://http2.mlstatic.com/D_NQ_NP_765431-MLA84159386681_042025-B.webp"
    },
    {
        id: 3,
        nome: "Teclado RGB",
        preco: 249.90,
        categoria: "Acessórios",
        imagem: "https://http2.mlstatic.com/D_NQ_NP_732397-MLA84504349693_052025-B.webp"
    }
];
    }

    renderizarProdutos(produtos);
}

function renderizarProdutos(lista) {
    const grid = document.getElementById('grid-produtos');
    grid.innerHTML = '';

    lista.forEach(p => {
        const div = document.createElement('div');

        div.className =
            'card bg-white border rounded-3xl overflow-hidden';

        div.innerHTML = `
            <img
                src="${p.imagem}"
                alt="${p.nome}"
                class="w-full h-48 object-cover">

            <div class="p-5">
                <h3 class="font-semibold text-lg">${p.nome}</h3>
                <p class="text-emerald-600">${p.categoria}</p>
                <p class="text-2xl font-bold mt-2">R$ ${p.preco}</p>

                <button
                    onclick="adicionarAoCarrinho(${p.id})"
                    class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl">
                    Adicionar
                </button>
            </div>
                `;

        grid.appendChild(div);
    });
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);

    carrinho.push(produto);

    localStorage.setItem(
        'carrinho',
        JSON.stringify(carrinho)
    );

    document.getElementById('contador').textContent =
        carrinho.length;

    alert(`${produto.nome} adicionado!`);
}

function filtrarProdutos() {
    const termo =
        document.getElementById('busca').value.toLowerCase();

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo)
    );

    renderizarProdutos(filtrados);
}

function mostrarCarrinho() {
    alert(
        'Carrinho tem ' +
        carrinho.length +
        ' itens. (Expansão na próxima aula)'
    );
}

carregarProdutos();