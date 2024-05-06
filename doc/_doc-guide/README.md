---
title: Documentation Guide
description: Here you can find information about how we organize, maintain and create the documentation of syslog-ng.
id: doc-guide
---

## How to contribute to the documentation

 1. If you do not already have a GitHub account, create one.
 2. Fork the repository on GitHub (preferably, from the master branch)
 3. Create a branch that will store your contribution, for example, `git checkout -b my-typo-fixes`
 4. Find the part of the source that you want to modify. The easiest thing is to search for a specific text using grep, regexxer, or a similar tool.
 5. If you modify a file in the `_includes/doc/` directory, it is probably included to multiple parts of the documentation. Make sure that your changes make sense in each context.
 6. Modify the files as you need (following our markup conventions). For example, you can add new examples, correct typos, and so on.
 7. Validate the files to make sure that the `markdown` is well-formed.
 8. Commit and sign off your changes. If your changes apply only to syslog-ng OSE, begin the commit message with the `ose` prefix. If the changes apply only to specific versions, indicate them in the tag, for example, `ose 3.35`
 9. Push your changes, for example, `git push origin my-typo-fixes`
 10. Submit a pull request.
 11. Sign the syslog-ng Open Source Edition Documentation Contributor License Agreement when prompted.
 12. We will review your contribution and if accepted, integrate to the master branch of the documentation and publish it.

## Basic rules, conventions we try to follow

- TODO