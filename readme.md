## Currently at Version 2.0.4

Documentation can be found at:
http://blog.aaronvanderzwan.com/2012/07/maximage-2-0/

Demo can be found at:
http://www.aaronvanderzwan.com/maximage/2.0/

## Changelog:

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