package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/tangocard-auth-sdk/go"
	"github.com/voxgig-sdk/tangocard-auth-sdk/go/core"

	vs "github.com/voxgig-sdk/tangocard-auth-sdk/go/utility/struct"
)

func TestServiceTokenManagementEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ServiceTokenManagement(nil)
		if ent == nil {
			t.Fatal("expected non-nil ServiceTokenManagementEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := service_token_managementBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "service_token_management." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		serviceTokenManagementRef01Ent := client.ServiceTokenManagement(nil)
		serviceTokenManagementRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "service_token_management"}), "service_token_management_ref01"))

		serviceTokenManagementRef01DataResult, err := serviceTokenManagementRef01Ent.Create(serviceTokenManagementRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		serviceTokenManagementRef01Data = core.ToMapAny(entityData(serviceTokenManagementRef01DataResult))
		if serviceTokenManagementRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func service_token_managementBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "service_token_management", "ServiceTokenManagementTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read service_token_management test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse service_token_management test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"service_token_management01", "service_token_management02", "service_token_management03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID": idmap,
		"TANGOCARD_AUTH_TEST_LIVE":      "FALSE",
		"TANGOCARD_AUTH_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["TANGOCARD_AUTH_TEST_SERVICE_TOKEN_MANAGEMENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TANGOCARD_AUTH_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewTangocardAuthSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TANGOCARD_AUTH_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TANGOCARD_AUTH_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
