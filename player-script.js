params = new URLSearchParams(window.location.search)
scriptname = params.get('script')

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://kianoosh34.github.io/ICS4U-portfolio/scripts/" + scriptname + ".js";
s.innerHTML = '';
s.id = 'player';
document.getElementById('main-content').innerHTML = scriptname + "<br>";
document.getElementById('main-content').style = "justify-content: center;";
document.getElementById('main-content').appendChild(s);
