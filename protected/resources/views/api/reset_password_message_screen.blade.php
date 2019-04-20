@extends('layout.login_reset')
@section('content')
    
<style>
.message {
    font-size: 30px;
    text-align: center;
    margin-top: 100px;
    font-weight: bold;
    line-height: 30px;
    font-family:cursive;
}
.rededd {
    color: #C20E1A;
}
.greenery {
    color: green;
}
.center{
    margin-left: 45%;
}
</style>
    <div class="login-header">
        <div id="logo" class="center"></div>
        <img src="{{ SITE_URL }}img/logo.png"  width="140" alt="logo" class="center" />
    </div>
    <div class="message <?php if($message == "Could not recover your password.") { echo "rededd"; } else { echo "greenery"; } ?>">{{ $message }}</div>
@stop