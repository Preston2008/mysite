$(document).ready(function() {
	var colors = ['red', 'maroon'];
	var idx = 0;
	function blinker() {
		$("#latestUpdates").css("color", colors[idx]);
		idx = (idx+1) % colors.length;
	}
	setInterval(blinker, 100);
	
	//Weather API Call
	$.ajax({
		type: "GET",
		datatype: "XML",
		url: "http://api.weatherapi.com/v1/current.xml?key=b0ac278b0c0d412f8eb184719260302&q=Roswell,NM",
		success: function(xml) {
			$(xml).find("root").each(function() {
				$(this).find("current").each(function() {
					var temp = $(this).find("temp_f").text();
					$("#temp").text(temp);
					
					var condition = $(this).find("condition").each(function() {
						var weather = $(this).find("text").text();
						$("#weather").text(weather);
					})

					var wind = $(this).find("wind_mph").text();
					$("#wind").text(wind);
					
					var humidity = $(this).find("humidity").text();
					$("#humidity").text(humidity);
				});
			});
		}
	});
	
	//TV Guide API Call
	var date = new Date();
	var formattedDate = date.toISOString().slice(0, 10);
	$.ajax({
		type: "GET",
		datatype: "JSON",
		url: "https://api.tvmaze.com/schedule?country=US&date=" + formattedDate,
		success: function(response) {
			var html = "";
			var cnt = 0;
			for (var idx=0;idx<response.length;idx++) {		
				var airtime = response[idx].airtime.slice(0, 2);
				//if ("ABC".indexOf(response[idx].show.network.name) > -1) {
				//	alert(response[idx].show.network.name);
				//}
				if (airtime == "20") {
					cnt++;
					airtime = "8";
					var realAirtime = Number(airtime);
					var airtimeCentral = realAirtime - 1;
					html = html + "<br><strong>"+ response[idx].show.network.name + "</strong> " + response[idx].show.name + " " + realAirtime.toString() + "/" + airtimeCentral.toString() + "c<br>";
				}
				if (cnt == 5)
					break;
			}
			$("#tvguide").html(html);
		}
	});
});
