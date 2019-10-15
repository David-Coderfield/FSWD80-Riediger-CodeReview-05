var data = JSON.parse(database, (k, v)=> v === "true" ? true : v === "false" ? false : v); //k...key, v...value
//^this converts "true"/"false" string from json to js boolean. Makes it easier to work with it later on

var showMore = false; // will be used to only show 6 items initially and display a button to show more items
var myFilter = "all";

//Sort event handler & external Function
$("#selectSort").change(()=>{
	var param = $("#selectSort option:selected").val(); //value of currently selected option
	$("option:contains('Sort')").remove(); //removes option 'Sort', as it was merely a placeholder
	sortBy(param);
});

function sortBy(by){
	showMore=false;
	switch(by) {
		case "az": data.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)); break;
		case "likes": data.sort((a, b) => b.likes-a.likes);
	}
	update();
}
//old version, been using buttons instead of select
/*$("#byAlphabet").click(()=>sortBy("az"));
$("#byLikes").click(()=>sortBy("likes"));*/

//reverses order of items
$("#reverse").click(()=>{
	showMore=false;
	data.reverse();
	update();
});

//Filter event handler
$("#selectFilter").change(()=>{
	myFilter = $("#selectFilter option:selected").val();
	showMore=false;
	update();
});

//Enable showing all items instead of just 6
function more(){
	showMore=true;
	update();
}


function like(){ //receives $(this) param from click event
	for (let i = 0; i < data.length; i++) {
		if($(this).attr("id") == ("indexIdentifier-" + i)){ //id of the button is a key to compare with index of item
			if(!data[i].isLiked) {
				data[i].likes++;
			}
			else{
				data[i].likes--;
			}
			data[i].isLiked = !data[i].isLiked;
		}
	}
	update(); //Quick and dirty way. Probably shouldn't update the whole html (reminder for future projects).
}


/* UPDATE html from js object using for loop, add eventListeners
takes into account filters, sorting and other conditional variables*/
function update() {
	$("#content").html(""); //clear previous content
	// var html="";
	if (showMore) {console.log();}
		var itemCnt = 0;
		for (var i = 0; i < data.length; i++) {
			if (myFilter=="all" || myFilter==data[i].category) {
				var likeButtonCont = (data[i].isLiked) ? "Unlike &#128078;" : "Like &#128077;"
				$("#content").append(`
				<div class="col-md-6">
					<div>				
						<img src="img/${data[i].img}" alt="${data[i].img}">
						<h3>${data[i].title}</h3>
						<p>${data[i].descr}</p>
						<button id="indexIdentifier-${i}" class="btn">${likeButtonCont}</button>
						<span>${data[i].likes}</span>
					</div>
				</div>`);
				itemCnt++ //only needed because amount of actually created items might not equal index when filter is on.
				if (itemCnt == 6 && !showMore) { //adds more button and breaks the loop if showMore==false
					$("#content").append(`<div class="col-12 text-center pt-4"><input type="button" id="more" class="btn btn-warning" value="show more..."></div`)
					break;
				}
			}
		}
	//additional styling using jQuery/BS4
	$("#content span").addClass("border rounded-circle border-0 bg-success text-white p-2");
	//addEventHandlers inside the update function, after creation of the html environment
	$(".btn:not(#more").click(like);
	$("#more").click(more);
}

$("#selectFilter>option:first").css("font-weight", "bold");
update();

console.log("Stop checking out our code. We aren't hiring anyone!");
//100th line was finishline <3










//I noticed that no $("document").ready(function(){}) jquery wrapper was needed, as the document has already loaded.