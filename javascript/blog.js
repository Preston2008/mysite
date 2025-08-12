$(document).ready(function() {
	
	var pagesize = 10;
	var listsize = $("#blog ul li").length;
	$("#blog ul li").slice(pagesize, listsize).hide();
	
	$("#pager ul li").click(function() {
		
		var index = $(this).text();
		
		
		$("#blog ul li").show();
		if (index != 1) {
			$("#blog ul li").slice(0, pagesize*(index-1)).hide();
		} else {
			$("#blog ul li").slice(pagesize, listsize).hide();
		}		
	});
});
