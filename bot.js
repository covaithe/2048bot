(function() {
  var Grid = function() {
    this.cells = new Array(16);

    this.getCell = function(x,y) {
      return this.cells[ cellIndex(x,y) ];
    };
    this.setCell = function(x,y,value) {
      this.cells[ cellIndex(x,y) ] = value;
    };

    function cellIndex(x,y) {
      x = x - 1;
      y = y - 1;
      return x*4 + y;
    }
  };


  var container = new HTMLActuator().tileContainer;
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
  console.log(grid);
})();
