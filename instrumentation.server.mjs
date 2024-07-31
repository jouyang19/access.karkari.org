import * as Sentry from "@sentry/remix";

Sentry.init({
    dsn: "https://a1234dec82f6d7705a36646dc4678267@o4507694867087360.ingest.us.sentry.io/4507694869839872",
    tracesSampleRate: 1,
    autoInstrumentRemix: true
})