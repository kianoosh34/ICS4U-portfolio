currentTab = window.location.pathname;
var mygrey = 'rgb(230,230,230)';
if (currentTab === '/ICS4U-portfolio/') {
	linkEl = document.getElementById("bar-link1");
	linkEl.style.backgroundColor = mygrey;
}
else if (currentTab === '/ICS4U-portfolio/activities.html') {
	linkEl = document.getElementById("bar-link2");
	linkEl.style.backgroundColor = mygrey;
}
else if (currentTab === '/ICS4U-portfolio/experience.html') {
	linkEl = document.getElementById("bar-link3");
	linkEl.style.backgroundColor = mygrey;
}
else if (currentTab === '/ICS4U-portfolio/future.html') {
	linkEl = document.getElementById("bar-link4");
	linkEl.style.backgroundColor = mygrey;
}
else if (currentTab === '/ICS4U-portfolio/creations.html') {
	linkEl = document.getElementById("bar-link5");
	linkEl.style.backgroundColor = mygrey;
}

