const btn = document.querySelector(".btn");

const inputValue = document.querySelector(".input");
const parentEl = document.querySelector(".search-results");
const API_URL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyA_sUs7ZfeoLy31HX3iHUFaetPOJCbEiSY&cx=d7aff7dce5bda40e0&q
`;

///SETTING TIMEOUT FOR UNSTABLE INTERNET CONNECTION
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
                      <h3>${el.displayLink}</h3>
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
  try {
    e.preventDefault();
    const val = inputValue.value;

    if (!val) throw new error("🌟🌟 data is not available");

    ///FETCHING REQUEST USING ASYNC AWAIT
    const getRequest = async function (query) {
      const res = await Promise.race([
        fetch(`${API_URL}=${query}`),
        timeout(10),
      ]);

      const data = await res.json();

      console.log(data);

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);

      if (!data || (Array.isArray(data) && data.length === 0))
        return console.log(`${data.error.message}`);
      ("data not available 🌟🌟");

      adjacentHTML(data);
    };

    //clearing the parent elemebnt
    parentEl.innerHTML = "";
    getRequest(val);
  } catch (err) {
    console.error(err.message, "🌟🌟");
  }
});

//////Adding the intersection observer api
// const initialcords = observer.getBoundingClientRect();

// // console.log(initialcords);

// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialcords.top) {
//     View.classList.add("sticky");
//   } else {
//     View.classList.remove("sticky");
//   }
// });

const header = document.querySelector(".stop");
const nav = document.querySelector(".search-enter");

const callback = function (entries) {
  [entries] = entries;
  // console.log(...entries);
  if (!entries.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
  // console.log(entries);
};

const observes = new IntersectionObserver(callback, {
  root: null,
  threshold: 0,
});

observes.observe(header);
