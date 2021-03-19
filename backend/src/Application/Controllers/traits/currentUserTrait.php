<?php

declare(strict_types=1);

namespace App\Application\Controllers\Traits;

use Psr\Http\Message\ServerRequestInterface as Request;
use App\Domain\UserDomain;
use Dotenv\Regex\Regex;

trait CurrentUserTrait
{
    public function getCurrentUser(Request $req): UserDomain
    {
        $currentUser = $req->getAttributes('user')['user'];
        return new UserDomain(json_decode($currentUser['attributes'], true));
    }

    public function getToken(Request $req): string
    {
        $jwt = $req->getAttribute('user')['token'];
        return $jwt;
    }
}
