<?php
namespace Stakes\Controllers;

use Controller;
use Input;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;
use Response;

class ApiController extends Controller {
    protected $statusCode = 200;

    const CODE_WRONG_ARGS = 'GEN-FUBARGS';

    const CODE_ALL_GOOD = 'GEN-GREATSUCCESS';

    const CODE_CONFLICT = 'GEN-CONFLICT';

    const CODE_NOT_FOUND = 'GEN-LIKETHEWIND';

    const CODE_INTERNAL_ERROR = 'GEN-AAAGGH';

    const CODE_UNAUTHORIZED = 'GEN-MAYBGTFO';

    const CODE_FORBIDDEN = 'GEN-GTFO';

    const CODE_INVALID_MIME_TYPE = 'GEN-UMWUT';

    public function __construct(Manager $fractal) {
        $includes = Input::get('include');

        if (!is_null($includes)) {
            $fractal->parseIncludes($includes);

        }
        $this->fractal = $fractal;

    }

    /**
	 * Getter for statusCode
	 *
	 * @return mixed
	 */
    public function getStatusCode() {
        return $this->statusCode;

    }

    /**
	 * Setter for statusCode
	 *
	 * @param int     $statusCode Value to set
	 *
	 * @return self
	 */
    public function setStatusCode($statusCode) {
        $this->statusCode = $statusCode;

        return $this;

    }

    protected function respondWithItem($item, $callback) {
        $resource = new Item($item, $callback);

        $rootScope = $this->fractal->createData($resource);

        return $this->respondWithArray($rootScope->toArray());

    }

    protected function respondWithCollection($collection, $callback) {
        $resource = new Collection($collection, $callback);

        $rootScope = $this->fractal->createData($resource);

        return $this->respondWithArray($rootScope->toArray());

    }

    protected function respondWithArray(array $array, array $headers = []) {
        $contentType = 'application/json';

        $content = json_encode($array);

        $response = Response::make($content, $this->statusCode, $headers);
        $response->header('Content-Type', $contentType);

        return $response;
    }

    protected function respondWithError($message, $errorCode) {
        if ($this->statusCode === 200) {
            trigger_error(
                "You better have a really good reason for erroring on a 200...",
                E_USER_WARNING
            );
        }

        return $this->respondWithArray([
                'error' => [
                    'code'      => $errorCode,
                    'http_code' => $this->statusCode,
                    'message'   => $message,
                ]
            ]);
    }

    protected function respondWithMessage($message, $code) {
        return $this->respondWithArray([
                'message' => [
                    'code'      => $code,
                    'http_code' => $this->statusCode,
                    'message'   => $message,
                ]
            ]);
    }

    /**
	 * Generates a Response with a 200 HTTP header and a given message.
	 *
	 * @return  Response
	 */
    public function success($message = 'Success') {
        return $this->respondWithMessage($message, self::CODE_ALL_GOOD);
    }

    /**
	 * Generates a Response with a 409 HTTP header and a given message.
	 *
	 * @return  Response
	 */
    public function errorConflict($message = 'Conflict') {
        return $this->setStatusCode(409)->respondWithError($message, self::CODE_CONFLICT);
    }

    /**
	 * Generates a Response with a 403 HTTP header and a given message.
	 *
	 * @return  Response
	 */
    public function errorForbidden($message = 'Forbidden') {
        return $this->setStatusCode(403)->respondWithError($message, self::CODE_FORBIDDEN);
    }

    /**
	 * Generates a Response with a 500 HTTP header and a given message.
	 *
	 * @return  Response
	 */
    public function errorInternalError($message = 'Internal Error') {
        return $this->setStatusCode(500)->respondWithError($message, self::CODE_INTERNAL_ERROR);
    }

    /**
	 * Generates a Response with a 404 HTTP header and a given message.
	 *
	 * @return  Response
	 */
    public function errorNotFound($message = 'Resource Not Found') {
        return $this->setStatusCode(404)->respondWithError($message, self::CODE_NOT_FOUND);
    }

    /**
	 * Generates a Response with a 401 HTTP header and a given message.
	 *
	 * @return  Response
	 */
    public function errorUnauthorized($message = 'Unauthorized') {
        return $this->setStatusCode(401)->respondWithError($message, self::CODE_UNAUTHORIZED);
    }

    /**
	 * Generates a Response with a 400 HTTP header and a given message.
	 *
	 * @return  Response
	 */
    public function errorWrongArgs($message = 'Wrong Arguments') {
        return $this->setStatusCode(400)->respondWithError($message, self::CODE_WRONG_ARGS);
    }
}
