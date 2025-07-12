const apiKey = "c66340767ddb4a609c723e6ba6ba0770";
const blogContainer = document.querySelector("#blog-container");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

async function fetchNews(query) {
    try {
        const apiUrl = query
            ? `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apiKey}`
            : `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=120&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";// Clear previous content
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'https://placehold.co/600x400';
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
}

 

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query) {
        try {
            const articles = await fetchNews(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching searched news", error);
        }
    }
});
 