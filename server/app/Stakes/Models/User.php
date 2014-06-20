<?php namespace Stakes\Models;

use Illuminate\Auth\UserInterface;

class User extends BaseModel implements UserInterface
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    protected $fillable = [ 'username', 'password' ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [ 'password' ];

    /**
     * Get the unique identifier for the user.
     *
     * @return mixed
     */
    public function getAuthIdentifier() {
        return $this->getKey();
    }

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword() {
        return $this->password;
    }

    public function getRememberToken() {
        return $this->remember_token;
    }

    public function setRememberToken( $value ) {
        $this->remember_token = $value;
    }

    public function getRememberTokenName() {
        return 'remember_token';
    }

    protected function getRules() {
        $unique_username = 'unique:users,username,' . $this->id;
        return [
        'username' => $unique_username
        ];
    }

    public function account() {
        return $this->hasOne( 'Stakes\Models\Account' );
    }

}
