<?php 
require  '_pd/php/_boot.php';
?>
<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5" ><![endif]-->
<!DOCTYPE html>
<html>
<head>
<title>Flowchart Maker &amp; Online Diagram Software</title>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<!-- Native File System API V2 token for *.draw.io expires 28 Oct 2020 -->
    <meta http-equiv="origin-trial" content="Ar7fmwHXVH3qr/+1dFJi3jW0wGPfQVT2J3qip2DlBQmM2wigHhFQaCbjo2hhoYXCCHHmypw3P8rAqMh4kZjhUAUAAABleyJvcmlnaW4iOiJodHRwczovL2RyYXcuaW86NDQzIiwiZmVhdHVyZSI6Ik5hdGl2ZUZpbGVTeXN0ZW0yIiwiZXhwaXJ5IjoxNjAzODQzMTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZX0=">
    <!-- Native File System API V2 token for *.diagrams.net expires 28 Oct 2020 -->
    <meta http-equiv="origin-trial" content="AvsXZgeW/PvqJBC1Q3oFnZKGTnqoNdNxikcCEbVkzgMDMAkE+Oj6JjwE57pWlxaYGdhBHHHh1aXiPW9hxJaKYwsAAABqeyJvcmlnaW4iOiJodHRwczovL2RpYWdyYW1zLm5ldDo0NDMiLCJmZWF0dXJlIjoiTmF0aXZlRmlsZVN5c3RlbTIiLCJleHBpcnkiOjE2MDM4NDMxOTksImlzU3ViZG9tYWluIjp0cnVlfQ==">
	<meta name="Description" content="diagrams.net is free online diagram software for making flowcharts, process diagrams, org charts, UML, ER and network diagrams">
    <meta name="Keywords" content="diagram, online, flow chart, flowchart maker, uml, erd">
    <meta itemprop="name" content="diagrams.net - free flowchart maker and diagrams online">
	<meta itemprop="description" content="diagrams.net is a free online diagramming application  and flowchart maker . You can use it to create UML, entity relationship,
		org charts, BPMN and BPM, database schema and networks. Also possible are telecommunication network, workflow, flowcharts, maps overlays and GIS, electronic 
		circuit and social network diagrams.">
	<meta itemprop="image" content="https://lh4.googleusercontent.com/-cLKEldMbT_E/Tx8qXDuw6eI/AAAAAAAAAAs/Ke0pnlk8Gpg/w500-h344-k/BPMN%2Bdiagram%2Brc2f.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="msapplication-config" content="images/browserconfig.xml">
    <meta name="mobile-web-app-capable" content="yes">
	<meta name="theme-color" content="#d89000">
	<script type="text/javascript">	
		/**
		 * URL Parameters and protocol description are here:
		 *
		 * https://desk.draw.io/support/solutions/articles/16000042546-what-url-parameters-are-supported
		 *
		 * Parameters for developers:
		 *
		 * - dev=1: For developers only
		 * - test=1: For developers only
		 * - export=URL for export: For developers only
		 * - ignoremime=1: For developers only (see DriveClient.js). Use Cmd-S to override mime.
		 * - createindex=1: For developers only (see etc/build/README)
		 * - filesupport=0: For developers only (see Editor.js in core)
		 * - savesidebar=1: For developers only (see Sidebar.js)
		 * - pages=1: For developers only (see Pages.js)
		 * - lic=email: For developers only (see LicenseServlet.java)
		 * --
		 * - networkshapes=1: For testing network shapes (temporary)
		 */
		var urlParams = (function()
		{
			var result = new Object();
			var params = window.location.search.slice(1).split('&');
			
			for (var i = 0; i < params.length; i++)
			{
				idx = params[i].indexOf('=');
				
				if (idx > 0)
				{
					result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
				}
			}
			
			return result;
		})();
		
		let hn = window.location.hostname;
		urlParams["dev"] = hn === "predixi.com" ? 0 : 1;
		urlParams["offline"] = 1;
		urlParams["pages"] = 0;

		// Forces CDN caches by passing URL parameters via URL hash
		if (window.location.hash != null && window.location.hash.substring(0, 2) == '#P')
		{
			try
			{
				urlParams = JSON.parse(decodeURIComponent(window.location.hash.substring(2)));
				
				if (urlParams.hash != null)
				{
					window.location.hash = urlParams.hash;
				}
			}
			catch (e)
			{
				// ignore
			}
		}

		// Global variable for desktop
		var mxIsElectron = window && window.process && window.process.type;
		
		// Redirects page if required
		if (urlParams['dev'] != '1')
		{
			(function()
			{
				var proto = window.location.protocol;
				
				if (!mxIsElectron)
				{
					var host = window.location.host;
		
					// Redirects apex, drive and rt to www
					if (host === 'draw.io' || host === 'rt.draw.io' || host === 'drive.draw.io')
					{
						host = 'www.draw.io';
					}
					
					var href = proto + '//' + host + window.location.href.substring(
							window.location.protocol.length +
							window.location.host.length + 2);
		
					// Redirects if href changes
					if (href != window.location.href)
					{
						window.location.href = href;
					}
				}
			})();
		}
		
	/**
		 * Adds meta tag to the page.
		 */
		function mxmeta(name, content, httpEquiv)
		{
				try
				{
					var s = document.createElement('meta');
					
					if (name != null) 
					{
						s.setAttribute('name', name);
					}

					s.setAttribute('content', content);
					
					if (httpEquiv != null) 
					{
						s.setAttribute('http-equiv', httpEquiv);
					}

				  	var t = document.getElementsByTagName('meta')[0];
				  	t.parentNode.insertBefore(s, t);
				}
				catch (e)
				{
					// ignore
				}
			};
			
		/**
		 * Synchronously adds scripts to the page.
		 */
		function mxscript(src, onLoad, id, dataAppKey, noWrite)
		{
			var defer = onLoad == null && !noWrite;
		
			if(document.body) //for App.js:619 mxscript('js/extensions.min.js'); issue: js write after load body to destroy everything
				noWrite=true;
			
			if ((urlParams['dev'] != '1' && typeof document.createElement('canvas').getContext === "function") ||
				onLoad != null || noWrite)
			{
				var s = document.createElement('script');
				s.setAttribute('type', 'text/javascript');
				s.setAttribute('defer', 'true');
				s.setAttribute('src', src);
				
				if (id != null)
				{
					s.setAttribute('id', id);
				}
				
				if (dataAppKey != null)
				{
					s.setAttribute('data-app-key', dataAppKey);
				}
				
				if (onLoad != null)
				{
					var r = false;

					s.onload = s.onreadystatechange = function()
					{
						if (!r && (!this.readyState || this.readyState == 'complete'))
						{
				      		r = true;
				      		onLoad();
						}
				  	};
				}
			  	
			  	var t = document.getElementsByTagName('script')[0];
			  	
			  	if (t != null)
			  	{
			  		t.parentNode.insertBefore(s, t);
			  	}
			}
			else
			{
				document.write('<script src="' + src + '"' + ((id != null) ? ' id="' + id +'" ' : '') +
					((dataAppKey != null) ? ' data-app-key="' + dataAppKey +'" ' : '') + '></scr' + 'ipt>');
			}
		};

		/**
		 * Asynchronously adds scripts to the page.
		 */
		function mxinclude(src)
		{
			var g = document.createElement('script');
			g.type = 'text/javascript';
			g.async = true;
			g.src = src;
			
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(g, s);
		};
		mxscript('_pd/cjs/main.top.js');
	</script>	
	<link rel="stylesheet" type="text/css" href="_pd/css/main.css"></style>
	<?php  require  PDPHP.'/_top.php'; ?>
	<script type="text/javascript">
		/**
		 * Adds meta tags with application name (depends on offline URL parameter)
		 */
		(function()
		{
			var name = 'Predixi Draw';
			mxmeta('apple-mobile-web-app-title', name);
			mxmeta('application-name', name);

			if (mxIsElectron)
			{
				mxmeta(null, 'default-src \'self\' \'unsafe-inline\'; connect-src \'self\' https://*.draw.io https://fonts.googleapis.com https://fonts.gstatic.com; img-src * data:; media-src *; font-src *; style-src-elem \'self\' \'unsafe-inline\' https://fonts.googleapis.com', 'Content-Security-Policy');
			}
		})();
		
		// Checks for local storage
		var isLocalStorage = false;
		
		try
		{
			isLocalStorage = urlParams['local'] != '1' && typeof(localStorage) != 'undefined';
		}
		catch (e)
		{
			// ignored
		}

		var t0 = new Date();

		// Changes paths for local development environment
		if (urlParams['dev'] == '1')
		{
			// Used to request grapheditor/mxgraph sources in dev mode
			var mxDevUrl ='../../../../pmxgraph';
			
			// Used to request draw.io sources in dev mode
			var drawDevUrl = './';

			if (document.location.protocol == 'file:')
			{
				mxDevUrl = '../../../../../mxgraph2';
				drawDevUrl = './';
				
				// Forces includes for dev environment in node.js
				mxForceIncludes = true;
			}

			var geBasePath = mxDevUrl + '/javascript/examples/grapheditor/www/js';
			var mxBasePath = mxDevUrl + '/javascript/src';
			
			mxscript(drawDevUrl + 'js/PreConfig.js');
			mxscript(drawDevUrl + 'js/diagramly/Init.js');
			mxscript(geBasePath + '/Init.js');
			mxscript(mxDevUrl + '/javascript/src/js/mxClient.js');
			
			// Adds all JS code that depends on mxClient. This indirection via Devel.js is
			// required in some browsers to make sure mxClient.js (and the files that it
			// loads asynchronously) are available when the code loaded in Devel.js runs.
			mxscript(drawDevUrl + 'js/diagramly/Devel.js');
			
			// Electron
			if (mxIsElectron)
			{
				mxscript('js/diagramly/DesktopLibrary.js');
				mxscript('js/diagramly/ElectronApp.js');
			}
			
			mxscript(drawDevUrl + 'js/PostConfig.js');
			mxscript('_pd/cjs/main.mid.js');
		}
		else
		{
			(function()
			{
				var hostName = window.location.hostname;
				
				// Supported domains are *.draw.io and the packaged version in Quip
				var supportedDomain = (hostName.substring(hostName.length - 8, hostName.length) === '.draw.io') ||
					(hostName.substring(hostName.length - 13, hostName.length) === '.diagrams.net');
					(hostName.substring(hostName.length - 17, hostName.length) === '.quipelements.com');
				
				function loadAppJS()
				{
					mxscript('js/app.min.js', function()
					{
						if (!supportedDomain)
						{
							mxscript('js/PostConfig.js');
						}
						mxscript('_pd/cjs/main.mid.js');
						// Electron
						if (mxIsElectron)
						{
							mxscript('js/diagramly/DesktopLibrary.js', function()
							{
								mxscript('js/diagramly/ElectronApp.js', function()
								{ 
									mxscript('js/extensions.min.js', function()
									{
										mxscript('js/stencils.min.js', function()
										{
											mxscript('js/shapes.min.js', function()
											{
												mxscript('js/PostConfig.js');
											});
										});
									});
								});
							});
						}
					});
				};
				
				if (!supportedDomain || mxIsElectron)
				{
					mxscript('js/PreConfig.js', loadAppJS);
				}
				else
				{
					loadAppJS();
				}
			})();
		}

		// Adds basic error handling
		window.onerror = function()
		{
			var status = document.getElementById('geStatus');
			
			if (status != null)
			{
				status.innerHTML = 'Page could not be loaded. Please try refreshing.';
			}
		};
	</script>
	<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/plgmlhohecdddhbmmkncjdmlhcmaachm">
	<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
	<link rel="mask-icon" href="images/safari-pinned-tab.svg" color="#d89000">
	<link rel="stylesheet" type="text/css" href="js/croppie/croppie.min.css">
    <link rel="stylesheet" type="text/css" href="styles/grapheditor.css">
    <link rel="preconnect" href="https://storage.googleapis.com">
	<link rel="canonical" href="https://app.diagrams.net">
	<link rel="manifest" href="images/manifest.json">
	<link rel="shortcut icon" href="favicon.ico">
	<style type="text/css">
		body { overflow:hidden; }
		div.picker { z-index: 10007; }
		.geSidebarContainer .geTitle input {
			font-size:8pt;
			color:#606060;
		}
		.geBlock {
			z-index:-3;
			margin:100px;
			margin-top:40px;
			margin-bottom:30px;
			padding:20px;
		}
		.geBlock h1, .geBlock h2 {
			margin-top:0px;
			padding-top:0px;
		}
		.geEditor ::-webkit-scrollbar {
		    width:14px;
		    height:14px;
		}
		.geEditor ::-webkit-scrollbar-track {
			background-clip:padding-box;
			border:solid transparent;
			border-width:1px;
		}
		.geEditor ::-webkit-scrollbar-corner {
			background-color:transparent;
		}
		.geEditor ::-webkit-scrollbar-thumb {
			background-color:rgba(0,0,0,.1);
			background-clip:padding-box;
			border:solid transparent;
			border-radius:10px;
		}
		.geEditor ::-webkit-scrollbar-thumb:hover{
			background-color:rgba(0,0,0,.4);
		}
		.geTemplate {
			border:1px solid transparent;
			display:inline-block;
			_display:inline;
			vertical-align:top;
			border-radius:3px;
			overflow:hidden;
			font-size:14pt;
			cursor:pointer;
			margin:5px;
		}
	</style>
	<!-- Workaround for binary XHR in IE 9/10, see App.loadUrl -->
	<!--[if (IE 9)|(IE 10)]><!-->
		<script type="text/vbscript">
			Function mxUtilsBinaryToArray(Binary)
				Dim i
				ReDim byteArray(LenB(Binary))
				For i = 1 To LenB(Binary)
					byteArray(i-1) = AscB(MidB(Binary, i, 1))
				Next
				mxUtilsBinaryToArray = byteArray
			End Function
		</script>
	<!--<![endif]-->
