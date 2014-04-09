(function() {
  var Grid = function() {
    this.cells = new Array(16);

    this.print = function() {
      i = 0;
      for(y = 1; y <= 4; y++) {
        s = "";
        for(x = 1; x <= 4; x++) {
          if(this.cells[i]) {
            s += ('    ' + this.cells[i]).slice(-4) + ' ';
          } else {
            s += '   - ';
          }
          i += 1;
        }
        console.log(s);
      }
    };

    this.getCell = function(x,y) {
      return this.cells[ cellIndex(x,y) ];
    };

    this.setCell = function(x,y,value) {
      this.cells[ cellIndex(x,y) ] = value;
    };

    function cellIndex(x,y) {
      x = x - 1;
      y = y - 1;
      return y*4 + x;
    }
  };


  var container = new HTMLActuator().tileContainer;

  function readGrid() {
    var grid = new Grid();
    for(var i = 0; i < container.children.length; i++) {
      cell = container.children[i];
      classes = cell.classList;
      value = parseInt(classes[1].split('-')[1]);
      position = classes[2].split('-');
      x = parseInt(position[2]);
      y = parseInt(position[3]);
      grid.setCell(x,y,value);
    }
    return grid;
  }

  var keycodes =  {
    left: 37,
    up:   38,
    right: 39, 
    down: 40
  };

  var body = undefined;
  function sendKeypress(code) {
    console.log("sending code " + code);
    if (body === undefined) {
      body = $('body');
    }
    var e = $.Event("keydown");
    e.which = code;
    console.log(e);
    body.trigger(e);
  }

	var v = "1.3.2";

	// check prior inclusion and version
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initializeJunk();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initializeJunk();
	}
	

  function initializeJunk() {
    console.log('hi');
    console.log(readGrid().print());
    sendKeypress(keycodes.up);
    console.log(readGrid().print());
    sendKeypress(keycodes.up);
    console.log(readGrid().print());
  }

})();
