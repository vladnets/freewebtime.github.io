/**
 * Explore plugin.
 */
Draw.loadPlugin(function(ui)
{
/* Finding assigned keys:
    
      * Open javascript console
      * Draw.valueOf()
      * Traverse to: Object > loadPlugin > <function scope> 
                    > ui > keyHandler > controlShiftKeys
      * The number here is ASCII character code 
    */
	
	mxResources.parse('myAlert=My alert');
	
	ui.actions.addAction('myAlert', function() {
		alert("Hi there"); 
	});

    var revision = 0.001;
    var postfix = 'a';
    console.log("this is my first plugin. It's version is " + revision + postfix);

    // Adds resources for actions
    mxResources.parse('myInsertText=Insert text element');
    mxResources.parse('myInsertEllipse=Insert ellipse');
    
    // Adds action : myInsertEllipse
    ui.actions.addAction('myInsertEllipse', function() {
        var theGraph = ui.editor.graph;
        if(theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())){
          var pos=theGraph.getInsertPoint();
          var newElement=new mxCell("",
                    new mxGeometry(pos.x, pos.y, 40, 80),
                    "ellipse;whiteSpace=wrap;html=1;");
        
          newElement.vertex=!0;
          theGraph.setSelectionCell(theGraph.addCell(newElement))
        }
    }, null, null, "Ctrl+Alt+A");
    
    ui.keyHandler.bindAction(81, !0, "myInsertEllipse", !0);
    
    ui.actions.addAction('myInsertText', function() {
        var theGraph = ui.editor.graph;
        if(theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())){
          var pos=theGraph.getInsertPoint();
          var newElement=new mxCell("",
                    new mxGeometry(pos.x, pos.y, 80, 80),
                    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;overflow=auto");
        
          newElement.vertex=!0;
          theGraph.setSelectionCell(theGraph.addCell(newElement))
        }
    }, null, null, "Ctrl+Shift+T");
    
    ui.keyHandler.bindAction(84, !0, "myInsertText", !0);
    
    // Adds menu
    ui.menubar.addMenu('Fwt', function(menu, parent) {
        ui.menus.addMenuItem(menu, 'myInsertText');
        ui.menus.addMenuItem(menu, 'myInsertEllipse');
        ui.menus.addMenuItem(menu, 'myAlert');
    });

    // Reorders menubar
    ui.menubar.container
      .insertBefore(ui.menubar.container.lastChild,
                    ui.menubar.container.lastChild.previousSibling.previousSibling);
});
// 