// Add copy to clipboard functionality to Code blocks

$(function () {
  function getParentLanguageClassName(element) {
    var parent = element.parentNode;
    while (parent) {
      if (parent.classList) {
        var classes = parent.classList;
        for (var i = 0; i < classes.length; i++) {
          if (classes[i].startsWith("language-")) {
            return classes[i].substring("language-".length);
          }
        }
      }
      parent = parent.parentNode;
    }
    return null; // If no parent with class starting with "language-" is found
  }

  window.addCodeBlocksTitle = function () {
    // get all <code> elements
    var allCodeBlocksElements = $("code");

    allCodeBlocksElements.each(function (i) {
      // Check if the code element is embedded in a .highlight
      if ($(this).closest('.highlight').length) {
        // add different id for each code block
        var currentId = "codeblock" + (i + 1);
        $(this).attr('id', currentId);

        // Get the original container of the code element
        var originalContainer = $(this).parent();
        var languageClassName = getParentLanguageClassName(this);

        // Add a small header with "Copy to clipboard" text to the parent of the original container
        var header = $('<div class="highlight-header">' + (languageClassName ? languageClassName : "") + '</div>');
        originalContainer.parent().prepend(header);

        // Set up the button
        // TODO: Add multi-lang support via front matter
        var clipButton =
          '<button class="btn" data-clipboard-target="#' + currentId + '">' +
          '<svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm">' +
          '<path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"' +
          'd="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z"' +
          '></path>' +
          '</svg>' +
          'Copy' + 
          '</button>';

        // Add the button to the header
        header.append(clipButton);
      }
    });
  }

  // https://clipboardjs.com/
  //
  var clipboard = new ClipboardJS('.btn');

  // ClipboardJS already handled the copy to clipboard part, just leaves the selection it uses permanent
  // Clear the selection on success
  clipboard.on('success', function (e) {
    console.debug('Action:', e.action);
    console.debug('Text:', e.text);
    console.debug('Trigger:', e.trigger);

    const svgElement = e.trigger.querySelector('svg');
    const textNode = Array.from(e.trigger.childNodes).find(node => node.nodeType === Node.TEXT_NODE);

    textNode.textContent = 'Copied!';
    svgElement.style.display = 'none';

    e.clearSelection();

    setTimeout(function () {
      textNode.textContent = 'Copy';
      svgElement.style.display = '';
    }, 1000);
  });

  // But keep the selection on error, so the user just have to press the default OS copy hotkey
  clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  });

});