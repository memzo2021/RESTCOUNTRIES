async function display() {
	let response = await fetch(
		"https://restcountries.com/v3.1/region/europe?fields=name,cca2",
	);
	const countries = await response.json();
	let options = "";
	let option;
	let select = document.querySelector("#country");
	const api_lng = 'en';
	const iframe = document.querySelector("iframe")
	const QUERYSTRING = window.location.search;

	const URLPARAMS = new URLSearchParams(QUERYSTRING);

	function Map(lat, lng) {
		document.querySelector("#Map");
		iframe.src = `https://www.google.com/maps/embed/v1/view?key=AIzaSyAfyzygjxgk5ANOSoQXbfhWXdsPQXi4BAk
			&center=${lat},${lng}&zoom=10&language=${api_lng}`;

	};

	countries.forEach((country) => {
		const selected = country.cca2 == 'FR' ? "selected" : "";
		options += `<option value="${country.cca2}"${country.cca2 == "FR" ? 'selected' : ''}>${country.name.official}</option>`;
 
	});

	select.innerHTML = options;
	 
	URLPARAMS.has('cca2') ? cca2 = URLPARAMS.get('cca2') : cca2 = 'FR';
 	select.value = cca2;
	response = await fetch(`https://restcountries.com/v3.1/alpha/${cca2}?fields=capitalInfo`);
	const country = await response.json();
	Map(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]);


  
	select.onchange = async function () {
		response = await fetch(
			`https://restcountries.com/v3.1/alpha/${select.value}?fields=capitalInfo`,
		);
		option = await response.json();
		Map(option.capitalInfo.latlng[0], option.capitalInfo.latlng[1]);
	};

}
window.addEventListener("load", display());
