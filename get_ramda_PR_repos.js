var AllPR = [];

const AllNames = async function() {

  let urlString = "https://api.github.com/orgs/ramda/repos";
  var apiResults = fetch(urlString)
    .then(resp => {
      return resp.json();
    });

  return apiResults;

}

const getPR = async function(names, pageNo = 1) {

  let urlString = "https://api.github.com/repos/ramda/" + names + "/pulls?per_page=100&page=" + pageNo + "&state=all";
  var apiResults = await fetch(urlString)
    .then(resp => {
      return resp.json();
    });

  return apiResults;

}

const getAllPRs = async function(name, pageNo) {
  const results = await getPR(name, pageNo);
  console.log("Retreiving data from API for name: " + name + " and page : " + pageNo);
  if (results.length > 0) {
    return results.concat(await getAllPRs(name, pageNo + 1));
  } else {
    return results;
  }
};


(async () => {
  const name = await AllNames();
  for (var i = 0; i < name.length; i++) {
    const entireList = await getAllPRs(name[i].name, pageNo = 1);
    if(entireList.length > 0){
    AllPR.push(entireList);
    }
  }
  console.log(AllPR);

  function flatten(arr) {
    return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
  };
	
  const GiantArray = flatten(AllPR);
  console.log(GiantArray);
})();
