# Deploy to Pantheon test

[![Test](https://github.com/jazzsequence/dtp-test/actions/workflows/test.yml/badge.svg)](https://github.com/jazzsequence/dtp-test/actions/workflows/test.yml)
[![Dev environment](https://img.shields.io/badge/dev-yellow?logo=pantheon&logoColor=yellow&label=cxr-dtp-test&color=yellow
)](https://dev-cxr-dtp-test.pantheonsite.io)


This is a WordPress repository configured to test deployments to Pantheon via GitHub actions. In this use case, Composer is being used to manage dependencies (plugins and themes) and Pantheon is used to manage WordPress core updates. 

Because we don't want to change the WordPress filesystem, the WordPress core files are not part of this repository, only custom code that we maintain is. To manage this, the following is added to `.git/info/exclude` to ensure that we don't need to maintain the WordPress core code in the GitHub repository.

```
wp-admin/
wp-includes/
index.php
license.txt
pantheon.upstream.yml
readme.html
wp-*.php
!wp-config.php
xmlrpc.php
```

This allows those files to be safely deleted locally, not managed in the GitHub repository, but left alone in the Pantheon repository.

In order to not overwrite the WordPress core filesystem, the [`push-to-pantheon`](https://github.com/jazzsequence/dtp-test/blob/main/.github/workflows/push-to-pantheon.yml) workflow is pulling down files from the Pantheon site repository and overlaying changes from this repository on top of them.