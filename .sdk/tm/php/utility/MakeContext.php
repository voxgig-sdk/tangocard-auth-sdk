<?php
declare(strict_types=1);

// TangocardAuth SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TangocardAuthMakeContext
{
    public static function call(array $ctxmap, ?TangocardAuthContext $basectx): TangocardAuthContext
    {
        return new TangocardAuthContext($ctxmap, $basectx);
    }
}
