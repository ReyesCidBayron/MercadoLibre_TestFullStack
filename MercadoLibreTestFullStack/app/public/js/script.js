document.addEventListener("DOMContentLoaded", function() {
    buscar(); // Realizar búsqueda al cargar la página
});

const resultadosContainer = document.getElementById("resultados");
const paginationContainer = document.getElementById("pagination");
let currentPage = 1;

function buscar() {
    const searchInput = document.getElementById('searchInput');
    if(searchInput){
        const query = document.getElementById("search-input").value;
        const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&offset=${(currentPage - 1) * 10}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                resultadosContainer.innerHTML = ''; // Limpiar resultados anteriores

                const resultados = data.results;

                resultados.forEach(resultado => {
                    const resultadoElement = document.createElement("div");
                    resultadoElement.classList.add("result-item");

                    const imagenElement = document.createElement("img");
                    imagenElement.src = resultado.thumbnail;
                    imagenElement.alt = resultado.title;

                    const tituloElement = document.createElement("p");
                    tituloElement.textContent = resultado.title;

                    resultadoElement.appendChild(imagenElement);
                    resultadoElement.appendChild(tituloElement);
                    resultadosContainer.appendChild(resultadoElement);
                });
            })
            .catch(error => console.error('Error:', error));
    }
}