/* eslint-disable key-spacing */
/**
 * @type {import("semantic-release").GlobalConfig}
 */
export default {
  branches:      ["main"],
  repositoryUrl: "https://github.com/thakyz/eslint-config-nekoboinick",
  tagFormat:     "v${version}", // eslint-disable-line no-template-curly-in-string
  plugins:       [
    ["@semantic-release/commit-analyzer", {
      preset:       "angular",
      releaseRules: [
        {
          type:    "docs",
          scope:   "README",
          release: "patch",
        },
        {
          type:    "refactor",
          release: "patch",
        },
        {
          type:    "style",
          release: "patch",
        },
      ],
      parserOpts: {
        noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
      },
    }],
    ["@semantic-release/release-notes-generator", {
      preset:     "angular",
      parserOpts: {
        noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"],
      },
      writerOpts: {
        commitsSort: ["subject", "scope"],
      },
    }],
    // "@semantic-release/npm",
    ["@semantic-release/git", {
      assets:  ["dist/**/*.{js,css}", "docs", "package.json"],
      message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}", // eslint-disable-line no-template-curly-in-string
    }],
    ["@semantic-release/github", {
      assets: [
        {
          path:  "dist/asset.min.css",
          label: "CSS distribution",
        },
        {
          path:  "dist/asset.min.js",
          label: "JS distribution",
        },
      ],
      // Defaults:
      // successComment: ":tada: This issue has been resolved in version ${nextRelease.version} :tada:\n" // eslint-disable-line no-template-curly-in-string
      //   + "\n"
      //   + "The release is available on [GitHub release](<github_release_url>)",
      // successCommentCondition: null,
      // failComment:             null,
      // failTitle:               "The automated release is failing 🚨",
      // failCommentCondition:    null,
      // labels:                  ["semantic-release"],
      // releasedLabels:          "['released<%= nextRelease.channel ? \\ on @${nextRelease.channel}` : \"\" %>']-", // eslint-disable-line no-template-curly-in-string
      // releaseNameTemplate:     "<%= nextverison.name %>",
      // releaseBodyTemplate:     "<%= nextverison.notes %>",
      // discussionCategoryName:  false,
      assignees:    ["thakyz"],
      draftRelease: true,
    }],
  ],
};
