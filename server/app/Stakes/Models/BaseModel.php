<?php namespace Stakes\Models;

use Validator;

class BaseModel extends \Illuminate\Database\Eloquent\Model
{
    protected $errors;

    public function validate( $data ) {
        // make a new validator object
        $v = Validator::make( $data, $this->getRules() );

        // check for failure
        if ( $v->fails() ) {
            // set errors and return false
            $this->errors = $v->errors;
            return false;
        }

        // validation pass
        return true;
    }

    public function errors() {
        return $this->errors;
    }

    protected function getRules() {
        return [];
    }
}
