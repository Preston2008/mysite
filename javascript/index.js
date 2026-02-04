$(document).ready(function() {
	var colors = ['red', 'maroon'];
	var idx = 0;
	function blinker() {
		$("#latestUpdates").css("color", colors[idx]);
		idx = (idx+1) % colors.length;
	}
	setInterval(blinker, 100);

	function minutestohours(minutes) {
		const hrs = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hrs}h ${mins}m`;
	}

	var today_dt = new Date();
	var today_dt_str = today_dt.getMonth() + "/" + today_dt.getDate() + "/" + today_dt.getFullYear();
	$("#today").text(today_dt_str);

	//Traffic API Call
	$.ajax({
		type: "GET",
		datatype: "JSON",
		url: "https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?point=33.3943%2C-104.5227&unit=MPH&openLr=false&key=Ce3585C6UjIzMcJAOFXRIp3DXcJ4BCf7",
		success: function(response) {
			$("#speed").text(response.flowSegmentData.currentSpeed);
			$("#speed_mob").text(response.flowSegmentData.currentSpeed);

			var travelTime = Number(response.flowSegmentData.currentTravelTime);
			$("#travel").text(minutestohours(travelTime));
			$("#travel_mob").text(minutestohours(travelTime));

			var roadClosure = response.flowSegmentData.roadClosure;
			var roadClosureTxt = "No";
			if (roadClosure) {
				roadClosureTxt = "Yes";
			}
			$("#closure").text(roadClosureTxt);
			$("#closure_mob").text(roadClosureTxt);
		}
	});
	
	//Weather API Call
	$.ajax({
		type: "GET",
		datatype: "XML",
		url: "https://api.weatherapi.com/v1/current.xml?key=b0ac278b0c0d412f8eb184719260302&q=Roswell,NM",
		success: function(xml) {
			$(xml).find("root").each(function() {
				$(this).find("current").each(function() {
					var temp = $(this).find("temp_f").text();
					$("#temp").text(temp);
					$("#temp_mob").text(temp);
					
					var condition = $(this).find("condition").each(function() {
						var weather = $(this).find("text").text();
						$("#weather").text(weather);
						$("#weather_mob").text(weather);
					})

					var wind = $(this).find("wind_mph").text();
					$("#wind").text(wind);
					$("#wind_mob").text(wind);
					
					var humidity = $(this).find("humidity").text();
					$("#humidity").text(humidity);
					$("#humidity_mob").text(humidity);
				});
			});
		}
	});

	function getRandomNumbers(count, min, max) {
		let numbers = [];
		for (let i = 0; i < count; i++) {
			numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
		}
		return numbers;
	}
	
	//TV Guide API Call
	var date = new Date();
	var hour = date.getHours();
	var formattedDate = date.toISOString().slice(0, 10);
	$.ajax({
		type: "GET",
		datatype: "JSON",
		url: "https://api.tvmaze.com/schedule?country=US&date=" + formattedDate,
		success: function(response) {
			var html = "";
			var cnt = 0;
			var start_index = 0;
			for (var idx=0;idx<response.length;idx++) {		
				var airtime = response[idx].airtime.slice(0, 2);
				if (airtime == hour) {
					if (start_index == 0) {
						start_index = idx;
						break;
					}
				}
			}

			var idxArray = getRandomNumbers(5, start_index, start_index+20);
			idxArray.sort(function(a, b){return a-b});
			$.each(idxArray, function(index, value) {
				var network = "";
				if (response[value].show.network != null) {
					network = response[value].show.network.name;
				} else {
					network = "Streaming";
				}

				var airtime = response[value].airtime.slice(0, 2);
				var ampm = "am";
				var realAirtime = Number(airtime);
				if (realAirtime > 12) {
					ampm = "pm";
					realAirtime = realAirtime - 12;
				}
				var airtimeCentral = realAirtime - 1;
				html = html + "<br><strong>"+ network + "</strong> " + response[value].show.name + " " + realAirtime.toString() + ampm + "/" + airtimeCentral.toString() + "c<br>";

			});
			$("#tvguide").html(html);
			$("#tvguide_mob").html(html);
		}
	});

	//Blog API Call
	$.ajax({
		type: "GET",
		datatype: "HTML",
		url: "https://juliensworld.com/blog.html",
		success: function(data) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(data, "text/html");
			var blogEntries = doc.getElementById("bloglist").children;
			for (let i = 0; i < 2; i++) {
				var id = blogEntries[i].id;
				var date = blogEntries[i].children[0].innerText;
				var text = blogEntries[i].children[1].innerText.slice(0, 130);
				text = text.replace(/\s+/g, ' ').trim()

				$("#blogdate"+(i+1)).text(date);
				$("#blog"+(i+1)).text(text);
				$("#bloglink"+(i+1)).attr("href", "./blog.html#"+id);

				$("#blogdate_mob"+(i+1)).text(date);
				$("#blog_mob"+(i+1)).text(text);
				$("#bloglink_mob"+(i+1)).attr("href", "./blog.html#"+id);
			}
		}
	});
});

