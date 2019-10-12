var data = JSON.parse(database);
update(false);

function update(more) {
	$(".content").html("");
	var html="";
	if (!more) {
		for (var i = 0; i < data.length; i++) {
			var liked = (data[i].isLiked) ? "Like &#128077;" : "Unlike &#128077;"
			$("#content").append(`
			<div class="col col-xl-4 col-md-6">
				<div>				
					<img src="img/${data[i].img}" alt="${data[i].img}">
					<h3>${data[i].title}</h3>
					<p>${data[i].descr}</p>
					<button name="${i}">${liked}</button>
					<span>${data[i].likes}</span>
				</div>
			</div>`)
		}
			
		
	$("#content").append(html);
	$("#content span").addClass("border rounded-circle border-0 bg-success text-white p-2");
	}
	// $("#content button").on("click",like($(this)));
}