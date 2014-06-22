<?php
use League\Fractal;
use Stakes\Transformers\UserTransformer;
use League\Fractal\Resource\Item;

function getAuthUserJSON() {
    if ( is_null( Auth::user() ) ) { return "{}"; }

    $fractal = new Fractal\Manager();
    $user = new Fractal\Resource\Item( Auth::user(), new UserTransformer );

    return json_encode( $fractal->createData( $user )->toArray()['data'] );
}

Blade::extend( function( $value ) {
        return preg_replace( '/(\s*)@user(\s*)/', '$1<?php echo getAuthUserJSON(); ?>$2', $value );
    } );
