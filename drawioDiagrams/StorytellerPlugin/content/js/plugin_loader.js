var x = document.createElement('script');
x.src = 'https://freewebtime.github.io/drawioDiagrams/StorytellerPlugin/content/js/storytelling.js';
document.getElementsByTagName("head")[0].appendChild(x);
x.onload = function(){
    storyPlugin.init();
    storyPlugin.test();
}


//