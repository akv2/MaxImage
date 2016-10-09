/*	--------------------------------------------------------------------
	MaxImage 2.0 (Fullscreen Slideshow for use with jQuery Cycle Plugin)
	--------------------------------------------------------------------
	
	Examples and documentation at: http://www.aaronvanderzwan.com/maximage/2.0/
	Copyright (c) 2007-2012 Aaron Vanderzwan
	Dual licensed under the MIT and GPL licenses.
	
	NOTES:
	This plugin is intended to simplify the creation of fullscreen 
	background slideshows.  It is intended to be used alongside the 
	jQuery Cycle plugin: 
	http://jquery.malsup.com/cycle/
	
	If you simply need a fullscreen background image, please
	refer to the following document for ways to do this that
	are much more simple:
	http://css-tricks.com/perfect-full-page-background-image/
	
	If you have any questions please contact Aaron Vanderzwan
	at http://www.aaronvanderzwan.com/blog/
	Documentation at:
	http://blog.aaronvanderzwan.com/2012/07/maximage-2-0/
	
	HISTORY:
	MaxImage 2.0 is a project first built as jQuery MaxImage Plugin 
	(http://www.aaronvanderzwan.com/maximage/). Once CSS3 came along, 
	the background-size:cover solved the problem MaxImage
	was intended to solve.  However, fully customizable
	fullscreen slideshows is still fairly complex and I have not
	found any helpers for integrating with the jQuery Cycle Plugin.
	MaxCycle is intended to solve this problem.
	
	TABLE OF CONTENTS:
	@Modern
		@setup
		@resize
		@preload
	@Old
		@setup
		@preload
		@onceloaded
		@maximage
		@windowresize
		@doneresizing
	@Cycle
		@setup
	@Adjust
		@center
		@fill
		@maxcover
		@maxcontain
	@Utils
		@browser_tests
		@construct_slide_object
		@sizes
	@modern_browser
	@debug
		
*/
/*!	
 * Maximage Version: 2.0.8 (16-Jan-2012) - http://www.aaronvanderzwan.com/maximage/2.0/
 */



