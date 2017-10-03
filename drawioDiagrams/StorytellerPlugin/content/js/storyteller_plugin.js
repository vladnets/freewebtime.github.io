//experimenting
function callback_function(){
    storyPlugin.init();
}

var x = document.createElement('script');
x.src = 'https://freewebtime.github.io/drawioDiagrams/StorytellerPlugin/content/js/storyteller.core.js';
document.getElementsByTagName("head")[0].appendChild(x);
x.onload=callback_function;


// 