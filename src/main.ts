import { bangs } from "./bang";
import "./global.css";

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";
const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

function noSearchDefaultPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <div class="content-container">
        <h1>Rapid Duck</h1>
        <p>DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. You can <a href="/bangs">search all available bangs</a>.</p>
        <br />
        <p>This is a fork of <a href="https://github.com/t3dotgg/unduck" target="_blank">Unduck</a>.</p>
        <p>If you ran into any issues, please <a href="https://github.com/socutewhitebear/rapidduck/issues" target="_blank">report them here</a>.</p>
        <br />
        <hr />
        <div class="url-container"> 
          <p style="text-align: center;">Try Demo Search</p>
          <form class="url-sub-container">
            <input 
              type="search"
              role="searchbox"
              name="q"
              aria-autocomplete="both"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              class="search-input"
              id="searchbox"
              maxlength="256"
              value=""
              placeholder="!yt Never gonna give you up"
            />
            <button type="submit" class="copy-button">
              <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" width="24" height="24" fill-rule="evenodd" d="M6.875 1a5.875 5.875 0 103.689 10.448l3.37 3.369a.624.624 0 10.883-.884l-3.37-3.37A5.875 5.875 0 006.875 1zM2.25 6.875a4.625 4.625 0 119.25 0 4.625 4.625 0 01-9.25 0z" clip-rule="evenodd"></path></svg>
            </button>
          </form>
          <br />
          <hr />
          <br />
          <p style="text-align: center;">Or copy this and place in the default search engine on your browser settings</p>
          <div class="url-sub-container">
            <input 
              type="text" 
              class="url-input"
              value="https://d.cutebear.in.th/?q=%s"
              readonly 
            />
            <button class="copy-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
            </button>
          </div>
        </div>
      </div>
      <footer class="footer">
        <a href="https://www.cutebear.in.th" target="_blank">CuteBear</a>
        •
        <a href="https://github.com/t3dotgg/unduck" target="_blank">Unduck</a>
        •
        <a href="https://github.com/socutewhitebear/rapidduck" target="_blank">GitHub</a>
      </footer>
    </div>
  `;

  const copyButton = app.querySelector<HTMLButtonElement>(".copy-button")!;
  const urlInput = app.querySelector<HTMLInputElement>(".url-input")!;

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
    copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`;
    copyButton.classList.add("copied");

    setTimeout(() => {
      copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;
      copyButton.classList.remove("copied");
    }, 2000);
  }); 
}

function searchBangPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin-bottom: 24px;">
      <div class="content-container">
        <h1>Rapid Duck</h1>
        <p class="description"></p>
        <br />
        <hr />
        <br />
        <a href="/">Back to Home</a>
        <div class="url-container"> 
          <div class="url-sub-container">
            <input 
              type="search"
              role="searchbox"
              aria-autocomplete="both"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              class="url-input"
              maxlength="32"
              value=""
              placeholder="Search bangs"
            />
            <svg fill="none" class="svg-search" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" width="24" height="24" fill-rule="evenodd" d="M6.875 1a5.875 5.875 0 103.689 10.448l3.37 3.369a.624.624 0 10.883-.884l-3.37-3.37A5.875 5.875 0 006.875 1zM2.25 6.875a4.625 4.625 0 119.25 0 4.625 4.625 0 01-9.25 0z" clip-rule="evenodd"></path></svg>
          </div>
        </div>
       
      </div> 
      <div class="results-container">
        <p class="results-title">"{{value}}" results</p>
        <ul class="results"></ul>
      </div>
      <footer class="footer">
        <a href="https://www.cutebear.in.th" target="_blank">CuteBear</a>
        •
        <a href="https://github.com/t3dotgg/unduck" target="_blank">Unduck</a>
        •
        <a href="https://github.com/socutewhitebear/rapidduck" target="_blank">GitHub</a>
      </footer>
    </div>
  `;

  const description = app.querySelector<HTMLParagraphElement>(".description")!;
  const searchInput = app.querySelector<HTMLInputElement>(".url-input")!;
  const resultsContainer = app.querySelector<HTMLUListElement>(".results")!;
  const resultsTitle = app.querySelector<HTMLUListElement>(".results-title")!;

  const amount = bangs.length;
  description.innerHTML = `
    There are currently <span class="results-bang">${amount.toLocaleString()}</span> of Bangs available here! If you have any suggestions,
    <a href="https://github.com/socutewhitebear/rapidduck/discussions" target="_blank">discuss them here</a>.`;

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text; // If query is empty, return original text
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<b>$1</b>"); // Wrap matches in <b> tags
  };

  const searchBangs = (query: string) => {
    if (query.trim() === "") {
      resultsContainer.innerHTML = ""; // Clear results if input is empty
      resultsTitle.textContent = "";
      return;
    }

    const filteredResults = bangs
      .filter(
        (bang) =>
          bang.s.toLowerCase().includes(query.toLowerCase()) ||
          bang.t.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.r - a.r)
      .slice(0, 30);

    resultsTitle.textContent = `"${query.trim()}" results`;
    resultsContainer.innerHTML = filteredResults
      .map((bang, index) => {
        const highlightedS = highlightMatch(bang.s, query);
        const highlightedT = highlightMatch(bang.t, query);

        return `
        <li>
          <p style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <span>${highlightedS}</span> <span class="results-bang" id="resultBang-${index}">!${highlightedT}</span>
          </p>
        </li>
      `;
      })
      .join("");

    // Add event listeners for copying to clipboard
    filteredResults.forEach((bang, index) => {
      const bangElement = document.getElementById(`resultBang-${index}`);
      if (bangElement) {
        bangElement.addEventListener(
          "click",
          async () => await navigator.clipboard.writeText(`!${bang.t}`)
        );
      }
    });
  };

  searchInput.addEventListener("input", () => {
    searchBangs(searchInput.value);
  });

  searchBangs("");
}

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  if (url.pathname === "/bangs") {
    searchBangPageRender();
    return null;
  }
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