</head>
<body class="geEditor">
<div id="geInfo">
	<div class="geBlock" style="text-align:center;min-width:50%;">
		<h1>Flowchart Maker and Online Diagram Software</h1>
		<p>
		diagrams.net (formerly draw.io) is free online diagram software. You can use it as a flowchart maker, network diagram software, to create UML online, as an ER diagram tool, 
		to design database schema, to build BPMN online, as a circuit diagram maker, and more. draw.io can import .vsdx, Gliffy&trade; and Lucidchart&trade; files .
		</p>
		<h2 id="geStatus">Loading...</h2>
		<p>
			Please ensure JavaScript is enabled.
		</p>
	</div>
</div>
<script type="text/javascript">
/**
 * Main
 */
if (navigator.userAgent != null && navigator.userAgent.toLowerCase().
	indexOf(' electron/') >= 0 && typeof process !== 'undefined' && process.versions.electron < 5)
{
	// Redirects old Electron app to latest version
	var div = document.getElementById('geInfo');
	
	if (div != null)
	{
		div.innerHTML = '<center><h2>You are using an out of date version of this app.<br>Please download the latest version ' +
			'<a href="https://github.com/jgraph/drawio-desktop/releases/latest" target="_blank">here</a>.</h2></center>';
	}
}
else
{
	if (urlParams['dev'] != '1' && typeof document.createElement('canvas').getContext === "function")
	{
		window.addEventListener('load', function()
		{
			App.main();
			mxscript('_pd/cjs/main.bottom.js');
		});
	}
	else
	{
		App.main();
		mxscript('_pd/cjs/main.bottom.js');
	}
}
</script>
</body>
</html>
