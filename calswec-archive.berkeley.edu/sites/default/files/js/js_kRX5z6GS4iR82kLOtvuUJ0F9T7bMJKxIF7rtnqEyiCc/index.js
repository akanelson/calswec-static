(function($) {

/**
 * jQuery debugging helper.
 *
 * Invented for Dreditor.
 *
 * @usage
 *   $.debug(var [, name]);
 *   $variable.debug( [name] );
 */
jQuery.extend({
  debug: function () {
    // Setup debug storage in global window. We want to look into it.
    window.debug = window.debug || [];

    args = jQuery.makeArray(arguments);
    // Determine data source; this is an object for $variable.debug().
    // Also determine the identifier to store data with.
    if (typeof this == 'object') {
      var name = (args.length ? args[0] : window.debug.length);
      var data = this;
    }
    else {
      var name = (args.length > 1 ? args.pop() : window.debug.length);
      var data = args[0];
    }
    // Store data.
    window.debug[name] = data;
    // Dump data into Firebug console.
    if (typeof console != 'undefined') {
      console.log(name, data);
    }
    return this;
  }
});
// @todo Is this the right way?
jQuery.fn.debug = jQuery.debug;

})(jQuery);
;
(function ($) {

  /**
   * Google CSE utility functions.
   */
  Drupal.googleCSE = Drupal.googleCSE || {};

  Drupal.behaviors.googleCSE = {
    attach: function (context, settings) {
      // Show watermark, if not disabled in module settings.
      if (Drupal.settings.googleCSE.showWaterMark) {
        Drupal.googleCSE.googleCSEWatermark('#search-block-form.google-cse', context);
        Drupal.googleCSE.googleCSEWatermark('#search-form.google-cse', context);
        Drupal.googleCSE.googleCSEWatermark('#google-cse-results-searchbox-form', context);
      }
    }
  };

  /**
   * Show google CSE watermark.
   */
  Drupal.googleCSE.googleCSEWatermark = function(id, context) {
    var f = $(id, context)[0];
    if (f && (f.query || f['edit-search-block-form--2'] || f['edit-keys'])) {
      var q = f.query ? f.query : (f['edit-search-block-form--2'] ? f['edit-search-block-form--2'] : f['edit-keys']);
      var n = navigator;
      var l = location;
      if (n.platform == 'Win32') {
        q.style.cssText = 'border: 1px solid #7e9db9; padding: 2px;';
      }
      var b = function () {
        if (q.value == '') {
          q.style.background = '#FFFFFF url(https://www.google.com/cse/intl/' + Drupal.settings.googleCSE.language + '/images/google_custom_search_watermark.gif) left no-repeat';
        }
      };
      var f = function () {
        q.style.background = '#ffffff';
      };
      q.onfocus = f;
      q.onblur = b;
//      if (!/[&?]query=[^&]/.test(l.search)) {
      b();
//      }
    }
  };

})(jQuery);
;
/*
--------------------------------------------------------------------------
(c) 2007 Lawrence Akka
 - jquery version of the spamspan code (c) 2006 SpamSpan (www.spamspan.com)

This program is distributed under the terms of the GNU General Public
Licence version 2, available at http://www.gnu.org/licenses/gpl.txt
--------------------------------------------------------------------------
*/

(function ($) { //Standard drupal jQuery wrapper.  See http://drupal.org/update/modules/6/7#javascript_compatibility
// load SpamSpan
Drupal.behaviors.spamspan = {
  attach: function(context, settings) {
    // get each span with class spamspan
    $("span.spamspan", context).each(function (index) {
      // Replace each <spam class="t"></spam> with .
      if ($('../span/index.html', this).length) {
        $('../span/index.html', this).replaceWith('.');
      }
      
      // For each selected span, set mail to the relevant value, removing spaces
      var _mail = ($("span.u", this).text() +
        "@" +
        $("span.d", this).text())
        .replace(/\s+/g, '');

      // Build the mailto URI
      var _mailto = "mailto:" + _mail;
      if ($('../span/index-2.html', this).length) {
        // Find the header text, and remove the round brackets from the start and end
        var _headerText = $("../span/index-2.html", this).text().replace(/^ ?\((.*)\) ?$/, "$1");
        // split into individual headers, and return as an array of header=value pairs
        var _headers = $.map(_headerText.split(/, /), function (n, i) {
          return (n.replace(/: /, "="));
        });

        var _headerstring = _headers.join('&');
        _mailto += _headerstring ? ("?" + _headerstring) : '';
      }

      // Find the anchor content, and remove the round brackets from the start and end
      var _anchorContent = $("span.a", this).html();
      if (_anchorContent) {
        _anchorContent = _anchorContent.replace(/^ ?\((.*)\) ?$/, "$1");
      }

      // create the <a> element, and replace the original span contents

      //check for extra <a> attributes
      var _attributes = $("span.e", this).html();
      var _tag = "<a></a>";
      if (_attributes) {
        _tag = "<a " + _attributes.replace("<!--", "").replace("-->", "") + "></a>";
      }

      $(this).after(
        $(_tag)
          .attr("href", _mailto)
          .html(_anchorContent ? _anchorContent : _mail)
          .addClass("spamspan")
      ).remove();
    });
  }
};
}) (jQuery);;
