const caseCount = document.querySelector(".case-count");
const deathCount = document.querySelector(".death-count");
const recoveredCount = document.querySelector(".recovered-count");
const selectBox = document.querySelector(".select");
const updatedDate = [...document.querySelectorAll(".date")];

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function updateOption() {
  fetchData("https://disease.sh/v3/covid-19/countries/").then((countries) =>
    countries.map(({ country }) => {
      const optionHtml = `<option value="${country}">${country}</option>`;
      selectBox.insertAdjacentHTML("beforeend", optionHtml);
    })
  );
}
updateOption();

selectBox.addEventListener("change", (e) => {
  if (e.target.value === "all") {
    const url = "https://disease.sh/v3/covid-19/all/";
    updateState(url);
  } else {
    const url = `https://disease.sh/v3/covid-19/countries/${e.target.value}`;
    updateState(url);
  }
});

const updateState = (url) => {
  fetchData(url).then(({ recovered, deaths, cases, updated }) => {
    caseCount.innerText = numberWithCommas(cases);
    deathCount.innerText = numberWithCommas(deaths);
    recoveredCount.innerText = numberWithCommas(recovered);
    updatedDate.map(
      (all) => (all.innerText = JSON.stringify(new Date(updated)).slice(1, 11))
    );
  });
};
updateState("https://disease.sh/v3/covid-19/all/");


