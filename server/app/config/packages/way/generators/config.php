<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Where the templates for the generators are stored...
    |--------------------------------------------------------------------------
    |
    */
    'model_template_path' => app_path( 'templates/model.txt' ),

    'scaffold_model_template_path' => app_path( 'templates/scaffolding/model.txt' ),

    'controller_template_path' => app_path( 'templates/controller.txt' ),

    'scaffold_controller_template_path' => app_path( 'templates/scaffolding/controller.txt' ),

    'migration_template_path' => app_path( 'templates/migration.txt' ),

    'seed_template_path' => app_path( 'templates/seed.txt' ),


    /*
    |--------------------------------------------------------------------------
    | Where the generated files will be saved...
    |--------------------------------------------------------------------------
    |
    */
    'model_target_path' => app_path( 'Stakes/Models' ),

    'controller_target_path' => app_path( 'Stakes/Controllers' ),

    'migration_target_path' => app_path( 'database/migrations' ),

    'seed_target_path' => app_path( 'database/seeds' ),

];