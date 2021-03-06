async function render() {
    const response = await fetch(
        "https://restcountries.com/v3.1/region/europe?fields=name,capital,area,population,cca2",
    );
    
    const countries = await response.json();
    let rows = "";
    const formatage = new Intl.NumberFormat("en-US");

    countries.forEach((country) => {
        rows += `<tr>
                     <th scope="row">${country.name.official}</td>
                     <td class="text-end">${formatage.format(country.area)}</td>
                     <td class="text-end">${formatage.format(
            country.population,
        )}</td>
                    <td><a href="geolocation.html?cca2=${country.cca2}">${country.capital[0]}</a></td>

                     <td>${country.capital[0]}</td>
                 </tr>`;
    });

    document.querySelector("#countriesTb").innerHTML = rows;
}
window.addEventListener("load", render());
