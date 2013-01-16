## Currently at Version 2.0.8

Documentation can be found at:
http://blog.aaronvanderzwan.com/2012/07/maximage-2-0/

Full demo can be found at:
http://www.aaronvanderzwan.com/maximage/2.0/

## Known Issues:
* HTML5 video fallbacks for IE7 & IE8 currently do not fill the screen within a slideshow.  I am working on this currently, but if this is important to you, please use another slideshow for the time being and check back for updates as this has proven more complex than was expected.

## Changelog:

Version 2.0.8:
* [Fixed] With jQuery removing $.browser Maximage now does it's own browser detection.

Version 2.0.7:
* [Fixed] I have completely rewritten the Old.preload() method to avoid a Stack Overflow bug found in IE7 & IE8 if there are more than 13 slides.
* [Added] QUnit tests in /tests

Version 2.0.6:
* [Added] Add ability for backgroundSize option to be passed as a function to the plugin.  This way you can completely customize how you want the image to resize.  See example @ http://www.aaronvanderzwan.com/maximage/2.0/#CustomBGSize
* [Added] Added a landing page with code explanations for some examples.

Version 2.0.5:
* Now you can call maximage on any object and it will fill and center it (pass it a string, 'maxcover', 'maxcontain', 'fill' or 'center').  This makes it really easy to have any visual element be the fullscreen background element of the slideshow (HTML5 video, etc). A small explanation / tutorial can be found at: http://blog.aaronvanderzwan.com/forums/topic/maximage-cover-helper-function/
* Exposed options to be global
* Created "Adjust" object to handle math for fit and center functions
* Remove Timer object (it wasn't being used anymore)

Version 2.0.4:
* Added CSS transitions as the default 'easing' cycle option (Thanks to Roger Braunstein for this idea [http://partlyhuman.com/])
* Added "cssTransitions" option that can force the plugin to run without using CSS transitions
* Renamed "noBackgroundCSS" to "cssBackgroundSize" and changed the default to "true"
* Added browser detection for CSS transitions and BackgroundSize to avoid dependence on Modernizr
* Removed Jquery Easing plugin from the demo as I was not using it anyways

Version 2.0.3:
* Added "noBackgroundCSS" option that forces the plugin to run without using CSS3's background-size

Version 2.0.2:
* Added "fillElement" option that provides the ability to constrain your slideshow to a container element (not just the window)

Version 2.0.1: 
* Added backgroundSize option so that older browsers can act as though they support CSS3 background-size:contain
* Now using dynamic backgroundSize CSS3 check for older browser functionality

Version 2.0:
* Fixed compatibility with older browsers, specifically a bug that was creating white space after browser resize

Version 2.0-beta3:
* Added ability to add other HTML within Slides (still to be tested in pre-CSS3 browsers)

## Past Fork Notes
re: alancwoo - Added the ability to use a data-href attribute on the images. Thus one can now use this attribute for various things such as jquery tooltips, click functions etc.