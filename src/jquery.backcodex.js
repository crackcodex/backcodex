/*=============================================
* Backcodex - v1.0.0 - 2015-07-15
* http://plugin.crackcodex.com/backcodex/
* Copyright (c) 2015 Crackcodex; Licensed MIT
* ============================================ */
;(function ($, window, undefined) {
    'use strict';

    /* PLUGIN DEFINITION
    * ========================= */

    $.fn.backcodex = function (videos, options) {
        // We need at least one video or method name
        if (videos === undefined || videos.length === 0) {
            $.error("No videos were supplied for Backcodex");
        }

        return this.each(function () {
          var $this = $(this)
            , obj = $this.data('backcodex');

          // Do we already have an instance attached to this element?
          if (obj) {

            // Is this a method they're trying to execute?
            if (typeof videos == 'string' && typeof obj[videos] == 'function') {
              // Call the method
              obj[videos](options);

              // No need to do anything further
              return;
            }

            // Merge the old options with the new
            options = $.extend(obj.options, options);

            // Remove the old instance
            obj.destroy(true);
          }

          obj = new Backcodex(this, videos, options);
          $this.data('backcodex', obj);
        });
 
    };
    // If no element is supplied, we'll attach to body
    $.backcodex = function (videos, options) {
    // Return the instance
    return $('body')
            .backcodex(videos, options)
            .data('backcodex');
    };

    // Custom selector
    $.expr[':'].backcodex = function(elem) {
        return $(elem).data('backcodex') !== undefined;
    };

    $.fn.backcodex.defaults = {

    };

    var styles = {
        wrap: {
          bottom: 0
        , height: 'auto'
        , minHeight: '100%'
        , minWidth: '100%'
        , overflow: 'hidden'
        , position: 'fixed'
        , right: 0
        , width: 'auto'
        , zIndex: -999999
        }
        , source: {
          type : 'video/mp4'
        }
    };


    /* CLASS DEFINITION
    * ========================= */
    var Backcodex = function (container, videos, options) {
        this.options = $.extend({}, $.fn.backcodex.defaults, options || {});

        /* In its simplest form, we allow Backcodex to be called on an video path.
         * e.g. $.backcodex('/path/to/video.mp4')
         * So, we need to turn this back into an array.
         */
        this.videos = $.isArray(videos) ? videos : [videos];

        // Preload videos
        $.each(this.videos, function () {
          $('<source type="video/mp4"></source>')[0].src = this;
          //console.log(videos[0]);
        });    

        // Convenience reference to know if the container is body.
        this.isBody = container === document.body;

        /* We're keeping track of a few different elements
         *
         * Container: the element that Backcodex was called on.
         * Wrap: a VIDEO that we place the source into, so we can hide the overflow.
         */
        this.$container = $(container);

        // Don't create a new wrap if one already exists (from a previous instance of Backcodex)
        var $existing = this.$container.children(".video_bg").first();
        this.$wrap = $existing.length ? $existing : $('<video class="video_bg" volume="0" muted="muted" loop="loop" autoplay="true" preload="auto"></video>').css(styles.wrap).appendTo(this.$container);
        var index = 0;
        $.each(videos, function (){
            var type = videos[index];
            $('<source class="vtype'+index+'"></source>').appendTo('.video_bg');
            $( ".vtype"+index ).attr('type', type.slice(0,5)+"/"+type.slice(12));
            $( ".vtype"+index ).attr('src', videos[index]);
            console.log(type);
            index++;
        })

    }; 

    /* PUBLIC METHODS
     * ========================= */
    Backcodex.prototype = {

     destroy: function (preserveBackground) {

        // Remove Backcodex
        if(!preserveBackground) {
          this.$wrap.remove();          
        }
        this.$container.removeData('backcodex');
      } 
    }   

})(jQuery);