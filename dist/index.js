"use strict";
// autark-api-facts — src/index.ts
//
// Canonical source of truth for customer-facing Autark API facts, published as
// a shared package and consumed by the marketing site and the dashboard.
// Dependency-free and framework-agnostic (no React, no Next imports).
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENDPOINTS = exports.RATE_LIMIT_HEADERS = exports.RESPONSE_HEADERS = exports.REQUEST_HEADERS = exports.ERROR_CODES = exports.CHAT_PARAMS = exports.AUDIO_MODELS = exports.PRICING_TIERS = exports.USAGE_MODE_FILTER = exports.PRIVATE_SUFFIX = exports.LEGACY_PUBLIC_MODES = exports.LEGACY_MODES = exports.ROUTING_MODES = exports.RATE_LIMIT_RPM = exports.API_KEY_FORMAT = exports.API_KEY_PREFIX = exports.DASHBOARD_URL = exports.API_HOST_PATH = exports.BASE_URL = void 0;
exports.formatPrice = formatPrice;
exports.formatAudioPrice = formatAudioPrice;
/** Base URL customers point their OpenAI SDK at. */
exports.BASE_URL = "https://api.autark.ai/v1";
/** Host portion of the base URL, e.g. for prose like "point at api.autark.ai/v1". */
exports.API_HOST_PATH = exports.BASE_URL.replace(/^https?:\/\//, "");
/** Where customers sign in / create keys. */
exports.DASHBOARD_URL = "https://cloud.autark.ai/login";
/** API key prefix and human-readable format. */
exports.API_KEY_PREFIX = "autark_sk_";
exports.API_KEY_FORMAT = `${exports.API_KEY_PREFIX} followed by 48 hexadecimal characters`;
/** Requests allowed per minute, per API key (enforced in backend middleware). */
exports.RATE_LIMIT_RPM = 60;
exports.ROUTING_MODES = [
    {
        model: "auto",
        label: "Auto",
        desc: "Autark classifies each request and routes it to the best model for the job. This is what most teams should use.",
    },
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
/** Deprecated internal aliases still accepted by the API for backwards compat. */
exports.LEGACY_MODES = ["flash", "pro", "ultra"];
/** Deprecated PUBLIC names, removed from the contract surface but still routed. */
exports.LEGACY_PUBLIC_MODES = ["autark-flash", "autark-open", "autark"];
/**
 * The `-private` (ZDR) suffix. Append it to any contract name (autark-pro,
 * autark-deep, autark-agent) for the zero-data-retention variant: same quality,
 * restricted to providers that never train on your prompts.
 */
exports.PRIVATE_SUFFIX = "-private";
/**
 * Values accepted by the `mode` filter on GET /v1/usage.
 * The endpoint accepts these public names and also the legacy internal names
 * (flash/pro/ultra) for backwards compatibility; both are normalized
 * server-side to the stored internal mode.
 */
exports.USAGE_MODE_FILTER = ["autark-pro", "autark-agent", "autark-deep"];
exports.PRICING_TIERS = [
    {
        label: "Autark Pro",
        priceIn: 3,
        priceOut: 6,
        desc: "Smart routing. Every request goes to the best model for that specific task. The default choice for balanced quality and cost.",
        cta: "Get Started",
        href: exports.DASHBOARD_URL,
        category: "general",
        highlighted: true,
    },
    {
        label: "Autark Pro Private",
        priceIn: 3.75,
        priceOut: 7.50,
        desc: "The ZDR variant of Autark Pro. Same smart routing, restricted to providers that never train on your prompts.",
        cta: "Get Started",
        href: exports.DASHBOARD_URL,
        category: "general",
        zdr: true,
    },
    {
        label: "Autark Agent",
        priceIn: 5,
        priceOut: 10,
        desc: "Agentic routing for tool calling and multi-step agents. Same smart routing, tuned for agent workloads.",
        cta: "Get Started",
        href: exports.DASHBOARD_URL,
        category: "general",
        highlighted: false,
    },
    {
        label: "Autark Agent Private",
        priceIn: 6.25,
        priceOut: 12.50,
        desc: "The ZDR variant of Autark Agent. Same agentic routing, zero data retention.",
        cta: "Get Started",
        href: exports.DASHBOARD_URL,
        category: "general",
        zdr: true,
    },
    {
        label: "Autark Deep",
        priceIn: 5,
        priceOut: 10,
        desc: "Deep reasoning for the hardest problems. Multi-step analysis, thinking enabled, investment-grade deliverables.",
        cta: "Talk to a founder",
        href: "mailto:sales@autark.ai",
        category: "general",
        highlighted: false,
    },
    {
        label: "Autark Deep Private",
        priceIn: 6.25,
        priceOut: 12.50,
        desc: "The ZDR variant of Autark Deep. Same deep reasoning, zero data retention.",
        cta: "Talk to a founder",
        href: "mailto:sales@autark.ai",
        category: "general",
        zdr: true,
    },
];
/** Format a per-1M-token price as a display string, e.g. `$3`. */
function formatPrice(usdPerMillion) {
    return `$${usdPerMillion}`;
}
exports.AUDIO_MODELS = [
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
function formatAudioPrice(usdPerMinute) {
    return `$${usdPerMinute}/min`;
}
exports.CHAT_PARAMS = [
    { name: "model", type: "string", desc: "auto, autark-pro, autark-deep, or autark-agent. Defaults to autark-pro." },
    { name: "messages", type: "array", desc: "Standard OpenAI message format." },
    { name: "stream", type: "boolean", desc: "Enable SSE streaming. Default: false." },
    { name: "max_tokens", type: "integer", desc: "Max output tokens. Default: 2048, max: 131072." },
    { name: "temperature", type: "float", desc: "Sampling temperature 0-2. Default: 0.7." },
    { name: "response_format", type: "object", desc: '{"type": "json_object"} for structured JSON output.' },
    { name: "tools", type: "array", desc: "Function calling tools. OpenAI-compatible." },
];
exports.ERROR_CODES = [
    { code: "200", label: "Success", desc: "The request completed successfully." },
    { code: "400", label: "Bad request", desc: "Invalid JSON, missing required fields, or the request was blocked by our safety filters." },
    { code: "401", label: "Unauthorized", desc: "Invalid or missing API key. Check your Authorization header." },
    { code: "402", label: "Insufficient credits", desc: "Your account is out of credits. Add credits in the dashboard." },
    { code: "403", label: "Spend cap exceeded", desc: "This key hit its spend cap. Increase the cap in the dashboard." },
    { code: "413", label: "Payload too large", desc: "Audio uploads exceed the 100 MB limit." },
    { code: "422", label: "Unprocessable entity", desc: "Valid JSON, but one or more parameter values are invalid." },
    { code: "429", label: "Rate limit exceeded", desc: `More than ${exports.RATE_LIMIT_RPM} requests per minute for this key. Retry after the Retry-After header duration.` },
    { code: "500", label: "Internal server error", desc: "Something went wrong on our end. Contact support if it persists." },
    { code: "503", label: "Service unavailable", desc: "A provider is down or Redis is unreachable. Retry with exponential backoff." },
];
exports.REQUEST_HEADERS = [
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
        desc: 'Autark routes with the A-TEM evaluation matrix by default. Set to "false" to opt into legacy bandit-based (learned) routing instead.',
        soon: false,
    },
];
exports.RESPONSE_HEADERS = [
    { header: "x-autark-provider", desc: "Which provider handled the request (e.g. groq, fireworks, deepseek)." },
    { header: "x-autark-model", desc: "The underlying model that served the request." },
    { header: "x-autark-tier", desc: "The capability tier used for routing this request." },
    { header: "x-request-id", desc: "Unique request identifier — include it when contacting support." },
];
exports.RATE_LIMIT_HEADERS = [
    { header: "X-RateLimit-Limit", desc: "Your per-minute request limit." },
    { header: "X-RateLimit-Remaining", desc: "Requests remaining in the current window." },
    { header: "X-RateLimit-Reset", desc: "Unix timestamp when the window resets." },
];
exports.ENDPOINTS = [
    { method: "POST", path: "/v1/chat/completions", desc: "Create a chat completion. OpenAI-compatible request and response." },
    { method: "GET", path: "/v1/models", desc: "List models available through Autark." },
    { method: "GET", path: "/v1/usage", desc: "Current token usage and estimated savings for your account." },
    { method: "GET", path: "/health", desc: "Health check with provider status." },
];
