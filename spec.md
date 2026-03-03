# Specification

## Summary
**Goal:** Fix admin CMS changes so they persist across page reloads and return visits by repairing the full save/load pipeline between the React frontend and the Motoko backend canister.

**Planned changes:**
- Audit every CMSContext mutation action to ensure it calls its corresponding `useCMSBackend` save function after updating local React state.
- Fix CMSContext on-mount hydration so `loadAllCMSData` populates all state slices from backend data when non-empty, rather than falling back to in-memory defaults.
- Ensure all CMS data storage variables in `backend/main.mo` are declared as `stable` so they survive canister upgrades and redeployments.
- Fix any broken wiring, missing async/await calls, type conversion errors, or silent failures in `useCMSBackend.ts` that cause backend writes to silently fail.
- Add error catching and logging for all backend write calls so failures surface instead of being swallowed.

**User-visible outcome:** After an admin saves any CMS content change (artwork, settings, testimonials, process steps, etc.), those changes remain in place after navigating away and returning to the site — no longer resetting to defaults on reload.
