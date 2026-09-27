<?php
declare(strict_types=1);

// TangocardAuth SDK utility: result_headers

class TangocardAuthResultHeaders
{
    public static function call(TangocardAuthContext $ctx): ?TangocardAuthResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
