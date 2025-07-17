/** External dependencies that should not be bundled by Rollup when building a plugin */
export const limboExternals = [
	"@limbo/api",
	"react",
	"react/jsx-runtime",
	"@sinclair/typebox",
	"@tanstack/react-query",
] as const;
