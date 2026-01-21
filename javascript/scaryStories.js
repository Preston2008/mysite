$(document).ready(function() {
	$(window).on('message', function (event) {
		const title = event.originalEvent.data;
		showStory(title)
	});
});

function showStory(title) {
	$(".story").hide();
	$("#" + title).show();
}