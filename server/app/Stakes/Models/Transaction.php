<?php namespace Stakes\Models;

class Transaction extends BaseModel {
	protected $fillable = ['account', 'amount'];
}