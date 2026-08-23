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
export declare const ROUTING_MODES: RoutingMode[];
/** Deprecated internal aliases still accepted by the API for backwards compat. */
export declare const LEGACY_MODES: string[];
/**
 * The `-private` (ZDR) suffix. Append it to any contract name (autark-pro,
 * autark-deep, autark-agent) for the zero-data-retention variant: same quality,
 * restricted to providers that never train on your prompts.
 */
export declare const PRIVATE_SUFFIX = "-private";
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
}
export declare const ENDPOINTS: Endpoint[];
