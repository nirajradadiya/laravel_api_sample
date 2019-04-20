@extends('layout.login_reset')
@section('content')
<!-- BEGIN LOGO -->
<div>
	<!-- BEGIN LOGO -->
	<div class="logo">
		<a href="{{SITE_URL}}">
			<img src="{{ SITE_URL }}img/logo.png" alt=""/>
		</a>
	</div>
	<!-- END LOGO -->
	<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
	<div class="menu-toggler sidebar-toggler">
	</div>
	<!-- END SIDEBAR TOGGLER BUTTON -->
	<!-- BEGIN LOGIN -->
	<div class="content">
		<!-- BEGIN LOGIN FORM -->
	<!--	<form class="reset-form-api" id="reset-form-api" name="reset-form" action="{{SITE_URL.API_V1_PREFIX.'/users/reset-password'}}" method="post"> -->
        {{ Form::open( array('route' => 'reset_password_submit', 'id' => 'reset-form-api','name' => 'reset-form','class'=>'reset-form-api') ) }}   
            <input type="hidden" name="vfcode" value="{{$ccode}}"/>


            <input type="hidden" name="returnRedirect" id="returnRedirect" value="{{SITE_URL}}"/>
	        <h3 class="form-title">Reset your password here</h3>
	        <div class="alert alert-danger display-hide">
	            <button class="close" data-close="alert"></button>
	            <span>You have some error. </span>
	        </div>
	        <div class="alert alert-success display-hide">
				<button class="close" data-close="alert"></button>
				Your password has been changed successfully.
			</div>
            <div class="form-group">
    			<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
    			<label class="control-label visible-ie8 visible-ie9">Email Address</label>
    			<div class="input-icon">
    				<i class="fa fa-user"></i>
    				<input class="form-control placeholder-no-fix email" value="{{ $emailid }}" type="text" autocomplete="off" placeholder="Email" name="username" disabled=""/>
    			</div>
    		</div>
	        <div class="form-group">
	            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
	            <label class="control-label visible-ie8 visible-ie9">Password</label>
	            <div class="input-icon">
	                <i class="fa fa-lock"></i>
	                <input class="form-control placeholder-no-fix required" type="password" autocomplete="off" placeholder="Password" id="v_password" name="v_password"/>
	            </div>
	        </div>
	        <div class="form-group">
	            <label class="control-label visible-ie8 visible-ie9">Confirm Password</label>
	            <div class="input-icon">
	                <i class="fa fa-lock"></i>
	                <input class="form-control placeholder-no-fix" type="password" autocomplete="off" ng-enter placeholder="Confirm Password" equalTo="#v_password" name="cpassword"/>
	            </div>
	        </div>
	        <div class="form-actions cf">
	        	<label class="checkbox">&nbsp;</label>
	            <button type="submit" id="reset-form-api_submit_button" class="btn red-haze pull-right">
	            Change <i class="m-icon-swapright m-icon-white"></i>
	            </button>
	        </div>              
	    {{ Form::close() }} 
	 <!--   </form> --> 
	    <!-- END LOGIN FORM -->
	</div>
	<!-- END LOGIN -->
	<!-- BEGIN COPYRIGHT -->
	<div class="copyright">
		 {{ date('Y') }} &copy; {{ SITE_NAME }}.
	</div>
</div>
<!-- END COPYRIGHT -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="{{SITE_PLUGIN_URL}}respond.min.js"></script>
<script src="{{SITE_PLUGIN_URL}}excanvas.min.js"></script> 
<![endif]-->

@endsection

