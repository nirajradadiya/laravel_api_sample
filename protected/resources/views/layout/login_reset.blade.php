<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.2.0
Version: 3.4
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8"/>

<title>{{isset($title)?$title:''}} | {{ SITE_NAME }}</title>

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css"/>
<link href="{{SITE_PLUGIN_URL}}font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
<link href="{{SITE_PLUGIN_URL}}simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
<link href="{{SITE_PLUGIN_URL}}bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="{{SITE_PLUGIN_URL}}uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL STYLES -->
<link href="{{SITE_PLUGIN_URL}}select2/select2.css" rel="stylesheet" type="text/css"/>
<link href="{{ SITE_URL }}css/login3.css" rel="stylesheet" type="text/css"/>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME STYLES -->
<link href="{{ SITE_URL }}css/components.css" rel="stylesheet" type="text/css"/>
<link href="{{ SITE_URL }}css/plugins.css" rel="stylesheet" type="text/css"/>
<link href="{{ SITE_URL }}css/layout.css" rel="stylesheet" type="text/css"/>
<link href="{{ SITE_URL }}css/default.css" rel="stylesheet" type="text/css" id="style_color"/>
<link href="{{ SITE_URL }}css/custom.css" rel="stylesheet" type="text/css"/>
<!-- END THEME STYLES -->
<link rel="icon" type="image/x-icon" href="{{SITE_URL}}favicon.ico"/>
<script src="{{SITE_PLUGIN_URL}}jquery.min.js" type="text/javascript"></script>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">

    @yield('content')
<script src="{{SITE_PLUGIN_URL}}jquery-migrate.min.js" type="text/javascript"></script>
<script src="{{SITE_PLUGIN_URL}}bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="{{SITE_PLUGIN_URL}}jquery.blockui.min.js" type="text/javascript"></script>
<script src="{{SITE_PLUGIN_URL}}uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script type="text/javascript" src="{{SITE_PLUGIN_URL}}fancybox/source/jquery.fancybox.js"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="{{SITE_PLUGIN_URL}}jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="{{ SITE_URL }}js/metronic.js" type="text/javascript"></script>
<script src="{{ SITE_URL }}js/layout.js" type="text/javascript"></script>
<script src="{{ SITE_URL }}js/validatation.js" type="text/javascript"></script>
<script src="{{ SITE_URL }}js/custom_script.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script>
jQuery(document).ready(function() {     
  Metronic.init(); // init metronic core components
  Layout.init(); // init current layout
  Validation.init();
  setTimeout(function(){
    $(".alert").fadeOut();
  },3000);
  handleForgetPassword();
  handleResetPassword();
  handleApiResetPassword();
});
</script>
<?php Session::remove('success_message');Session::remove('message') ?>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
