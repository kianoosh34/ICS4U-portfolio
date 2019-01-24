currentTab = window.location.pathname;
if (currentTab === '/ICS4U-portfolio/') {
	linkEl = document.querySelector("#bar-link1");
}
else if (currentTab === '/ICS4U-portfolio/activities.html') {
	linkEl = document.querySelector("#bar-link2");
}
else if (currentTab === '/ICS4U-portfolio/experience.html') {
	linkEl = document.querySelector("#bar-link3");
}
else if (currentTab === '/ICS4U-portfolio/future.html') {
	linkEl = document.querySelector("#bar-link4");
}
else if (currentTab === '/ICS4U-portfolio/creations.html') {
	linkEl = document.querySelector("#bar-link5");
}
linkEl.style.backgroundColor = '#f5f5f5';
