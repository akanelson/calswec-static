(function($) {
	$(document).ready(function(){
    // Apply jQuery UI Accordion behaviors to specifically classed elements.
    $('.accordion').accordion({
      header: ".accordion__title",
      collapsible: true,
      active: false,
      animated: false
    });

	});
}(jQuery));
;
