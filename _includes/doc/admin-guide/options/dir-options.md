## dir-group()

|  Accepted values:|   groupid|
|Default:|   {{ page.dir_group | default: 'Use the global settings' }}|

*Description:* The group of the directories created by syslog-ng. To
preserve the original properties of an existing directory, use the
option without specifying an attribute: dir-group().

## dir-owner()

|  Accepted values:|   userid|
|Default:| {{ page.dir_owner | default: 'Use the global settings' }}|

*Description:* The owner of the directories created by syslog-ng. To
preserve the original properties of an existing directory, use the
option without specifying an attribute: dir-owner().

Starting with version 3.16, the default value of this option is -1, so
syslog-ng OSE does not change the ownership, unless explicitly
configured to do so.

## dir-perm()

|  Accepted values:|   permission value|
  |Default:| {{ page.dir_perm | default: 'Use the global settings' }}|

*Description:* The permission mask of directories created by syslog-ng.
Log directories are only created if a file after macro expansion refers
to a non-existing directory, and directory creation is enabled (see also
the create-dirs() option). For octal numbers prefix the number with
**0**, for example, use **0755** for **rwxr-xr-x**.

To preserve the original properties of an existing directory, use the
option without specifying an attribute: dir-perm(). Note that when
creating a new directory without specifying attributes for dir-perm(),
the default permission of the directories is masked with the umask of
the parent process (typically **0022**).

Starting with version 3.16, the default value of this option is -1, so
syslog-ng OSE does not change the ownership, unless explicitly
configured to do so.
