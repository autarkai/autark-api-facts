/** Base URL customers point their OpenAI SDK at. */
export declare const BASE_URL = "https://api.autark.ai/v1";
/** Host portion of the base URL, e.g. for prose like "point at api.autark.ai/v1". */
export declare const API_HOST_PATH: string;
/** Where customers sign in / create keys. */
export declare const DASHBOARD_URL = "https://cloud.autark.ai/login";
/** API key prefix and human-readable format. */
export declare const API_KEY_PREFIX = "autark_sk_";
export declare const API_KEY_FORMAT = "autark_sk_ followed by 48 hexadecimal characters";
/** Requests allowed per minute, per API key (enforced in backend middleware). */
export declare const RATE_LIMIT_RPM = 60;
export interface RoutingMode {
    /** Value passed in the `model` field. */
    model: string;
    label: string;
    desc: string;
}
/**
 * The three CONTRACTS, for customer-facing docs.
 *
 * This is what the website renders. `auto` is deliberately NOT here: it is a
 * convenience alias that resolves to the dashboard default (Autark Pro when
 * unset), so listing it beside the contracts invites the question "which one do
 * I pick?" when the answer is always a contract. See ROUTING_MODES for the
 * dashboard's list, which DOES include `auto` because it is the row that
 * represents "no default set".
 */
export declare const CONTRACT_MODES: RoutingMode[];
/**
 * Routing modes INCLUDING `auto`, for the dashboard's Default Model picker.
 *
 * The picker needs `auto` as a selectable row: choosing it clears the stored
 * default back to NULL, and it renders as selected when no default is set. The
 * website must NOT use this list — use CONTRACT_MODES. See the note there.
 */
export declare const ROUTING_MODES: RoutingMode[];
/**
 * The `-private` (ZDR) suffix. Append it to any contract name (autark-pro,
 * autark-deep, autark-agent) for the zero-data-retention variant: same quality,
 * restricted to providers that never train on your prompts.
 */
export declare const PRIVATE_SUFFIX = "-private";
/** The three `-private` (ZDR) contract names, for docs rendering. */
export declare const PRIVATE_MODES: string[];
/** Deprecated internal aliases still accepted by the API for backwards compat. */
export declare const LEGACY_MODES: string[];
/** Deprecated PUBLIC names, removed from the contract surface but still routed. */
export declare const LEGACY_PUBLIC_MODES: string[];
/**
 * Values accepted by the `mode` filter on GET /v1/usage.
 * The endpoint accepts these public names and also the legacy internal names
 * (flash/pro/ultra) for backwards compatibility; both are normalized
 * server-side to the stored internal mode.
 */
export declare const USAGE_MODE_FILTER: string[];
export interface PricingTier {
    /** Marketing product name. */
    label: string;
    /** USD per 1M input tokens. */
    priceIn: number;
    /** USD per 1M output tokens. */
    priceOut: number;
    desc: string;
    cta: string;
    href: string;
    category: "general" | "specialist";
    highlighted?: boolean;
    /** True when this tier is a `-private` (ZDR) variant. Drives the ZDR badge. */
    zdr?: boolean;
}
export declare const PRICING_TIERS: PricingTier[];
/** Format a per-1M-token price as a display string, e.g. `$3`. */
export declare function formatPrice(usdPerMillion: number): string;
export interface AudioModel {
    /** API model string. */
    model: string;
    label: string;
    provider: string;
    /** USD per minute of audio. */
    pricePerMinute: number;
    /** Max upload size in MB. */
    maxFileMb: number;
    desc: string;
}
export declare const AUDIO_MODELS: AudioModel[];
/** Format a per-minute audio price as a display string, e.g. `$0.01/min`. */
export declare function formatAudioPrice(usdPerMinute: number): string;
export interface ChatParam {
    name: string;
    type: string;
    desc: string;
}
export declare const CHAT_PARAMS: ChatParam[];
export interface ErrorCode {
    code: string;
    label: string;
    desc: string;
}
export declare const ERROR_CODES: ErrorCode[];
export interface HeaderDoc {
    header: string;
    desc: string;
    /** True when the header is planned but not yet live. */
    soon?: boolean;
}
export declare const REQUEST_HEADERS: HeaderDoc[];
export declare const RESPONSE_HEADERS: HeaderDoc[];
export declare const RATE_LIMIT_HEADERS: HeaderDoc[];
export interface Endpoint {
    method: string;
    path: string;
    desc: string;
    /**
     * Who can call this. Rendered as a chip next to the path.
     *
     * "public"  — no credentials at all.
     * "api-key" — requires `Authorization: Bearer autark_...`.
     *
     * Every entry MUST declare this. The list previously carried no auth
     * information, so nine endpoints that 401 without a key looked identical to
     * the two that are genuinely open. A reader had no way to tell them apart.
     */
    auth: "public" | "api-key";
}
/**
 * Customer-facing endpoints only.
 *
 * NOT a dump of the app's route table. Internal endpoints are deliberately
 * absent, because the docs page is public and unauthenticated:
 *
 *   - `/v1/trial` is server-to-server (the marketing site holds a shared secret
 *     and calls it). Listing it advertised an attack surface and misled every
 *     developer who tried it — it returns 403 without the secret.
 *   - `/admin/*` (85 routes) is operator-only.
 *   - `/v1/register`, `/v1/waitlist`, `/v1/contact`, `/v1/invite/verify` are
 *     signup plumbing the website calls, not API surface.
 *   - `/v1/web/search` and `/v1/web/extract` were REMOVED. An Exa proxy with no
 *     billing wired up, no caller, and EXA_API_KEY never set in production (so
 *     /extract always 503'd and /search silently fell back to DuckDuckGo). It
 *     was a free unmetered proxy behind auth. Do not re-add without billing.
 *   - `/v1/pricing` and `/v1/pricing/{model}` were REMOVED, not just hidden.
 *     They scraped Fireworks/Groq/DeepSeek list prices — what WE pay — and
 *     served them unauthenticated, exposing the routed model roster by upstream
 *     ID, our per-model cost, and therefore our margin. Do not re-add them.
 *
 * Before adding an entry: confirm a paying customer with an API key can call it
 * and would want to. If it is called by our own frontend, it does not belong
 * here.
 */
export declare const ENDPOINTS: Endpoint[];
