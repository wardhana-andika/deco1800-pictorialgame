function getImages(){
	
	var div1 = "#output1";
	var div2 = "#output2";
	var div3 = "#output3";
	var div4 = "#output4";
	var apiKey = "jsk1qqntnrj7qbvf";
	var urlA = "http://api.trove.nla.gov.au/result?key=g2slgjdaievm8l4e&q=";
	var urlB = "&encoding=json&zone=picture&sortby=relevance&l-format=Photograph&n=50&l-availability=y/f&callback=?";
	console.log(levelCount);
	//alert(levelCount);
	
	generateQuestion();
	
	
	
	$.getJSON(urls[0], function(data) {
			$(div1).empty();
			loadedImages = [];
			console.log(data);
			$.each(data.response.zone[0].records.work, processImages);
			printImages(div1, loadedImages);
			loadedImages.splice(0,loadedImages.length);
			
		
			$.getJSON(urls[1], function(data2) {
				$(div2).empty();
				loadedImages2 = [];
				console.log(data2);
				$.each(data2.response.zone[0].records.work, processImages2);
				printImages(div2, loadedImages2);
				
				loadedImages2.splice(0,loadedImages2.length);
				//loadedImages = [];
				
				$.getJSON(urls[2], function(data3) {
					$(div3).empty();
					loadedImages3 = [];
					console.log(data3);
					$.each(data3.response.zone[0].records.work, processImages3);
					printImages(div3, loadedImages3);
					//loadedImages = [];
					loadedImages3.splice(0,loadedImages3.length);
					
					$.getJSON(urls[3], function(data4) {
						$(div4).empty();
						loadedImages4 = [];
						console.log(data4);
						$.each(data4.response.zone[0].records.work, processImages4);
						printImages(div4, loadedImages4);
						
						loadedImages4.splice(0,loadedImages4.length);
						urls.splice(0, urls.length);
					});
						
				});
			});	
			
	});
	
}

/*
 *   Depending where the image comes from, there is a special way to get that image from the website.
 *   This function works out where the image is from, and gets the image URL
 */
