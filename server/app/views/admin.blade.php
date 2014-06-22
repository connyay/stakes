<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Stakes</title>
  <meta name="description" content="app, web app, responsive, admin dashboard, admin, flat, flat ui, ui kit, off screen nav" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <script>var AUTH_USER = Object.freeze(@user);</script>
  {{ HTML::style('assets/css/bootstrap.css') }}
  {{ HTML::style('assets/css/font-awesome.min.css') }}
  {{ HTML::style('assets/css/app.css') }}
  {{ HTML::style('assets/css/animate.css') }}
</head>
<body ng-app="stakes-admin">

<section class="hbox stretch">
    <side-nav></side-nav>
    <section id="content">
      <section class="vbox" ng-view>
      </section>
      <a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen" data-target="#nav"></a>
    </section>
  </section>

  {{ HTML::script('assets/js/jquery.min.js') }}
  {{ HTML::script('assets/js/bootstrap.js') }}
  {{ HTML::script('assets/js/app.js') }}

  {{ HTML::script('scripts/lib.js') }}
  {{ HTML::script('scripts/templates.js') }}
  {{ HTML::script('scripts/app.js') }}
</body>
</html>