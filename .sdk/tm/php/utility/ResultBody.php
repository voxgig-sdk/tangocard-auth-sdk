<?php
declare(strict_types=1);

// TangocardAuth SDK utility: result_body

class TangocardAuthResultBody
{
    public static function call(TangocardAuthContext $ctx): ?TangocardAuthResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
