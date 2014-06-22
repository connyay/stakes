<?php namespace Stakes\Models;

use Uuid;
use Watson\Validating\ValidatingTrait;

class Account extends BaseModel {

    use ValidatingTrait;

    protected $rules = [
    'user_id'   => 'required'
    ];

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
}
