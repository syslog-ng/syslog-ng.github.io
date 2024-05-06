/* ==========================================================================
   Custom js init stuff
   ========================================================================== */

$(function () {

  // Override the default lunr tokenizer options, as a quick fix added _ to the list to get ignored the differences like option-1 and option_1
  lunr.tokenizer.separator = /[\s\-_]+/

});