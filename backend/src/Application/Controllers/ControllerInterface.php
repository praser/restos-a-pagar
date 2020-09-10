<?php /** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */
/** @noinspection PhpUnused */

declare(strict_types=1);

namespace App\Application\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

interface ControllerInterface
{
    public function index(Request $req, Response $res, array $args): Response;
    public function show(Request $req, Response $res, array $args): Response;
    public function create(Request $req, Response $res, array $args): Response;
    public function update(Request $req, Response $res, array $args): Response;
    public function destroy(Request $req, Response $res, array $args): Response;
}
