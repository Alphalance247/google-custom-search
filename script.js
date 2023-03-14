const btn = document.querySelector(".btn");
const inputValue = document.querySelector(".input");
const parentEl = document.querySelector(".search-results");

///Refacturing the DOM elemnt
const adjacentHTML = function (data) {
  const html = `
  <p>About ${data.searchInformation.formattedTotalResults} results (${
    data.searchInformation.formattedSearchTime
  } seconds) </p>
   
        ${data.items
          .map((el) => {
            return `
              <div class="search-data">
                <div class="paraf-1">
                  <img src="download (1).png" alt="" />
                    <div class="title_url">
                      <h3>${el.link}</h3>
                      <p> ${el.formattedUrl}</p>
                    </div>
                 </div>
              <div class="paraf-2">
                  <a href="${el.link}">${el.title}</a>
                  <p>
                    ${el.snippet}
                  </p>
                </div>
              </div>
       `;
          })
          .join("")}
    
  `;

  parentEl.insertAdjacentHTML("afterbegin", html);
};

////Listening for the event and rendering search results

btn.addEventListener("click", function (e) {
  e.preventDefault();
  const val = inputValue.value;

  ///fetching request using async await function
  const getRequest = async function (query) {
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyA_sUs7ZfeoLy31HX3iHUFaetPOJCbEiSY&cx=d7aff7dce5bda40e0&q=${query}
      `
    );

    const data = await res.json();

    console.log(data);

    adjacentHTML(data);
  };

  //clearing the parent elemebnt
  parentEl.innerHTML = "";
  getRequest(val);
});
