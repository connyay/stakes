<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Stakes</title>
        <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
        <script>var AUTH_USER = Object.freeze(@user);</script>
        {{ HTML::style('assets/css/bootstrap.min.css') }}
        {{ HTML::style('assets/css/font-awesome.min.css') }}
        {{ HTML::style('assets/css/stakes.css') }}

    </head>
    <body class="skin-black" ng-app="stakes">
        <brand-header></brand-header>
        <div class="wrapper row-offcanvas row-offcanvas-left">
            <aside class="left-side sidebar-offcanvas">
                <section class="sidebar">
                  <side-nav></side-nav>
                </section>
                <!-- /.sidebar -->
            </aside>

            <aside class="right-side">
              <div class="container" ng-view=""></div>
            </aside><!-- /.right-side -->
        </div><!-- ./wrapper -->


        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
        {{ HTML::script('assets/js/bootstrap.min.js') }}
        {{ HTML::script('assets/js/stakes.js') }}

        {{ HTML::script('scripts/lib.js') }}
        {{ HTML::script('scripts/templates.js') }}
        {{ HTML::script('scripts/app.js') }}
    </body>
</html>