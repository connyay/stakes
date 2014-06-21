<?php namespace Stakes\Models;

use Uuid;

class Account extends BaseModel {
    protected $fillable = ['user_id', 'balance'];


    public static function boot() {
        parent::boot();

        static::creating( function( $account ) {
                return $account->account_id = Uuid::generate();
            } );
    }


    public function user() {
        return $this->belongsTo( 'Stakes\Models\User' );
    }

    public function transactions() {
        return $this->hasMany( 'Stakes\Models\Transaction' );
    }

    protected function getRules() {
        return [ 'user_id' => 'required' ];
    }
}
