currentTab = window.location.pathname;
linkEl = document.querySelector("#bar-link1");
if (currentTab === '/ICS4U-portfolio/') {
	linkEl = document.querySelector("#bar-link1");
}
else if (currentTab === '') {
	linkEl = document.querySelector("#bar-link2");
}
else if (currentTab === '') {
	linkEl = document.querySelector("#bar-link3");
}
else if (currentTab === '') {
	linkEl = document.querySelector("#bar-link4");
}
else if (currentTab === '') {
	linkEl = document.querySelector("#bar-link5");
}
linkEl.style.backgroundColor = '#f5f5f5';
