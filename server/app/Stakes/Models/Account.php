<?php namespace Stakes\Models;

class Account extends BaseModel {
    protected $fillable = ['owner', 'balance'];

    public function user() {
        return $this->belongsTo( 'Stakes\Models\User' );
    }

    public function transactions() {
        return $this->hasMany( 'Stakes\Models\Transaction' );
    }
}
