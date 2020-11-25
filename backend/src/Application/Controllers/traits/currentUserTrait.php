<?php

declare(strict_types=1);

namespace App\Application\Controllers\Traits;

use Psr\Http\Message\ServerRequestInterface as Request;
use App\Domain\UserDomain;

trait CurrentUserTrait
{
  public function getCurrentUser(Request $req): UserDomain
  {
    $currentUser = $req->getAttributes('user')['user'];
    $jwt = $currentUser['token'];
    return new UserDomain(json_decode($currentUser['attributes'], true));
  }
}