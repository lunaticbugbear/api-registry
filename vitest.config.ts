import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    restoreMocks: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/.claude/worktrees/**']
  }
});
