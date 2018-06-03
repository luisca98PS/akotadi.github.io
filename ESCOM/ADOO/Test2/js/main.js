// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
	var x = document.getElementById("navDemo");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

// Slideshow
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
	showDivs(slideIndex += n);
}

function currentDiv(n) {
	showDivs(slideIndex = n);
}

function showDivs(n) {
	var i;
	var x = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("demodots");
	if (n > x.length) {
		slideIndex = 1
	}    
	if (n < 1) {
		slideIndex = x.length
	} ;
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";  
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" w3-white", "");
	}
	x[slideIndex-1].style.display = "block";  
	dots[slideIndex-1].className += " w3-white";
}

// Side navigation
function w3_open() {
	var x = document.getElementById("mySidebar");
	x.style.width = "100%";
	x.style.fontSize = "40px";
	x.style.paddingTop = "10%";
	x.style.display = "block";
}

function w3_close() {
	document.getElementById("mySidebar").style.display = "none";
}

// Tabs
function openCity(evt, cityName) {
	var i;
	var x = document.getElementsByClassName("city");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	var activebtn = document.getElementsByClassName("testbtn");
	for (i = 0; i < x.length; i++) {
		activebtn[i].className = activebtn[i].className.replace(" w3-dark-grey", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " w3-dark-grey";
}

var mybtn = document.getElementsByClassName("testbtn")[0];
mybtn.click();

// Accordions
function myAccFunc(id) {
	var x = document.getElementById(id);
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

// Progress Bars
function move() {
	var elem = document.getElementById("myBar");   
	var width = 5;
	var id = setInterval(frame, 10);
	function frame() {
		if (width == 100) {
			clearInterval(id);
		} else {
			width++; 
			elem.style.width = width + '%'; 
			elem.innerHTML = width * 1  + '%';
		}
	}
}

// Pie Chart
function drawPieChart() {
	// Load google charts
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);

	// Draw the chart and set the chart values
	function drawChart() {
		var data = google.visualization.arrayToDataTable([
		['Actividad', 'Horas'],
		['Coro', 8],
		['Boteo', 2],
		['Algoritmia', 4],
		['Gym', 2],
		['Conferencia', 8]
		]);

		// Optional; add a title and set the width and height of the chart
		var options = {'title':'Distribución'};

		// Display the chart inside the <div> element with id="piechart"
		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	}
}



// ************************ Drag and drop ***************** //
function startRead(evt) {  
  var file = document.getElementById('file').files[0];
  if(file){
    if(file.type.match("image.*"))
    {
    getAsImage(file);
    alert("Name: "+file.name +"\n"+"Last Modified Date :"+file.lastModifiedDate);
    }
    else
    {
    getAsText(file);
    alert("Name: "+file.name +"\n"+"Last Modified Date :"+file.lastModifiedDate);
    }
    }
    evt.stopPropagation();
    evt.preventDefault();
}

function startReadFromDrag(evt) {
    var file = evt.dataTransfer.files[0];
    if (file) {
        if (file.type.match("image.*")) {
            getAsImage(file);
            alert("Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate);
        }
        else {
            getAsText(file);
            alert("Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate);
        }
    }
    evt.stopPropagation();
    evt.preventDefault();
}


function getAsText(readFile) {
        
  var reader = new FileReader();
  
  // Read file into memory as UTF-16      
  reader.readAsText(readFile, "UTF-8");
  
  // Handle progress, success, and errors
  reader.onprogress = updateProgress;
  reader.onload = loaded;
  reader.onerror = errorHandler;
}

function getAsImage(readFile) {
        
  var reader = new FileReader();
  
  // Read file into memory as UTF-16      
  reader.readAsDataURL(readFile);
  
  // Handle progress, success, and errors
  reader.onload = addImg;
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}

function loaded(evt) {  
  // Obtain the read file data    
  var fileString = evt.target.result;
  $("#op").text(fileString);
  alert("file Loaded successfully");
  // Handle UTF-16 file dump
  if(utils.regexp.isChinese(fileString)) {
    //Chinese Characters + Name validation
  }
  else {
    // run other charset test
  }
  // xhr.send(fileString)     
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    // The file could not be read
  }
}
function domagic(evt){
$("#draghere").css("background-color","green");
  evt.stopPropagation();
    evt.preventDefault();  
}

function addImg(imgsrc){
 var img = document.createElement('img');
  img.setAttribute("src",imgsrc.target.result);
  img.setAttribute("height","100");
  img.setAttribute("width","300");
  document.getElementById("op").insertBefore(img);
}

  var dropingDiv = document.getElementById('draghere');
  dropingDiv.addEventListener('dragover', domagic, false);
  dropingDiv.addEventListener('drop', startReadFromDrag, false);