<?php
if(file_exists("private.php")){
	include 'private.php';
}
?><!DOCTYPE html>
<!--[if lt IE 7]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class='no-js' lang='en'>
	<!--<![endif]-->
	<head>
		<meta charset='utf-8' />
		<meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible' />
		<title>Usage Examples | MaxImage 2.0</title>
		
		<meta content='jQuery Plugin to make jQuery Cycle Plugin work as a fullscreen background image slideshow' name='description' />
		<meta content='Aaron Vanderzwan' name='author' />
		
		<meta name="distribution" content="global" />
		<meta name="language" content="en" />
		<meta content='width=device-width, initial-scale=1.0' name='viewport' />
		
		<link rel="stylesheet" href="lib/css/bootstrap.min.css?v=1.2" type="text/css" media="screen" charset="utf-8" />
		
		<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
		
		<!-- Font -->
		<link href='http://fonts.googleapis.com/css?family=Lato:100' rel='stylesheet' type='text/css'>

		<style type="text/css" media="screen">
			/*Examples css*/
			body {background:url('lib/images/retina_wood.png') repeat 0 0;font-family:"Helvetica Neue",helvetica,arial,sans-serif;margin:0;padding:0;}
			
			header {background:#fff;box-shadow:2px 0 10px rgba(0,0,0,0.3);height:80px;margin-bottom:30px;position:fixed;left:0;top:0;width:100%;z-index:99;}
			.container {clear:both;margin:0 auto;width:980px;}
			.container:after {content:"\0020";display:block;height:0;clear:both;visibility:hidden;overflow:hidden;}
			
			h1 {color:#ffc600;float:left;font-family:'Lato',sans-serif;font-size:40px;letter-spacing:0.1em;margin:20px 0;text-transform:uppercase;}
			h2 {font-size:26px;font-weight:300;}
			h2 a {color:#222;text-decoration:none;}
			h2 a:hover {color:#888;text-decoration:none;}
			
			nav {float:right;margin:40px 0 0;}
			nav ul {list-style-type:none;margin:0;padding:0;}
			nav li {float:left;margin-left:20px;}
			nav a {color:#888;font-family:georgia,serif;font-size:16px;text-decoration:none;}
			nav .active a,
			nav a:hover {color:#222;}
			
			.special {margin:230px auto 160px;width:640px;}
			.special p {color:#222;font-family:georgia;font-size:38px;line-height:1.3em;margin:40px 0 0;text-align:center;text-shadow:1px 1px #fff;}
			.special .set2 {font-size:24px;margin:0 0 20px;}
			
			.centered {margin:0 auto 80px;width:560px;}
			
			.example {margin-bottom:160px;}
			.example .leftcol,
			.example .rightcol {float:left;margin-right:20px;width:480px;}
			.example .rightcol {margin-right:0;}
			.example .content {margin-bottom:20px;}
			.example .code {clear:both;}
			
			#back-to-top {bottom:20px;position:fixed;right:20px;}
		</style>
	</head>
	<body>
		<!-- Moneymaker -->
		<?php if ( function_exists('the_extras') ) { 
			the_extras();
		} ?>
		
		<header>
			<div class="container">
				<h1>Maximage2</h1>
				<nav>
					<ul>
						<li class="active"><a href="">examples</a></li>
						<li><a href="http://blog.aaronvanderzwan.com/2012/07/maximage-2-0/" target="_blank">info</a></li>
						<li><a href="http://blog.aaronvanderzwan.com/2012/07/maximage-2-0/#options" target="_blank">options</a></li>
						<li><a href="http://blog.aaronvanderzwan.com/forums/forum/maximage-2-0/" target="_blank">forum</a></li>
						<li><a href="http://blog.aaronvanderzwan.com/2012/07/maximage-2-0/#download" target="_blank">download</a></li>
						<li><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=6JDK29W3R3HVY&lc=US&item_name=Maximage%202%2e0%20%2d%20Aaron%20Vanderzwan%20L%2eL%2eC%2e&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted" target="_blank">donate</a></li>
					</ul>
				</nav>
			</div>
		</header>
		
		<div class="container">
			<div class="special">
				<p class="set1">Don't reinvent the wheel.</p>
				<p class="set2">Maximage2 is a fullscreen background slideshow plugin that uses jQuery Cycle plugin for it's slideshow functionality.</p>
			</div>
			
			<div class="centered local-nav">
				<div class="btn-group">
					<a class="btn" href="#Basic">Basic</a>
					<a class="btn" href="#Customized">Customized</a>
					<a class="btn" href="#FillElement">FillElement</a>
					<a class="btn" href="#CustomBGSize">Custom Background Size</a>
					<a class="btn" href="#Offset">Offset</a>
					<a class="btn" href="#html5Video">HTML5 Video</a>
				</div>
			</div>
			
			<a name="Basic"></a>
			<div class="example basic-example">
				<div class="leftcol">
					<div class="page-header">
						<h2><a href="">Basic Example</a></h2>
					</div>
					<div class="content">
						<p>This example shows what happens if you call Maximage2 without any custom options.  It is the simplest way to use Maximage and rely's on both Maximage's option defaults and jQuery Cycle Plugin's default options.</p>
						<p><i class="icon-share icon-white"></i> <a href='examples/basic.html' target="_blank">View Example</a></p>
					</div>
				</div>
				<div class="rightcol">
					<img src="lib/images/ss-basic.png" alt="Basic Example Screenshot" width="466" height="359" />
				</div>
				<div class="code">
					<script src="https://gist.github.com/3307285.js"> </script>
				</div>
			</div>
			
			<!-- Moneymaker -->
			<?php if ( function_exists('the_ad2') ) { 
				the_ad2();
			} ?>
			
			
			<a name="Customized"></a>
			<div class="example customized-example">
				<div class="leftcol">
					<div class="page-header">
						<h2><a href="">Customized Example</a></h2>
					</div>
					<div class="content">
						<p>This demo explains how easy it is to use <a href="http://jquery.malsup.com/cycle/options.html" target="_blank">jQuery Cycle options</a> as well as some of the best of Maximage 2.0.  You can see how callback functions are used as well as speed, fx, timeout, paging and really any other jQuery Cycle option.</p>
						<p>This demo also uses Maximage 2.0's custom helper function that allows for any element in the slideshow to be maximized like the background images in the slides.  In this case we maximize an HTML5 video in our slideshow as well as a Youtube Video.</p>
						<p><i class="icon-share icon-white"></i> <a href='examples/customized.html' target="_blank">View Example</a></p>
					</div>
				</div>
				<div class="rightcol">
					<img src="lib/images/ss-customized.png" alt="Customized Example Screenshot" width="466" height="370" />
				</div>
				<div class="code">
					<script src="https://gist.github.com/3306636.js"> </script>
				</div>
			</div>
			
			<a name="FillElement"></a>
			<div class="example fillelement-example">
				<div class="leftcol">
					<div class="page-header">
						<h2><a href="">"fillElement" Example</a></h2>
					</div>
					<div class="content">
						<p>I wanted a way to show off how Maximage2 allows you to maximize images within containing elements too, not just the browser window.  You just pass a selector to the Maximage2's "fillElement" option and you are good to go.</p>
						<p>It also uses a different fx from jQuery Cycle to show how easy that is.</p>
						<p><i class="icon-share icon-white"></i> <a href='examples/fillelement.html' target="_blank">View Example</a></p>
					</div>
				</div>
				<div class="rightcol">
					<img src="lib/images/ss-fillelement.png" alt="FillElement Example Screenshot" width="466" height="370" />
				</div>
				<div class="code">
					<script src="https://gist.github.com/3307386.js?file=maximage-fillelement.css"> </script>
					<script src="https://gist.github.com/3307386.js?file=maximage-fillelement.js"></script>
				</div>
			</div>
			
			
			<a name="CustomBGSize"></a>
			<div class="example custom-backgroundsize-example">
				<div class="leftcol">
					<div class="page-header">
						<h2><a href="">Custom "backgroundSize" Function</a></h2>
					</div>
					<div class="content">
						<p>The "backgroundSize" Maximage2 can either be a string ('cover' or 'contain') to determine how the image fills the container.  Cover fills every available space with the image while contain maximizes the image within the space but does not exceed the space.</p>
						<p>These are going to be the two most common scenario, but it is very possible that someone may need some different functionality.  Well Maximage2 allows you to write your own function here and this is an example of how that is done.</p>
						<p><i class="icon-share icon-white"></i> <a href='examples/customBackgroundSize.html' target="_blank">View Example</a></p>
					</div>
				</div>
				<div class="rightcol">
					<img src="lib/images/ss-custombackgroundsize.png" alt="Custom Backgroundsize Example Screenshot" width="466" height="370" />
				</div>
				<div class="code">
					<script src="https://gist.github.com/3307410.js"> </script>
				</div>
			</div>


			<a name="Offset"></a>
			<div class="example offset-example">
				<div class="leftcol">
					<div class="page-header">
						<h2><a href="">Using Offsets</a></h2>
					</div>
					<div class="content">
						<p>Caution: This example is meant for expert users.  Remember, with <a href="#FillElement">FillElement</a> you can often accomplish an offset scheme very easily... just set your containing element where you want the images to be displayed.</p>
						<p>Because the first rule of Maximage 2.0 is to try to remain hands off and out of your way, the built in support for offsets have been dropped with version 2.0.  This doesn't mean they aren't possible.  With a little elbow grease they can still be accomplished (and are better).</p>
						<p>What I am doing with the below code is creating curtains / offsets that live in front of the slideshow.  I call these curtains.  I have done this with the HTML and CSS below for 100px offsets on the top, right, bottom and left edges of the screen.</p>
						<p>Once we have our curtains up, the slideshow is still resizing to the full window and we want to have it maximize within the viewable area... our window size minus our offsets.  For this reason you have to customize the function that resizes the window. We can do that with the backgroundSize option that gets passed to Maximage.  Just set your verticalOffset and horizontalOffset in backgroundSize (JS example below) to size your slideshow images within the viewable area.</p>
						<p><i class="icon-share icon-white"></i> <a href='examples/offset.html' target="_blank">View Example</a></p>
					</div>
				</div>
				<div class="rightcol">
					<img src="lib/images/ss-offset.png" alt="Offset Example Screenshot" width="466" height="376" />
				</div>
				<div class="code">
					<script src="https://gist.github.com/3880710.js?file=maximage-offset.html"></script>
					<script src="https://gist.github.com/3880710.js?file=maximage-offset.css"></script>
					<script src="https://gist.github.com/3880710.js?file=maximage-offset.js"></script>
				</div>
				<div class="leftcol">
					<div class="page-header">
						<h2><a href="">Using Offsets: Contain</a></h2>
					</div>
					<div class="content">
						<p>To have images contained within the offsets just swap the "based on height", "based on width" rules in the backgroundSize function like this:</p>	
						<p><i class="icon-share icon-white"></i> <a href='examples/offset-inside.html' target="_blank">View Example</a></p>
					</div>
				</div>
				<div class="code">
					<script src="https://gist.github.com/3880710.js?file=maximage-offset-contained.js"></script>
				</div>
			</div>
			
			<a name="html5Video"></a>
			<div class="example fillelement-example">
				<div class="leftcol">
					<div class="page-header">
						<h2><a href="">Fullscreen HTML5 Video</a></h2>
					</div>
					<div class="content">
						<p>Maximage2 can be used as a tool to make almost anything a fullscreen background element very easily.  This example shows how it can be used to create a background HTML5 video.</p>  
						<p><strong>NOTE: HTML5 video fallbacks for IE7 &amp; IE8 currently do not fill the screen within a slideshow.  I am working on this currently, but if this is important to you, please use another slideshow for the time being and check back for updates as this has proven more complex than was expected.</strong></p>
						<p><i class="icon-share icon-white"></i> <a href='examples/html5video.html' target="_blank">View Example</a></p>
					</div>
				</div>
				<div class="rightcol">
					<img src="lib/images/ss-html5video.png" alt="HTML5 Video Background Screenshot" width="466" height="370" />
				</div>
				<div class="code">
					<script src="https://gist.github.com/3307594.js"> </script>
				</div>
			</div>
		</div>
		
		<div id="back-to-top">
			<a href="#"><i class="icon-chevron-up icon-white"></i></a>
		</div>
		
		
		<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js'></script>
		<script src='lib/js/jquery.scrollto.js'></script>
		<script src='lib/js/jquery.localscroll.js'></script>
		<script type="text/javascript" charset="utf-8">
			$(function(){
				var scrollOpts = {
					queue:true,
					duration:1500,
					offset:-100,
					hash:true
				};
				
				$.localScroll.hash( scrollOpts );
				$.localScroll( scrollOpts );
				
				$('#back-to-top').click(function(e){
					$.scrollTo(0, 1500);
					e.preventDefault();
				});
			});
		</script>
		
		<!-- DON'T USE THIS: Insert Google Analytics code here -->
		<?php if ( function_exists('the_analytics') ) the_analytics(); ?>
  </body>
</html>
