function LoadFdx(args){
  var project = {
    RawInput : args.target.result,
    HtmlResult : 'Html result',
    TextResult : "Text result",
  }

  ParseFdx(project);

  CreateHtml(project);
  CreateText(project);

  return project;
}

function ParseFdx(project){
  //parse file content
  xmlDoc = $.parseXML( project.RawInput );
  $xml = $( xmlDoc );
  // $title = $xml.find( "FinalDraft" );

  project.Fdx = $xml;
}

function CreateText(project)
{
  project.TextResult = project.HtmlResult.clone();
}

function CreateHtml(project){
  var fdx = project.Fdx;
  project.HtmlResult = $('<div></div>');
  project.HtmlResult.addClass('screenplay');

  $( "Paragraph", fdx ).each( function( index, element ){

    var item = $(element);
    var text = item.text();
    var contentType = item.attr('Type');

    text = text.trim();
    if (contentType != undefined) {
      contentType = contentType.replace(' ', '');
    }
    else {
      contentType = "unknown";
    }

    switch (contentType) {
      case 'SceneHeading':
      case 'Character':
      case 'Transition':
        text = text.toUpperCase();
        break;

      }
    var html = $("<p></p>");
    html.text(text);
    html.addClass('paragraph');
    html.addClass(contentType);
    project.HtmlResult.append(html);
  });
}
