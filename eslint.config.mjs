import nextPlugin from "@next/eslint-plugin-next"
import tseslint from "typescript-eslint"

// Native flat config — no FlatCompat layer needed.
// @next/eslint-plugin-next v16+ exposes first-class flat configs
// ("recommended" and "core-web-vitals"); typescript-eslint does the same.
// The old FlatCompat path crashed ESLint 10 because eslint-plugin-react's
// internal config object has a circular reference that JSON.stringify cannot
// serialise during schema validation.
export default tseslint.config(
  nextPlugin.configs["recommended"],
  nextPlugin.configs["core-web-vitals"],
  ...tseslint.configs.recommended,
)
