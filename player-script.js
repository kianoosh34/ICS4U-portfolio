params = new URLSearchParams(window.location.search)
scriptname = params.get('script')

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://kianoosh34.github.io/ICS4U-portfolio/scripts/" + scriptname + ".js";
s.innerHTML = '';
s.id = 'player';
var the_content = document.getElementById('main-content');
the_content.appendChild(s);
