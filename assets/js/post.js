function coletarDadosDoFormulario() {
    const form = document.getElementById('form_post');

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const categoria = document.getElementById('categoria').value;
        const texto = document.getElementById('text').value;
        const img_url = document.getElementById('img_url').value;
        
        const url = 'api';
        const dados = {
            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            texto: texto,
            img_url: img_url
        }
        console.log(dados);
       
})}

coletarDadosDoFormulario();