(function ($) {
	"use strict";
	$.fn.maximage = function (settings, helperSettings) {

		var config;

		if (typeof settings == 'object' || settings === undefined) config = $.extend( $.fn.maximage.defaults, settings || {} );
		if (typeof settings == 'string') config = $.fn.maximage.defaults;
		
		/*jslint browser: true*/
		$.Body = $('body');
		$.Window = $(window);
		$.Scroll = $('html, body');
		$.Events = {
			RESIZE: 'resize'
		};
		
		this.each(function() {
			var $self = $(this),
				preload_count = 0,
				imageCache = [];
			
			/* --------------------- */
			
			// @Modern
			
			/* 
			MODERN BROWSER NOTES:
				Modern browsers have CSS3 background-size option so we setup the DOM to be the following structure for cycle plugin:
				div = cycle
					div = slide with background-size:cover
					div = slide with background-size:cover
					etc.
			*/
			
			var Modern = {
				setup: function(){
					if($.Slides.length > 0){
						var i,
							len = $.Slides.length;
							
						// Setup images
						for(i=0; i < len; i++) {
							// Set our image
							var $img = $.Slides[i];
							
							// Create a div with a background image so we can use CSS3's position cover (for modern browsers)
							$self.append('<div class="mc-image ' + $img.theclass + '" title="' + $img.alt + '" style="background-image:url(\'' + $img.url + '\');' + $img.style + '" data-href="'+ $img.datahref +'">'+ $img.content +'</div>');
						}
						
						// Begin our preload process (increments itself after load)
						Modern.preload(0);
						
						// If using Cycle, this resets the height and width of each div to always fill the window; otherwise can be done with CSS
						Modern.resize();
					}
				},
				preload: function(n){
					// Preload all of the images but never show them, just use their completion so we know that they are done
					// 		and so that the browser can cache them / fade them in smoothly
					
					// Create new image object
					var $img = $('<img/>');
					$img.on('load', function() {
						// Once the first image has completed loading, start the slideshow, etc.
						if(preload_count==0) {
							// Only start cycle after first image has loaded
							Cycle.setup();
							
							// Run user defined onFirstImageLoaded() function
							config.onFirstImageLoaded();
						}
						
						// preload_count starts with 0, $.Slides.length starts with 1
						if(preload_count==($.Slides.length-1)) {
							// If we have just loaded the final image, run the user defined function onImagesLoaded()
							config.onImagesLoaded( $self );
						}else{ 
							// Increment the counter
							preload_count++;
							
							// Load the next image
							Modern.preload(preload_count);
						}
					});
					
					// Set the src... this triggers begin of load
					$img[0].src = $.Slides[n].url;
					
					// Push to external array to avoid cleanup by aggressive garbage collectors
					imageCache.push($img[0]);
				},
				resize: function(){
					// Cycle sets the height of each slide so when we resize our browser window this becomes a problem.
					//  - the cycle option 'slideResize' has to be set to false otherwise it will trump our resize
					$.Window
						.bind($.Events.RESIZE,
						function(){
							// Remove scrollbars so we can take propper measurements
							$.Scroll.addClass('mc-hide-scrolls');
							
							// Set vars so we don't have to constantly check it
							$.Window
								.data('h', Utils.sizes().h)
								.data('w', Utils.sizes().w);
							
							// Set container and slides height and width to match the window size
							$self
								.height($.Window.data('h')).width($.Window.data('w'))
								.children()
								.height($.Window.data('h')).width($.Window.data('w'));
							
							// This is special noise for cycle (cycle has separate height and width for each slide)
							$self.children().each(function(){
								this.cycleH = $.Window.data('h');
								this.cycleW = $.Window.data('w');
							});
							
							// Put the scrollbars back to how they were
							$($.Scroll).removeClass('mc-hide-scrolls');
						});
				}
			}
			
			
			
			/* --------------------- */
			
			// @Old
			
			/* 
			OLD BROWSER NOTES:
				We setup the dom to be the following structure for cycle plugin on old browsers:
				div = cycle
					div = slide
						img = full screen size image
					div = slide
						img = full screen size image
					etc.
			*/
			
			var Old = {
				setup: function(){
					var c, t, $div, j, slideLen = $.Slides.length;
					
					// Clear container
					if($.BrowserTests.msie && !config.overrideMSIEStop){
						// Stop IE from continually trying to preload images that we already removed
						document.execCommand("Stop", false);
					}
					$self.html('');
					
					$.Body.addClass('mc-old-browser');
					
					if($.Slides.length > 0){
						// Remove scrollbars so we can take propper measurements
						$.Scroll.addClass('mc-hide-scrolls');
						
						// Cache our new dimensions
						$.Window
							.data('h', Utils.sizes().h)
							.data('w', Utils.sizes().w);
						
						// Add our loading div to the DOM
						$('body').append($("<div></div>").attr("class", "mc-loader").css({'position':'absolute','left':'-9999px'}));
						
						//  Loop through slides
						for(j = 0; j < slideLen; j++) {
							// Determine content (if container or image)
							if($.Slides[j].content.length == 0){
								c = '<img src="' + $.Slides[j].url + '" />';
							}else{
								c = $.Slides[j].content;
							}
							
							// Create Div
							$div = $("<div>" + c + "</div>").attr("class", "mc-image mc-image-n" + j + " " + $.Slides[j].theclass);
							
							// Add new container div to the DOM
							$self.append( $div );
							
							// Account for slides without images
							if($('.mc-image-n' + j).children('img').length == 0){
							}else{
								// Add first image to loader to get that started
								$('div.mc-loader').append( $('.mc-image-n' + j).children('img').first().clone().addClass('not-loaded') );
							}
						}
						
						// Begin preloading
						Old.preload();
						
						// Setup the resize function to listen for window changes
						Old.windowResize();
					}
				},
				preload: function(){
					// Intervals to tell if an images have loaded
					var t = setInterval(function() {
						$('.mc-loader').children('img').each(function(i){
							// Check if image is loaded
							var $img = $(this);
							
							// Loop through not-loaded images
							if($img.hasClass('not-loaded')){
								if( $img.height() > 0 ){
									// Remove Dom notice
									$(this).removeClass('not-loaded');
									
									// Set the dimensions
									var $img1 = $('div.mc-image-n' + i).children('img').first();
									
									$img1
										.data('h', $img.height())
										.data('w', $img.width())
										.data('ar', ($img.width() / $img.height()));
									
									// Go on
									Old.onceLoaded(i)
								}
							}
						});
					
						if( $('.not-loaded').length == 0){
							// Remove our loader element because all of our images are now loaded
							$('.mc-loader').remove();
							
							// Clear interval when all images are loaded
							clearInterval(t);
						}
					}, 1000);
				},
				onceLoaded: function(m){
					// Do maximage magic
					Old.maximage(m);
					
					// Once the first image has completed loading, start the slideshow, etc.
					if(m == 0) {
						// If we changed the visibility before, make sure it is back on
						$self.css({'visibility':'visible'});
						
						// Run user defined onFirstImageLoaded() function
						config.onFirstImageLoaded();
					
					// After everything is done loading, clean up
					}else if(m == $.Slides.length - 1){
						// Only start cycle after the first image has loaded
						Cycle.setup();
						
						// Put the scrollbars back to how they were
						$($.Scroll).removeClass('mc-hide-scrolls');
						
						// If we have just loaded the final image, run the user defined function onImagesLoaded()
						config.onImagesLoaded( $self );
						
						if(config.debug) {
							debug(' - Final Maximage - ');debug($self);
						}
					}
				},
				maximage: function(p){
					// Cycle sets the height of each slide so when we resize our browser window this becomes a problem.
					//  - the cycle option 'slideResize' has to be set to false otherwise it will trump our resize
					$('div.mc-image-n' + p)
						.height($.Window.data('h'))
						.width($.Window.data('w'))
						.children('img')
						.first()
						.each(function(){
							Adjust.maxcover($(this));
						});
				},
				windowResize: function(){
					$.Window
						.bind($.Events.RESIZE,
						function(){
							clearTimeout(this.id);

							if($('.mc-image').length >= 1){
								this.id = setTimeout(Old.doneResizing, 200);
							}
						});
				},
				doneResizing: function(){
					// The final resize (on finish)
					// Remove scrollbars so we can take propper measurements
					$($.Scroll).addClass('mc-hide-scrolls');
					
					// Cache our window's new dimensions
					$.Window
						.data('h', Utils.sizes().h)
						.data('w', Utils.sizes().w);
					
					// Set the container's height and width
					$self.height($.Window.data('h')).width($.Window.data('w'))
					
					// Set slide's height and width to match the window size
					$self.find('.mc-image').each(function(n){
						Old.maximage(n);
					});
					
					// Update cycle's ideas of what our slide's height and width should be
					var curr_opts = $self.data('cycle.opts');
					if(curr_opts != undefined){
						curr_opts.height = $.Window.data('h');
						curr_opts.width = $.Window.data('w');
						jQuery.each(curr_opts.elements, function(index, item) {
						    item.cycleW = $.Window.data('w');
							item.cycleH = $.Window.data('h');
						});
					}
					
					// Put the scrollbars back to how they were
					$($.Scroll).removeClass('mc-hide-scrolls');
				}
			}
			
			
			/* --------------------- */
			
			// @Cycle
			
			var Cycle = {
				setup: function(){
					var h,w;
					
					$self.addClass('mc-cycle');
					
					// Container sizes (if not set)
					$.Window
						.data('h', Utils.sizes().h)
						.data('w', Utils.sizes().w);
					
					// Prefer CSS Transitions
					jQuery.easing.easeForCSSTransition = function(x, t, b, c, d, s) {
						return b+c;
					};
					
					var cycleOptions = $.extend({
						fit:1,
						containerResize:0,
						height:$.Window.data('h'),
						width:$.Window.data('w'),
						slideResize: false,
						easing: ($.BrowserTests.cssTransitions && config.cssTransitions ? 'easeForCSSTransition' : 'swing')
					}, config.cycleOptions);
					
					$self.cycle( cycleOptions );
				}
			}
			
			
			
			/* --------------------- */
			
			// @Adjust = Math to center and fill all elements
			
			var Adjust = {
				center: function($item){
					// Note: if alignment is 'left' or 'right' it can be controlled with CSS once verticalCenter 
					// 	and horizontal center are set to false in the plugin options
					if(config.verticalCenter){
						$item.css({marginTop:(($item.height() - $.Window.data('h'))/2) * -1})
					}
					if(config.horizontalCenter){
						$item.css({marginLeft:(($item.width() - $.Window.data('w'))/2) * -1});
					}
				},
				fill: function($item){
					var $storageEl = $item.is('object') ? $item.parent().first() : $item;
					
					if(typeof config.backgroundSize == 'function'){
						// If someone wants to write their own fill() function, they can: example customBackgroundSize.html
						config.backgroundSize( $item );
					}else if(config.backgroundSize == 'cover'){
						if($.Window.data('w') / $.Window.data('h') < $storageEl.data('ar')){
							$item
								.height($.Window.data('h'))
								.width(($.Window.data('h') * $storageEl.data('ar')).toFixed(0));
						}else{
							$item
								.height(($.Window.data('w') / $storageEl.data('ar')).toFixed(0))
								.width($.Window.data('w'));
						}
					}else if(config.backgroundSize == 'contain'){
						if($.Window.data('w') / $.Window.data('h') < $storageEl.data('ar')){
							$item
								.height(($.Window.data('w') / $storageEl.data('ar')).toFixed(0))
								.width($.Window.data('w'));
						}else{
							$item
								.height($.Window.data('h'))
								.width(($.Window.data('h') * $storageEl.data('ar')).toFixed(0));
						}
					}else{
						debug('The backgroundSize option was not recognized for older browsers.');
					}
				},
				maxcover: function($item){
					Adjust.fill($item);
					Adjust.center($item);
				},
				maxcontain: function($item){
					Adjust.fill($item);
					Adjust.center($item);
				}
			}
			
			
			
			/* --------------------- */
			
			// @Utils = General utilities for the plugin
			
			var Utils = {
				browser_tests: function(){
					var $div = $('<div />')[0],
						vendor = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
						p = 'transition',
						obj = {
							cssTransitions: false,
							cssBackgroundSize: ( "backgroundSize" in $div.style && config.cssBackgroundSize ), // Can override cssBackgroundSize in options
							html5Video: false,
							msie: false
						};
					
					// Test for CSS Transitions
					if(config.cssTransitions){
						if(typeof $div.style[p] == 'string') { obj.cssTransitions = true }
					
						// Tests for vendor specific prop
						p = p.charAt(0).toUpperCase() + p.substr(1);
						for(var i=0; i<vendor.length; i++) {
							if(vendor[i] + p in $div.style) { obj.cssTransitions = true; }
						}
					}
					
					// Check if we can play html5 videos
					if( !!document.createElement('video').canPlayType ) {
						obj.html5Video = true;
					}
					
					// Check for MSIE since we lost $.browser in jQuery
					obj.msie = (Utils.msie() !== undefined);
					
					
					if(config.debug) {
						debug(' - Browser Test - ');debug(obj);
					}
					
					return obj;
				},
				construct_slide_object: function(){
					var obj = new Object(),
						arr = new Array(),
						temp = '';
					
					$self.children().each(function(i){
						var $img = $(this).is('img') ? $(this).clone() : $(this).find('img').first().clone();
						
						// reset obj
						obj = {};
						
						// set attributes to obj
						obj.url = $img.attr('src');
						obj.title = $img.attr('title') != undefined ? $img.attr('title') : '';
						obj.alt = $img.attr('alt') != undefined ? $img.attr('alt') : '';
						obj.theclass = $img.attr('class') != undefined ? $img.attr('class') : '';
						obj.styles = $img.attr('style') != undefined ? $img.attr('style') : '';
						obj.orig = $img.clone();
						obj.datahref = $img.attr('data-href') != undefined ? $img.attr('data-href') : '';
						obj.content = "";
						
						// Setup content for within container
						if($(this).find('img').length > 0){
							if($.BrowserTests.cssBackgroundSize){
								$(this).find('img').first().remove();
							}
							obj.content = $(this).html();
						}
						
						// Stop loading image so we can load them sequentiallyelse{
						$img[0].src = "";
						
						// Remove original object (only on nonIE. IE hangs if you remove an image during load)
						if($.BrowserTests.cssBackgroundSize){
							$(this).remove();
						}
						
						// attach obj to arr
						arr.push(obj);
					});
					
					
					if(config.debug) {
						debug(' - Slide Object - ');debug(arr);
					}
					return arr;
				},
				msie: function(){
				    var undef,
				        v = 3,
				        div = document.createElement('div'),
				        all = div.getElementsByTagName('i');

				    while (
				        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				        all[0]
				    );
					
				    return v > 4 ? v : undef;
				},
				sizes: function(){
					var sizes = {h:0,w:0};
					
					if(config.fillElement == "window"){
						sizes.h = $.Window.height();
						sizes.w = $.Window.width();
					}else{
						var $fillElement = $self.parents(config.fillElement).first();
						
						// Height
						if($fillElement.height() == 0 || $fillElement.data('windowHeight') == true){
							$fillElement.data('windowHeight',true);
							sizes.h = $.Window.height();
						}else{
							sizes.h = $fillElement.height();
						}
					
						// Width
						if($fillElement.width() == 0 || $fillElement.data('windowWidth') == true){
							$fillElement.data('windowWidth',true);
							sizes.w = $.Window.width();
						}else{
							sizes.w = $fillElement.width();
						}
					}
					
					return sizes;
				}
			}
			
			
			
			/* --------------------- */
			
			// @Instantiation
			
			// Helper Function
			// Run tests to see what our browser can handle
			$.BrowserTests = Utils.browser_tests();
			
			if(typeof settings == 'string'){
				// TODO: Resize object fallback for old browsers,  If we are trying to size an HTML5 video and our browser doesn't support it
				if($.BrowserTests.html5Video || !$self.is('video')) {
					var to, 
						$storageEl = $self.is('object') ? $self.parent().first() : $self; // Can't assign .data() to '<object>'
					
					if( !$.Body.hasClass('mc-old-browser') )
						$.Body.addClass('mc-old-browser');
					
					// Cache our window's new dimensions
					$.Window
						.data('h', Utils.sizes().h)
						.data('w', Utils.sizes().w);
				
					// Please include height and width attributes on your html elements
					$storageEl
						.data('h', $self.height())
						.data('w', $self.width())
						.data('ar', $self.width() / $self.height());
				
					// We want to resize these elements with the window
					$.Window
						.bind($.Events.RESIZE,
						function(){
							// Cache our window's new dimensions
							$.Window
								.data('h', Utils.sizes().h)
								.data('w', Utils.sizes().w);
						
							// Limit resize runs
							to = $self.data('resizer');
							clearTimeout(to);
							to = setTimeout( Adjust[settings]($self), 200 );
							$self.data('resizer', to);
						});
				
					// Initial run
					Adjust[settings]($self);
				}
			}else{
				// Construct array of image objects for us to use
				$.Slides = Utils.construct_slide_object();
				
				// If we are allowing background-size:cover run Modern
				if($.BrowserTests.cssBackgroundSize){
					if(config.debug) debug(' - Using Modern - ');
					Modern.setup();
				}else{
					if(config.debug) debug(' - Using Old - ');
					Old.setup();
				}
			}
		});
		
		// private function for debugging
		function debug($obj) {
			if (window.console && window.console.log) {
				window.console.log($obj);
			}
		}
	}
	
	// Default options
	$.fn.maximage.defaults = {
		debug: false,
		cssBackgroundSize: true,  // Force run the functionality used for newer browsers
		cssTransitions: true,  // Force run the functionality used for old browsers
		verticalCenter: true, // Only necessary for old browsers
		horizontalCenter: true, // Only necessary for old browsers
		scaleInterval: 20, // Only necessary for old browsers
		backgroundSize: 'cover', // Only necessary for old browsers (this can be function)
		fillElement: 'window', // Either 'window' or a CSS selector for a parent element
		overrideMSIEStop: false, // This gives the option to not 'stop' load for MSIE (stops coded background images from loading so we can preload)... 
								 // If setting this option to true, please beware of IE7/8 "Stack Overflow" error but if there are more than 13 slides
								 // The description of the bug: http://blog.aaronvanderzwan.com/forums/topic/stack-overflow-in-ie-7-8/#post-33038
		onFirstImageLoaded: function(){},
		onImagesLoaded: function(){}
	}
})(jQuery);
