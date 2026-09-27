<?php
declare(strict_types=1);

// TangocardAuth SDK base feature

class TangocardAuthBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TangocardAuthContext $ctx, array $options): void {}
    public function PostConstruct(TangocardAuthContext $ctx): void {}
    public function PostConstructEntity(TangocardAuthContext $ctx): void {}
    public function SetData(TangocardAuthContext $ctx): void {}
    public function GetData(TangocardAuthContext $ctx): void {}
    public function GetMatch(TangocardAuthContext $ctx): void {}
    public function SetMatch(TangocardAuthContext $ctx): void {}
    public function PrePoint(TangocardAuthContext $ctx): void {}
    public function PreSpec(TangocardAuthContext $ctx): void {}
    public function PreRequest(TangocardAuthContext $ctx): void {}
    public function PreResponse(TangocardAuthContext $ctx): void {}
    public function PreResult(TangocardAuthContext $ctx): void {}
    public function PreDone(TangocardAuthContext $ctx): void {}
    public function PreUnexpected(TangocardAuthContext $ctx): void {}
}
