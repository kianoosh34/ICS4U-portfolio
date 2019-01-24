currentTab = window.location.pathname;
linkEl = document.querySelector("#bar-link1");
if (currentTab === '') {
	linkEl = document.querySelector("#bar-link1");
}
if (currentTab === '') {
	linkEl = document.querySelector("#bar-link2");
}
if (currentTab === '') {
	linkEl = document.querySelector("#bar-link3");
}
if (currentTab === '') {
	linkEl = document.querySelector("#bar-link4");
}
if (currentTab === '') {
	linkEl = document.querySelector("#bar-link5");
}
linkEl.style.backgroundColor = '#f5f5f5';
