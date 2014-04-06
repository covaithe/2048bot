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

  var grid = readGrid();
  console.log(grid.print());

  var keycodes =  {
    left: 37,
    up:   38,
    right: 39, 
    down: 40
  };

  function sendKeypress(code) {
    var keyboardEvent = document.createEvent("KeyboardEvent");
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";


    keyboardEvent[initMethod](
        "keypress", // event type : keydown, keyup, keypress
        true, // bubbles
        true, // cancelable
        window, // viewArg: should be window
        false, // ctrlKeyArg
        false, // altKeyArg
        false, // shiftKeyArg
        false, // metaKeyArg
        code, // keyCodeArg : unsigned long the virtual key code, else 0
        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
        );
    document.dispatchEvent(keyboardEvent);
  }

  sendKeypress(keycodes.up);
  console.log(readGrid().print());
  sendKeypress(keycodes.up);
  console.log(readGrid().print());

})();
