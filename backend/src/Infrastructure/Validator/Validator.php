<?php /** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */

/** @noinspection PhpUnused */

namespace App\Infrastructure\Validator;

/**
 * Validator
 *
 * Simple PHP class to validate fields.
 *
 * @author Rubens Praser Júnior <praser@gmail.com>
 * @copyright (c) 2020, Rubens Praser Júnior
 * @license https://choosealicense.com/licenses/mit/
 */

class Validator
{
    private $patterns = array(
        'uri'           => '[A-Za-z0-9-\/_?&=]+',
        'url'           => '[A-Za-z0-9-:.\/_?&=#]+',
        'alpha'         => '[\p{L}]+',
        'words'         => '[\p{L}\s]+',
        'alphanum'      => '[\p{L}0-9]+',
        'int'           => '[0-9]+',
        'float'         => '[0-9\.,]+',
        'tel'           => '[0-9+\s()-]+',
        'text'          => '[\p{L}0-9\s-.,;:!"%&()?+\'°#\/@]+',
        'file'          => '[\p{L}\s0-9-_!%&()=\[\]#@,.;+]+\.[A-Za-z0-9]{2,4}',
        'folder'        => '[\p{L}\s0-9-_!%&()=\[\]#@,.;+]+',
        'address'       => '[\p{L}0-9\s.,()°-]+',
        'date_dmy'      => '[0-9]{1,2}\-[0-9]{1,2}\-[0-9]{4}',
        'date_ymd'      => '[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}',
        'email'         => '[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+[.]+[a-z-A-Z]'
    );

    private $errors = array();
    private $name;
    private $value;
    private $file;

    public function setName(string $name): Validator
    {
        $this->name = $name;
        return $this;
    }

    public function setValue($value): Validator
    {
        $this->value = $value;
        return $this;
    }

    public function setFile($value): Validator
    {
        $this->file = $value;
        return $this;
    }

    /**
     * Validates throw one of the available patterns
     *
     * @param string $name name of the pattern
     * @return Validator
     */
    public function pattern(string $name): Validator
    {
        if ($name === 'array') {
            if (!is_array($this->value)) {
                $this->errors[] = 'O formato do atributo ' . $this->name . ' é inválido.';
            }
        } else {
            $regex = '/^(' . $this->patterns[$name] . ')$/u';
            if ($this->value !== '' && !preg_match($regex, $this->value)) {
                $this->errors[] = 'O formato do atributo ' . $this->name . ' é inválido.';
            }
        }
        return $this;
    }

    /**
     * Validates throw a custom pattern
     *
     * @param string $pattern
     * @return Validator
     */
    public function customPattern(string $pattern): Validator
    {
        $regex = '/^(' . $pattern . ')$/u';
        if ($this->value !== '' && !preg_match($regex, $this->value)) {
            $this->errors[] = 'O formato do atributo ' . $this->name . ' é inválido.';
        }
        return $this;
    }

    public function required(): Validator
    {
        if ((isset($this->file) && $this->file['error'] === 4) || ($this->value === '' || $this->value === null)) {
            $this->errors[] = 'O atributo ' . $this->name . ' é obrigatório.';
        }
        return $this;
    }

    public function min(int $length): Validator
    {
        if (is_string($this->value)) {
            if (strlen($this->value) < $length) {
                $this->errors[] = 'O valor do atributo ' . $this->name . ' é inferior a ' . $length;
            }
        } else if ($this->value < $length) {
            $this->errors[] = 'O valor do atributo ' . $this->name . ' é inferior a ' . $length;
        }
        return $this;
    }

    public function max(int $length): Validator
    {
        if (is_string($this->value)) {
            if (strlen($this->value) > $length) {
                $this->errors[] = 'O valor do atributo ' . $this->name . 'é superior a ' . $length;
            }
        } else if ($this->value > $length) {
            $this->errors[] = 'O valor do atributo ' . $this->name . 'é superior a ' . $length;
        }
        return $this;
    }

    public function equal($value): Validator
    {
        if ($this->value !== $value) {
            $this->errors[] = 'O valor do atributo ' . $this->name . ' é diferente de ' . $value;
        }
        return $this;
    }

    /**
     * Max size of the file
     *
     * @param int $size
     * @return Validator
     */
    public function maxSize(int $size): Validator
    {
        if ($this->file['error'] !== 4 && $this->file['size'] > $size) {
            $this->errors[] = 'O arquivo ' . $this->name . ' é maior que ' . number_format($size / 1048576, 2) . ' MB.';
        }
        return $this;
    }

    /**
     * Extension of the file
     *
     * @param string $extension
     * @return Validator
     */
    public function ext(string $extension): Validator
    {
        if (
            $this->file['error'] !== 4 &&
            pathinfo($this->file['name'], PATHINFO_EXTENSION) !== $extension &&
            strtoupper(pathinfo($this->file['name'], PATHINFO_EXTENSION)) !== $extension
        ) {
            $this->errors[] = 'A extensão do arquivo ' . $this->name . ' não é ' . $extension . '.';
        }
        return $this;
    }

    public function isSuccess(): bool
    {
        return empty($this->errors);
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public static function isInt($value): bool
    {
        return filter_var($value, FILTER_VALIDATE_INT);
    }

    public static function isFloat($value): bool
    {
        return filter_var($value, FILTER_VALIDATE_FLOAT);
    }

    public static function isAlpha($value): bool
    {
        return filter_var($value, FILTER_VALIDATE_REGEXP, array('options' => array('regexp' => '/^[a-zA-Z]+$/')));
    }

    public static function isAlphanum($value): bool
    {
        return filter_var(
            $value,
            FILTER_VALIDATE_REGEXP,
            array('options' => array('regexp' => '/^[a-zA-Z0-9]+$/'))
        );
    }

    public static function isUrl($value): bool
    {
        return filter_var($value, FILTER_VALIDATE_URL);
    }

    public static function isUri($value): bool
    {
        return filter_var(
            $value,
            FILTER_VALIDATE_REGEXP,
            array('options' => array('regexp' => "/^[A-Za-z0-9-\/_]+$/"))
        );
    }

    public static function isBool($value): bool
    {
        return is_bool(filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE));
    }

    public static function isEmail($value): bool
    {
        return filter_var($value, FILTER_VALIDATE_EMAIL);
    }

    public static function isInstanceOf($object, string $class): bool
    {
        return is_a($object, $class);
    }
}
