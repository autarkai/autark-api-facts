// autark-api-facts — src/index.ts
//
// Canonical source of truth for customer-facing Autark API facts, published as
// a shared package and consumed by the marketing site and the dashboard.
// Dependency-free and framework-agnostic (no React, no Next imports).

/** Base URL customers point their OpenAI SDK at. */
export const BASE_URL = "https://api.autark.ai/v1";

/** Host portion of the base URL, e.g. for prose like "point at api.autark.ai/v1". */
export const API_HOST_PATH = BASE_URL.replace(/^https?:\/\//, "");

/** Where customers sign in / create keys. */
export const DASHBOARD_URL = "https://cloud.autark.ai/login";

/** API key prefix and human-readable format. */
export const API_KEY_PREFIX = "autark_sk_";
export const API_KEY_FORMAT = `${API_KEY_PREFIX} followed by 48 hexadecimal characters`;

/** Requests allowed per minute, per API key (enforced in backend middleware). */
export const RATE_LIMIT_RPM = 60;

/* ------------------------------------------------------------------ */
/* Routing modes — the values accepted in the `model` request field.  */
/*                                                                    */
/* Canonical PUBLIC names per backend/app/router/modes.py ("Product   */
/* decision"): auto, autark-pro, autark-agent, autark-deep            */
/* (+ -private ZDR suffix on the three contracts).                    */
/*   autark-pro    → pro   (internal)                                 */
/*   autark-deep   → ultra (internal)                                 */
/*   autark-agent  → autark-agent (internal)                          */
/* The internal names (flash/pro/ultra) and the legacy public names   */
/* (autark-flash, autark-open) are DEPRECATED aliases kept working.   */
/* ------------------------------------------------------------------ */

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
export const CONTRACT_MODES: RoutingMode[] = [
    {
        model: "autark-pro",
        label: "Autark Pro",
        desc: "Smart routing. Every request goes to the best model for that specific task. The default choice for balanced quality and cost.",
    },
    {
        model: "autark-agent",
        label: "Autark Agent",
        desc: "Agentic routing. Built for tool calling and multi-step agent workloads. Same smart routing, tuned for agents.",
    },
    {
        model: "autark-deep",
        label: "Autark Deep",
        desc: "Deep reasoning for the hardest problems. Multi-step analysis, thinking enabled, investment-grade deliverables.",
    },
];

/**
 * Routing modes INCLUDING `auto`, for the dashboard's Default Model picker.
 *
 * The picker needs `auto` as a selectable row: choosing it clears the stored
 * default back to NULL, and it renders as selected when no default is set. The
 * website must NOT use this list — use CONTRACT_MODES. See the note there.
 */
export const ROUTING_MODES: RoutingMode[] = [
    {
        model: "auto",
        label: "Auto",
        desc: "Uses the default contract set in your dashboard (Autark Pro unless you change it). A convenience alias — pick a contract below to choose routing explicitly.",
    },
    ...CONTRACT_MODES,
];

/**
 * The `-private` (ZDR) suffix. Append it to any contract name (autark-pro,
 * autark-deep, autark-agent) for the zero-data-retention variant: same quality,
 * restricted to providers that never train on your prompts.
 */
export const PRIVATE_SUFFIX = "-private";

/** The three `-private` (ZDR) contract names, for docs rendering. */
export const PRIVATE_MODES: string[] = [
    "autark-pro-private",
    "autark-agent-private",
    "autark-deep-private",
];

/** Deprecated internal aliases still accepted by the API for backwards compat. */
export const LEGACY_MODES: string[] = ["flash", "pro", "ultra"];

/** Deprecated PUBLIC names, removed from the contract surface but still routed. */
export const LEGACY_PUBLIC_MODES: string[] = ["autark-flash", "autark-open", "autark"];

/**
 * Values accepted by the `mode` filter on GET /v1/usage.
 * The endpoint accepts these public names and also the legacy internal names
 * (flash/pro/ultra) for backwards compatibility; both are normalized
 * server-side to the stored internal mode.
 */
export const USAGE_MODE_FILTER: string[] = ["autark-pro", "autark-agent", "autark-deep"];

/* ------------------------------------------------------------------ */
/* Pricing tiers — token prices are USD per 1,000,000 tokens.         */
/* Authoritative source: backend/app/metering/logger.py               */
/*   INPUT_PRICE_CENTS / OUTPUT_PRICE_CENTS.                          */
/* ------------------------------------------------------------------ */

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

export const PRICING_TIERS: PricingTier[] = [
    {
        label: "Autark Pro",
        priceIn: 2.5,
        priceOut: 5.5,
        desc: "Smart routing. Every request goes to the best model for that specific task. The default choice for balanced quality and cost.",
        cta: "Get Started",
        href: DASHBOARD_URL,
        category: "general",
        highlighted: true,
    },
    {
        label: "Autark Agent",
        priceIn: 1.2,
        priceOut: 3,
        desc: "Agentic routing for tool calling and multi-step agents. Same smart routing, tuned for agent workloads.",
        cta: "Get Started",
        href: DASHBOARD_URL,
        category: "general",
        highlighted: false,
    },
    {
        label: "Autark Deep",
        priceIn: 4,
        priceOut: 8,
        desc: "Deep reasoning for the hardest problems. Multi-step analysis, thinking enabled, investment-grade deliverables.",
        cta: "Talk to a founder",
        href: "/contact",
        category: "general",
        highlighted: false,
    },
    {
        label: "Autark Pro Private",
        priceIn: 3.25,
        priceOut: 7,
        desc: "The ZDR variant of Autark Pro. Same smart routing, restricted to providers that never train on your prompts.",
        cta: "Get Started",
        href: DASHBOARD_URL,
        category: "general",
        zdr: true,
    },
    {
        label: "Autark Agent Private",
        priceIn: 1.5,
        priceOut: 3.75,
        desc: "The ZDR variant of Autark Agent. Same agentic routing, zero data retention.",
        cta: "Get Started",
        href: DASHBOARD_URL,
        category: "general",
        zdr: true,
    },
    {
        label: "Autark Deep Private",
        priceIn: 5,
        priceOut: 10,
        desc: "The ZDR variant of Autark Deep. Same deep reasoning, zero data retention.",
        cta: "Talk to a founder",
        href: "/contact",
        category: "general",
        zdr: true,
    },
];

/** Format a per-1M-token price as a display string, e.g. `$3`. */
export function formatPrice(usdPerMillion: number): string {
    return `$${usdPerMillion}`;
}

/* ------------------------------------------------------------------ */
/* Audio models — speech-to-text, billed per MINUTE (not per token).  */
/* Provider model id lives in backend/app/router/providers.py (Groq). */
/* NOTE: the model is registered/routable, but there is not yet a      */
/* public /v1/audio/transcriptions endpoint to call it.               */
/* ------------------------------------------------------------------ */

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

export const AUDIO_MODELS: AudioModel[] = [
    {
        model: "whisper-large-v3",
        label: "Whisper Large",
        provider: "groq",
        pricePerMinute: 0.01,
        maxFileMb: 100,
        desc: "Speech-to-text. 99+ languages. Pure ZDR. Max 100 MB.",
    },
];

/** Format a per-minute audio price as a display string, e.g. `$0.01/min`. */
export function formatAudioPrice(usdPerMinute: number): string {
    return `$${usdPerMinute}/min`;
}

/* ------------------------------------------------------------------ */
/* Chat completion request parameters.                                */
/* ------------------------------------------------------------------ */

export interface ChatParam {
    name: string;
    type: string;
    desc: string;
}

export const CHAT_PARAMS: ChatParam[] = [
    { name: "model", type: "string", desc: "autark-pro, autark-agent or autark-deep (plus -private variants). Pick the contract that matches your workload. Omit it and the request uses `auto`, which resolves to your dashboard's default contract (Autark Pro unless changed)." },
    { name: "messages", type: "array", desc: "Standard OpenAI message format." },
    { name: "stream", type: "boolean", desc: "Enable SSE streaming. Default: false." },
    { name: "max_tokens", type: "integer", desc: "Max output tokens. Default: 8192, max: 131072." },
    { name: "temperature", type: "float", desc: "Sampling temperature 0-2. Default: 0.7." },
    { name: "top_p", type: "float", desc: "Nucleus sampling 0-1. Default: 1.0." },
    { name: "n", type: "integer", desc: "Number of completions. Default: 1, max: 10." },
    { name: "stop", type: "string[]", desc: "Up to 4 sequences where generation stops." },
    { name: "user", type: "string", desc: "End-user identifier for abuse monitoring." },
    { name: "response_format", type: "object", desc: '{"type": "json_object"} or {"type": "json_schema", "json_schema": {...}} for structured output.' },
    { name: "tools", type: "array", desc: "Function calling tools. OpenAI-compatible." },
    { name: "tool_choice", type: "string | object", desc: "Force a specific tool, or 'auto' / 'none'." },
    { name: "parallel_tool_calls", type: "boolean", desc: "Allow multiple tool calls in one turn." },
];

/* ------------------------------------------------------------------ */
/* Error codes.                                                       */
/* ------------------------------------------------------------------ */

export interface ErrorCode {
    code: string;
    label: string;
    desc: string;
}

export const ERROR_CODES: ErrorCode[] = [
    { code: "200", label: "Success", desc: "The request completed successfully." },
    { code: "400", label: "Bad request", desc: "Invalid JSON, missing required fields, or the request was blocked by our safety filters." },
    { code: "401", label: "Unauthorized", desc: "Invalid or missing API key. Check your Authorization header." },
    { code: "402", label: "Insufficient credits", desc: "Your account is out of credits. Add credits in the dashboard." },
    { code: "403", label: "Spend cap exceeded", desc: "This key hit its spend cap. Increase the cap in the dashboard." },
    { code: "413", label: "Payload too large", desc: "Audio uploads exceed the 100 MB limit." },
    { code: "422", label: "Unprocessable entity", desc: "Valid JSON, but one or more parameter values are invalid." },
    { code: "429", label: "Rate limit exceeded", desc: `More than ${RATE_LIMIT_RPM} requests per minute for this key. Retry after the Retry-After header duration.` },
    { code: "500", label: "Internal server error", desc: "Something went wrong on our end. Contact support if it persists." },
    { code: "503", label: "Service unavailable", desc: "A provider is down or Redis is unreachable. Retry with exponential backoff." },
];

/* ------------------------------------------------------------------ */
/* Custom headers.                                                    */
/* ------------------------------------------------------------------ */

export interface HeaderDoc {
    header: string;
    desc: string;
    /** True when the header is planned but not yet live. */
    soon?: boolean;
}

export const REQUEST_HEADERS: HeaderDoc[] = [
    {
        header: "x-autark-mode",
        desc: "Override the routing mode (auto, autark-pro, autark-deep, or autark-agent) per request without changing the model field.",
        soon: true,
    },
    {
        header: "x-autark-no-optimize",
        desc: 'Set to "true" to skip prompt optimization. Use this if you have already crafted your system prompt and want it sent verbatim.',
        soon: false,
    },
    {
        header: "x-autark-no-bandit",
        desc: 'Advanced. Set to "false" to opt into an alternate model-selection method. Leave it unset for the default behaviour.',
        soon: false,
    },
];

export const RESPONSE_HEADERS: HeaderDoc[] = [
    { header: "x-request-id", desc: "Unique request identifier — include it when contacting support." },
    { header: "x-autark-deprecated", desc: "Set when you used a legacy model name, telling you its replacement." },
];

export const RATE_LIMIT_HEADERS: HeaderDoc[] = [
    { header: "X-RateLimit-Limit", desc: "Your per-minute request limit." },
    { header: "X-RateLimit-Remaining", desc: "Requests remaining in the current window." },
    { header: "X-RateLimit-Reset", desc: "Unix timestamp when the window resets." },
];

/* ------------------------------------------------------------------ */
/* Endpoints.                                                         */
/* ------------------------------------------------------------------ */

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
 *   - `/v1/web/search` and `/v1/web/extract` are an internal Exa proxy with no
 *     billing wired up and no caller; they are not a product yet.
 *   - `/v1/pricing` and `/v1/pricing/{model}` were REMOVED, not just hidden.
 *     They scraped Fireworks/Groq/DeepSeek list prices — what WE pay — and
 *     served them unauthenticated, exposing the routed model roster by upstream
 *     ID, our per-model cost, and therefore our margin. Do not re-add them.
 *
 * Before adding an entry: confirm a paying customer with an API key can call it
 * and would want to. If it is called by our own frontend, it does not belong
 * here.
 */
export const ENDPOINTS: Endpoint[] = [
    { method: "POST", path: "/v1/chat/completions", auth: "api-key", desc: "Create a chat completion. OpenAI-compatible request and response." },
    { method: "GET", path: "/v1/models", auth: "api-key", desc: "List the models available to your account." },
    { method: "GET", path: "/v1/usage", auth: "api-key", desc: "Current token usage and estimated savings for your account." },
    { method: "GET", path: "/v1/me", auth: "api-key", desc: "Your account profile, current balance, and this-month usage." },
    { method: "GET", path: "/v1/me/balance", auth: "api-key", desc: "Current credit balance for the authenticated account." },
    { method: "GET", path: "/v1/me/daily", auth: "api-key", desc: "Per-day token usage for the current month." },
    { method: "GET", path: "/v1/keys", auth: "api-key", desc: "List your API keys and their spend caps." },
    { method: "POST", path: "/v1/keys", auth: "api-key", desc: "Create an API key (optionally with a spend cap)." },
    { method: "PATCH", path: "/v1/keys/{key_id}", auth: "api-key", desc: "Update a key's name or spend cap." },
    { method: "DELETE", path: "/v1/keys/{key_id}", auth: "api-key", desc: "Revoke an API key." },
    { method: "GET", path: "/health", auth: "public", desc: "Health check with provider status. No authentication required." },
];
