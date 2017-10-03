//revision
var revision = 0.005;
var postfix = 'a';

storyPlugin = { 
    
    storyData: {
        characters: [],
        storypoints: []
    },

    init : function(){
        console.log("intializing storytelling. v" + revision + postfix);
    },

    test : function(){
        $("#main").text('hello world!!!');
    },

    testPopup: function(){
        
    }
}