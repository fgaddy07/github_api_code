var RepoPR = [];
var AllPR = [];

var RepoNames = $.ajax({
  url: "https://api.github.com/orgs/ramda/repos",
  global: false,
  type: "get",
  dataType: "json",
  async: false,
  success: function(msg) {
    for (var i = 0; i < msg.length; i++) {
    	RepoPulls(msg[i].name);
    }
  }
}).responseText;

function RepoPulls(names) {
var urlString = "https://api.github.com/repos/ramda/" + names + "/pulls?per_page=90&state=all";
$.ajax({
    type: "GET",
    url: urlString,
    dataType: "json",
    async: 'false',
    success: function(response) {
    if(response.length > 0){
      	localStorage.setItem(names,JSON.stringify(response));
      }
    }
})
}

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    AllPR.push((JSON.parse(localStorage.getItem(key))));
}

var PRAmount = 0;
for( let i = 0; i < AllPR.length; i++){
	PRAmount += AllPR[i].length;
}

console.log(PRAmount);