$(document).ready(function() {
	
	var pagesize = 10;
	var listsize = $("#blog ul li").length;
	$("#blog ul li").slice(pagesize, listsize).hide();
	
	$("#pager ul li").click(function() {
		
		var index = $(this).text();
		
		
		$("#blog ul li").hide();
		$("#blog ul li").slice(pagesize*(index-1), pagesize*(index)).show();	
	});
});
