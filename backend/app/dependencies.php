<?php

declare(strict_types=1);

use App\Infrastructure\Database\Connection\ConnectionInterface;
use App\Infrastructure\Database\Connection\PDOConnection;
use DI\ContainerBuilder;
use NilPortugues\Sql\QueryBuilder\Builder\GenericBuilder;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;
use PHPMailer\PHPMailer\PHPMailer as Mailer;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        LoggerInterface::class => static function (ContainerInterface $c) {
            $settings = $c->get('settings');

            $loggerSettings = $settings['logger'];
            $logger = new Logger($loggerSettings['name']);

            $processor = new UidProcessor();
            $logger->pushProcessor($processor);

            $handler = new StreamHandler($loggerSettings['path'], $loggerSettings['level']);
            $logger->pushHandler($handler);

            return $logger;
        },
        ConnectionInterface::class => static function (ContainerInterface $c) {
            $dbSettings = $c->get('settings')['connection'];
            $driver = $dbSettings['driver'];
            $host = $dbSettings['host'];
            $port = $dbSettings['port'];
            $database = $dbSettings['dbname'];
            $username = $dbSettings['user'];
            $password = $dbSettings['password'];
            $conString = "$driver:server=$host,$port; Database=$database";

            return new PDOConnection($conString, $username, $password);
        },

        'queryBuilder' => static function (): GenericBuilder {
            return new GenericBuilder();
        },
        'mailer' => static function (ContainerInterface $c): Mailer {
            $settings = $c->get('settings')['smtp'];
            $mail = new Mailer(true);

            $mail->SMTPDebug = $settings['debug'];
            $mail->isSMTP();
            $mail->Host = $settings['host'];
            $mail->SMTPAuth = false;
            $mail->Port = $settings['port'];
            $mail->setFrom($settings['fromEmail'], $settings['fromName']);
            $mail->addBCC('rubens.junior@caixa.gov.br');

            return $mail;
        }
    ]);
};
