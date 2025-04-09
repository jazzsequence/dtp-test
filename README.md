# Deploy to Pantheon test

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