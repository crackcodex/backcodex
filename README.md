# Backcodex

Backcodex is a simple jQuery plugin for full width responsive background video.
## Demo

There is a example included with this package, or feel free to check it out live [on the project page itself](http://plugin.crackcodex.com/backcodex/).

## Setup

Include the jQuery library (version 1.9 or newer) and Backcodex plugin files in your webpage (preferably at the bottom of the page, before the closing BODY tag):

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="jquery.backcodex.min.js"></script>
<script>
  // To attach Backcodex as the body's background
  $.backcodex([
    "path/to/video.mp4",
    "path/to/video.ogv",
    "path/to/video.webm"    
  ]);

  // You may also attach Backcodex to a block-level element
  $(".foo").backcodex([
    "path/to/video.mp4",
    "path/to/video.ogv",
    "path/to/video.webm"    
  ]);
</script>
```

## Changelog

### Version 1.0

* Initial release