function processImages(index, troveItem) {
	var imgUrl = troveItem.identifier[0].value;
	if (imgUrl.indexOf(urlPatterns[0]) >= 0) { // flickr

		addFlickrItem(imgUrl, troveItem, loadedImages);
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[1]) >= 0) { // nla.gov

		loadedImages.push({
			url: imgUrl + "/representativeImage?wid=900", // change ?wid=900 to scale the image
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[2]) >= 0) { //artsearch

		loadedImages.push({
			url: "http://artsearch.nga.gov.au/IMAGES/LRG/" + getQueryVariable("IRN", imgUrl) + ".jpg",
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[3]) >= 0) { //recordsearch

		loadedImages.push({
			url: "http://recordsearch.naa.gov.au/NAAMedia/ShowImage.asp?T=P&S=1&B=" + getQueryVariable("Number", imgUrl),
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[4]) >= 0) { //slsa 
		
		loadedImages.push({
			url:  imgUrl.slice(0, imgUrl.length - 3) + "jpg",
			obj: troveItem
		});
		//console.log("added: " + imgUrl);
		
	} else { // Could not reliably load image for item
		//console.log("Not available: " + imgUrl);
	}
}

//2nd clone
function processImages2(index, troveItem) {
	var imgUrl = troveItem.identifier[0].value;
	if (imgUrl.indexOf(urlPatterns[0]) >= 0) { // flickr

		addFlickrItem(imgUrl, troveItem, loadedImages2);
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[1]) >= 0) { // nla.gov

		loadedImages2.push({
			url: imgUrl + "/representativeImage?wid=900", // change ?wid=900 to scale the image
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[2]) >= 0) { //artsearch

		loadedImages2.push({
			url: "http://artsearch.nga.gov.au/IMAGES/LRG/" + getQueryVariable("IRN", imgUrl) + ".jpg",
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[3]) >= 0) { //recordsearch

		loadedImages2.push({
			url: "http://recordsearch.naa.gov.au/NAAMedia/ShowImage.asp?T=P&S=1&B=" + getQueryVariable("Number", imgUrl),
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[4]) >= 0) { //slsa 
		
		loadedImages2.push({
			url:  imgUrl.slice(0, imgUrl.length - 3) + "jpg",
			obj: troveItem
		});
		//console.log("added: " + imgUrl);
		
	} else { // Could not reliably load image for item
		//console.log("Not available: " + imgUrl);
	}
}

//3rd clone
function processImages3(index, troveItem) {
	var imgUrl = troveItem.identifier[0].value;
	if (imgUrl.indexOf(urlPatterns[0]) >= 0) { // flickr

		addFlickrItem(imgUrl, troveItem, loadedImages3);
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[1]) >= 0) { // nla.gov

		loadedImages3.push({
			url: imgUrl + "/representativeImage?wid=900", // change ?wid=900 to scale the image
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[2]) >= 0) { //artsearch

		loadedImages3.push({
			url: "http://artsearch.nga.gov.au/IMAGES/LRG/" + getQueryVariable("IRN", imgUrl) + ".jpg",
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[3]) >= 0) { //recordsearch

		loadedImages3.push({
			url: "http://recordsearch.naa.gov.au/NAAMedia/ShowImage.asp?T=P&S=1&B=" + getQueryVariable("Number", imgUrl),
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[4]) >= 0) { //slsa 
		
		loadedImages3.push({
			url:  imgUrl.slice(0, imgUrl.length - 3) + "jpg",
			obj: troveItem
		});
		//console.log("added: " + imgUrl);
		
	} else { // Could not reliably load image for item
		//console.log("Not available: " + imgUrl);
	}
}

//4th clone
function processImages4(index, troveItem) {
	var imgUrl = troveItem.identifier[0].value;
	if (imgUrl.indexOf(urlPatterns[0]) >= 0) { // flickr

		addFlickrItem(imgUrl, troveItem, loadedImages4);
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[1]) >= 0) { // nla.gov

		loadedImages4.push({
			url: imgUrl + "/representativeImage?wid=900", // change ?wid=900 to scale the image
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[2]) >= 0) { //artsearch

		loadedImages4.push({
			url: "http://artsearch.nga.gov.au/IMAGES/LRG/" + getQueryVariable("IRN", imgUrl) + ".jpg",
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[3]) >= 0) { //recordsearch

		loadedImages4.push({
			url: "http://recordsearch.naa.gov.au/NAAMedia/ShowImage.asp?T=P&S=1&B=" + getQueryVariable("Number", imgUrl),
			obj: troveItem
		});
		//console.log("added: " + imgUrl);

	} else if (imgUrl.indexOf(urlPatterns[4]) >= 0) { //slsa 
		
		loadedImages4.push({
			url:  imgUrl.slice(0, imgUrl.length - 3) + "jpg",
			obj: troveItem
		});
		//console.log("added: " + imgUrl);
		
				} else { // Could not reliably load image for item
					//console.log("Not available: " + imgUrl);
				}
			}

			function addFlickrItem(imgUrl, troveItem, imageData) {
				var flickr_key = "22d183948274214d7ba0ef925fc563d5";
				var flickr_secret = "b9d7b6b6cc63b8c8";
				var flickr_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + flickr_key + "&photo_id=";
				var url_comps = imgUrl.split("/");
				var photo_id = url_comps[url_comps.length - 1];

				$.getJSON(flickr_url + photo_id + "&format=json&nojsoncallback=1", function(data) {
					if (data.stat == "ok") {
						var flickr_image_url = data.sizes.size[data.sizes.size.length - 1].source;
						imageData.push({
							url: flickr_image_url,
							obj: troveItem
						});
					}
				});

			}

			function printImages(div, imageData) {

				//$(div).append("<h3>Image Search Results</h3>");

				// If we want, we can also access the trove object with each image by using loadedImages[i].obj
				for (var i in imageData) {
				
					
					
					var image = new Image();
					image.src = imageData[i].url;
					image.style.display = "inline-block";
					image.style.width = "340px";
					image.style.height = "190px";
					image.style.margin = "1%";
					image.style.verticalAlign = "top";
					
					if(i == 1)
					{
						$(div).append(image);
					}
					
					
				}

			}

			// from http://css-tricks.com/snippets/javascript/get-url-variables/
			function getQueryVariable(variable, url) {
				var query = url.split("?");
				var vars = query[1].split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			}